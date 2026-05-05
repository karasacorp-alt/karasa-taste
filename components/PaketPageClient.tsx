"use client";

import type { Bundle } from "@/lib/types";
import { useCartStore } from "@/lib/store";
import { formatRupiah } from "@/lib/utils";
import { showToast } from "./Toast";

export default function PaketPageClient({ bundles }: { bundles: Bundle[] }) {
  const { addItem, openCart } = useCartStore();

  function handleOrder(bundle: Bundle) {
    addItem(bundle.name, bundle.priceNum);
    showToast(`${bundle.name} ditambahkan ke keranjang!`);
    openCart();
  }

  const featured = bundles.find((b) => b.featured);

  return (
    <>
      {/* Featured Banner */}
      {featured && (
        <div className="fade-in in-view" style={{ marginBottom: "48px" }}>
          <div
            className="bundle-card featured"
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}
          >
            <div>
              {featured.tag && (
                <div className="tag tag-cream" style={{ marginBottom: "10px" }}>{featured.tag}</div>
              )}
              <div className="bundle-card-name" style={{ fontSize: "clamp(18px,2.5vw,24px)" }}>
                {featured.emoji} {featured.name}
              </div>
              <div className="bundle-card-desc">{featured.desc}</div>
              <ul style={{ margin: "10px 0 0", paddingLeft: "18px", color: "rgba(245,236,215,0.7)", fontSize: "13px" }}>
                {featured.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="bundle-card-price">{featured.price}</div>
              {featured.save && <div className="bundle-save">{featured.save}</div>}
              <button
                className="btn btn-cream"
                style={{ marginTop: "12px" }}
                onClick={() => handleOrder(featured)}
              >
                Pesan Sekarang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Section Label */}
      <div className="paket-section-label fade-in in-view">
        <span className="paket-section-label-text">Semua Paket</span>
        <div className="paket-section-label-line" />
      </div>

      {/* Grid */}
      <div className="paket-grid fade-in in-view">
        {bundles.map((b) => (
          <div
            key={b.id}
            className={`paket-card${b.featured ? " paket-card--featured" : ""}`}
            style={{
              background: b.featured ? "var(--orange)" : "var(--espresso)",
              borderRadius: "var(--radius-xl)",
              padding: "28px",
              display: "flex", flexDirection: "column", gap: "16px",
              border: b.featured ? "none" : "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {b.tag && (
              <span className="tag tag-cream">{b.tag}</span>
            )}
            <div>
              <div style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800, fontSize: "20px", color: "var(--cream)" }}>
                {b.emoji} {b.name}
              </div>
              <p style={{ fontSize: "13px", color: "rgba(245,236,215,0.65)", marginTop: "6px" }}>{b.desc}</p>
            </div>
            <ul style={{ paddingLeft: "16px", color: "rgba(245,236,215,0.75)", fontSize: "13px", lineHeight: 2 }}>
              {b.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <div style={{ marginTop: "auto" }}>
              <div style={{ fontFamily: "Nunito, sans-serif", fontWeight: 900, fontSize: "22px", color: "var(--cream)" }}>
                {b.price}
              </div>
              {b.save && (
                <div style={{ fontSize: "12px", color: "rgba(245,236,215,0.6)", marginTop: "2px" }}>{b.save}</div>
              )}
            </div>
            <button
              className={`btn ${b.featured ? "btn-cream" : "btn-ghost-light"}`}
              style={{ width: "100%", justifyContent: "center" }}
              onClick={() => handleOrder(b)}
            >
              Pesan Paket Ini
            </button>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="paket-section-label fade-in in-view" style={{ marginTop: "56px" }}>
        <span className="paket-section-label-text">Perbandingan Paket</span>
        <div className="paket-section-label-line" />
      </div>

      <div className="paket-compare fade-in in-view">
        <div className="paket-compare-title">Bingung milih yang mana?</div>
        <div className="paket-compare-sub">Bandingkan isi paket sebelum order — biar nggak nyesel.</div>
        <div style={{ overflowX: "auto" }}>
          <table className="compare-table">
            <thead>
              <tr>
                <th>Paket</th>
                <th>Dimsum</th>
                <th>Kebab</th>
                <th>Minuman</th>
                <th>Cemilan</th>
                <th>Porsi</th>
                <th>Harga</th>
              </tr>
            </thead>
            <tbody>
              {bundles.map((b) => (
                <tr key={b.id} className={b.featured ? "compare-row-featured" : ""}>
                  <td style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700 }}>{b.name}</td>
                  <td>{b.compare.dimsum}</td>
                  <td>{b.compare.kebab}</td>
                  <td>{b.compare.minuman}</td>
                  <td>{b.compare.cemilan}</td>
                  <td>{b.compare.porsi}</td>
                  <td style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800 }}>{b.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
