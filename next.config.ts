import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co", // izinkan semua domain supabase
      },
    ],
  },
};

export default nextConfig;
