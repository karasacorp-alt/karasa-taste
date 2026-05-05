import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-inner">
          <div>
            <div className="footer-logo">
              <div className="footer-logo-badge"><span>K</span></div>
              <span className="footer-logo-name">KARASA</span>
            </div>
            <p className="footer-desc">
              Makanan yang beneran kerasa. Dimsum, bakso, kebab, cemilan, dan coklat untuk semua kalangan.
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
          <span className="footer-copy">© 2025 Karasa. All rights reserved.</span>
          <span className="footer-tagline">Rasanya? Beneran Kerasa. ✦</span>
        </div>
      </div>
    </footer>
  );
}
