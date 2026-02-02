import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { AmenButton } from '@/components/blog/AmenButton'

const SCRIPTURE = `You are the light of the world. A town built on a hill cannot be hidden. Neither do people light a lamp and put it under a bowl. Instead they put it on its stand, and it gives light to everyone in the house. In the same way, let your light shine before others, that they may see your good deeds and glorify your Father in heaven.`
const SCRIPTURE_REF = 'Matthew 5:14–16 (NIV)'

const VERSE_TOOLTIPS: Record<string, string> = {
  'Matthew 5:14–16':
    'You are the light of the world. A town built on a hill cannot be hidden. Neither do people light a lamp and put it under a bowl. Instead they put it on its stand, and it gives light to everyone in the house. In the same way, let your light shine before others, that they may see your good deeds and glorify your Father in heaven.',
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

export function ImpactPost({ imagePath, slug }: { imagePath?: string; slug: string }) {
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
              alt="October: Impact"
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
            October 2026
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
            Impact
          </h1>
          <p className="mt-4 text-xl text-gray-600 leading-relaxed">
            Transforming lives and communities.
          </p>
        </header>

        <SectionHeading>Why Impact?</SectionHeading>
        <Paragraph>
          We have walked through consecration, establishment, obedience, faithfulness, increase, service, harvest, excellence, and generosity. This month we take up impact: transforming lives and communities. Fruitfulness is not only for ourselves. It is meant to touch the lives of others and to shape the communities we are part of. Impact is what happens when the fruit we bear reaches beyond us: lives are transformed, and communities are changed for the glory of God.
        </Paragraph>
        <Paragraph>
          In <ScriptureRef>Matthew 5:14–16</ScriptureRef>, Jesus tells His disciples, &ldquo;You are the light of the world. A town built on a hill cannot be hidden. Neither do people light a lamp and put it under a bowl. Instead they put it on its stand, and it gives light to everyone in the house. In the same way, let your light shine before others, that they may see your good deeds and glorify your Father in heaven.&rdquo; We are light. We are not meant to be hidden. We are meant to shine so that others see and glorify God. That is transforming lives and communities.
        </Paragraph>

        <ScriptureQuote reference={SCRIPTURE_REF}>
          {SCRIPTURE}
        </ScriptureQuote>

        <SectionHeading>What Impact Means</SectionHeading>
        <Paragraph>
          To have impact is to make a difference that lasts. It means our lives, our good deeds, and our witness are visible. We do not hide our light under a bowl. We put it on a stand so that it gives light to everyone in the house. Impact is transforming lives: when people encounter us, they encounter something of Christ. Impact is transforming communities: when we show up with the love and truth of Jesus, neighborhoods, workplaces, and families can be changed.
        </Paragraph>
        <Paragraph>
          Transforming lives and communities also means that we do not take credit. Jesus says our good deeds are so that others may glorify our Father in heaven. Impact is not about our name. It is about God&apos;s glory. When we let our light shine, we are pointing to Him. That is the heart of impact: lives and communities transformed so that God receives the glory.
        </Paragraph>

        <Subheading>Let Your Light Shine</Subheading>
        <Paragraph>
          A town built on a hill cannot be hidden. We are that town. We are the light of the world. Our calling is not to blend in but to shine: to live in such a way that our good deeds are visible and that others glorify God. That is our focus for October: to be intentional about impact, to let our light shine before others, and to see lives and communities transformed for His glory.
        </Paragraph>

        <SectionHeading>A Word for This Month</SectionHeading>
        <Paragraph>
          Let October be a month of intentional impact. Ask the Lord where He wants your light to shine: in your family, your workplace, your neighborhood, or your church. Do not hide under a bowl. Put your lamp on its stand. Let your good deeds be visible so that others may see and glorify your Father in heaven. We are transforming lives and communities when we live as light in the world.
        </Paragraph>

        <p className="mt-10 text-center text-gray-700 font-medium">
          You are the light of the world. Let your light shine.
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
