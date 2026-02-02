import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { AmenButton } from '@/components/blog/AmenButton'

const SCRIPTURE = `If you fully obey the Lord your God and carefully follow all his commands I give you today, the Lord your God will set you high above all the nations on earth. All these blessings will come on you and accompany you if you obey the Lord your God.`
const SCRIPTURE_REF = 'Deuteronomy 28:1–2 (NIV)'

const VERSE_TOOLTIPS: Record<string, string> = {
  'Deuteronomy 28:1–2':
    'If you fully obey the Lord your God and carefully follow all his commands I give you today, the Lord your God will set you high above all the nations on earth. All these blessings will come on you and accompany you if you obey the Lord your God.',
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

export function ObediencePost({ imagePath, slug }: { imagePath?: string; slug: string }) {
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
              alt="March: Obedience"
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
            March 2026
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
            Obedience
          </h1>
          <p className="mt-4 text-xl text-gray-600 leading-relaxed">
            Walking in alignment with God&apos;s Word.
          </p>
        </header>

        <SectionHeading>Why Obedience?</SectionHeading>
        <Paragraph>
          In January we consecrated ourselves for the Lord. In February we focused on being rooted and built up in Christ. This month we turn to obedience: walking in alignment with God&apos;s Word. Consecration sets us apart; establishment deepens our roots; obedience is how we walk it out. We cannot claim to be set apart for God or rooted in Christ if we ignore what He has said. Obedience is the practical expression of a heart that belongs to Him.
        </Paragraph>
        <Paragraph>
          In <ScriptureRef>Deuteronomy 28:1–2</ScriptureRef>, Moses tells Israel that if they fully obey the Lord and carefully follow His commands, He will set them high above the nations and cause blessings to come and accompany them. The same principle holds for us. Obedience is not legalism. It is alignment with the God who loves us and knows what is best. When we walk in step with His Word, we position ourselves for His blessing and for fruitfulness that lasts.
        </Paragraph>

        <ScriptureQuote reference={SCRIPTURE_REF}>
          {SCRIPTURE}
        </ScriptureQuote>

        <SectionHeading>What Obedience Means</SectionHeading>
        <Paragraph>
          To obey God is to hear His Word and do it. It means aligning our choices, our priorities, and our daily lives with what Scripture teaches. Obedience is not perfection. It is a posture: we aim to follow the Lord, and when we fall short, we repent and keep walking. It also means obeying from the heart, not from mere duty. Jesus said that if we love Him, we will keep His commands. Obedience flows from relationship with Him.
        </Paragraph>
        <Paragraph>
          Walking in alignment with God&apos;s Word also means that we do not pick and choose. We do not obey in the areas that are easy and ignore the rest. We seek to honor Him in our speech, our relationships, our work, and our witness. That kind of obedience requires dependence on the Holy Spirit. We cannot do it in our own strength. But as we yield to Him and stay in His Word, He enables us to walk in step with His will.
        </Paragraph>

        <Subheading>Blessing and Fruitfulness</Subheading>
        <Paragraph>
          Deuteronomy 28 ties obedience to blessing. So does our year of fruitfulness. Fruitfulness does not happen in the soil of disobedience. It grows when we are consecrated, established in Christ, and walking in alignment with His Word. Obedience is the pathway. It keeps our lives rooted in His will and opens the way for His blessing to accompany us. That is why we devote March to obedience: so that we are not only set apart and established but actively walking in the way He has called us to walk.
        </Paragraph>

        <SectionHeading>A Word for This Month</SectionHeading>
        <Paragraph>
          Let March be a month of intentional obedience. Open God&apos;s Word and ask Him to show you where He is calling you to align. Obey in the small things and the big ones. Let your yes be yes and your no be no. Walk in step with what you know from Scripture, and ask the Holy Spirit to strengthen you. We are not aiming for perfection. We are aiming for a life that is increasingly aligned with God&apos;s Word, so that His blessing and His fruit can flow in and through us this year.
        </Paragraph>

        <p className="mt-10 text-center text-gray-700 font-medium">
          Fully obeying the Lord. Walking in alignment with His Word.
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
