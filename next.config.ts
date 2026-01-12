import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimisations pour la production
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
