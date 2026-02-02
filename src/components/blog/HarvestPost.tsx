import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { AmenButton } from '@/components/blog/AmenButton'

const SCRIPTURE = `Do not be deceived: God cannot be mocked. A man reaps what he sows. Whoever sows to please their flesh, from the flesh will reap destruction; whoever sows to please the Spirit, from the Spirit will reap eternal life.`
const SCRIPTURE_REF = 'Galatians 6:7–8 (NIV)'

const VERSE_TOOLTIPS: Record<string, string> = {
  'Galatians 6:7–8':
    'Do not be deceived: God cannot be mocked. A man reaps what he sows. Whoever sows to please their flesh, from the flesh will reap destruction; whoever sows to please the Spirit, from the Spirit will reap eternal life.',
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

export function HarvestPost({ imagePath, slug }: { imagePath?: string; slug: string }) {
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
              alt="July: Harvest"
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
            July 2026
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
            Harvest
          </h1>
          <p className="mt-4 text-xl text-gray-600 leading-relaxed">
            Reaping the results of faith and perseverance.
          </p>
        </header>

        <SectionHeading>Why Harvest?</SectionHeading>
        <Paragraph>
          In January we consecrated ourselves. In February we were established in Christ. In March we walked in obedience; in April we practiced faithfulness; in May we embraced increase; in June we served with our gifts. This month we take up harvest: reaping the results of faith and perseverance. We have been sowing all year. Now we look to what God brings to fruition. Harvest is not only a future hope. It is the present reality of reaping what we have sown in the Spirit.
        </Paragraph>
        <Paragraph>
          In <ScriptureRef>Galatians 6:7–8</ScriptureRef>, Paul writes, &ldquo;Do not be deceived: God cannot be mocked. A man reaps what he sows. Whoever sows to please their flesh, from the flesh will reap destruction; whoever sows to please the Spirit, from the Spirit will reap eternal life.&rdquo; The principle is clear: we reap what we sow. When we sow to the Spirit through faith, obedience, faithfulness, and service, we reap a harvest that lasts. July is a month to recognize and celebrate that harvest, and to keep sowing to the Spirit.
        </Paragraph>

        <ScriptureQuote reference={SCRIPTURE_REF}>
          {SCRIPTURE}
        </ScriptureQuote>

        <SectionHeading>What Harvest Means</SectionHeading>
        <Paragraph>
          To reap a harvest is to see the results of what we have sown. It means we do not labor in vain. God honors faith and perseverance. The harvest may look different than we expected: sometimes it is visible growth, sometimes it is character, sometimes it is impact in the lives of others. But when we sow to the Spirit, we reap from the Spirit. Harvest is the fruit of a life lived in alignment with God: consecrated, established, obedient, faithful, and serving.
        </Paragraph>
        <Paragraph>
          Reaping the results of faith and perseverance also means we do not grow weary. Paul has already reminded us in Galatians 6:9 not to give up, for at the proper time we will reap. Harvest comes in God&apos;s timing. Our job is to keep sowing to the Spirit and to recognize the harvest when it comes. That is our focus for July: to see and celebrate what God has produced, and to continue sowing for the harvests to come.
        </Paragraph>

        <Subheading>Sowing to the Spirit</Subheading>
        <Paragraph>
          The contrast in the passage is stark: sow to the flesh and reap destruction; sow to the Spirit and reap eternal life. Our year of fruitfulness is about sowing to the Spirit. Every act of obedience, every step of faithfulness, every act of service is seed in the ground. July is a time to acknowledge the harvest that is already growing and to recommit to sowing to the Spirit in the months ahead.
        </Paragraph>

        <SectionHeading>A Word for This Month</SectionHeading>
        <Paragraph>
          Let July be a month of recognizing harvest. Look back at what the Lord has done in and through you since January. Give thanks for the fruit you have seen: in your character, your relationships, your service, and your witness. Do not be deceived: God cannot be mocked. We reap what we sow. Keep sowing to the Spirit. Keep trusting that at the proper time we will reap a harvest if we do not give up. We are reaping the results of faith and perseverance.
        </Paragraph>

        <p className="mt-10 text-center text-gray-700 font-medium">
          Reaping what we sow. Harvest from the Spirit.
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
