// app/api/webhook/route.ts
//
// POST /api/webhook
// Menerima notifikasi status pembayaran dari Midtrans.
//
// Setup di Midtrans Dashboard:
// Settings → Configuration → Payment Notification URL
// → https://karasa-corp.vercel.app/api/webhook
//
// ⚠️  SELALU verifikasi signature dari Midtrans!
//     Jangan langsung percaya body request tanpa verifikasi.

import { NextRequest, NextResponse } from "next/server";
import { core } from "@/lib/midtrans";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      order_id,
      status_code,
      gross_amount,
      signature_key,
      transaction_status,
      fraud_status,
      payment_type,
    } = body;

    // ── Verifikasi Signature ─────────────────────────
    // Formula: SHA512(order_id + status_code + gross_amount + server_key)
    const expectedSignature = crypto
      .createHash("sha512")
      .update(`${order_id}${status_code}${gross_amount}${process.env.MIDTRANS_SERVER_KEY}`)
      .digest("hex");

    if (signature_key !== expectedSignature) {
      console.warn("[webhook] Signature tidak valid untuk order:", order_id);
      return NextResponse.json({ error: "Signature tidak valid." }, { status: 403 });
    }

    // ── Proses Status Pembayaran ─────────────────────
    // Dokumentasi: https://docs.midtrans.com/reference/transaction-status
    let orderStatus: string;

    if (transaction_status === "capture") {
      orderStatus = fraud_status === "accept" ? "PAID" : "FRAUD";
    } else if (transaction_status === "settlement") {
      orderStatus = "PAID";
    } else if (["cancel", "deny", "expire"].includes(transaction_status)) {
      orderStatus = "CANCELLED";
    } else if (transaction_status === "pending") {
      orderStatus = "PENDING";
    } else {
      orderStatus = "UNKNOWN";
    }

    // ── TODO: Simpan ke database ─────────────────────
    // Ini adalah tempat kamu menyimpan status order ke database.
    // Contoh dengan Prisma (Fase 2):
    //
    // await prisma.order.upsert({
    //   where: { midtransOrderId: order_id },
    //   update: { status: orderStatus, paymentType: payment_type },
    //   create: {
    //     midtransOrderId: order_id,
    //     status: orderStatus,
    //     paymentType: payment_type,
    //     amount: parseInt(gross_amount),
    //   },
    // });

    console.log(`[webhook] Order ${order_id} → ${orderStatus} via ${payment_type}`);

    return NextResponse.json({ status: "OK", order_id, orderStatus });
  } catch (error) {
    console.error("[webhook] Error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
