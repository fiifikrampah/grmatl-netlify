import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getBlogPostBySlug,
  getPublishedBlogPosts,
} from '@/lib/blogs.config'
import { FruitfulnessPost } from '@/components/blog/FruitfulnessPost'
import { ConsecrationPost } from '@/components/blog/ConsecrationPost'
import { EstablishmentPost } from '@/components/blog/EstablishmentPost'
import { ObediencePost } from '@/components/blog/ObediencePost'
import { AprilFaithfulnessPost } from '@/components/blog/AprilFaithfulnessPost'
import { IncreasePost } from '@/components/blog/IncreasePost'
import { ServicePost } from '@/components/blog/ServicePost'
import { HarvestPost } from '@/components/blog/HarvestPost'
import { ExcellencePost } from '@/components/blog/ExcellencePost'
import { GenerosityPost } from '@/components/blog/GenerosityPost'
import { ImpactPost } from '@/components/blog/ImpactPost'
import { ThankfulnessPost } from '@/components/blog/ThankfulnessPost'
import { LegacyPost } from '@/components/blog/LegacyPost'

// Map slug to the component that renders the full article. Pass imagePath for monthly posts that show a banner; slug for Amen button.
function getPostContent(slug: string, imagePath?: string) {
  switch (slug) {
    case '2026-our-year-of-fruitfulness':
      return <FruitfulnessPost slug={slug} />
    case 'january-2026-consecration':
      return <ConsecrationPost imagePath={imagePath} slug={slug} />
    case 'february-2026-establishment':
      return <EstablishmentPost imagePath={imagePath} slug={slug} />
    case 'march-2026-obedience':
      return <ObediencePost imagePath={imagePath} slug={slug} />
    case 'april-2026-faithfulness':
      return <AprilFaithfulnessPost imagePath={imagePath} slug={slug} />
    case 'may-2026-increase':
      return <IncreasePost imagePath={imagePath} slug={slug} />
    case 'june-2026-service':
      return <ServicePost imagePath={imagePath} slug={slug} />
    case 'july-2026-harvest':
      return <HarvestPost imagePath={imagePath} slug={slug} />
    case 'august-2026-excellence':
      return <ExcellencePost imagePath={imagePath} slug={slug} />
    case 'september-2026-generosity':
      return <GenerosityPost imagePath={imagePath} slug={slug} />
    case 'october-2026-impact':
      return <ImpactPost imagePath={imagePath} slug={slug} />
    case 'november-2026-thankfulness':
      return <ThankfulnessPost imagePath={imagePath} slug={slug} />
    case 'december-2026-legacy':
      return <LegacyPost imagePath={imagePath} slug={slug} />
    default:
      return null
  }
}

export async function generateStaticParams() {
  const posts = getPublishedBlogPosts()
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

  // Use the optimized preview image from the public/images/previews folder
  // Convention: /public/images/previews/<filename>.jpg
  const filename = post.imagePath.split('/').pop()?.split('.')[0] || ''
  const previewImage = filename
    ? `/images/previews/${filename}.jpg`
    : '/images/previews/main-preview.jpg'

  return {
    title: `${post.title} | Great Redemption Ministries`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `/blogs/${slug}`,
      publishedTime: post.date,
      siteName: 'Great Redemption Ministries',
      images: [
        {
          url: previewImage,
          alt: post.title,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [previewImage],
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
  if (!post || post.published === false) {
    notFound()
  }
  const content = getPostContent(slug, post.imagePath)

  return (
    <div className="bg-white min-h-screen pt-24 pb-16">
      {content}
    </div>
  )
}
