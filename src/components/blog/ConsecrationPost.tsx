import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { AmenButton } from '@/components/blog/AmenButton'

const SCRIPTURE = `Joshua told the people, "Consecrate yourselves, for tomorrow the Lord will do amazing things among you."`
const SCRIPTURE_REF = 'Joshua 3:5 (NIV)'

const VERSE_TOOLTIPS: Record<string, string> = {
  'Joshua 3:5':
    'Joshua told the people, "Consecrate yourselves, for tomorrow the Lord will do amazing things among you."',
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

export function ConsecrationPost({ imagePath, slug }: { imagePath?: string; slug: string }) {
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
              alt="January: Consecration"
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
            January 2026
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
            Consecration
          </h1>
          <p className="mt-4 text-xl text-gray-600 leading-relaxed">
            Preparing the ground for fruitfulness.
          </p>
        </header>

        <SectionHeading>Why Consecration First?</SectionHeading>
        <Paragraph>
          As we step into 2026 and our Year of Fruitfulness, we are devoting January to consecration. Fruitfulness does not happen by accident. It grows in soil that has been prepared: hearts set apart for God, minds renewed by His Word, and lives aligned with His purpose. Consecration is that preparation. It is the act of setting ourselves apart for the Lord so that He can do in and through us what only He can do.
        </Paragraph>
        <Paragraph>
          In <ScriptureRef>Joshua 3:5</ScriptureRef>, on the eve of Israel crossing the Jordan into the promised land, Joshua tells the people to consecrate themselves, &ldquo;for tomorrow the Lord will do amazing things among you.&rdquo; They were about to see God move in power. But first, they were to consecrate themselves. The same principle applies to us. If we want to see the Lord do amazing things in our lives and in our church this year, we begin by consecrating ourselves to Him.
        </Paragraph>

        <ScriptureQuote reference={SCRIPTURE_REF}>
          {SCRIPTURE}
        </ScriptureQuote>

        <SectionHeading>What Consecration Means</SectionHeading>
        <Paragraph>
          To consecrate something is to set it apart for a holy purpose. When we consecrate ourselves, we are saying to God: &ldquo;I am Yours. My time, my choices, my heart, and my plans are submitted to You.&rdquo; It is not a one-time event but a posture. It means turning away from whatever distracts or defiles and turning toward the Lord. It means making room for Him in our schedules, our thoughts, and our affections.
        </Paragraph>
        <Paragraph>
          Consecration is not about earning God&apos;s favor. It is about positioning ourselves to receive what He already wants to give. When we clear the ground of sin, compromise, and clutter, we create space for His Word to take root and for His Spirit to produce fruit in our lives.
        </Paragraph>

        <Subheading>Preparing the Ground for Fruitfulness</Subheading>
        <Paragraph>
          Our theme for 2026 is fruitfulness. Fruitfulness flows from abiding in Christ and from soil that has been tended. January is our time to tend the soil. We do that through prayer, through repentance where needed, through renewing our commitment to God&apos;s Word, and through surrendering every area of our lives to Him. As we consecrate ourselves, we are preparing the ground for a year of visible fruit: in our character, our families, our work, and our witness.
        </Paragraph>

        <SectionHeading>A Word for This Month</SectionHeading>
        <Paragraph>
          Let this January be a month of intentional consecration. Set aside time to seek the Lord. Let His Word examine your heart. Surrender afresh every area of your life to Him. And believe that as you consecrate yourselves, the Lord will do amazing things among you. We are preparing the ground together for a year of fruitfulness. Let&apos;s begin with consecration.
        </Paragraph>

        <p className="mt-10 text-center text-gray-700 font-medium">
          Consecrate yourselves. The Lord will do amazing things among you.
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
