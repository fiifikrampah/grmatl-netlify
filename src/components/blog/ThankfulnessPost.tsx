import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { AmenButton } from '@/components/blog/AmenButton'

const SCRIPTURE = `It is good to praise the Lord and make music to your name, O Most High, proclaiming your love in the morning and your faithfulness at night, to the music of the ten-stringed lyre and the melody of the harp. For you make me glad by your deeds, Lord; I sing for joy at what your hands have done.`
const SCRIPTURE_REF = 'Psalm 92:1–4 (NIV)'

const VERSE_TOOLTIPS: Record<string, string> = {
  'Psalm 92:1–4':
    'It is good to praise the Lord and make music to your name, O Most High, proclaiming your love in the morning and your faithfulness at night, to the music of the ten-stringed lyre and the melody of the harp. For you make me glad by your deeds, Lord; I sing for joy at what your hands have done.',
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

export function ThankfulnessPost({ imagePath, slug }: { imagePath?: string; slug: string }) {
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
              alt="November: Thankfulness"
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
            November 2026
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
            Thankfulness
          </h1>
          <p className="mt-4 text-xl text-gray-600 leading-relaxed">
            A fruitful heart of gratitude.
          </p>
        </header>

        <SectionHeading>Why Thankfulness?</SectionHeading>
        <Paragraph>
          We have walked through a full year of themes: consecration, establishment, obedience, faithfulness, increase, service, harvest, excellence, generosity, and impact. This month we take up thankfulness: a fruitful heart of gratitude. A life that has borne fruit is a life that overflows with thanks. Thankfulness is not an add-on. It is the natural response of a heart that has seen what God has done. When we look back at His deeds, we sing for joy. That is a fruitful heart of gratitude.
        </Paragraph>
        <Paragraph>
          In <ScriptureRef>Psalm 92:1–4</ScriptureRef>, the psalmist writes, &ldquo;It is good to praise the Lord and make music to your name, O Most High, proclaiming your love in the morning and your faithfulness at night. For you make me glad by your deeds, Lord; I sing for joy at what your hands have done.&rdquo; Praise and gratitude go together. We praise God because we are glad at what He has done. We sing for joy at His deeds. That is thankfulness: a heart that overflows with gratitude for the Lord&apos;s love, faithfulness, and works.
        </Paragraph>

        <ScriptureQuote reference={SCRIPTURE_REF}>
          {SCRIPTURE}
        </ScriptureQuote>

        <SectionHeading>What Thankfulness Means</SectionHeading>
        <Paragraph>
          To be thankful is to recognize and celebrate what God has done. It means we do not take His blessings for granted. We proclaim His love in the morning and His faithfulness at night. Thankfulness is a fruitful heart of gratitude: when we have received so much from God, our hearts respond with praise. Thankfulness is not only for the good days. It is a posture that can mark every season, because God&apos;s love and faithfulness do not change.
        </Paragraph>
        <Paragraph>
          A fruitful heart of gratitude also means that thankfulness is expressed. The psalmist makes music, proclaims, and sings. Gratitude is not only felt; it is spoken and sung. We give thanks in prayer, in worship, and in testimony. When we tell others what God has done, we are living out thankfulness. That is our focus for November: to cultivate a heart that is glad at God&apos;s deeds and that sings for joy at what His hands have done.
        </Paragraph>

        <Subheading>Sing for Joy</Subheading>
        <Paragraph>
          For you make me glad by your deeds, Lord; I sing for joy at what your hands have done. Thankfulness leads to joy. When we fix our eyes on what God has done, we are made glad. When we remember His love in the morning and His faithfulness at night, we have reason to sing. A fruitful heart is a grateful heart. As we close the year, we look back with thanks and look forward with hope. We sing for joy at what His hands have done.
        </Paragraph>

        <SectionHeading>A Word for This Month</SectionHeading>
        <Paragraph>
          Let November be a month of intentional thankfulness. Take time to praise the Lord and to name what He has done. Proclaim His love in the morning and His faithfulness at night. Make a habit of gratitude: in prayer, in worship, and in conversation. Let your heart be glad at His deeds and sing for joy at what His hands have done. We are cultivating a fruitful heart of gratitude.
        </Paragraph>

        <p className="mt-10 text-center text-gray-700 font-medium">
          It is good to praise the Lord. Sing for joy at what His hands have done.
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
