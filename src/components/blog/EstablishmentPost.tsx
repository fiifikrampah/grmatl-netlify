import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { AmenButton } from '@/components/blog/AmenButton'

const SCRIPTURE = `So then, just as you received Christ Jesus as Lord, continue to live your lives in him, rooted and built up in him, strengthened in the faith as you were taught, and overflowing with thankfulness.`
const SCRIPTURE_REF = 'Colossians 2:6–7 (NIV)'

const VERSE_TOOLTIPS: Record<string, string> = {
  'Colossians 2:6–7':
    'So then, just as you received Christ Jesus as Lord, continue to live your lives in him, rooted and built up in him, strengthened in the faith as you were taught, and overflowing with thankfulness.',
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 first:mt-0">
      {children}
    </h2>
  )
}

function Subheading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-lg font-bold text-gray-900 mt-8 mb-3">
      {children}
    </h3>
  )
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="text-gray-600 leading-relaxed mb-5">{children}</p>
}

function ScriptureQuote({
  children,
  reference,
}: {
  children: React.ReactNode
  reference: string
}) {
  return (
    <blockquote className="my-10">
      <p className="text-lg sm:text-xl text-amber-900/90 italic leading-relaxed">
        &ldquo;{children}&rdquo;
      </p>
      <cite className="mt-4 block text-base font-bold text-amber-800 not-italic">
        {reference}
      </cite>
    </blockquote>
  )
}

function ScriptureRef({ children }: { children: React.ReactNode }) {
  const refKey = String(children).trim()
  const verse = VERSE_TOOLTIPS[refKey]
  if (!verse) {
    return <span className="font-semibold text-amber-800">{children}</span>
  }
  return (
    <span className="group relative inline">
      <span className="font-semibold text-amber-800 cursor-help underline decoration-amber-300/50 decoration-dotted underline-offset-2">
        {children}
      </span>
      <span
        className="pointer-events-none absolute bottom-full left-0 z-50 mb-2 hidden min-w-[280px] max-w-md rounded-lg bg-gray-900 px-3 py-2.5 text-sm font-normal leading-relaxed text-white shadow-lg group-hover:block sm:max-w-lg"
        role="tooltip"
      >
        &ldquo;{verse}&rdquo;
        <span className="mt-1 block text-xs text-gray-300">{refKey}</span>
      </span>
    </span>
  )
}

export function EstablishmentPost({ imagePath, slug }: { imagePath?: string; slug: string }) {
  return (
    <article className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <Link
          href="/blogs"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-grm-primary transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blogs
        </Link>
      </div>

      {imagePath && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="relative aspect-[16/10] sm:aspect-[2/1] rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5">
            <Image
              src={imagePath}
              alt="February: Establishment"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <header className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-grm-primary mb-3">
            February 2026
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
            Establishment
          </h1>
          <p className="mt-4 text-xl text-gray-600 leading-relaxed">
            Strengthened and secure in Christ.
          </p>
        </header>

        <SectionHeading>Why Establishment?</SectionHeading>
        <Paragraph>
          In January we focused on consecration: preparing the ground for fruitfulness by setting ourselves apart for the Lord. This month we build on that foundation with establishment. Consecration is the preparation; establishment is the deepening. We want to be not only set apart for God but rooted and built up in Him, strengthened in our faith, and secure in Christ. That is what <ScriptureRef>Colossians 2:6–7</ScriptureRef> invites us into.
        </Paragraph>
        <Paragraph>
          Paul writes to believers who have received Christ. His concern is that they continue: that they go on living their lives in Him, growing deeper and stronger. Establishment is that ongoing life. It is the opposite of a shallow or shaky faith. It is being rooted, built up, strengthened, and overflowing with thankfulness. That is our focus for February.
        </Paragraph>

        <ScriptureQuote reference={SCRIPTURE_REF}>
          {SCRIPTURE}
        </ScriptureQuote>

        <SectionHeading>What Establishment Means</SectionHeading>
        <Paragraph>
          The verse gives us four pictures of what it means to be established in Christ. First, we continue to live our lives in Him. We do not receive Christ and then drift. We stay in Him, day by day. Second, we are rooted in Him. Like a tree with deep roots, we draw our life and stability from Christ. Third, we are built up in Him. Faith is not static; we are being built up, like a structure on a solid foundation. Fourth, we are strengthened in the faith as we were taught. The truth we have received becomes the source of our strength as we hold fast to it.
        </Paragraph>
        <Paragraph>
          And from that place of being rooted, built up, and strengthened, we overflow with thankfulness. Establishment is not grim or rigid. It produces gratitude. When we are secure in Christ, we are not easily shaken, and our hearts can overflow with thanks.
        </Paragraph>

        <Subheading>Strengthened and Secure</Subheading>
        <Paragraph>
          To be strengthened and secure in Christ means we are not relying on our own wisdom or effort for stability. We are rooted in Him. When trials or confusion come, we do not topple. When culture shifts or pressures mount, we hold fast. Our security is in Christ, not in our circumstances. That kind of establishment is what we need for a year of fruitfulness. Fruit grows on branches that are firmly connected to the vine. Establishment is that firm connection: we are strengthened and secure in Christ so that we can bear fruit that lasts.
        </Paragraph>

        <SectionHeading>A Word for This Month</SectionHeading>
        <Paragraph>
          Let February be a month of intentional establishment. Continue to live your life in Christ. Let His Word sink deeper. Put down roots in Him through prayer, Scripture, and obedience. Ask the Lord to build you up and strengthen you in the faith. And let thankfulness overflow. We are not meant to be shallow or shaky. We are meant to be rooted, built up, and strengthened in Christ. As we are established in Him, we are ready for whatever fruit He wants to produce in and through us this year.
        </Paragraph>

        <p className="mt-10 text-center text-gray-700 font-medium">
          Rooted and built up in Him. Strengthened and overflowing with thankfulness.
        </p>

        <AmenButton slug={slug} />

        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Join Us in This Season
          </h3>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Whether you are just starting your journey or looking for a place to grow, we invite you to be part of what God is doing at GRM.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-grm-primary hover:bg-grm-secondary hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ease-out"
            >
              Plan Your Visit
            </Link>
            <Link
              href="/live"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-grm-primary text-base font-medium rounded-md text-grm-primary bg-white hover:bg-grm-blue-50 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ease-out"
            >
              Watch Online
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
