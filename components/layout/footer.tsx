'use client'

import { motion } from 'framer-motion'
import { HeartIcon, ArrowUpIcon } from '@heroicons/react/24/solid'
import portfolioData from '@/data/portfolio.json'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const { personal, socials } = portfolioData

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 border-t border-white/10">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * 200,
              opacity: 0,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-12">
          
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <motion.h3 
              className="text-4xl font-bold mb-4"
              style={{
                background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundSize: "200% 200%",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {personal.name}
            </motion.h3>
            <p className="text-xl text-blue-300 mb-6 font-medium">
              {personal.title}
            </p>
            <p className="text-gray-300 text-lg leading-relaxed max-w-md">
              Crafting digital experiences that push boundaries and deliver exceptional results. 
              Let's build something amazing together.
            </p>
            
            {/* CTA Button */}
            <motion.button
              onClick={() => {
                const element = document.getElementById('contact')
                if (element) element.scrollIntoView({ behavior: 'smooth' })
              }}
              className="mt-8 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 cursor-hover"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Work Together
            </motion.button>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-xl font-bold text-white mb-6">Navigate</h4>
            <ul className="space-y-4">
              {[
                { name: 'About', href: '#about' },
                { name: 'Skills', href: '#skills' },
                { name: 'Experience', href: '#experience' },
                { name: 'Projects', href: '#projects' },
                { name: 'Contact', href: '#contact' },
              ].map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors text-lg cursor-hover group flex items-center"
                    whileHover={{ x: 5 }}
                  >
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="text-xl font-bold text-white mb-6">Connect</h4>
            
            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <motion.a
                href={`mailto:${personal.email}`}
                className="block text-gray-300 hover:text-blue-400 transition-colors text-lg cursor-hover"
                whileHover={{ x: 5 }}
              >
                {personal.email}
              </motion.a>
              <p className="text-gray-400">{personal.location}</p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socials.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/5 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/10 group hover:border-blue-400/50 transition-all duration-300 cursor-hover"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                >
                  {/* Glowing background effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100"
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Social Icons */}
                  {social.icon === 'github' && (
                    <svg
                      className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors relative z-10"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  )}
                  
                  {social.icon === 'linkedin' && (
                    <svg
                      className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors relative z-10"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  )}
                  
                  {social.icon === 'globe' && (
                    <svg
                      className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors relative z-10"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  )}
                  
                  {social.icon === 'email' && (
                    <svg
                      className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors relative z-10"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )}
                  
                  <span className="sr-only">{social.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center"
        >
          <div className="flex items-center text-gray-400 text-sm mb-4 sm:mb-0">
            <span>© {currentYear} {personal.name}. Made with</span>
            <HeartIcon className="w-4 h-4 text-red-500 mx-2" />
            <span>using Next.js & Tailwind CSS</span>
          </div>
          
          {/* Back to Top Button */}
          <motion.button
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors cursor-hover group"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-sm">Back to top</span>
            <ArrowUpIcon className="w-4 h-4 group-hover:translate-y-[-2px] transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  )
}