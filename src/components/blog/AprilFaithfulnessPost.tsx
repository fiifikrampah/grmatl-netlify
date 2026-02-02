import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { AmenButton } from '@/components/blog/AmenButton'

const SCRIPTURE = `Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up.`
const SCRIPTURE_REF = 'Galatians 6:9 (NIV)'

const VERSE_TOOLTIPS: Record<string, string> = {
  'Galatians 6:9':
    'Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up.',
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

export function AprilFaithfulnessPost({ imagePath, slug }: { imagePath?: string; slug: string }) {
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
              alt="April: Faithfulness"
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
            April 2026
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
            Faithfulness
          </h1>
          <p className="mt-4 text-xl text-gray-600 leading-relaxed">
            Bearing fruit through consistency and trust.
          </p>
        </header>

        <SectionHeading>Why Faithfulness?</SectionHeading>
        <Paragraph>
          In January we consecrated ourselves for the Lord. In February we focused on being rooted and built up in Christ. In March we turned to obedience: walking in alignment with God&apos;s Word. This month we take up faithfulness: bearing fruit through consistency and trust. Consecration sets us apart; establishment deepens our roots; obedience aligns our steps; faithfulness is the steady persistence that carries it all forward. We do not bear lasting fruit in a day. We bear it over time, by not giving up.
        </Paragraph>
        <Paragraph>
          In <ScriptureRef>Galatians 6:9</ScriptureRef>, Paul writes, &ldquo;Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up.&rdquo; The promise is not that we will see results immediately. It is that at the proper time we will reap if we do not give up. Faithfulness is that refusal to give up. It is consistency in doing good and trust that God will bring the harvest in due season.
        </Paragraph>

        <ScriptureQuote reference={SCRIPTURE_REF}>
          {SCRIPTURE}
        </ScriptureQuote>

        <SectionHeading>What Faithfulness Means</SectionHeading>
        <Paragraph>
          To be faithful is to be steady and reliable. It means showing up when it is hard, continuing when we are tired, and trusting God with the timing of the harvest. Faithfulness is not flashy. It is the daily choice to do good, to pray, to serve, to obey, and to love, even when we do not see immediate fruit. It is consistency over time and trust in the One who has promised to bring the increase.
        </Paragraph>
        <Paragraph>
          Bearing fruit through consistency and trust also means that we do not measure our worth by this week&apos;s results. We sow in faith, we water with obedience, and we leave the growth to God. Faithfulness frees us from the pressure to produce on our own timetable. It anchors us in the truth that at the proper time we will reap if we do not give up. That kind of steadiness is what we need for a year of fruitfulness. Fruit grows over seasons, not overnight. Faithfulness is the posture that carries us through.
        </Paragraph>

        <Subheading>Doing Good and Not Giving Up</Subheading>
        <Paragraph>
          Paul links faithfulness to &ldquo;doing good.&rdquo; Faithfulness is not passive waiting. It is active persistence in what is right: in our walk with God, in our relationships, in our work, and in our witness. We do good when we are tired. We do good when we are discouraged. We do good when the harvest is not yet visible. And we do not give up. That is the path to reaping in due season. That is our focus for April.
        </Paragraph>

        <SectionHeading>A Word for This Month</SectionHeading>
        <Paragraph>
          Let April be a month of intentional faithfulness. Identify the good God has called you to do and keep doing it. Do not become weary. When you are tired, ask the Lord for strength. When you are tempted to quit, remember that at the proper time you will reap if you do not give up. Trust Him with the harvest. Be consistent in prayer, in Scripture, in obedience, and in love. We are not aiming for a burst of effort. We are aiming for a life of steady faithfulness that bears fruit in God&apos;s time.
        </Paragraph>

        <p className="mt-10 text-center text-gray-700 font-medium">
          Not weary in doing good. Reaping a harvest at the proper time.
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
