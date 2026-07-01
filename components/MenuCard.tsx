"use client";

import Image from "next/image";
import { useCartStore } from "@/lib/store";
import { formatRupiah } from "@/lib/utils";
import { showToast } from "./Toast";
import { useStok } from "./StokProvider";
import StokBadge from "./StokBadge";
import type { MenuItem } from "@/lib/types";

export default function MenuCard({ item }: { item: MenuItem }) {
  const { addItem, changeQty, items } = useCartStore();
  const { stok, loading } = useStok();

  const inCart = items.find((i) => i.name === item.name);
  const qty = inCart?.qty ?? 0;

  // Ambil data stok berdasarkan nama produk
  const stokData = stok[item.name];
  const statusStok = loading ? "loading" : (stokData?.status ?? "tersedia") as "tersedia" | "terbatas" | "habis" | "loading";
  const jumlahStok = stokData?.stok;
  const pcsPerPorsi = parseInt(item.portion ?? "1") || 1;
  const maxQty = stokData ? Math.floor(stokData.stok / pcsPerPorsi) : 99;
  const isHabis = statusStok === "habis" || maxQty === 0;

function handleAdd() {
  if (isHabis) return;
  if (qty >= maxQty) {
    showToast(`Maksimal ${maxQty} porsi (stok ${stokData?.stok} pcs)`);
    return;
  }
  addItem(item.name, item.price);
  showToast(`${item.name} ditambahkan!`);
}


  function handleDec() {
    changeQty(item.name, -1);
  }

  return (
    <div
      className={`menu-item visible${isHabis ? " menu-item--habis" : ""}`}
      data-cat={item.cat}
      data-name={item.name}
      data-price={item.price}
    >
      {/* Foto / Emoji area */}
      <div
        className={`menu-item-top ${item.image ? "" : item.bg}`}
        style={{ position: "relative", height: "160px", overflow: "hidden" }}
      >
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            style={{ objectFit: "cover", filter: isHabis ? "grayscale(60%) brightness(0.8)" : "none" }}
          />
        ) : (
          <span className="menu-item-emoji">{item.emoji}</span>
        )}

        {/* Tag badge */}
        {item.tag && (
          <span
            className={`tag ${item.tag.class}`}
            style={{ position: "absolute", top: "10px", left: "10px", zIndex: 1 }}
          >
            {item.tag.label}
          </span>
        )}

        {/* Overlay HABIS */}
        {isHabis && (
          <div style={{
            position: "absolute", inset: 0, zIndex: 2,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.35)",
          }}>
            <span style={{
              background: "rgba(193,68,14,0.9)", color: "#fff",
              fontFamily: "var(--font-body)", fontWeight: 700,
              fontSize: "13px", letterSpacing: "2px",
              padding: "6px 16px", borderRadius: "100px",
              textTransform: "uppercase",
            }}>
              Stok Habis
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="menu-item-body">
        <div className="menu-item-name">{item.name}</div>

        {/* Porsi badge */}
        {item.portion && (
          <div style={{
            display: "inline-block", fontSize: "11px", fontWeight: 700,
            color: "var(--orange)", background: "#FBE9DC",
            borderRadius: "100px", padding: "2px 10px",
            marginBottom: "6px", fontFamily: "var(--font-body)",
          }}>
            {item.portion}
          </div>
        )}

        <div className="menu-item-desc">{item.desc}</div>

        {/* Stok badge */}
        <div style={{ marginTop: "8px" }}>
        <StokBadge
          status={statusStok}
          stok={statusStok !== "habis" ? stokData?.stok : undefined}
          maxPorsi={statusStok !== "habis" && maxQty < 10 ? maxQty : undefined}
        />
        </div>
      </div>

      {/* Footer */}
      <div className="menu-item-footer">
        <div className="menu-item-price" style={{ color: isHabis ? "var(--text-muted)" : "var(--orange)" }}>
          {formatRupiah(item.price)}
        </div>
        <div className="menu-item-footer-right">
          {isHabis ? (
            <button
              disabled
              style={{
                width: "32px", height: "32px", borderRadius: "9px",
                background: "rgba(0,0,0,0.08)", border: "none",
                color: "#ccc", fontSize: "18px", cursor: "not-allowed",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              +
            </button>
          ) : qty === 0 ? (
            <button
              className="add-btn"
              onClick={handleAdd}
              aria-label={`Tambah ${item.name}`}
            >
              +
            </button>
          ) : (
            <div className="menu-qty-ctrl">
              <button className="menu-qty-btn dec" onClick={handleDec}>−</button>
              <span className="menu-qty-num">{qty}</span>
              <button className="menu-qty-btn inc" onClick={handleAdd}>+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
