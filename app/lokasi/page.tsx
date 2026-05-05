import type { Metadata } from "next";
import type { SiteData } from "@/lib/types";
import data from "@/data/data.json";
import PageHero from "@/components/PageHero";
import LocationsSection from "@/components/LocationsSection";
import ScrollFadeIn from "@/components/ScrollFadeIn";

export const metadata: Metadata = {
  title: "Lokasi Booth — Karasa",
  description: "Temukan booth Karasa di Cimahi Utara dan Bandung Timur. Buka setiap hari 10.00–21.00.",
};

const { locations } = data as SiteData;

export default function LokasiPage() {
  return (
    <>
      <PageHero
        title="Temukan Booth Karasa"
        desc="Dua booth siap melayani kamu. Datang langsung, makan di tempat, atau order dan ambil sendiri — semua bisa."
        breadcrumb="Lokasi"
      />

      <section className="lokasi-page section">
        <div className="container">
          <LocationsSection locations={locations} />

          {/* Info Jam Buka */}
          <ScrollFadeIn style={{ marginTop: "48px" }}>
            <div style={{
              padding: "28px 32px",
              background: "var(--espresso)",
              borderRadius: "var(--radius-xl)",
            }}>
              <p className="label" style={{ marginBottom: "12px" }}>Info penting</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
                <div>
                  <div style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800, fontSize: "15px", color: "var(--cream)", marginBottom: "4px" }}>
                    📅 Jam Operasional
                  </div>
                  <div style={{ fontSize: "13px", color: "rgba(245,236,215,0.6)", lineHeight: 1.7 }}>
                    Booth Cimahi: Senin–Minggu 10.00–21.00<br />
                    Booth Bandung: Selasa–Minggu 11.00–21.30
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800, fontSize: "15px", color: "var(--cream)", marginBottom: "4px" }}>
                    🛵 Delivery Area
                  </div>
                  <div style={{ fontSize: "13px", color: "rgba(245,236,215,0.6)", lineHeight: 1.7 }}>
                    GoFood &amp; GrabFood tersedia<br />
                    Radius 5–8 km dari booth
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800, fontSize: "15px", color: "var(--cream)", marginBottom: "4px" }}>
                    📞 Ada pertanyaan?
                  </div>
                  <div style={{ fontSize: "13px", color: "rgba(245,236,215,0.6)", lineHeight: 1.7, marginBottom: "10px" }}>
                    Chat langsung ke tim Karasa via WhatsApp
                  </div>
                  <a
                    href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER || "6281234567890"}`}
                    target="_blank"
                    rel="noopener"
                    style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "12px", color: "var(--orange-lt)", textDecoration: "none" }}
                  >
                    Chat WA →
                  </a>
                </div>
              </div>
            </div>
          </ScrollFadeIn>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "0 0 80px" }}>
        <div className="container">
          <div className="order-inner fade-in in-view">
            <div>
              <h2 className="display order-title">Mau order dulu?</h2>
              <p className="order-sub">Order online, nanti ambil di booth terdekat.</p>
            </div>
            <div className="order-btns">
              <a className="btn btn-cream" href={process.env.NEXT_PUBLIC_GOFOOD_URL || "#"} target="_blank" rel="noopener">GoFood</a>
              <a className="btn btn-cream" href={process.env.NEXT_PUBLIC_GRABFOOD_URL || "#"} target="_blank" rel="noopener">GrabFood</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
