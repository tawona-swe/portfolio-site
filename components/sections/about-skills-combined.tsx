'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { TechIcon } from '@/components/ui/skill-icons'
import portfolioData from '@/data/portfolio.json'
import { useState, useRef } from 'react'

export function AboutSkillsCombined() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      setMousePosition({ x, y })
    }
  }

  return (
    <section 
      id="about" 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative py-20 overflow-hidden"
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Mouse-following gradient orb */}
      <motion.div
        className="absolute w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          x: mousePosition.x * 100 - 192,
          y: mousePosition.y * 100 - 192,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.h2
              className="text-4xl sm:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              About <span className="gradient-text">Me</span>
            </motion.h2>
            <motion.div
              className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
            
            {/* Left: About */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6"
            >
              <p className="text-gray-300 text-lg leading-relaxed">
                {portfolioData.about.description}
              </p>

              {/* Highlights */}
              <div className="space-y-3">
                {portfolioData.about.highlights.slice(0, 4).map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-3 group"
                  >
                    <motion.div
                      className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"
                      whileHover={{ scale: 2 }}
                    />
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                      {highlight}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Skills */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              {portfolioData.skills.map((skillCategory, catIndex) => (
                <motion.div
                  key={skillCategory.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + catIndex * 0.2 }}
                >
                  <h3 className="text-xl font-semibold text-blue-300 mb-4">
                    {skillCategory.category}
                  </h3>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {skillCategory.items.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{
                          duration: 0.5,
                          delay: 0.8 + catIndex * 0.2 + skillIndex * 0.05,
                          type: "spring",
                          stiffness: 200
                        }}
                        whileHover={{ 
                          scale: 1.15, 
                          y: -8,
                          rotate: Math.random() * 10 - 5,
                          transition: { duration: 0.2 }
                        }}
                        className="relative group cursor-pointer"
                        style={{
                          transformStyle: 'preserve-3d',
                        }}
                      >
                        {/* Glow effect on hover */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 rounded-xl blur-xl"
                          whileHover={{
                            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(168, 85, 247, 0.3) 100%)',
                          }}
                          transition={{ duration: 0.3 }}
                        />
                        
                        <motion.div 
                          className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-blue-400/50 transition-all duration-300"
                          animate={{
                            rotateY: (mousePosition.x - 0.5) * 10,
                            rotateX: -(mousePosition.y - 0.5) * 10,
                          }}
                          transition={{ type: "spring", stiffness: 100, damping: 15 }}
                        >
                          <div className="flex items-center gap-3">
                            <motion.div
                              whileHover={{ rotate: 360, scale: 1.2 }}
                              transition={{ duration: 0.5 }}
                            >
                              <TechIcon name={skill.name} className="w-8 h-8" />
                            </motion.div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-300 truncate group-hover:text-white transition-colors">
                                {skill.name}
                              </p>
                              {/* Skill level bar */}
                              <div className="mt-2 h-1 bg-gray-700 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-gradient-to-r from-blue-400 to-purple-400"
                                  initial={{ width: 0 }}
                                  animate={inView ? { width: `${skill.level}%` } : {}}
                                  whileHover={{ 
                                    background: 'linear-gradient(to right, #60a5fa, #a855f7, #06b6d4)',
                                  }}
                                  transition={{
                                    duration: 1,
                                    delay: 1 + catIndex * 0.2 + skillIndex * 0.05,
                                    ease: "easeOut"
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
