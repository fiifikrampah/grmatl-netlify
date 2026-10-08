import type { Metadata } from 'next'
import { Cinzel, Cormorant_Garamond } from 'next/font/google'

const galaTitle = Cinzel({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-gala-title',
  display: 'swap',
})

const galaDisplay = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-gala-display',
  display: 'swap',
})

const title = 'Church Gala 2026 | Great Redemption Ministries'
const description = 'Register for our church gala on Saturday, November 28, 2026. Celebrate God’s faithfulness and the beauty of our nations with food, fellowship, and celebration.'
const flyer = '/images/events/flyers/church-gala-2026-teaser.webp'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/events/church-gala' },
  openGraph: {
    title,
    description,
    url: '/events/church-gala',
    images: [{ url: flyer, width: 1024, height: 1536, alt: 'Church Gala 2026 — Saturday, November 28, 2026' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: [flyer] },
}

export default function ChurchGalaLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${galaTitle.variable} ${galaDisplay.variable}`}>{children}</div>
}
