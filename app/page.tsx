import Image from "next/image";
import Link from "next/link";
import type { SiteData } from "@/lib/types";
import data from "@/data/data.json";
import MenuCard from "@/components/MenuCard";
import StripTicker from "@/components/StripTicker";
import ReviewsSection from "@/components/ReviewsSection";
import LocationsSection from "@/components/LocationsSection";
import ScrollFadeIn from "@/components/ScrollFadeIn";

const siteData = data as SiteData;
const { hero, strip, menu, bundles, reviews, locations } = siteData;

export default function HomePage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section id="hero" className="has-bg-image">
        <Image
          src={`/${hero.bgImage}`}
          alt="Dimsum Karasa"
          fill
          priority
          style={{ objectFit: "cover", opacity: 0.18 }}
        />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="hero-inner">
            <ScrollFadeIn>
              <div className="hero-eyebrow">
                <div className="hero-dot" />
                <span className="hero-eyebrow-text">{hero.eyebrow}</span>
              </div>
              <h1 className="display hero-title">
                Makanan yang<br />beneran <span className="highlight">kerasa.</span>
              </h1>
              <p className="hero-desc">
                Dimsum, bakso, kebab, cemilan, dan coklat. Semua dibuat buat kamu yang nggak mau kompromi soal rasa.
              </p>
              <div className="hero-ctas">
                <Link className="btn btn-primary" href="/menu">Lihat Menu</Link>
                <Link className="btn btn-ghost-light" href="/lokasi">Cari Booth</Link>
              </div>
              <div className="hero-stats" id="heroStats">
                {hero.stats.map((s) => (
                  <div key={s.label}>
                    <div className="hero-stat-num">{s.num}</div>
                    <div className="hero-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </ScrollFadeIn>

            <ScrollFadeIn delay={150} className="hero-cards">
              {hero.foodCards.map((card) => (
                <Link
              key={card.name}
              href={`/menu?cat=${card.name.toLowerCase()}`}
              className={`food-card${card.accent ? " accent" : ""}`}
              style={{ textDecoration: "none", cursor: "pointer" }}
            >
              <span className="food-card-emoji">{card.emoji}</span>
              <div className="food-card-name">{card.name}</div>
              <div className="food-card-sub">{card.sub}</div>
            </Link>
          ))}
              <div className="hero-promo">
                <div>
                  <div className="hero-promo-info">
                    {hero.promo.icon} {hero.promo.title}
                  </div>
                  <div className="hero-promo-sub">{hero.promo.sub}</div>
                </div>
                <div className="hero-promo-price">{hero.promo.price}</div>
              </div>
            </ScrollFadeIn>
          </div>
        </div>
      </section>

      {/* ═══ STRIP ═══ */}
      <StripTicker items={strip} />

      {/* ═══ MENU ═══ */}
      <section id="menu" className="section">
        <div className="container">
          <ScrollFadeIn className="section-header">
            <div>
              <p className="label">Menu kami</p>
              <h2 className="display section-title">Yang paling sering dipesan</h2>
            </div>
            <Link className="btn btn-ghost" href="#order">Order via App</Link>
          </ScrollFadeIn>

      
          <HomeMenuTabs items={menu.slice(0, 8)} />

          <div style={{ textAlign: "center", marginTop: "32px" }}>
          <Link className="btn btn-ghost" href="/menu">
         Lihat semua {menu.length} menu →
          </Link>
          </div>

        </div>
      </section>

      {/* ═══ BUNDLES ═══ */}
      <section id="bundles" className="section">
        <div className="container">
          <div className="bundles-inner">
            <ScrollFadeIn>
              <p className="label" style={{ color: "#E87D40" }}>Paket hemat</p>
              <h2 className="display" style={{ fontSize: "clamp(28px,3vw,40px)", color: "var(--cream)", marginTop: "8px" }}>
                Makin banyak,<br />makin kerasa hemat.
              </h2>
              <p className="bundle-subtitle">
                Semua paket dirancang biar kamu nggak perlu mikir lama. Pilih satu, langsung puas.
              </p>
            </ScrollFadeIn>

            <ScrollFadeIn className="bundle-list">
              {bundles.map((b) => (
                <Link
                  key={b.id}
                  href="/paket"
                  className={`bundle-card ${b.featured ? "featured" : "regular"}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="bundle-card-left">
                    <div className="bundle-card-name">{b.emoji} {b.name}</div>
                    <div className="bundle-card-desc">{b.desc}</div>
                    {b.save && <div className="bundle-save">{b.save}</div>}
                  </div>
                  <div><div className="bundle-card-price">{b.price}</div></div>
                </Link>
              ))}
            </ScrollFadeIn>
          </div>
        </div>
      </section>

      {/* ═══ REVIEWS ═══ */}
      <section id="reviews" className="section">
        <div className="container">
          <ScrollFadeIn className="section-header">
            <div>
              <p className="label">Ulasan pelanggan</p>
              <h2 className="display section-title">Kata mereka tentang Karasa</h2>
            </div>
          </ScrollFadeIn>
          <ReviewsSection reviews={reviews} />
        </div>
      </section>

      {/* ═══ LOKASI ═══ */}
      <section id="location" className="section">
        <div className="container">
          <ScrollFadeIn className="section-header">
            <div>
              <p className="label">Temukan kami</p>
              <h2 className="display section-title" style={{ marginTop: "8px" }}>Booth Karasa</h2>
            </div>
          </ScrollFadeIn>
          <LocationsSection locations={locations} />
        </div>
      </section>

      {/* ═══ FILOSOFI ═══ */}
      <section id="filosofi" className="section filosofi-section">
        <div className="container">
          <div className="bundles-inner">
            <ScrollFadeIn>
              <p className="label" style={{ color: "#E87D40" }}>Filosofi Kami</p>
              <h2 className="display" style={{ fontSize: "clamp(28px,3vw,40px)", color: "var(--cream)", marginTop: "8px" }}>
                Kami bukan yang paling fancy,<br />Tapi soal rasa, kami <i>serius.</i>
              </h2>
              <p className="bundle-subtitle">
                Karasa ada buat orang yang percaya makanan enak itu hak semua orang — bukan cuma yang punya budget lebih.
              </p>
            </ScrollFadeIn>
            <ScrollFadeIn>
              <p className="filosofi-body">
                Di tengah banyaknya makanan yang tampil keren tapi rasa biasa, Karasa hadir buat orang yang nggak mau kompromi soal rasa. Bahan nggak diirit. Bumbu nggak dipotong. Porsi nggak nanggung. Itu janji kami, tiap hari.
              </p>
            </ScrollFadeIn>
          </div>
        </div>
      </section>

      {/* ═══ ORDER CTA ═══ */}
      <section id="order" className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <ScrollFadeIn className="order-inner">
            <div>
              <h2 className="display order-title">Siap nyobain Karasa?</h2>
              <p className="order-sub">Order online atau langsung ke booth kami.</p>
            </div>
            <div className="order-btns">
              <a className="btn btn-cream" href={process.env.NEXT_PUBLIC_GOFOOD_URL || "#"} target="_blank" rel="noopener">GoFood</a>
              <a className="btn btn-cream" href={process.env.NEXT_PUBLIC_GRABFOOD_URL || "#"} target="_blank" rel="noopener">GrabFood</a>
              <Link className="btn btn-ghost-light" href="/lokasi">Cari Booth</Link>
            </div>
          </ScrollFadeIn>
        </div>
      </section>
    </>
  );
}

// ── Inline client component untuk tabs di homepage ──
import HomeMenuTabs from "@/components/HomeMenuTabs";
