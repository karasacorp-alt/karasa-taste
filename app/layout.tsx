import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartFloat from "@/components/CartFloat";
import Toast from "@/components/Toast";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Karasa — Rasanya? Beneran Kerasa.",
  description:
    "Dimsum, bakso, kebab, cemilan, dan coklat. Booth Karasa ada di Cimahi & Bandung.",
  openGraph: {
    title: "Karasa — Rasanya? Beneran Kerasa.",
    description: "Makanan yang beneran kerasa. Order online via GoFood, GrabFood, atau langsung ke booth.",
    images: ["/herodimsum.avif"],
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
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=Nunito+Sans:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        {/* Midtrans Snap.js — dibutuhkan untuk popup pembayaran */}
        <Script
          src={snapUrl}
          data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CartFloat />
        <Toast />
      </body>
    </html>
  );
}
