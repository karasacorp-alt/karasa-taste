// ─────────────────────────────────────────────────────
// lib/utils.ts — Helper functions
// ─────────────────────────────────────────────────────

/** Format angka ke Rupiah: 25000 → "Rp 25.000" */
export function formatRupiah(amount: number): string {
  return "Rp " + amount.toLocaleString("id-ID");
}

/** Buat pesan WhatsApp dari isi cart */
export function buildWhatsAppMessage(
  items: { name: string; price: number; qty: number }[],
  total: number
): string {
  const lines = items.map(
    (i) => `• ${i.qty}x ${i.name} — ${formatRupiah(i.price * i.qty)}`
  );
  lines.push("", `*Total: ${formatRupiah(total)}*`);
  return encodeURIComponent(
    `Halo Karasa! Saya mau order:\n\n${lines.join("\n")}`
  );
}

/** Buka WhatsApp dengan pesan order */
export function openWhatsApp(
  waNumber: string,
  message: string
): void {
  window.open(`https://wa.me/${waNumber}?text=${message}`, "_blank");
}

/** Generate order ID unik untuk Midtrans */
export function generateOrderId(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `KARASA-${ts}-${rand}`;
}
