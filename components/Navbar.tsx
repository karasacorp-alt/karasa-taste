"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/lib/store";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count, openCart } = useCartStore();
  const cartCount = count();

  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) { setScrolled(true); return; }
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const links = [
    { href: "/", label: "Beranda" },
    { href: "/menu", label: "Menu" },
    { href: "/paket", label: "Paket" },
    { href: "/ulasan", label: "Ulasan" },
    { href: "/lokasi", label: "Lokasi" },
  ];

  return (
    <nav id="navbar" className={scrolled ? "scrolled" : ""}>
      <div className="container">
        <div className="nav-inner">
          <Link className="nav-logo" href="/">
            <div className="nav-logo-badge"><span>K</span></div>
            <span className="nav-logo-name">KARASA</span>
          </Link>

          <div className="nav-links">
            {links.map((l) => (
              <Link
                key={l.href}
                className={`nav-link${pathname === l.href ? " active-page" : ""}`}
                href={l.href}
              >
                {l.label}
              </Link>
            ))}
            <button
              className="btn btn-primary"
              onClick={openCart}
              style={{ padding: "10px 22px", fontSize: "13px" }}
            >
              🛒 Order Sekarang →
            </button>
          </div>

          {/* Mobile: cart count + hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {cartCount > 0 && (
              <button
                className="btn btn-primary"
                onClick={openCart}
                style={{ padding: "7px 13px", fontSize: "12px", display: "none" }}
                id="nav-mobile-order"
              >
                🛒 {cartCount}
              </button>
            )}
            <div
              className={`nav-toggle${mobileOpen ? " is-open" : ""}`}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <span /><span /><span />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`nav-mobile${mobileOpen ? " open" : ""}`}>
        {links.map((l) => (
          <Link
            key={l.href}
            className="nav-link"
            href={l.href}
            onClick={() => setMobileOpen(false)}
          >
            {l.label}
          </Link>
        ))}
        <button
          className="nav-link"
          onClick={() => { setMobileOpen(false); openCart(); }}
          style={{ color: "var(--orange)", fontWeight: 800, background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: "12px 24px" }}
        >
          Order Sekarang →
        </button>
      </div>
    </nav>
  );
}
