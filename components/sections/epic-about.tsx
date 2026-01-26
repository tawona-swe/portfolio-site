'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { SparklesIcon, UserIcon, MapPinIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import portfolioData from '@/data/portfolio.json'

const FloatingElement = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.8, type: "spring" }}
    className="float"
  >
    {children}
  </motion.div>
)

export function EpicAbout() {
  const { personal, about } = portfolioData
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
    })
  }

  return (
    <section 
      ref={ref}
      id="about" 
      className="relative py-32 bg-gradient-to-br from-gray-900 via-blue-900/30 to-purple-900/30 overflow-hidden"
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 70%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 80%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)",
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full text-blue-300 border border-white/20 mb-8"
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <UserIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Get to know me</span>
          </motion.div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-white">About </span>
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
              Me
            </motion.span>
          </h2>

          <motion.div
            initial={{ width: 0 }}
            animate={controls}
            variants={{
              visible: { width: "5rem" }
            }}
            transition={{ duration: 1, delay: 0.4 }}
            className="h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, x: 0 }
            }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
            onMouseMove={handleMouseMove}
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* 3D Image Container */}
              <motion.div
                className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-blue-400/20 to-purple-500/20 p-2"
                style={{
                  transform: `rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.02}deg)`,
                  transformStyle: "preserve-3d",
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <img
                  src={personal.avatar}
                  alt={personal.name}
                  className="w-[100%] h-full object-cover rounded-3xl"
                />
                
                {/* Glowing Border */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100"
                  style={{
                    background: "linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4, #3b82f6)",
                    backgroundSize: "300% 300%",
                    padding: "2px",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                  }}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.div>

              {/* Floating Decorative Elements */}
              <motion.div
                className="absolute -top-6 -right-6 w-24 h-24 bg-blue-400/20 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.6, 0.3, 0.6],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, x: 0 }
            }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <FloatingElement delay={0.6}>
                <h3 className="text-3xl font-bold text-white mb-4">
                  {personal.title}
                </h3>
              </FloatingElement>
              
              <FloatingElement delay={0.8}>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {about.description}
                </p>
              </FloatingElement>
            </div>

            {/* Highlights */}
            <FloatingElement delay={1.0}>
              <div>
                <h4 className="text-2xl font-semibold text-white mb-6">
                  What I bring to the table:
                </h4>
                <div className="space-y-4">
                  {about.highlights.map((highlight, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-4 group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                      whileHover={{ x: 5 }}
                    >
                      <motion.div
                        className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2 flex-shrink-0"
                        whileHover={{ scale: 1.5, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                      />
                      <span className="text-gray-300 group-hover:text-white transition-colors">
                        {highlight}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FloatingElement>

            {/* Contact Info Cards */}
            <FloatingElement delay={1.4}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8">
                <motion.div
                  className="p-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 group"
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="flex items-center space-x-3">
                    <motion.div
                      className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <EnvelopeIcon className="w-5 h-5 text-white" />
                    </motion.div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-white font-medium text-sm">{personal.email}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="p-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 group"
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="flex items-center space-x-3">
                    <motion.div
                      className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <MapPinIcon className="w-5 h-5 text-white" />
                    </motion.div>
                    <div>
                      <p className="text-gray-400 text-sm">Location</p>
                      <p className="text-white font-medium text-sm">{personal.location}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </FloatingElement>
          </motion.div>
        </div>
      </div>
    </section>
  )
}