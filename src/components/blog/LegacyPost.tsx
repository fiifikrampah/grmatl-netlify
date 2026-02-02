import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { AmenButton } from '@/components/blog/AmenButton'

const SCRIPTURE = `You did not choose me, but I chose you and appointed you so that you might go and bear fruit—fruit that will last—and so that whatever you ask in my name the Father will give you.`
const SCRIPTURE_REF = 'John 15:16 (NIV)'

const VERSE_TOOLTIPS: Record<string, string> = {
  'John 15:16':
    'You did not choose me, but I chose you and appointed you so that you might go and bear fruit—fruit that will last—and so that whatever you ask in my name the Father will give you.',
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

export function LegacyPost({ imagePath, slug }: { imagePath?: string; slug: string }) {
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
              alt="December: Legacy"
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
            December 2026
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
            Legacy
          </h1>
          <p className="mt-4 text-xl text-gray-600 leading-relaxed">
            Fruit that remains for generations.
          </p>
        </header>

        <SectionHeading>Why Legacy?</SectionHeading>
        <Paragraph>
          We have walked through a full year of fruitfulness: consecration, establishment, obedience, faithfulness, increase, service, harvest, excellence, generosity, impact, and thankfulness. This month we close with legacy: fruit that remains for generations. Our year of fruitfulness is not only for us. It is for those who come after us. Legacy is what we leave behind: the fruit that remains when we are gone, the impact that outlives us, and the faith that is passed to the next generation.
        </Paragraph>
        <Paragraph>
          In <ScriptureRef>John 15:16</ScriptureRef>, Jesus tells His disciples, &ldquo;You did not choose me, but I chose you and appointed you so that you might go and bear fruit—fruit that will last—and so that whatever you ask in my name the Father will give you.&rdquo; We have been chosen and appointed. Our purpose is to go and bear fruit—fruit that will last. Not fruit that withers or is forgotten, but fruit that remains for generations. That is legacy.
        </Paragraph>

        <ScriptureQuote reference={SCRIPTURE_REF}>
          {SCRIPTURE}
        </ScriptureQuote>

        <SectionHeading>What Legacy Means</SectionHeading>
        <Paragraph>
          To leave a legacy is to bear fruit that remains. It means the work we do, the lives we touch, and the faith we pass on outlive us. Legacy is fruit that remains for generations: when we invest in people, teach the Word, model Christ, and build the church, we are sowing for a harvest that our children and their children will reap. Legacy is not about our name. It is about the kingdom of God advancing beyond our lifetime.
        </Paragraph>
        <Paragraph>
          Fruit that remains for generations also means that we think beyond ourselves. We do not live only for today. We live for what will last: the souls we reach, the disciples we make, the truth we uphold, and the love we show. When we bear fruit that lasts, we are participating in something that will outlive us. That is our focus for December: to be intentional about legacy, to go and bear fruit that will last, and to leave something that remains for generations.
        </Paragraph>

        <Subheading>Chosen and Appointed</Subheading>
        <Paragraph>
          Jesus says we did not choose Him; He chose us. He appointed us so that we might go and bear fruit that will last. Our calling is not accidental. We have been chosen and appointed for fruit that remains. That means our lives have purpose beyond our own comfort or success. We are here to go, to bear fruit, and to leave a legacy that points to Christ for generations to come. As we close 2026, we recommit to that calling: fruit that remains.
        </Paragraph>

        <SectionHeading>A Word for This Month</SectionHeading>
        <Paragraph>
          Let December be a month of intentional legacy. Look back at the fruit of this year and ask the Lord how it can remain. Invest in the next generation: in your family, in the church, in those you disciple. Go and bear fruit that will last. You have been chosen and appointed. Do not settle for fruit that withers. Aim for fruit that remains for generations. We are bearing fruit that lasts.
        </Paragraph>

        <p className="mt-10 text-center text-gray-700 font-medium">
          Chosen and appointed. Fruit that will last for generations.
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
