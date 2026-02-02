// On-site blog posts. Add new posts here; each slug must have a content component in [slug]/page.tsx.
// Set published: false to hide a post from the listing and from direct URLs until it's ready.

export interface BlogPostConfig {
  slug: string
  title: string
  excerpt: string
  date: string // ISO date
  imagePath: string
  /** If false, post is hidden from the blog listing and returns 404 when visited. Default true. */
  published?: boolean
}

export const blogPosts: BlogPostConfig[] = [
  {
    slug: 'december-2026-legacy',
    title: 'December: Legacy',
    excerpt:
      'We bear fruit that remains for generations this month. Chosen and appointed to go and bear fruit that will last…',
    date: '2026-12-01',
    imagePath: '/images/blog/dec26-legacy.webp',
    published: false,
  },
  {
    slug: 'november-2026-thankfulness',
    title: 'November: Thankfulness',
    excerpt:
      'We cultivate a fruitful heart of gratitude this month. It is good to praise the Lord and sing for joy at His deeds…',
    date: '2026-11-01',
    imagePath: '/images/blog/nov26-thankfulness.webp',
    published: false,
  },
  {
    slug: 'october-2026-impact',
    title: 'October: Impact',
    excerpt:
      'We focus on transforming lives and communities this month. Let your light shine before others so they may glorify God…',
    date: '2026-10-01',
    imagePath: '/images/blog/oct26-impact.webp',
    published: false,
  },
  {
    slug: 'september-2026-generosity',
    title: 'September: Generosity',
    excerpt:
      'We bear fruit that blesses others this month. God supplies seed and enlarges the harvest of our righteousness…',
    date: '2026-09-01',
    imagePath: '/images/blog/sep26-generosity.webp',
    published: false,
  },
  {
    slug: 'august-2026-excellence',
    title: 'August: Excellence',
    excerpt:
      'We reflect God’s glory in all we do this month. Daniel’s exceptional qualities point us to a life of excellence…',
    date: '2026-08-01',
    imagePath: '/images/blog/aug26-excellence.webp',
    published: false,
  },
  {
    slug: 'july-2026-harvest',
    title: 'July: Harvest',
    excerpt:
      'We reap the results of faith and perseverance this month. A man reaps what he sows; we sow to the Spirit…',
    date: '2026-07-01',
    imagePath: '/images/blog/jul26-harvest.webp',
    published: false,
  },
  {
    slug: 'june-2026-service',
    title: 'June: Service',
    excerpt:
      'We bear fruit through love in action this month. Using our gifts to serve others as stewards of God’s grace…',
    date: '2026-06-01',
    imagePath: '/images/blog/jun26-service.webp',
    published: false,
  },
  {
    slug: 'may-2026-increase',
    title: 'May: Increase',
    excerpt:
      'We expand in influence and capacity this month. The Lord calls us to enlarge our tent and prepare for His increase…',
    date: '2026-05-01',
    imagePath: '/images/blog/may26-increase.webp',
    published: false,
  },
  {
    slug: 'april-2026-faithfulness',
    title: 'April: Faithfulness',
    excerpt:
      'We bear fruit through consistency and trust this month. Faithfulness in the small things leads to harvest in due season…',
    date: '2026-04-01',
    imagePath: '/images/blog/apr26-faithfulness.webp',
    published: false,
  },
  {
    slug: 'march-2026-obedience',
    title: 'March: Obedience',
    excerpt:
      'We walk in alignment with God’s Word this month. Obedience positions us for His blessing and keeps our lives rooted in His will…',
    date: '2026-03-01',
    imagePath: '/images/blog/mar26-obedience.webp',
    published: false,
  },
  {
    slug: 'february-2026-establishment',
    title: 'February: Establishment',
    excerpt:
      'We build on January’s consecration by sinking our roots deeper in Christ. This month we focus on being rooted, built up, and strengthened in Him…',
    date: '2026-02-01',
    imagePath: '/images/blog/feb26-establishment.webp',
    published: true,
  },
  {
    slug: 'january-2026-consecration',
    title: 'January: Consecration',
    excerpt:
      'We set ourselves apart for the Lord in January so that He can do amazing things among us. Consecration prepares the ground for fruitfulness…',
    date: '2026-01-01',
    imagePath: '/images/blog/jan26-consecration.webp',
    published: true,
  },
  {
    slug: '2026-our-year-of-fruitfulness',
    title: '2026: Our Year of Fruitfulness',
    excerpt:
      'Establishing the theme God placed on our hearts for 2026: fruitfulness, rooted in Christ, and the direction the Lord wants to lead the church…',
    date: '2026-01-01',
    imagePath: '/images/blog/2026-theme.webp',
    published: true,
  },
]

export function getBlogPostBySlug(slug: string): BlogPostConfig | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function getAllBlogPosts(): BlogPostConfig[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

/** Only published posts. Use for the blog listing and static params. */
export function getPublishedBlogPosts(): BlogPostConfig[] {
  return getAllBlogPosts().filter((p) => p.published !== false)
}
