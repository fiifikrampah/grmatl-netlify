import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
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
        url: "/images/logo.png",
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
    images: ["/images/logo.png"],
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
        <link rel="icon" href="/images/favicon/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/images/favicon/site.webmanifest" />
        <meta name="theme-color" content="#1B5299" />
      </head>
      <body
        className={`${lato.variable} font-sans antialiased bg-white text-gray-900`}
      >
        <Header />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
