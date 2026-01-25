'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { staggerContainer, staggerItem } from '@/lib/motion'
import portfolioData from '@/data/portfolio.json'

export function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { personal } = portfolioData

  return (
    <section id="contact" className="py-20">
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
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
              Ready to start your next project? Let's discuss how we can work together.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-400 to-accent-purple mx-auto rounded-full mt-6" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <motion.div variants={staggerItem} className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-foreground">
                  Let's start a conversation
                </h3>
                <p className="text-foreground/70 text-lg mb-8">
                  I'm always interested in hearing about new opportunities and exciting projects. 
                  Whether you have a question or just want to say hi, I'll try my best to get back to you!
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-500/10 rounded-full flex items-center justify-center">
                    <EnvelopeIcon className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-foreground/60 text-sm">Email</p>
                    <a
                      href={`mailto:${personal.email}`}
                      className="text-foreground font-medium hover:text-primary-400 transition-colors cursor-hover"
                    >
                      {personal.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-500/10 rounded-full flex items-center justify-center">
                    <PhoneIcon className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-foreground/60 text-sm">Phone</p>
                    <a
                      href={`tel:${personal.phone}`}
                      className="text-foreground font-medium hover:text-primary-400 transition-colors cursor-hover"
                    >
                      {personal.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-500/10 rounded-full flex items-center justify-center">
                    <MapPinIcon className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-foreground/60 text-sm">Location</p>
                    <p className="text-foreground font-medium">{personal.location}</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <p className="text-foreground/60 text-sm mb-4">Follow me on</p>
                <div className="flex space-x-4">
                  {portfolioData.socials.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-primary-500/10 hover:bg-primary-500/20 rounded-full flex items-center justify-center transition-all duration-300 cursor-hover group border border-primary-500/20 hover:border-primary-500/40"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
                    >
                      <span className="sr-only">{social.name}</span>
                      
                      {/* GitHub Icon */}
                      {social.icon === 'github' && (
                        <motion.svg
                          className="w-5 h-5 text-foreground/60 group-hover:text-primary-400 transition-colors"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </motion.svg>
                      )}
                      
                      {/* LinkedIn Icon */}
                      {social.icon === 'linkedin' && (
                        <motion.svg
                          className="w-5 h-5 text-foreground/60 group-hover:text-primary-400 transition-colors"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </motion.svg>
                      )}
                      
                      {/* Email Icon */}
                      {social.icon === 'email' && (
                        <motion.svg
                          className="w-5 h-5 text-foreground/60 group-hover:text-primary-400 transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </motion.svg>
                      )}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={staggerItem}>
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-3 bg-background/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-colors text-foreground placeholder-foreground/50"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 bg-background/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-colors text-foreground placeholder-foreground/50"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 bg-background/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-colors text-foreground placeholder-foreground/50"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full px-4 py-3 bg-background/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-colors text-foreground placeholder-foreground/50 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors cursor-hover"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}