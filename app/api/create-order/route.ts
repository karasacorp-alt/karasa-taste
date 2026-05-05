// app/api/create-order/route.ts
//
// POST /api/create-order
// Body: { items: CartItem[], customer: { name, phone, email? } }
//
// ⚠️  File ini HANYA jalan di server.
//     Secret key Midtrans tidak pernah terekspos ke browser.

import { NextRequest, NextResponse } from "next/server";
import { snap, toMidtransPrice } from "@/lib/midtrans";
import { generateOrderId } from "@/lib/utils";
import type { OrderPayload } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body: OrderPayload = await req.json();
    const { items, customer } = body;

    // ── Validasi dasar ──────────────────────────────
    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Keranjang kosong." },
        { status: 400 }
      );
    }
    if (!customer?.name || !customer?.phone) {
      return NextResponse.json(
        { error: "Nama dan nomor HP wajib diisi." },
        { status: 400 }
      );
    }

    // ── Hitung total ────────────────────────────────
    const grossAmount = items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    const orderId = generateOrderId();

    // ── Parameter Midtrans ──────────────────────────
    // Dokumentasi lengkap: https://docs.midtrans.com/reference/snap-api
    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: toMidtransPrice(grossAmount),
      },
      customer_details: {
        first_name: customer.name,
        phone: customer.phone,
        email: customer.email || `${customer.phone}@karasa.id`,
      },
      item_details: items.map((item) => ({
        id: item.name.toLowerCase().replace(/\s+/g, "-"),
        price: toMidtransPrice(item.price),
        quantity: item.qty,
        name: item.name,
      })),
      // Aktifkan metode pembayaran yang diinginkan
      // Komentari untuk mengaktifkan semua metode default
      // enabled_payments: ["gopay", "shopeepay", "dana", "ovo", "qris", "bca_va", "bni_va", "bri_va"],
    };

    // ── Generate Snap Token ─────────────────────────
    const transaction = await snap.createTransaction(parameter);

    return NextResponse.json({
      token: transaction.token,
      redirect_url: transaction.redirect_url,
      order_id: orderId,
    });
  } catch (error) {
    console.error("[create-order] Midtrans error:", error);
    return NextResponse.json(
      { error: "Gagal membuat transaksi. Coba lagi." },
      { status: 500 }
    );
  }
}
