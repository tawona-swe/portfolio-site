'use client'

import { useRef, useEffect } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { ArrowDownIcon, SparklesIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'
import { MorphingText } from '@/components/ui/morphing-text'
import { TechIcon } from '@/components/ui/skill-icons'
import portfolioData from '@/data/portfolio.json'

const roles = [
  'Full Stack Software Developer',
  'E-commerce Platform Architect',
  'AI & System Integration Expert',
  'Laravel & React Specialist',
  'Digital Innovation Creator'
]

const ParticleField = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400 rounded-full"
          initial={{
            x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1920,
            y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 1080,
            opacity: 0,
          }}
          animate={{
            x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1920,
            y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 1080,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  )
}

export function EpicHero() {
  const { personal } = portfolioData
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const scrollToAbout = () => {
    const element = document.getElementById('about')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section 
      ref={ref}
      id="home" 
      className="relative min-h-screen flex items-start justify-center overflow-hidden bg-gradient-to-br from-gray-950 via-slate-900 to-black pt-24 pb-12"
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-slate-800/10 via-gray-800/10 to-black/20"
        animate={{
          background: [
            "linear-gradient(135deg, rgba(30, 41, 59, 0.1) 0%, rgba(17, 24, 39, 0.1) 50%, rgba(0, 0, 0, 0.2) 100%)",
            "linear-gradient(135deg, rgba(17, 24, 39, 0.1) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(30, 41, 59, 0.1) 100%)",
            "linear-gradient(135deg, rgba(0, 0, 0, 0.2) 0%, rgba(30, 41, 59, 0.1) 50%, rgba(17, 24, 39, 0.1) 100%)",
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Particle Field */}
      <ParticleField />

      {/* Floating Orbs */}
      <motion.div
        className="absolute top-20 left-10 w-96 h-96 bg-slate-700/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 bg-gray-700/5 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.1, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-40 w-full flex flex-col justify-center min-h-[calc(100vh-6rem)]">
        <div className="text-center">
          {/* Welcome Badge */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <motion.span
              className="inline-flex items-center space-x-2 px-6 py-3 bg-white/5 backdrop-blur-xl rounded-full text-gray-300 border border-white/10"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <SparklesIcon className="w-5 h-5" />
              <span className="text-sm font-medium">Welcome to my digital universe</span>
              <SparklesIcon className="w-5 h-5" />
            </motion.span>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-6">
              <span className="text-white">Hi, I'm </span>
              <motion.span
                className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: "200% 200%"
                }}
              >
                {personal.name}
              </motion.span>
            </h1>
          </motion.div>

          {/* Morphing Role */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-8"
          >
            <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-300 h-20 flex items-center justify-center">
              <MorphingText texts={roles} className="text-center" />
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            {personal.subtitle}
          </motion.p>

          {/* Skills Icons Line */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-wrap justify-center items-center gap-6 mb-12 max-w-4xl mx-auto"
          >
            <span className="text-gray-400 text-sm font-semibold mr-4">Tech Stack:</span>
            {[
              'React', 'Next.js', 'TypeScript', 'Laravel', 'Python', 
              'Java/Spring Boot', 'Angular', 'MySQL', 'Docker', 'AWS', 'Node.js'
            ].map((tech, index) => (
              <motion.div
                key={tech}
                className="flex items-center space-x-2 group cursor-pointer"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.9 + index * 0.1,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -2,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="w-8 h-8 bg-white/5 backdrop-blur-xl rounded-xl flex items-center justify-center border border-white/10 group-hover:border-gray-400/50 transition-all duration-300">
                  <TechIcon name={tech} className="w-5 h-5 text-gray-400 group-hover:text-gray-300 transition-colors" />
                </div>
                <span className="text-gray-400 group-hover:text-white text-sm font-medium transition-colors">
                  {tech}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          >
            <motion.button
              onClick={scrollToAbout}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 text-white rounded-2xl font-semibold text-lg overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative flex items-center justify-center space-x-2">
                <RocketLaunchIcon className="w-5 h-5" />
                <span>Explore My Universe</span>
                <ArrowDownIcon className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </span>
            </motion.button>

            <motion.a
              href={personal.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 border-2 border-white/30 text-white rounded-2xl font-semibold text-lg backdrop-blur-xl hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center justify-center space-x-2">
                <span>Download Resume</span>
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  📄
                </motion.div>
              </span>
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.8, delay: 2.0 }}
            className="flex justify-center space-x-6"
          >
            {portfolioData.socials.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20 group relative overflow-hidden"
                whileHover={{ scale: 1.1, y: -5, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2 + index * 0.1, duration: 0.5 }}
              >
                {/* Glowing background effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Social Icons */}
                {social.icon === 'github' && (
                  <motion.svg
                    className="w-6 h-6 text-white group-hover:text-blue-400 transition-colors relative z-10"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </motion.svg>
                )}
                
                {social.icon === 'linkedin' && (
                  <motion.svg
                    className="w-6 h-6 text-white group-hover:text-blue-400 transition-colors relative z-10"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </motion.svg>
                )}
                
                {social.icon === 'email' && (
                  <motion.svg
                    className="w-6 h-6 text-white group-hover:text-blue-400 transition-colors relative z-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </motion.svg>
                )}
                
                <span className="sr-only">{social.name}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Epic Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute top-[31%] left-1/2 transform -translate-x-1/2 z-50"
      >
        <motion.div
          className="w-7 h-11 border-2 border-white/30 rounded-full flex justify-center cursor-pointer"
          whileHover={{ scale: 1.1 }}
          onClick={scrollToAbout}
        >
          <motion.div
            className="w-1 h-3 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full mt-2"
            animate={{
              y: [0, 16, 0],
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}