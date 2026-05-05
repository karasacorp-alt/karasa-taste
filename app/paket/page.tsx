import type { Metadata } from "next";
import type { SiteData } from "@/lib/types";
import data from "@/data/data.json";
import PageHero from "@/components/PageHero";
import PaketPageClient from "@/components/PaketPageClient";

export const metadata: Metadata = {
  title: "Paket Hemat — Karasa",
  description: "Makin banyak, makin kerasa hemat. Pilih paket Karasa yang paling cocok buat kamu.",
};

const { bundles } = data as SiteData;

export default function PaketPage() {
  return (
    <>
      <PageHero
        title="Paket Hemat Karasa"
        desc="Makin banyak, makin kerasa hemat. Pilih paket yang paling cocok buat kamu — atau bawa pulang semuanya."
        breadcrumb="Paket Hemat"
      />

      <div className="paket-page section">
        <div className="container">
          <PaketPageClient bundles={bundles} />

          {/* Tips */}
          <div style={{ marginTop: "48px" }} className="fade-in in-view">
            <div className="paket-tips">
              <div className="paket-tips-title">Tips Pesan Paket</div>
              <div className="paket-tips-grid">
                {[
                  { icon: "👥", title: "Buat 1–2 orang", desc: "Paket Kerasa atau Paket Nampol paling pas. Kenyang, nggak mubazir, harga terjangkau." },
                  { icon: "👨‍👩‍👧‍👦", title: "Buat keluarga / nongkrong", desc: "Paket Rame-Rame sudah include 20 pcs dimsum + 2 kebab + 4 minuman. Cocok buat 3–4 orang." },
                  { icon: "🍫", title: "Suka yang manis?", desc: "Paket Manis bisa jadi penutup atau camilan sore. Coklat lava cup + truffle + es coklat." },
                  { icon: "💬", title: "Custom paket?", desc: "Kamu bisa tanya langsung ke booth atau DM Instagram kami untuk paket custom acara / arisan." },
                ].map((tip) => (
                  <div key={tip.title} className="paket-tip-card">
                    <div className="paket-tip-icon">{tip.icon}</div>
                    <div className="paket-tip-title">{tip.title}</div>
                    <div className="paket-tip-desc">{tip.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <section style={{ padding: "0 0 80px" }}>
        <div className="container">
          <div className="order-inner fade-in in-view">
            <div>
              <h2 className="display order-title">Udah pilih paketnya?</h2>
              <p className="order-sub">Order lewat GoFood, GrabFood, atau langsung ke booth kami.</p>
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
