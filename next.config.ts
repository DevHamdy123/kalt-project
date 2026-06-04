import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "*.githubusercontent.com",
      },
      // التصريح القديم بتاع صور الداشبورد
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
      // التصريح الجديد الخاص بصور المنتجات المرفوعة
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
