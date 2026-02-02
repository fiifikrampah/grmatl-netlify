import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap", // Show text immediately with fallback, then swap when font loads
});

export const metadata: Metadata = {
  title: "Great Redemption Ministries | Church in Atlanta",
  description: "At Great Redemption Ministries, we know that inspiration opens hearts. Join our diverse congregation in Atlanta for worship, prayer, and spiritual growth.",
  keywords: "Church, God, Christianity, Spiritual, Atlanta, Worship, Sermon, Great Redemption Ministries",
  authors: [{ name: "Great Redemption Ministries" }],
  creator: "Great Redemption Ministries",
  publisher: "Great Redemption Ministries",
  metadataBase: new URL("https://grmatl.org"),
  openGraph: {
    title: "Great Redemption Ministries | Church in Atlanta",
    description: "Join our diverse congregation for worship, prayer, and spiritual growth in Atlanta.",
    url: "https://grmatl.org",
    siteName: "Great Redemption Ministries",
    images: [
      {
        url: "/images/previews/main-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Great Redemption Ministries Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Great Redemption Ministries | Church in Atlanta",
    description: "Join our diverse congregation for worship, prayer, and spiritual growth in Atlanta.",
    images: ["/images/previews/main-preview.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://medium.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="icon" href="/images/favicon/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/images/favicon/site.webmanifest" />
        <meta name="theme-color" content="#1B5299" />
      </head>
      <body
        className={`${manrope.variable} font-sans antialiased bg-white text-gray-900 overflow-x-hidden`}
      >
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
