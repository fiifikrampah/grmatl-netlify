import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { AmenButton } from '@/components/blog/AmenButton'

const SCRIPTURE = `Enlarge the place of your tent, stretch your tent curtains wide, do not hold back; lengthen your cords, strengthen your stakes. For you will spread out to the right and to the left; your descendants will dispossess nations and settle in their desolate cities.`
const SCRIPTURE_REF = 'Isaiah 54:2–3 (NIV)'

const VERSE_TOOLTIPS: Record<string, string> = {
  'Isaiah 54:2–3':
    'Enlarge the place of your tent, stretch your tent curtains wide, do not hold back; lengthen your cords, strengthen your stakes. For you will spread out to the right and to the left; your descendants will dispossess nations and settle in their desolate cities.',
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

export function IncreasePost({ imagePath, slug }: { imagePath?: string; slug: string }) {
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
              alt="May: Increase"
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
            May 2026
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
            Increase
          </h1>
          <p className="mt-4 text-xl text-gray-600 leading-relaxed">
            Expanding in influence and capacity.
          </p>
        </header>

        <SectionHeading>Why Increase?</SectionHeading>
        <Paragraph>
          In January we consecrated ourselves for the Lord. In February we focused on being rooted and built up in Christ. In March we turned to obedience; in April to faithfulness. This month we take up increase: expanding in influence and capacity. Consecration set us apart; establishment deepened our roots; obedience aligned our steps; faithfulness carried us forward. Now the Lord invites us to enlarge. We are not meant to stay small. We are meant to expand in influence and capacity as He leads.
        </Paragraph>
        <Paragraph>
          In <ScriptureRef>Isaiah 54:2–3</ScriptureRef>, the Lord speaks to His people with a word of expansion: enlarge the place of your tent, stretch your tent curtains wide, do not hold back; lengthen your cords, strengthen your stakes. For you will spread out to the right and to the left. The promise is not only spiritual growth but increase in reach, in capacity, and in impact. God is calling us to prepare for more: more room for His presence, more reach for His kingdom, and more fruit for His glory.
        </Paragraph>

        <ScriptureQuote reference={SCRIPTURE_REF}>
          {SCRIPTURE}
        </ScriptureQuote>

        <SectionHeading>What Increase Means</SectionHeading>
        <Paragraph>
          To enlarge the place of our tent is to make room for what God wants to do. It means we do not hold back out of fear or small thinking. We stretch our faith, our vision, and our capacity. We lengthen our cords and strengthen our stakes so that when the Lord brings increase, we are ready to hold it. Increase is not about striving in our own strength. It is about positioning ourselves in obedience and trust so that God can expand our influence and our capacity in His way and His time.
        </Paragraph>
        <Paragraph>
          Expanding in influence and capacity also means that we think beyond our current boundaries. We ask the Lord to show us where He wants us to spread out: in our families, our workplaces, our community, and our witness. We strengthen what we have so that we can hold more. We do not hold back. That kind of increase is what we need for a year of fruitfulness. Fruitfulness leads to increase: more fruit, more impact, more room for God&apos;s glory. May is a month to embrace it.
        </Paragraph>

        <Subheading>Do Not Hold Back</Subheading>
        <Paragraph>
          The Lord says, &ldquo;Do not hold back.&rdquo; Often we limit ourselves not because God has not promised increase but because we have not enlarged our tent. We have not stretched our curtains wide. We have not lengthened our cords or strengthened our stakes. This month we are saying yes to increase. We are asking the Lord to enlarge our capacity, expand our influence, and prepare us for the spread He has in mind. We will spread out to the right and to the left as He leads.
        </Paragraph>

        <SectionHeading>A Word for This Month</SectionHeading>
        <Paragraph>
          Let May be a month of intentional increase. Enlarge the place of your tent in prayer: ask God to expand your vision and your capacity. Stretch your tent curtains wide: make room for what He wants to do in and through you. Lengthen your cords and strengthen your stakes: invest in what will hold the increase. Do not hold back. We are not aiming for comfort in the same small space. We are aiming for expansion in influence and capacity, so that our lives and our church can bear more fruit for His glory this year.
        </Paragraph>

        <p className="mt-10 text-center text-gray-700 font-medium">
          Enlarging our tent. Expanding in influence and capacity.
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
