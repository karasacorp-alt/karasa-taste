// ─────────────────────────────────────────────────────
// lib/types.ts — Semua tipe data Karasa
// ─────────────────────────────────────────────────────

export interface MenuItem {
  cat: "dimsum" | "bakso" | "bites" | "snack" | "sweet" | "sips" | "kopi" ;
  image?: string;
  portion?: string;
  emoji: string;
  bg: string;
  name: string;
  tag: { label: string; class: string } | null;
  desc: string;
  price: number;
}

export interface Bundle {
  id: string;
  name: string;
  emoji: string;
  desc: string;
  items: string[];
  price: string;
  priceNum: number;
  featured: boolean;
  save: string | null;
  tag: string | null;
  compare: {
    dimsum: string;
    kebab: string;
    minuman: string;
    cemilan: string;
    porsi: string;
  };
}

export interface Review {
  stars: number;
  text: string;
  initials: string;
  name: string;
  platform: string;
}

export interface ReviewSection {
  rating: string;
  count: string;
  platform: string;
  bars: { star: number; pct: number }[];
  cards: Review[];
}

export interface Location {
  name: string;
  address: string;
  hours: string;
}

export interface SiteData {
  hero: {
    bgImage: string;
    eyebrow: string;
    stats: { num: string; label: string }[];
    foodCards: { emoji: string; name: string; sub: string; accent: boolean }[];
    promo: { icon: string; title: string; sub: string; price: string };
  };
  strip: string[];
  menu: MenuItem[];
  bundles: Bundle[];
  reviews: ReviewSection;
  locations: Location[];
}

// ─── Cart ───────────────────────────────────────────

export interface CartItem {
  name: string;
  price: number;
  qty: number;
}

// ─── Midtrans ───────────────────────────────────────

export interface OrderPayload {
  items: CartItem[];
  customer: {
    name: string;
    phone: string;
    email?: string;
  };
}

export interface MidtransSnapToken {
  token: string;
  redirect_url: string;
}
