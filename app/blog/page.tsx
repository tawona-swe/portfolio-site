import { Metadata } from 'next'
import Link from 'next/link'
import { CalendarIcon, ClockIcon, TagIcon } from '@heroicons/react/24/outline'
import portfolioData from '@/data/portfolio.json'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Blog | Tawona Rwatida - Full Stack Developer',
  description: 'Read articles about full-stack development, e-commerce, AI, NLP, and software engineering insights from Tawona Rwatida.',
  keywords: ['blog', 'software development', 'e-commerce', 'AI', 'NLP', 'full-stack', 'web development'],
  openGraph: {
    title: 'Blog | Tawona Rwatida',
    description: 'Articles about full-stack development and software engineering',
    type: 'website',
    url: 'https://tawona-swe.github.io/blog',
  },
}

export default function BlogPage() {
  const posts = portfolioData.blog.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Header */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Blog & <span className="gradient-text">Insights</span>
          </h1>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            Thoughts, tutorials, and insights about web development, e-commerce, AI, and software engineering
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-400 to-accent-purple mx-auto rounded-full mt-6" />
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group bg-background/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-primary-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10"
            >
              {/* Post Image */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={post.image}
                  alt={`${post.title} - Blog post cover image`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Post Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex flex-wrap items-center text-foreground/60 text-sm mb-3 gap-4">
                  <div className="flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    {formatDate(post.date)}
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>

                {/* Title */}
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary-400 transition-colors cursor-pointer">
                    {post.title}
                  </h2>
                </Link>

                {/* Excerpt */}
                <p className="text-foreground/70 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-500/10 text-primary-400 border border-primary-500/20"
                    >
                      <TagIcon className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Read More Link */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-primary-400 hover:text-primary-300 font-medium transition-colors"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {posts.length === 0 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-foreground/70 text-lg">No blog posts yet. Check back soon!</p>
        </div>
      )}
    </main>
  )
}
