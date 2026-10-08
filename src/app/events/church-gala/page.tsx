// Church Gala 2026page
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowDown, CalendarDays } from 'lucide-react'
import { getEventBySlug } from '@/lib/events.config'
import GalaRegistrationForm from './GalaRegistrationForm'

export default function ChurchGalaPage() {
  const event = getEventBySlug('church-gala')!

  return (
    <div className="min-h-screen bg-[#faf7f0] text-[#25221c]">
      <section className="relative overflow-hidden bg-[#171611] px-5 pb-20 pt-36 text-[#faf7f0] sm:px-8 md:pb-24 md:pt-44">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(184,139,54,0.17),transparent_65%)]" />
        <div aria-hidden="true" className="absolute -right-24 top-32 h-96 w-96 rotate-45 border border-[#d5b36a]/10" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <Link href="/events" className="mb-12 inline-flex items-center gap-2 text-sm text-[#d7cdb8] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d5b36a]">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />All events
            </Link>
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#d5b36a]">Great Redemption Ministries</p>
            <h1 className="font-[family-name:var(--font-gala-title)] text-5xl font-medium uppercase leading-[1.15] tracking-[0.02em] sm:text-6xl lg:text-7xl">Church Gala <span className="mt-2 block text-[#e4c780]">2026</span></h1>
            <div className="my-8 h-px w-20 bg-[#d5b36a]" aria-hidden="true" />
            <p className="max-w-md font-[family-name:var(--font-gala-display)] text-3xl font-medium italic leading-[1.2] sm:text-4xl">Celebrating God’s faithfulness and the beauty of our nations as a church.</p>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[#d7cdb8]">Join our church family for food, fellowship, and celebration. We look forward to celebrating together.</p>
            <div className="mt-8 flex items-start gap-3">
              <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-[#d5b36a]" aria-hidden="true" />
              <div><p className="font-semibold"><time dateTime="2026-11-28">Saturday, November 28, 2026</time></p><p className="mt-1 text-sm text-[#d7cdb8]">The Saturday after Black Friday</p></div>
            </div>
            <a href="#register" className="mt-9 inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#e4c780] px-7 py-4 text-sm font-semibold text-[#242019] transition-colors hover:bg-[#f2dca5] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e4c780]">Register to attend<ArrowDown className="h-4 w-4" aria-hidden="true" /></a>
            <p className="mt-5 text-sm text-[#d7cdb8]">Time, venue, and more details to follow.</p>
          </div>
          <figure className="mx-auto w-full max-w-sm lg:max-w-none">
            <div className="overflow-hidden rounded-sm border border-[#d5b36a]/50 p-2 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
              <Image src={event.imageUrl!} alt="Church Gala 2026 save-the-date teaser: celebrating God’s faithfulness and the beauty of our nations as a church, Saturday, November 28, 2026." width={1024} height={1536} sizes="(max-width: 1023px) 384px, 460px" priority className="h-auto w-full object-contain" />
            </div>
            <figcaption className="mt-4 text-center text-xs tracking-wide text-[#d7cdb8]">Save the date · Official flyer coming soon</figcaption>
          </figure>
        </div>
      </section>

      <section id="register" className="scroll-mt-28 px-5 py-16 sm:px-8 md:py-24" aria-labelledby="registration-heading">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="lg:pt-5">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#8a6523]">You’re invited</p>
            <h2 id="registration-heading" className="font-[family-name:var(--font-gala-display)] text-5xl font-medium leading-[1.1] sm:text-6xl">A place for you.<br /><span className="italic text-[#8a6523]">A celebration for us all.</span></h2>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-[#6d6558]">Let us know you’re coming so we can plan our headcount and prepare for any food allergies.</p>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-[#6d6558]">You’re welcome to bring one guest. Please include their food allergies when registering.</p>
            <div className="mt-8 border-t border-[#ded5c4] pt-6"><p className="text-sm font-semibold">Saturday, November 28, 2026</p><p className="mt-2 text-sm text-[#6d6558]">More event details will be shared soon.</p></div>
          </div>
          <div className="rounded-2xl border border-[#e6ddce] bg-[#fffdf9] p-6 shadow-[0_12px_40px_rgba(64,48,19,0.05)] sm:p-9">
            {event.isRegistrationOpen ? <><h3 className="mb-2 font-[family-name:var(--font-gala-display)] text-4xl font-semibold">Gala registration</h3><p className="mb-8 text-sm text-[#6d6558]">A few details to help us welcome you. All fields are required.</p><GalaRegistrationForm /></> : <><h3 className="font-[family-name:var(--font-gala-display)] text-4xl font-semibold">Registration is closed</h3><p className="mt-4 text-[#6d6558]">Please <Link href="/contact" className="underline underline-offset-4">contact us</Link> with any questions about the gala.</p></>}
          </div>
        </div>
      </section>
    </div>
  )
}
