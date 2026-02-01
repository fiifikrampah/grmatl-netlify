import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { BookOpen, Calendar, ArrowRight } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { getAllBlogPosts } from '@/lib/blogs.config'

export const metadata: Metadata = {
  title: 'Blog | Great Redemption Ministries',
  description:
    'Read articles and spiritual insights from Great Redemption Ministries: themes, direction, and encouragement for the church.',
}

export default async function BlogsPage() {
  const posts = getAllBlogPosts()

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0 [mask-image:linear-gradient(to_bottom,black_30%,transparent_100%)]">
          <Image
            src="/images/blog/hero.webp"
            alt="GRM Blog"
            fill
            className="object-cover object-[center_35%]"
            priority
            quality={92}
          />
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.5)_0%,_rgba(15,58,112,0.6)_60%,_rgba(15,58,112,0.9)_100%)] z-10" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center drop-shadow-lg">
            <Reveal>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
                <span className="text-white">Our</span>{' '}
                <span className="text-white">Blog</span>
              </h1>
              <p className="text-xl text-white font-medium max-w-2xl mx-auto leading-relaxed">
                Spiritual insights, church themes, and words of encouragement
                from our ministry.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {posts.map((post, index) => (
              <Reveal key={post.slug} delay={index * 100} className="h-full">
                <Link href={`/blogs/${post.slug}`} className="group block h-full">
                  <article className="h-full flex flex-col bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative">
                    {/* Hover ambient blur effect */}
                    <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-amber-200/40 rounded-full blur-[60px] translate-y-1/3 translate-x-1/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

                    {/* Image container - 3/2 aspect shows more of landscape images with less crop */}
                    <div className="relative z-10 aspect-[3/2] overflow-hidden bg-gray-100">
                      <Image
                        src={post.imagePath}
                        alt={post.title}
                        fill
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        quality={92}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {/* Date badge */}
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide backdrop-blur-md shadow-sm bg-white/90 text-gray-800">
                          {new Date(post.date).toLocaleDateString(undefined, {
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col flex-grow p-8">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <Calendar className="h-4 w-4 text-grm-primary shrink-0" />
                        <span>
                          {new Date(post.date).toLocaleDateString(undefined, {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-grm-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-8 line-clamp-3 flex-grow">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center text-sm font-bold text-gray-900 group-hover:text-grm-primary transition-colors pt-6 border-t border-gray-100">
                        Read Article
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="h-10 w-10 text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No articles yet
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              New posts will appear here. Check back soon for spiritual
              insights and church updates.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
