import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { AmenButton } from '@/components/blog/AmenButton'

const SCRIPTURE = `Each of you should use whatever gift you have received to serve others, as faithful stewards of God's grace in its various forms.`
const SCRIPTURE_REF = '1 Peter 4:10 (NIV)'

const VERSE_TOOLTIPS: Record<string, string> = {
  '1 Peter 4:10':
    "Each of you should use whatever gift you have received to serve others, as faithful stewards of God's grace in its various forms.",
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

export function ServicePost({ imagePath, slug }: { imagePath?: string; slug: string }) {
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
              alt="June: Service"
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
            June 2026
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
            Service
          </h1>
          <p className="mt-4 text-xl text-gray-600 leading-relaxed">
            Bearing fruit through love in action.
          </p>
        </header>

        <SectionHeading>Why Service?</SectionHeading>
        <Paragraph>
          In January we consecrated ourselves for the Lord. In February we focused on being rooted and built up in Christ. In March we turned to obedience; in April to faithfulness; in May to increase. This month we take up service: bearing fruit through love in action. Consecration set us apart; establishment deepened our roots; obedience aligned our steps; faithfulness carried us forward; increase expanded our capacity. Now we put that capacity to work. We are not meant to grow only for ourselves. We are meant to bear fruit through love in action, serving others with the gifts God has given us.
        </Paragraph>
        <Paragraph>
          In <ScriptureRef>1 Peter 4:10</ScriptureRef>, Peter writes, &ldquo;Each of you should use whatever gift you have received to serve others, as faithful stewards of God&apos;s grace in its various forms.&rdquo; Every believer has received a gift. Every gift is meant to be used for others. Service is not an optional add-on. It is how we steward God&apos;s grace: we receive it, and we pour it out in love. That is bearing fruit through love in action.
        </Paragraph>

        <ScriptureQuote reference={SCRIPTURE_REF}>
          {SCRIPTURE}
        </ScriptureQuote>

        <SectionHeading>What Service Means</SectionHeading>
        <Paragraph>
          To serve is to use what we have for the good of others. It means we do not hoard our gifts, our time, or our energy. We offer them as stewards of God&apos;s grace. Service is love in action: not only feeling compassion but doing something with it. It is bearing fruit that others can taste: encouragement, help, comfort, and care. Service is not about earning God&apos;s favor. It is about responding to His grace by extending it to others in its various forms.
        </Paragraph>
        <Paragraph>
          Bearing fruit through love in action also means that we serve in the ways God has equipped us. We do not all serve in the same way. We use whatever gift we have received. Some serve with words, some with hands, some with presence, some with generosity. All of it is stewardship. All of it is love in action. When we serve with the gifts God has given, we are faithful stewards, and the church bears fruit that lasts.
        </Paragraph>

        <Subheading>Faithful Stewards of Grace</Subheading>
        <Paragraph>
          Peter calls us &ldquo;faithful stewards of God&apos;s grace in its various forms.&rdquo; Grace comes in many forms: mercy, encouragement, teaching, hospitality, generosity, and more. We have received grace. We are called to steward it by serving others. That is our focus for June. We are not aiming for a single act of service. We are aiming for a life of love in action: using our gifts, in the power of the Spirit, for the good of others and the glory of God.
        </Paragraph>

        <SectionHeading>A Word for This Month</SectionHeading>
        <Paragraph>
          Let June be a month of intentional service. Ask the Lord to show you the gifts He has given you and where He wants you to use them. Serve in your family, in the church, and in your community. Do not hold back. Use whatever gift you have received to serve others. Be a faithful steward of God&apos;s grace in its various forms. We are not meant to keep grace to ourselves. We are meant to bear fruit through love in action, so that others taste the goodness of God and He receives the glory.
        </Paragraph>

        <p className="mt-10 text-center text-gray-700 font-medium">
          Using our gifts to serve others. Love in action.
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
