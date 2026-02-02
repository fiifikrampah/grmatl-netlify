import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { AmenButton } from '@/components/blog/AmenButton'

const SCRIPTURE = `So, my brothers and sisters, you also died to the law through the body of Christ, that you might belong to another, to him who was raised from the dead, in order that we might bear fruit for God.`
const SCRIPTURE_REF = 'Romans 7:4 (NIV)'

/** Verse text (NIV) for hover tooltips. Key matches reference as shown in the post. */
const VERSE_TOOLTIPS: Record<string, string> = {
  'John 15:5':
    'I am the vine; you are the branches. If you remain in me and I in you, you will bear much fruit; apart from me you can do nothing.',
  'Galatians 5:22-23':
    'But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control. Against such things there is no law.',
  'John 15:8':
    'This is to my Father’s glory, that you bear much fruit, showing yourselves to be my disciples.',
  'Romans 7:4':
    'So, my brothers and sisters, you also died to the law through the body of Christ, that you might belong to another, to him who was raised from the dead, in order that we might bear fruit for God.',
  'Genesis 1:28':
    'God blessed them and said to them, “Be fruitful and increase in number; fill the earth and subdue it.”',
  'Jeremiah 17:7-8':
    'But blessed is the one who trusts in the Lord... They will be like a tree planted by the water that sends out its roots by the stream. It does not fear when heat comes; its leaves are always green.',
  'John 7:38':
    'Whoever believes in me, as Scripture has said, rivers of living water will flow from within them.',
  'Isaiah 60:1':
    'Arise, shine, for your light has come, and the glory of the Lord rises upon you.',
}

const BANNER_ELEMENTS: { title: string; body: string; ref?: string }[] = [
  {
    title: 'The Vineyard and Vine',
    body: 'The vineyard represents Christ and His people. The vine reminds us that Jesus is our source of life. Without Him, we can do nothing. Just as branches stay connected to the vine to bear fruit, we must remain in Christ to live fruitful lives',
    ref: 'John 15:5',
  },
  {
    title: 'The Grapes and Fruit Clusters',
    body: 'The ripe grapes stand for the fruit of the Spirit: love, joy, peace, and every godly quality that flows from a life led by the Holy Spirit. Their different colors show the variety of gifts and blessings within the church, yet all come from one source: God',
    ref: 'Galatians 5:22-23',
  },
  {
    title: 'The Roots and Soil',
    body: "The fertile soil and strong roots show that lasting fruitfulness comes from being grounded in God's Word and truth. When our roots go deep, our faith remains steady, and our fruit endures",
    ref: 'Jeremiah 17:7-8',
  },
  {
    title: 'The Flowing Stream',
    body: 'The stream running through the vineyard symbolizes the Holy Spirit, who refreshes, nourishes, and empowers us to grow and flourish even in dry seasons',
    ref: 'John 7:38',
  },
  {
    title: 'The Rising Light',
    body: "The light of dawn represents a new season: a time of renewal, divine favor, and growth. It reminds us that God's glory is shining on His church in 2026, bringing forth visible fruit in every area of life",
    ref: 'Isaiah 60:1',
  },
  {
    title: 'The Golden Title: "Fruitfulness"',
    body: "The gold lettering represents divine blessing and glory. It declares that this will be a year of spiritual productivity: not just success in human terms, but fruit that glorifies God and impacts others.",
  },
]

const DECLARATION_BREAKDOWN = [
  {
    line: 'We are rooted in Christ, our eternal Source of Life!',
    explanation: 'We anchor our identity and strength in Jesus. He is not a side note; He is the root system that keeps us standing and alive. From this place of connection, everything else grows.',
  },
  {
    line: 'His divine enablement flows through us without measure!',
    explanation: "We are not relying on our own effort. God's power and grace move through us. What we cannot do in the flesh, He does through us by His Spirit. We open ourselves to His unlimited supply.",
  },
  {
    line: 'We will bear lasting fruit in our faith, our families, our work, and our community.',
    explanation: 'Fruitfulness is not abstract. It shows up in specific places: in our walk with God, at home, in our jobs and calling, and in the lives we touch. We are believing for fruit that remains.',
  },
  {
    line: 'We are chosen to increase, destined for impact, and to make a difference for His glory.',
    explanation: 'God has chosen us for growth and for influence. Our lives are meant to count. As we bear fruit, we are not simply surviving; we are advancing His kingdom and bringing Him glory.',
  },
  {
    line: "This year, our lives will overflow with supernatural abundance!",
    explanation: 'We are declaring that 2026 will be marked by overflow. Not scarcity, not barely enough, but abundance that can only be explained by God. Our cups will run over.',
  },
  {
    line: "In Jesus' mighty Name, Amen!",
    explanation: 'We say this in the authority and name of Jesus. It is not a wish; it is a declaration of faith, and we seal it in His name.',
  },
]

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
  return (
    <p className="text-gray-600 leading-relaxed mb-5">
      {children}
    </p>
  )
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

export function FruitfulnessPost({ slug }: { slug: string }) {
  return (
    <article className="min-h-screen bg-white">
      {/* Back link */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <Link
          href="/blogs"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-grm-primary transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blogs
        </Link>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Title */}
        <header className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700/90 mb-3">
            2026 Theme
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
            2026 Our Year of{' '}
            <span className="bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
              Fruitfulness
            </span>
          </h1>
        </header>

        {/* Intro: why this direction */}
        <SectionHeading>Our Direction for 2026</SectionHeading>
        <Paragraph>
          Last year, 2025, was our Year of Rebirth. The Lord led us into a season of new beginnings: fresh identity in Christ, renewed commitment to His Word, and a church family learning again what it means to be alive in Him. That was not an end. It was a foundation.
        </Paragraph>
        <Paragraph>
          This year, the Lord is leading us forward into fruitfulness. Rebirth was the awakening; 2026 is the growing. We believe God is calling Great Redemption Ministries to not only be alive in Christ but to bear visible, lasting fruit in every area of our lives. That is the direction He has set before us, and it is why we have embraced this theme with full hearts.
        </Paragraph>

        {/* Biblical foundation: what, why, how */}
        <SectionHeading>Biblical Foundation</SectionHeading>
        <Paragraph>
          Before we talk about our banner or declaration, we need to understand what fruitfulness actually is, why it matters, and how God invites us into it. Scripture does not treat fruitfulness as a merely nice idea. It presents it as the natural outcome of a life connected to God.
        </Paragraph>

        <Subheading>What is fruitfulness?</Subheading>
        <Paragraph>
          In the Bible, fruit is what grows from a healthy connection to the source. Jesus said, &ldquo;I am the vine; you are the branches. If you remain in me and I in you, you will bear much fruit; apart from me you can do nothing&rdquo; (<ScriptureRef>John 15:5</ScriptureRef>). So fruitfulness is not first about busyness or achievement. It is about abiding in Christ and letting His life flow through us. What grows from that is fruit: character that looks like Him (<ScriptureRef>Galatians 5:22-23</ScriptureRef>), good works that glorify the Father (<ScriptureRef>John 15:8</ScriptureRef>), and lasting impact in the lives of others.
        </Paragraph>
        <Paragraph>
          Paul writes in <ScriptureRef>Romans 7:4</ScriptureRef> that we have died to the law through the body of Christ &ldquo;in order that we might bear fruit for God.&rdquo; Our new life in Christ has a purpose: to belong to Him and to bear fruit for Him. So fruitfulness is both a gift and a calling. It is what God does in us and through us when we stay connected to Him.
        </Paragraph>

        <Subheading>Why does it matter?</Subheading>
        <Paragraph>
          God created us to flourish. From the beginning, He placed humanity in a garden and gave the mandate to be fruitful (<ScriptureRef>Genesis 1:28</ScriptureRef>). Even after the Fall, His heart has always been to restore His people to a place of fruitfulness: rooted in Him, nourished by His Word and Spirit, and productive for His glory. When we bear fruit, we are not simply doing good things. We are fulfilling part of why we exist. We are reflecting His nature and advancing His kingdom.
        </Paragraph>
        <Paragraph>
          For our church, fruitfulness matters because we want to be more than a gathering. We want to be a people through whom God is visibly at work: in our character, our families, our workplaces, and our community. That is the &ldquo;why&rdquo; behind this theme.
        </Paragraph>

        <Subheading>How do we pursue it?</Subheading>
        <Paragraph>
          We do not manufacture fruit by trying harder. We receive it by staying connected. That means abiding in Christ through His Word and prayer, yielding to the Holy Spirit, and obeying what He says. It means putting down roots in good soil (God&apos;s truth) and letting the stream of His Spirit refresh us. It also means staying in community: we are branches on the same vine, and we need each other to grow.
        </Paragraph>
        <Paragraph>
          So the &ldquo;how&rdquo; is not a list of tasks. It is a posture: remain in Him, depend on Him, and step out in faith where He leads. As we do that, fruit will come. Our job is to stay connected; His job is to bring the increase.
        </Paragraph>

        {/* Scripture block */}
        <ScriptureQuote reference={SCRIPTURE_REF}>
          {SCRIPTURE}
        </ScriptureQuote>

        {/* Banner: introduce then elements */}
        <SectionHeading>Understanding Our Theme Visual</SectionHeading>
        <Paragraph>
          We have a visual that captures this theme: a vineyard at the break of day, with ripe fruit, deep roots, and light rising over the scene. It is more than a graphic. Each part of the image is tied to what we have been saying from Scripture. Here is what you are seeing when you look at it.
        </Paragraph>

        <div className="my-12">
          <div className="relative aspect-[16/10] sm:aspect-[2/1] rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5">
            <Image
              src="/images/blog/2026-theme.webp"
              alt="2026 Our Year of Fruitfulness: vineyard banner with golden typography and Romans 7:4"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>
        </div>

        <div className="space-y-10">
          {BANNER_ELEMENTS.map((item, i) => (
            <div key={item.title}>
              <h3 className="text-base font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-800 font-semibold text-xs">
                  {i + 1}
                </span>
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed pl-9">
                {item.body}
                {item.ref ? <> (<ScriptureRef>{item.ref}</ScriptureRef>).</> : null}
              </p>
            </div>
          ))}
        </div>

        {/* Declaration with breakdown */}
        <SectionHeading>Our 2026 Declaration</SectionHeading>
        <Paragraph>
          We have put our heart for 2026 into a declaration. It is not a slogan. It is what we are saying with our mouths and believing in our hearts. Below is each line, followed by what it means and why we say it.
        </Paragraph>

        <div className="relative rounded-2xl bg-gradient-to-b from-amber-50 to-white p-6 sm:p-8 my-12 shadow-lg ring-1 ring-amber-100/80">
          <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />
          <div className="space-y-8">
            {DECLARATION_BREAKDOWN.map((item, i) => (
              <div key={i}>
                <p className="text-lg font-semibold text-gray-900 mb-2">
                  {item.line}
                </p>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base pl-0 sm:pl-4 border-l-0 sm:border-l-2 sm:border-amber-200">
                  {item.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Conclusion */}
        <SectionHeading>Moving Forward in Faith</SectionHeading>
        <Paragraph>
          By now you have seen where the Lord is leading us, what fruitfulness means in Scripture, how the banner illustrates it, and what we are declaring over 2026. Our hope is that you are not only informed but stirred. The God who brought us through rebirth is the same God who is calling us into fruitfulness. He is the vine; we are the branches. He is the source; we are the bearers. And He has said that if we remain in Him, we will bear much fruit.
        </Paragraph>
        <Paragraph>
          So step into this year with expectation. Put your roots down in His Word. Let His Spirit flow through you. And believe that your life, your home, your work, and your witness can overflow with fruit that lasts. We are in this together as a church, and we are declaring it: 2026 is our year of fruitfulness. Not by our might, but by His. Not for our name, but for His glory.
        </Paragraph>
        <p className="mt-10 text-center text-gray-700 font-medium mb-12">
          We are rooted in Christ. We bear fruit for God.
        </p>

        <AmenButton slug={slug} />

        <div className="mt-12 pt-8 border-t border-amber-100 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Join Us in This Season</h3>
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
