'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { formatDate } from '@/lib/utils'
import portfolioData from '@/data/portfolio.json'

export function Blog() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="blog" className="py-20 bg-foreground/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerContainer()}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={staggerItem} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Latest <span className="gradient-text">Blog Posts</span>
            </h2>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
              Thoughts, tutorials, and insights about web development
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-400 to-accent-purple mx-auto rounded-full mt-6" />
          </motion.div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {portfolioData.blog.map((post, index) => (
              <motion.article
                key={post.id}
                variants={staggerItem}
                whileHover={{ y: -5 }}
                className="group bg-background/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-primary-400/50 transition-all duration-300 cursor-hover"
              >
                {/* Post Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                {/* Post Content */}
                <div className="p-6">
                  {/* Meta Info */}
                  <div className="flex items-center text-foreground/60 text-sm mb-3 space-x-4">
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
                  <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary-400 transition-colors">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-foreground/70 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-primary-500/10 text-primary-400 rounded text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read More */}
                  <div className="flex items-center text-primary-400 text-sm font-medium group-hover:text-primary-300 transition-colors">
                    Read more
                    <svg
                      className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* View All Posts Button */}
          <motion.div variants={staggerItem} className="text-center mt-12">
            <button className="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors cursor-hover">
              View All Posts
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}