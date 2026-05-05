import type { Metadata } from "next";
import type { SiteData } from "@/lib/types";
import data from "@/data/data.json";
import PageHero from "@/components/PageHero";
import ReviewsSection from "@/components/ReviewsSection";
import ScrollFadeIn from "@/components/ScrollFadeIn";

export const metadata: Metadata = {
  title: "Ulasan Pelanggan — Karasa",
  description: "Real customers, real reactions. Baca ulasan pelanggan Karasa dari GoFood dan GrabFood.",
};

const { reviews } = data as SiteData;

export default function UlasanPage() {
  return (
    <>
      <PageHero
        title="Kata Pelanggan Karasa"
        desc="Real customers, real reactions. Nggak ada yang direkayasa — ini pengalaman nyata dari orang-orang yang udah cobain Karasa."
        breadcrumb="Ulasan"
      />

      <section className="ulasan-page section">
        <div className="container">
          <ReviewsSection reviews={reviews} />

          <ScrollFadeIn style={{ marginTop: "48px", textAlign: "center" }}>
            <p style={{ fontSize: "15px", color: "var(--text-muted)", marginBottom: "16px" }}>
              Sudah pernah cobain Karasa? Tinggalkan ulasanmu!
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href={process.env.NEXT_PUBLIC_GOFOOD_URL || "#"}
                target="_blank"
                rel="noopener"
                className="btn btn-primary"
                style={{ fontSize: "14px" }}
              >
                Tulis di GoFood
              </a>
              <a
                href={process.env.NEXT_PUBLIC_GRABFOOD_URL || "#"}
                target="_blank"
                rel="noopener"
                className="btn btn-ghost"
                style={{ fontSize: "14px" }}
              >
                Tulis di GrabFood
              </a>
            </div>
          </ScrollFadeIn>
        </div>
      </section>
    </>
  );
}
