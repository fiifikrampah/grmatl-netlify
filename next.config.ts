import type { NextConfig } from "next";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});

const nextConfig: NextConfig = {
  images: {
    // Images are pre-converted to WebP (scripts/convert-to-webp.mjs); no runtime conversion
    unoptimized: false,
    // Allow quality={92} for crisp/HD images (required in Next.js 16+)
    qualities: [75, 90, 92],
  },
  experimental: {
    // Shrink bundles: only include lucide-react icons that are actually imported
    optimizePackageImports: ["lucide-react", "react-icons"],
  },
};

export default withBundleAnalyzer(nextConfig);
