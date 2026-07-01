import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartFloat from "@/components/CartFloat";
import Toast from "@/components/Toast";
import { StokProvider } from "@/components/StokProvider";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Karasa Taste — Rasa yang Jujur, dari Tangan yang Peduli.",
  description:
    "Dimsum, bakso, kebab, cemilan, dan coklat. Dibuat dengan bahan sungguhan, dikemas dengan perhatian. Booth Karasa Taste di Cimahi & Bandung.",
  openGraph: {
    title: "Karasa Taste — Rasa yang Jujur, dari Tangan yang Peduli.",
    description: "Bukan tentang mewah. Tentang makanan yang dibuat dengan bahan sungguhan, dikemas dengan perhatian, dikirim dengan niat.",
    images: ["/herokarasa.avif"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const snapUrl =
    process.env.MIDTRANS_IS_PRODUCTION === "true"
      ? "https://app.midtrans.com/snap/snap.js"
      : "https://app.sandbox.midtrans.com/snap/snap.js";

  return (
    <html lang="id">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Outfit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <Script
          src={snapUrl}
          data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
          strategy="beforeInteractive"
        />
      </head>
      <body>
        {/* StokProvider fetch stok sekali, tersedia di semua MenuCard */}
        <StokProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CartFloat />
          <Toast />
        </StokProvider>
      </body>
    </html>
  );
}
