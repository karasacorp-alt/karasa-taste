# 🍽️ Karasa Corp — Next.js

Website Karasa yang sudah diupgrade dari static HTML/CSS/JS ke **Next.js 15** dengan integrasi **Midtrans** payment gateway, siap deploy ke **Vercel**.

---

## 🗂️ Struktur Proyek

```
karasa-nextjs/
├── app/
│   ├── layout.tsx            ← Root layout (Nav, Footer, Cart, Toast)
│   ├── page.tsx              ← Beranda (/)
│   ├── globals.css           ← Semua CSS (diconvert dari style.css)
│   ├── menu/page.tsx         ← Halaman Menu (/menu)
│   ├── paket/page.tsx        ← Halaman Paket (/paket)
│   ├── ulasan/page.tsx       ← Halaman Ulasan (/ulasan)
│   ├── lokasi/page.tsx       ← Halaman Lokasi (/lokasi)
│   └── api/
│       ├── create-order/     ← POST: generate Midtrans token
│       └── webhook/          ← POST: terima notif pembayaran
│
├── components/
│   ├── Navbar.tsx            ← Navigasi (client, responsive)
│   ├── Footer.tsx            ← Footer
│   ├── CartFloat.tsx         ← Tombol cart + modal checkout
│   ├── Toast.tsx             ← Notifikasi pop-up
│   ├── MenuCard.tsx          ← Card menu individual
│   ├── HomeMenuTabs.tsx      ← Tab filter di beranda
│   ├── MenuPageClient.tsx    ← Sidebar + search di halaman menu
│   ├── PaketPageClient.tsx   ← Grid paket + tabel perbandingan
│   ├── ReviewsSection.tsx    ← Rating + kartu ulasan
│   ├── LocationsSection.tsx  ← Kartu lokasi booth
│   ├── PageHero.tsx          ← Header halaman dalam
│   ├── StripTicker.tsx       ← Teks berjalan di bawah hero
│   └── ScrollFadeIn.tsx      ← Wrapper animasi fade-in
│
├── lib/
│   ├── types.ts              ← Semua TypeScript interfaces
│   ├── store.ts              ← Zustand cart store
│   ├── midtrans.ts           ← Konfigurasi Midtrans (server only)
│   └── utils.ts              ← Helper: formatRupiah, WhatsApp, dll
│
├── data/
│   ├── data.json             ← Data utama (menu, paket, ulasan, lokasi)
│   └── menu.json             ← Data menu tambahan
│
├── public/
│   └── herodimsum.avif       ← Foto hero
│
├── .env.example              ← Template environment variables
└── .gitignore
```

---

## 🚀 Setup Lokal

### 1. Install dependencies

```bash
npm install
```

### 2. Setup environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` dengan data yang benar:

```env
MIDTRANS_SERVER_KEY=SB-Mid-server-xxxx   # dari dashboard Midtrans
MIDTRANS_CLIENT_KEY=SB-Mid-client-xxxx
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=SB-Mid-client-xxxx
MIDTRANS_IS_PRODUCTION=false             # false = sandbox/testing

NEXT_PUBLIC_WA_NUMBER=6281234567890
NEXT_PUBLIC_GOFOOD_URL=https://gofood.co.id/...
NEXT_PUBLIC_GRABFOOD_URL=https://grab.com/...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Jalankan development server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

---

## 💳 Setup Midtrans

### Daftar & Dapatkan API Key

1. Daftar di [dashboard.midtrans.com](https://dashboard.midtrans.com)
2. Pilih mode **Sandbox** untuk testing
3. Settings → Access Keys → salin **Server Key** dan **Client Key**
4. Tempel ke `.env.local`

### Setup Webhook (setelah deploy)

1. Dashboard Midtrans → Settings → Configuration
2. **Payment Notification URL**: `https://domain-kamu.vercel.app/api/webhook`
3. Klik Save

### Testing Pembayaran

Gunakan nomor kartu test dari [dokumentasi Midtrans](https://docs.midtrans.com/reference/testing-payment):
- GoPay Simulator tersedia di popup Snap
- Untuk QRIS, scan QR yang muncul di simulator

---

## 🌐 Deploy ke Vercel

### Cara paling mudah:

1. Push ke GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: initial Next.js conversion"
   git remote add origin https://github.com/username/karasa-corp.git
   git push -u origin main
   ```

2. Buka [vercel.com](https://vercel.com) → Import Git Repository

3. Di Vercel, tambahkan environment variables (sama seperti `.env.local`)

4. Deploy otomatis ✅

---

## 📋 Fase Selanjutnya (Roadmap)

| Fase | Fitur | Status |
|------|-------|--------|
| ✅ Fase 1 | Konversi ke Next.js + Midtrans integration | **Selesai** |
| 🔲 Fase 2 | Database order (Prisma + Supabase/PlanetScale) | Belum |
| 🔲 Fase 3 | Admin dashboard (lihat order masuk) | Belum |
| 🔲 Fase 4 | Notifikasi WhatsApp otomatis (Fonnte/WA Cloud API) | Belum |
| 🔲 Fase 5 | Loyalty program / voucher | Belum |

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| State | Zustand (persist) |
| Payment | Midtrans Snap |
| Styling | CSS Modules (globals.css) |
| Font | Nunito + Nunito Sans (Google Fonts) |
| Deploy | Vercel |

---

**Karasa Corp** · Rasanya? Beneran Kerasa. ✦
