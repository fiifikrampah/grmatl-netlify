import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Gala Registration Received | Great Redemption Ministries',
  alternates: { canonical: '/church-gala/success' },
  robots: { index: false, follow: false },
}

export default function ChurchGalaSuccessPage() {
  return (
    <section className="min-h-[75vh] bg-[#171611] px-5 pb-24 pt-44 text-center text-[#faf7f0] sm:px-8">
      <div className="mx-auto max-w-xl">
        <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-[#d5b36a]/40 bg-[#d5b36a]/10"><Check className="h-8 w-8 text-[#e4c780]" aria-hidden="true" /></div>
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#e4c780]">Registration received</p>
        <h1 className="font-[family-name:var(--font-gala-display)] text-5xl font-medium leading-[1.1] sm:text-6xl">We look forward to celebrating with you.</h1>
        <p className="mt-6 leading-relaxed text-[#d7cdb8]">Thank you for registering for Church Gala 2026. We’ve received your attendance and food allergy details.</p>
        <p className="mt-7 font-semibold"><time dateTime="2026-11-28">Saturday, November 28, 2026</time></p>
        <p className="mt-2 text-sm text-[#d7cdb8]">Time, venue, and more details to follow.</p>
        <Link href="/events" className="mt-9 inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#e4c780] px-7 py-4 text-sm font-semibold text-[#242019] hover:bg-[#f2dca5]">Explore upcoming events<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        <p className="mt-6 text-sm text-[#d7cdb8]">Questions? <Link href="/contact" className="underline underline-offset-4">Contact us</Link>.</p>
      </div>
    </section>
  )
}
