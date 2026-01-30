import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Parser from 'rss-parser'
import DOMPurify from 'isomorphic-dompurify'
import { Calendar, User, ArrowLeft } from 'lucide-react'

// Define the shape of a blog post
type BlogPost = {
  title: string
  link: string
  pubDate: string
  content: string // content:encoded
  contentSnippet: string
  guid: string
  categories?: string[]
  creator?: string
  isoDate: string
  'content:encoded'?: string
}

// Helper to extract slug from Medium URL
function getSlugFromUrl(url: string): string {
  const parts = url.split('/')
  const lastPart = parts[parts.length - 1]
  return lastPart.split('?')[0]
}

// Helper to extract the first image from the content
function extractImage(content: string): string | null {
  const match = content.match(/<img[^>]+src="([^">]+)"/)
  return match ? match[1] : null
}

async function getPost(slug: string): Promise<BlogPost | null> {
  const parser = new Parser()
  try {
    const feed = await parser.parseURL('https://medium.com/feed/grmblogs')
    const post = feed.items.find(item => {
        if (!item.link) return false
        return getSlugFromUrl(item.link) === slug
    })
    return post as BlogPost || null
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found | Great Redemption Ministries',
    }
  }

  return {
    title: `${post.title} | Great Redemption Ministries`,
    description: post.contentSnippet?.substring(0, 160) || `Read ${post.title} on GRM Blogs.`,
    openGraph: {
      title: post.title,
      description: post.contentSnippet?.substring(0, 160),
      type: 'article',
      publishedTime: post.isoDate,
      authors: [post.creator || 'Great Redemption Ministries'],
      images: extractImage(post['content:encoded'] || post.content) ? [extractImage(post['content:encoded'] || post.content)!] : [],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  // Sanitize and clean content
  let content = post['content:encoded'] || post.content
  
  // Remove the Medium tracking pixel image at the end
  content = content.replace(/<img[^>]+src="https:\/\/medium\.com\/_\/stat[^>]+>/g, '');
  
  // Remove the footer text "Title was originally published in GRMBlogs on Medium..."
  // This usually follows an <hr> tag
  // We can look for the pattern and remove it
  // Pattern: <hr><p><a href="...">Title</a> was originally published in <a href="...">GRMBlogs</a> on Medium...</p>
  // Let's use a regex that matches from <hr> to the end if it contains "originally published"
  content = content.replace(/<hr\s*\/?>\s*<p>[\s\S]*?originally published[\s\S]*?<\/p>\s*$/i, '');
  // Fallback for just the text if hr is missing or different
  content = content.replace(/<p>[\s\S]*?originally published[\s\S]*?Medium[\s\S]*?<\/p>\s*$/i, '');

  const cleanContent = DOMPurify.sanitize(content, {
    ADD_TAGS: ['iframe'], // Allow embeds if any
    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling']
  })

  return (
    <div className="bg-white min-h-screen pt-24 pb-16">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-10 text-center">
          <div className="mb-6">
             <Link href="/blogs" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-grm-primary transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blogs
            </Link>
          </div>

          <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-6">
            <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
              <Calendar className="h-3 w-3" />
              {new Date(post.pubDate).toLocaleDateString(undefined, {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
            {post.creator && (
              <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                <User className="h-3 w-3" />
                {post.creator}
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-8">
            {post.title}
          </h1>
        </header>

        {/* Content */}
        <div 
          className="prose prose-lg prose-blue max-w-none mx-auto
            prose-headings:font-bold prose-headings:text-gray-900 
            prose-p:text-gray-700 prose-p:leading-relaxed
            prose-a:text-grm-primary prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-8 prose-img:w-full
            prose-blockquote:border-l-4 prose-blockquote:border-grm-primary prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
            prose-figure:mx-auto
            prose-figcaption:text-center prose-figcaption:text-gray-500 prose-figcaption:mt-2
          "
          dangerouslySetInnerHTML={{ __html: cleanContent }}
        />
        
        {/* Footer removed as requested */}
      </article>
    </div>
  )
}
