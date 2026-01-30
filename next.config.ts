import type { NextConfig } from "next";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});

const nextConfig: NextConfig = {
  images: {
    // Let Next.js/Netlify optimize images (WebP, responsive sizes) for faster loads
    unoptimized: false,
  },
  experimental: {
    // Shrink bundles: only include lucide-react icons that are actually imported
    optimizePackageImports: ["lucide-react", "react-icons"],
  },
};

export default withBundleAnalyzer(nextConfig);
