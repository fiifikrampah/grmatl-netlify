// On-site blog posts. Add new posts here; each slug must have a content component in [slug]/page.tsx.

export interface BlogPostConfig {
  slug: string
  title: string
  excerpt: string
  date: string // ISO date
  imagePath: string
}

export const blogPosts: BlogPostConfig[] = [
  {
    slug: '2026-our-year-of-fruitfulness',
    title: '2026 Our Year of Fruitfulness',
    excerpt:
      'Establishing the theme God placed on our hearts for 2026: fruitfulness, rooted in Christ, and the direction the Lord wants to lead the church.',
    date: '2026-01-01',
    imagePath: '/images/blog/2026-theme.jpg.jpeg',
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
