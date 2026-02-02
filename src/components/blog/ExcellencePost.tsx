import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { AmenButton } from '@/components/blog/AmenButton'

const SCRIPTURE = `Now Daniel so distinguished himself among the administrators and the satraps by his exceptional qualities that the king planned to set him over the whole kingdom.`
const SCRIPTURE_REF = 'Daniel 6:3 (NIV)'

const VERSE_TOOLTIPS: Record<string, string> = {
  'Daniel 6:3':
    'Now Daniel so distinguished himself among the administrators and the satraps by his exceptional qualities that the king planned to set him over the whole kingdom.',
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

export function ExcellencePost({ imagePath, slug }: { imagePath?: string; slug: string }) {
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
              alt="August: Excellence"
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
            August 2026
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
            Excellence
          </h1>
          <p className="mt-4 text-xl text-gray-600 leading-relaxed">
            Reflecting God&apos;s glory in all we do.
          </p>
        </header>

        <SectionHeading>Why Excellence?</SectionHeading>
        <Paragraph>
          We have spent the year consecrating ourselves, being established in Christ, walking in obedience, practicing faithfulness, embracing increase, serving with our gifts, and reaping harvest. This month we take up excellence: reflecting God&apos;s glory in all we do. Excellence is not perfectionism or people-pleasing. It is offering our best to God in every area of life so that He is glorified. When we do our work, our ministry, and our relationships with excellence, we reflect the character of the God we serve.
        </Paragraph>
        <Paragraph>
          In <ScriptureRef>Daniel 6:3</ScriptureRef>, we read that Daniel &ldquo;so distinguished himself among the administrators and the satraps by his exceptional qualities that the king planned to set him over the whole kingdom.&rdquo; Daniel&apos;s excellence was not for his own glory. It was the fruit of a life lived before God with integrity, diligence, and faithfulness. His exceptional qualities pointed others to something beyond himself. That is what we are after: excellence that reflects God&apos;s glory.
        </Paragraph>

        <ScriptureQuote reference={SCRIPTURE_REF}>
          {SCRIPTURE}
        </ScriptureQuote>

        <SectionHeading>What Excellence Means</SectionHeading>
        <Paragraph>
          To pursue excellence is to offer our best in every sphere: in our work, our relationships, our service, and our worship. It means we do not settle for half-hearted effort when we have the capacity to do better. Excellence is not about outperforming others. It is about honoring God with what He has given us. When we reflect God&apos;s glory in all we do, we are bearing fruit that points to Him.
        </Paragraph>
        <Paragraph>
          Reflecting God&apos;s glory in all we do also means that excellence is holistic. It is not only for Sunday or for visible ministry. It is for our jobs, our homes, our communities, and our private lives. Daniel excelled in a pagan court. He did not compromise his faith; he served with such integrity and skill that the king could not ignore him. We are called to the same: to be so faithful and so excellent that our lives point to the God we serve.
        </Paragraph>

        <Subheading>Exceptional Qualities</Subheading>
        <Paragraph>
          Daniel&apos;s exceptional qualities were the result of a life rooted in God. He prayed, he obeyed, and he served with integrity. Excellence flows from the same place: from consecration, establishment, obedience, faithfulness, and service. We do not manufacture excellence by trying harder in our own strength. We offer our best in dependence on God, and He is glorified. That is our focus for August: to reflect God&apos;s glory in all we do.
        </Paragraph>

        <SectionHeading>A Word for This Month</SectionHeading>
        <Paragraph>
          Let August be a month of intentional excellence. Ask the Lord to show you where He wants you to offer your best. In your work, your relationships, your service, and your worship, aim to reflect His glory. Do not settle for mediocrity where God has called you to excel. We are not aiming for the praise of people. We are aiming for a life so marked by excellence that others see the character of God. Reflecting God&apos;s glory in all we do.
        </Paragraph>

        <p className="mt-10 text-center text-gray-700 font-medium">
          Exceptional qualities. Reflecting God&apos;s glory.
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
