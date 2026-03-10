import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeftIcon, CalendarIcon, ClockIcon, TagIcon } from '@heroicons/react/24/outline'
import portfolioData from '@/data/portfolio.json'
import { formatDate } from '@/lib/utils'
import { notFound } from 'next/navigation'
import { getBlogPostContent } from '@/lib/blog-content'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return portfolioData.blog.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = portfolioData.blog.find((p) => p.slug === params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | Tawona Rwatida Blog`,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `https://tawona-swe.github.io/blog/${post.slug}`,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = portfolioData.blog.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  const content = getBlogPostContent(post.slug)
  const relatedPosts = portfolioData.blog
    .filter((p) => p.id !== post.id && p.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, 3)

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-primary-400 hover:text-primary-300 font-medium transition-colors mb-8"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-foreground">
          {post.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center text-foreground/60 text-sm mb-8 gap-6 pb-8 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <CalendarIcon className="w-4 h-4 mr-2" />
            {formatDate(post.date)}
          </div>
          <div className="flex items-center">
            <ClockIcon className="w-4 h-4 mr-2" />
            {post.readTime}
          </div>
          <div className="flex items-center">
            <span className="text-foreground/40 mr-2">•</span>
            <span>{Math.ceil(post.excerpt.split(' ').length / 200)} min read</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative rounded-2xl overflow-hidden mb-12 h-96">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-500/10 text-primary-400 border border-primary-500/20"
            >
              <TagIcon className="w-3 h-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none mb-12">
          <div className="text-foreground/80 leading-relaxed space-y-6">
            {content ? (
              <div dangerouslySetInnerHTML={{ __html: content }} />
            ) : (
              <>
                <p className="text-lg">{post.excerpt}</p>
                <p>
                  This is a placeholder for the full blog post content. The detailed article about "{post.title}" 
                  will be displayed here once the full content is added.
                </p>
                <p>
                  Topics covered in this post include: {post.tags.join(', ')}.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Author Info */}
        <div className="bg-background/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700 mb-12">
          <div className="flex items-center gap-4">
            <img
              src="/images/avatar.png"
              alt="Tawona Rwatida"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold text-foreground">Tawona Rwatida</h3>
              <p className="text-foreground/70">Full Stack Software Developer</p>
              <p className="text-foreground/60 text-sm mt-1">
                Passionate about building scalable web and mobile applications. Specialized in e-commerce, AI, and system integration.
              </p>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-8 text-foreground">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group bg-background/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-primary-400/50 transition-all duration-300"
                >
                  <div className="relative overflow-hidden h-32">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground group-hover:text-primary-400 transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-foreground/60 text-xs mt-2">{relatedPost.readTime}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </main>
  )
}
