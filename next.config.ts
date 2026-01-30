import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Let Next.js/Netlify optimize images (WebP, responsive sizes) for faster loads
    unoptimized: false,
  },
};

export default nextConfig;
