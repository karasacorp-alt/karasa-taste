// app/api/stok/route.ts
//
// GET /api/stok
// Fetch stok produk dari Google Sheets (sheet: Dashboard)
// Return: { "Siomay Seafood": "tersedia", "Bakso Urat": "habis", ... }

import { NextResponse } from "next/server";

const SHEET_ID = process.env.GOOGLE_SHEETS_ID!;
const SHEET_NAME = "Dashboard";

// Kolom yang dipakai (sesuai struktur sheet kamu):
// B = Nama Produk
// G = Stok Sisa (pcs)
// H = Status

export async function GET() {
  try {
    // Ambil kolom B (nama), G (stok sisa), H (status)
    // Range B8:H sampai bawah (mulai baris 8 karena header di baris 7)
    const range = encodeURIComponent(`${SHEET_NAME}!B8:H200`);
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&range=${range}`;

    const res = await fetch(url, { next: { revalidate: 60 } }); // cache 60 detik
    if (!res.ok) throw new Error("Gagal fetch Google Sheets");

    const text = await res.text();

    // Google Sheets gviz response dibungkus: google.visualization.Query.setResponse({...})
    const jsonStr = text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1);
    const json = JSON.parse(jsonStr);

    const rows = json.table?.rows ?? [];

    // Bangun map: { "Nama Produk": status }
    const stokMap: Record<string, { stok: number; status: string }> = {};

    for (const row of rows) {
      const cells = row.c;
      if (!cells || !cells[0]?.v) continue; // skip baris kosong

      const namaProduk = String(cells[0].v).trim();   // kolom B
      const stokSisa   = Number(cells[4]?.v ?? 0);    // kolom G (index 5 dari B)
      const statusRaw  = String(cells[6]?.v ?? "");   // kolom H (index 6 dari B)

      // Normalisasi status
      let status = "tersedia";
      if (statusRaw.includes("HABIS") || stokSisa <= 0) {
        status = "habis";
      } else if (stokSisa <= 10) {
        status = "terbatas";
      }

      stokMap[namaProduk] = { stok: stokSisa, status };
    }

    return NextResponse.json(stokMap, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120" },
    });
  } catch (error) {
    console.error("[stok] Error:", error);
    return NextResponse.json({ error: "Gagal ambil data stok" }, { status: 500 });
  }
}
