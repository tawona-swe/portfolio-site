'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { StarIcon } from '@heroicons/react/24/solid'
import { staggerContainer, staggerItem } from '@/lib/motion'
import portfolioData from '@/data/portfolio.json'

export function Testimonials() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="testimonials" className="py-20">
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
              Client <span className="gradient-text">Testimonials</span>
            </h2>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
              What clients and colleagues say about working with me
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-400 to-accent-purple mx-auto rounded-full mt-6" />
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                variants={staggerItem}
                whileHover={{ y: -5 }}
                className="bg-background/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-primary-400/50 transition-all duration-300"
              >
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-foreground/70 mb-6 italic">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-foreground/60 text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}