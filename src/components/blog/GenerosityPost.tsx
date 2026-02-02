import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { AmenButton } from '@/components/blog/AmenButton'

const SCRIPTURE = `Now he who supplies seed to the sower and bread for food will also supply and increase your store of seed and will enlarge the harvest of your righteousness. You will be enriched in every way so that you can be generous on every occasion, and through us your generosity will result in thanksgiving to God.`
const SCRIPTURE_REF = '2 Corinthians 9:10–11 (NIV)'

const VERSE_TOOLTIPS: Record<string, string> = {
  '2 Corinthians 9:10–11':
    'Now he who supplies seed to the sower and bread for food will also supply and increase your store of seed and will enlarge the harvest of your righteousness. You will be enriched in every way so that you can be generous on every occasion, and through us your generosity will result in thanksgiving to God.',
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

export function GenerosityPost({ imagePath, slug }: { imagePath?: string; slug: string }) {
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
              alt="September: Generosity"
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
            September 2026
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
            Generosity
          </h1>
          <p className="mt-4 text-xl text-gray-600 leading-relaxed">
            Fruit that blesses others.
          </p>
        </header>

        <SectionHeading>Why Generosity?</SectionHeading>
        <Paragraph>
          We have walked through consecration, establishment, obedience, faithfulness, increase, service, harvest, and excellence. This month we take up generosity: fruit that blesses others. Generosity is the overflow of a heart that has been blessed by God. It is not only about money. It is about giving our time, our gifts, our presence, and our resources so that others are blessed and God receives thanks. When we are generous, we are bearing fruit that blesses others and results in thanksgiving to God.
        </Paragraph>
        <Paragraph>
          In <ScriptureRef>2 Corinthians 9:10–11</ScriptureRef>, Paul writes, &ldquo;Now he who supplies seed to the sower and bread for food will also supply and increase your store of seed and will enlarge the harvest of your righteousness. You will be enriched in every way so that you can be generous on every occasion, and through us your generosity will result in thanksgiving to God.&rdquo; God supplies so that we can give. He enriches us so that we can be generous. And our generosity results in thanksgiving to God. That is fruit that blesses others.
        </Paragraph>

        <ScriptureQuote reference={SCRIPTURE_REF}>
          {SCRIPTURE}
        </ScriptureQuote>

        <SectionHeading>What Generosity Means</SectionHeading>
        <Paragraph>
          To be generous is to give freely and gladly. It means we do not hold tightly to what we have. We recognize that God has supplied it, and we use it to bless others. Generosity is fruit that blesses others: when we give our time, our resources, our encouragement, or our presence, we are extending the grace we have received. Generosity is not about the size of the gift. It is about the heart behind it and the blessing it brings to others and to God&apos;s reputation.
        </Paragraph>
        <Paragraph>
          Fruit that blesses others also means that our generosity has a purpose beyond ourselves. Paul says our generosity will result in thanksgiving to God. When we give, others are helped and God is thanked. The harvest of our righteousness is enlarged. We are enriched not to hoard but to give. That is our focus for September: to be generous on every occasion, so that our fruit blesses others and results in thanksgiving to God.
        </Paragraph>

        <Subheading>Enriched to Be Generous</Subheading>
        <Paragraph>
          God supplies seed to the sower. He does not supply so that we can store up for ourselves. He supplies and increases our store so that we can sow again and again. We are enriched in every way so that we can be generous on every occasion. Generosity is the natural outcome of a life that has been consecrated, established, obedient, faithful, and serving. It is the fruit of harvest and excellence: we have been blessed, and we bless others. That is fruit that lasts.
        </Paragraph>

        <SectionHeading>A Word for This Month</SectionHeading>
        <Paragraph>
          Let September be a month of intentional generosity. Ask the Lord to show you where He wants you to give: your time, your gifts, your resources, or your presence. Be generous on every occasion. Do not hold back. Remember that God supplies seed to the sower. He will supply and increase your store. Your generosity will result in thanksgiving to God. We are bearing fruit that blesses others.
        </Paragraph>

        <p className="mt-10 text-center text-gray-700 font-medium">
          Enriched to be generous. Fruit that blesses others.
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
