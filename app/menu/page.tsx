import type { Metadata } from "next";
import type { SiteData } from "@/lib/types";
import data from "@/data/data.json";
import PageHero from "@/components/PageHero";
import MenuPageClient from "@/components/MenuPageClient";

export const metadata: Metadata = {
  title: "Menu — Karasa",
  description: "Semua menu Karasa: dimsum, bakso, kebab, cemilan, dan coklat. Dibuat fresh setiap hari.",
};

const { menu } = data as SiteData;

export default function MenuPage() {
  return (
    <>
      <PageHero
        title="Menu Karasa"
        desc="Semua yang ada di sini dibuat fresh. Pilih sesukamu — dari dimsum sampai coklat, semuanya kerasa."
        breadcrumb="Menu"
      />

      <div className="menu-page section">
        <div className="container">
          <MenuPageClient items={menu} />
        </div>
      </div>

      {/* Order CTA */}
      <section style={{ padding: "0 0 80px" }}>
        <div className="container">
          <div className="order-inner fade-in in-view">
            <div>
              <h2 className="display order-title">Siap pesan?</h2>
              <p className="order-sub">Order lewat GoFood, GrabFood, atau langsung ke booth.</p>
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
