"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/store";
import { formatRupiah, buildWhatsAppMessage, openWhatsApp } from "@/lib/utils";
import { showToast } from "./Toast";

declare global {
  interface Window {
    snap: {
      pay: (token: string, options: object) => void;
    };
  }
}

export default function CartFloat() {
  const { items, count, total, removeItem, changeQty, clearCart, isOpen, openCart, closeCart } = useCartStore();
  const cartCount = count();
  const cartTotal = total();

  const [checkoutStep, setCheckoutStep] = useState<"cart" | "form" | "loading">("cart");
  const [customer, setCustomer] = useState({ name: "", phone: "", email: "" });

  // ── Checkout via Midtrans ──────────────────────────
  async function handleMidtransCheckout() {
    if (!customer.name || !customer.phone) {
      showToast("Isi nama dan nomor HP dulu ya!");
      return;
    }

    setCheckoutStep("loading");

    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, customer }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Gagal membuat order");

      // Snap.js sudah di-inject via layout.tsx
      window.snap.pay(data.token, {
        onSuccess: () => {
          showToast("Pembayaran berhasil! Terima kasih 🎉");
          clearCart();
          closeCart();
          setCheckoutStep("cart");
        },
        onPending: () => {
          showToast("Menunggu pembayaran...");
          setCheckoutStep("cart");
        },
        onError: () => {
          showToast("Pembayaran gagal. Coba lagi ya.");
          setCheckoutStep("form");
        },
        onClose: () => {
          setCheckoutStep("form");
        },
      });
    } catch (err) {
      console.error(err);
      showToast("Terjadi kesalahan. Coba lagi.");
      setCheckoutStep("form");
    }
  }

  // ── Checkout via WhatsApp (fallback) ───────────────
  function handleWhatsAppCheckout() {
    const msg = buildWhatsAppMessage(items, cartTotal);
    openWhatsApp(process.env.NEXT_PUBLIC_WA_NUMBER || "6281234567890", msg);
  }

  if (!isOpen) {
    return (
      <div id="cart-float" className={cartCount > 0 ? "visible" : ""}>
        <div className="cart-btn" onClick={openCart}>
          <span>🛒 Keranjang</span>
          <div className="cart-badge" id="cartCount">{cartCount}</div>
          <span style={{ fontSize: "13px", opacity: 0.85 }}>{formatRupiah(cartTotal)}</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)",
          zIndex: 999, backdropFilter: "blur(2px)",
        }}
      />

      {/* Modal */}
      <div style={{
        position: "fixed", bottom: 0, right: 0, left: 0,
        maxWidth: "480px", margin: "0 auto",
        background: "var(--espresso)",
        borderRadius: "20px 20px 0 0",
        zIndex: 1000,
        maxHeight: "90vh",
        display: "flex", flexDirection: "column",
        boxShadow: "0 -8px 40px rgba(0,0,0,0.4)",
      }}>
        {/* Header */}
   <div style={{
  display: "flex", justifyContent: "space-between", alignItems: "center",
  padding: "20px 24px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)",
  flexShrink: 0,
}}>
  <span style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800, fontSize: "18px", color: "var(--cream)" }}>
    {checkoutStep === "form" ? "Detail Pemesan" : `🛒 Keranjang (${cartCount})`}
  </span>

  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
    {/* Tombol Kosongkan — hanya muncul di step cart dan ada isinya */}
    {checkoutStep === "cart" && items.length > 0 && (
      <button
        onClick={() => {
          if (confirm("Kosongkan semua keranjang?")) clearCart();
        }}
        style={{
          background: "none", border: "none",
          color: "rgba(245,236,215,0.4)", fontSize: "12px",
          fontFamily: "Nunito, sans-serif", fontWeight: 700,
          cursor: "pointer", textDecoration: "underline",
          transition: "color 0.2s",
        }}
        onMouseEnter={e => (e.currentTarget.style.color = "#ff6b6b")}
        onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,236,215,0.4)")}
      >
        Kosongkan keranjang
      </button>
    )}

    <button
      onClick={() => { checkoutStep === "form" ? setCheckoutStep("cart") : closeCart(); }}
      style={{ background: "none", border: "none", color: "var(--cream)", fontSize: "22px", cursor: "pointer", opacity: 0.6 }}
    >
      {checkoutStep === "form" ? "←" : "✕"}
    </button>
  </div>
</div>

        {/* Body */}
        <div style={{ overflowY: "auto", flex: 1, padding: "16px 24px" }}>

          {/* STEP: CART */}
          {checkoutStep === "cart" && (
            <>
              {items.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 0", color: "rgba(245,236,215,0.5)", fontSize: "15px" }}>
                  Keranjang kosong.<br />Yuk tambah menu dulu!
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.name} style={{
                    display: "flex", alignItems: "center", gap: "12px",
                    padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, color: "var(--cream)", fontSize: "14px" }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: "13px", color: "var(--orange-lt)", marginTop: "2px" }}>
                        {formatRupiah(item.price)}
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <button
                        onClick={() => changeQty(item.name, -1)}
                        style={qtyBtnStyle}
                      >−</button>
                      <span style={{ color: "var(--cream)", fontWeight: 700, minWidth: "20px", textAlign: "center" }}>
                        {item.qty}
                      </span>
                      <button
                        onClick={() => changeQty(item.name, 1)}
                        style={{ ...qtyBtnStyle, background: "var(--orange)" }}
                      >+</button>
                    </div>
                    <div style={{ color: "var(--cream)", fontWeight: 700, fontSize: "13px", minWidth: "70px", textAlign: "right" }}>
                      {formatRupiah(item.price * item.qty)}
                    </div>
                  </div>
                ))
              )}
            </>
          )}

          {/* STEP: FORM */}
          {checkoutStep === "form" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <p style={{ fontSize: "13px", color: "rgba(245,236,215,0.6)", margin: 0 }}>
                Data ini dipakai untuk konfirmasi order kamu.
              </p>
              {[
                { label: "Nama *", key: "name", type: "text", placeholder: "Nama lengkap" },
                { label: "No. HP *", key: "phone", type: "tel", placeholder: "08xxxxxxxxxx" },
                { label: "Email (opsional)", key: "email", type: "email", placeholder: "email@kamu.com" },
              ].map((field) => (
                <div key={field.key}>
                  <label style={{ fontSize: "12px", color: "rgba(245,236,215,0.6)", display: "block", marginBottom: "6px" }}>
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={customer[field.key as keyof typeof customer]}
                    onChange={(e) => setCustomer({ ...customer, [field.key]: e.target.value })}
                    style={inputStyle}
                  />
                </div>
              ))}
              <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "12px", padding: "14px 16px", marginTop: "8px" }}>
                <div style={{ fontSize: "13px", color: "rgba(245,236,215,0.6)", marginBottom: "8px" }}>Ringkasan:</div>
                {items.map((i) => (
                  <div key={i.name} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "var(--cream)", marginBottom: "4px" }}>
                    <span>{i.qty}x {i.name}</span>
                    <span>{formatRupiah(i.price * i.qty)}</span>
                  </div>
                ))}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: "8px", paddingTop: "8px", display: "flex", justifyContent: "space-between", fontWeight: 800, color: "var(--cream)" }}>
                  <span>Total</span>
                  <span style={{ color: "var(--orange-lt)" }}>{formatRupiah(cartTotal)}</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP: LOADING */}
          {checkoutStep === "loading" && (
            <div style={{ textAlign: "center", padding: "40px 0", color: "var(--cream)" }}>
              <div style={{ fontSize: "32px", marginBottom: "12px" }}>⏳</div>
              <div style={{ fontWeight: 700 }}>Memproses order...</div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {checkoutStep !== "loading" && items.length > 0 && (
          <div style={{
            padding: "16px 24px 24px", borderTop: "1px solid rgba(255,255,255,0.08)",
            flexShrink: 0, display: "flex", flexDirection: "column", gap: "10px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <span style={{ color: "rgba(245,236,215,0.6)", fontSize: "14px" }}>Total</span>
              <span style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800, fontSize: "18px", color: "var(--orange-lt)" }}>
                {formatRupiah(cartTotal)}
              </span>
            </div>

            {checkoutStep === "cart" && (
              <>
                <button
                  className="btn btn-primary"
                  style={{ width: "100%", justifyContent: "center", fontSize: "15px", padding: "14px" }}
                  onClick={() => setCheckoutStep("form")}
                >
                  Bayar via Midtrans (QRIS / Transfer / E-wallet)
                </button>
                <button
                  onClick={handleWhatsAppCheckout}
                  style={{
                    width: "100%", padding: "12px", borderRadius: "100px",
                    background: "#25D366", color: "#fff", border: "none",
                    fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  💬 Order via WhatsApp
                </button>
              </>
            )}

            {checkoutStep === "form" && (
              <button
                className="btn btn-primary"
                style={{ width: "100%", justifyContent: "center", fontSize: "15px", padding: "14px" }}
                onClick={handleMidtransCheckout}
              >
                Bayar Sekarang →
              </button>
            )}
          </div>
        )}
      </div>

      {/* Float button masih tampil saat modal buka (hidden di mobile) */}
      <div id="cart-float" className="visible" style={{ display: "none" }}>
        <div className="cart-btn">
          <span>🛒</span>
          <div className="cart-badge">{cartCount}</div>
          <span style={{ fontSize: "13px" }}>{formatRupiah(cartTotal)}</span>
        </div>
      </div>
    </>
  );
}

// ── Styles ───────────────────────────────────────────

const qtyBtnStyle: React.CSSProperties = {
  width: "28px", height: "28px", borderRadius: "50%",
  background: "rgba(255,255,255,0.1)", border: "none",
  color: "var(--cream)", fontSize: "16px", cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center",
  fontFamily: "Nunito, sans-serif", fontWeight: 800,
};

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "12px 16px",
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: "12px", color: "var(--cream)",
  fontSize: "14px", fontFamily: "Nunito Sans, sans-serif",
  outline: "none", boxSizing: "border-box",
};
