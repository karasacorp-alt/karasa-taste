// ─────────────────────────────────────────────────────
// lib/midtrans.ts — Konfigurasi Midtrans (server only)
//
// File ini HANYA dipakai di server (API routes).
// Secret key tidak pernah dikirim ke browser.
// ─────────────────────────────────────────────────────

import MidtransClient from "midtrans-client";

// Snap API — untuk generate popup pembayaran
export const snap = new MidtransClient.Snap({
  isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.MIDTRANS_CLIENT_KEY!,
});

// Core API — untuk cek status & refund (nanti Fase 2)
export const core = new MidtransClient.CoreApi({
  isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.MIDTRANS_CLIENT_KEY!,
});

/**
 * Format harga ke Rupiah
 * Midtrans menerima angka bulat (tidak ada desimal)
 */
export function toMidtransPrice(price: number): number {
  return Math.round(price);
}
