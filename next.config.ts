import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Gambar dari domain eksternal jika nanti pakai CDN
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
