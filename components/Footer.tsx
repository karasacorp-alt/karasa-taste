import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-inner">
          <div>
            <div className="footer-logo">
              <div className="footer-logo-badge"><span>K</span></div>
  <Image
    src="/Logo-Karasa-Taste.avif"
    alt="Karasa Taste"
    width={130}
    height={36}
    style={{
      objectFit: "contain",
      filter: "brightness(0) invert(1)",
      opacity: 0.8
    }}
  />
</div>
            <p className="footer-desc">
                 Rasa yang jujur, dari tangan yang peduli. Dimsum, bakso, kebab, cemilan, dan coklat untuk semua kalangan.
            </p>
            <p style={{ fontSize: "11px", color: "rgba(247,242,234,0.2)", marginTop: "12px", letterSpacing: "0.05em" }}>
              Bagian dari <span style={{ color: "rgba(247,242,234,0.35)" }}>Karasa Group</span>
            </p>
          </div>
          <div>
            <div className="footer-col-title">Menu</div>
            <Link className="footer-link" href="/menu">Dimsum</Link>
            <Link className="footer-link" href="/menu">Kebab &amp; Bakso</Link>
            <Link className="footer-link" href="/menu">Cemilan</Link>
            <Link className="footer-link" href="/menu">Coklat</Link>
            <Link className="footer-link" href="/paket">Paket Hemat</Link>
          </div>
          <div>
            <div className="footer-col-title">Info</div>
            <Link className="footer-link" href="/lokasi">Lokasi Booth</Link>
            <a className="footer-link" href={process.env.NEXT_PUBLIC_GOFOOD_URL || "#"} target="_blank" rel="noopener">GoFood</a>
            <a className="footer-link" href={process.env.NEXT_PUBLIC_GRABFOOD_URL || "#"} target="_blank" rel="noopener">GrabFood</a>
            <a className="footer-link" href="#" target="_blank" rel="noopener">Instagram</a>
            <a className="footer-link" href="#" target="_blank" rel="noopener">TikTok</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© 2025 Karasa Taste · Karasa Group. All rights reserved.</span>
          <span className="footer-tagline">Rasanya? Beneran Kerasa. ✦</span>
        </div>
      </div>
    </footer>
  );
}
