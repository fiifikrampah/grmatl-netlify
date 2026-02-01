import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getBlogPostBySlug,
  getAllBlogPosts,
} from '@/lib/blogs.config'
import { FruitfulnessPost } from '@/components/blog/FruitfulnessPost'

// Map slug to the component that renders the full article.
function getPostContent(slug: string) {
  switch (slug) {
    case '2026-our-year-of-fruitfulness':
      return <FruitfulnessPost />
    default:
      return null
  }
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found | Great Redemption Ministries',
    }
  }

  return {
    title: `${post.title} | Great Redemption Ministries`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      images: [{ url: post.imagePath, alt: post.title }],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  const content = getPostContent(slug)

  if (!post || !content) {
    notFound()
  }

  return (
    <div className="bg-white min-h-screen pt-24 pb-16">
      {content}
    </div>
  )
}
