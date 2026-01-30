import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Parser from 'rss-parser'
import { BookOpen, Calendar, User, ArrowRight, ExternalLink } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Blogs | Great Redemption Ministries',
  description: 'Read the latest articles and spiritual insights from Great Redemption Ministries.',
}

type BlogPost = {
  title: string
  link: string
  pubDate: string
  content: string
  contentSnippet: string
  guid: string
  categories?: string[]
  creator?: string
  isoDate: string
  'content:encoded'?: string
}

// Helper to extract the first image from the content content
function extractImage(content: string | undefined): string | null {
  if (!content) return null
  const match = content.match(/<img[^>]+src="([^">]+)"/)
  return match ? match[1] : null
}

// Helper to strip HTML tags for snippet
function stripHtml(html: string): string {
  if (!html) return ''
  
  // Remove figcaption elements and their content entirely
  const cleaned = html.replace(/<figcaption[\s\S]*?<\/figcaption>/gi, '');
  
  // Replace <br>, <p>, <div>, <blockquote> tags with spaces to prevent words joining
  const spaced = cleaned.replace(/<(br|p|div|blockquote|li|\/p|\/div|\/blockquote|\/li)>/gi, ' ');
  
  // Strip remaining tags
  let text = spaced.replace(/<[^>]*>?/gm, '');
  
  // Remove residual "Photo by ... on Unsplash" if it somehow survived (including trailing text)
  text = text.replace(/Photo by .+? on Unsplash/gi, '');
  
  // Clean up whitespace
  return text.replace(/\s+/g, ' ').trim();
}

// Helper to extract slug from Medium URL
function getSlugFromUrl(url: string): string {
  // Medium URLs: https://medium.com/grmblogs/the-title-of-the-post-12345abcdef
  // We want the last part
  const parts = url.split('/')
  const lastPart = parts[parts.length - 1]
  // Remove query params if any
  return lastPart.split('?')[0]
}

export default async function BlogsPage() {
  const parser = new Parser()
  let posts: BlogPost[] = []
  
  try {
    const feed = await parser.parseURL('https://medium.com/feed/grmblogs')
    posts = feed.items as BlogPost[]
    
    // Limit to 9 posts
    posts = posts.slice(0, 9);
  } catch (error) {
    console.error('Error fetching blog posts:', error)
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background Image with Gradient Fade */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/blog/hero.jpg"
            alt="GRM Blogs"
            fill
            className="object-cover object-[center_35%]"
            priority
          />
          {/* Gradient Overlay to fade into white content area */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-white" />
          {/* Stronger bottom fade to ensure seamless blending */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent" />
          {/* Subtle blur to keep text readable and modern */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />
          {/* Menu Visibility Gradient */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 to-transparent" />
        </div>

        {/* Ambient Background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50/20 rounded-full blur-[120px] -translate-y-1/4 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-50/20 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Text Visibility Spotlight */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[900px] h-[500px] bg-white/20 blur-[100px] -z-10 rounded-full pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
                <span className="text-gray-900">Our</span> <span className="text-grm-primary">Blogs</span>
              </h1>
              <p className="text-xl text-gray-900 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
                Spiritual insights, church news, and words of encouragement from our ministry team.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => {
              const imageUrl = extractImage(post['content:encoded'] || post.content || '')
              // Create a snippet, limit to ~150 chars
              // Prefer contentSnippet if available and not empty/useless, otherwise strip content
              // Medium RSS contentSnippet is often just empty or not what we want, so let's try stripping content first if snippet is poor
              let snippet = post.contentSnippet 
              
              if (!snippet || snippet.length < 10 || snippet === '...') {
                 snippet = stripHtml(post['content:encoded'] || post.content || '')
              } else {
                 snippet = stripHtml(snippet) // Ensure snippet is clean
              }
              
              snippet = snippet.length > 150 ? snippet.substring(0, 150) + '...' : snippet
              
              const slug = getSlugFromUrl(post.link)

              return (
                <Reveal key={`${post.guid || index}-${index}`} delay={index * 100} className="h-full">
                  <Link href={`/blogs/${slug}`} className="group block h-full">
                    <Card className="h-full hover:shadow-xl transition-all duration-300 border-gray-100 overflow-hidden flex flex-col">
                      <div className="relative aspect-[16/9] bg-gray-100 overflow-hidden">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-blue-50">
                            <BookOpen className="h-12 w-12 text-grm-primary/30" />
                          </div>
                        )}
                        {/* Badge removed */}
                      </div>
                      
                      <CardContent className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(post.pubDate).toLocaleDateString(undefined, {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                          {post.creator && (
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {post.creator}
                            </span>
                          )}
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-grm-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                          {snippet}
                        </p>
                        
                        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center text-grm-primary font-semibold text-sm group-hover:gap-2 transition-all">
                          Read Full Blog <ArrowRight className="ml-1 h-4 w-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="h-10 w-10 text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-500 mb-8">We couldn&apos;t fetch the latest articles at this time.</p>
            <Button asChild>
              <a href="https://medium.com/grmblogs" target="_blank" rel="noopener noreferrer">
                Visit our Medium Page <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        )}

        <div className="mt-20 text-center">
          <p className="text-gray-600 mb-6">Want to read more?</p>
          <Button variant="outline" size="lg" className="rounded-full px-8 border-grm-primary text-grm-primary hover:bg-grm-blue-50" asChild>
            <a href="https://medium.com/grmblogs" target="_blank" rel="noopener noreferrer">
              View All on Medium <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
