'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion'
import { SparklesIcon, BoltIcon, FireIcon } from '@heroicons/react/24/outline'
import { TechIcon } from '@/components/ui/skill-icons'
import portfolioData from '@/data/portfolio.json'

const FloatingParticle = ({ delay, duration }: { delay: number, duration: number }) => (
  <motion.div
    className="absolute w-1 h-1 bg-blue-400 rounded-full pointer-events-none"
    initial={{
      opacity: 0,
      scale: 0,
      x: Math.random() * 400 - 200,
      y: Math.random() * 400 - 200,
    }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      x: Math.random() * 400 - 200,
      y: Math.random() * 400 - 200,
      rotate: [0, 360],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      repeatDelay: Math.random() * 2,
      ease: "easeInOut"
    }}
  />
)

const SkillCard = ({ category, index }: { category: any, index: number }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
    })
  }

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 100, rotateX: -30 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        y: -20, 
        rotateX: 5,
        rotateY: 5,
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
    >
      {/* Floating Particles around card */}
      <AnimatePresence>
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => (
              <FloatingParticle key={i} delay={i * 0.1} duration={2} />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Card Background with 3D effect */}
      <motion.div
        className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 overflow-hidden"
        style={{
          transform: `rotateX(${mousePosition.y * 0.05}deg) rotateY(${mousePosition.x * 0.05}deg)`,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Animated Background Gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100"
          animate={{
            background: [
              "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 50%, rgba(6, 182, 212, 0.1) 100%)",
              "linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(6, 182, 212, 0.1) 50%, rgba(59, 130, 246, 0.1) 100%)",
              "linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(59, 130, 246, 0.1) 50%, rgba(147, 51, 234, 0.1) 100%)",
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Glowing Border Effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100"
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

        {/* Category Header */}
        <motion.div 
          className="relative z-10 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 + 0.3 }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <motion.div
              className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              {index === 0 && <BoltIcon className="w-6 h-6 text-white" />}
              {index === 1 && <FireIcon className="w-6 h-6 text-white" />}
              {index === 2 && <SparklesIcon className="w-6 h-6 text-white" />}
            </motion.div>
            <h3 className="text-2xl font-bold text-white">
              {category.category}
            </h3>
          </div>
        </motion.div>

        {/* Skills List */}
        <div className="relative z-10 space-y-6">
          {category.items.map((skill: any, skillIndex: number) => (
            <motion.div
              key={skill.name}
              className="group/skill"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                delay: index * 0.2 + skillIndex * 0.1 + 0.5,
                duration: 0.5,
                type: "spring"
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <motion.div
                    className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <TechIcon name={skill.name} className="w-6 h-6 text-blue-400" />
                  </motion.div>
                  <span className="text-gray-200 font-medium text-lg">
                    {skill.name}
                  </span>
                </div>
                <motion.span 
                  className="text-blue-400 font-bold text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + skillIndex * 0.1 + 0.8 }}
                >
                  {skill.level}%
                </motion.span>
              </div>

              {/* Animated Progress Bar */}
              <div className="relative h-3 bg-gray-800/50 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: `${skill.level}%`, opacity: 1 }}
                  transition={{ 
                    duration: 1.5, 
                    delay: index * 0.2 + skillIndex * 0.1 + 0.8,
                    ease: "easeOut"
                  }}
                />
                
                {/* Glowing effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 rounded-full opacity-0 group-hover/skill:opacity-50 blur-sm"
                  style={{ width: `${skill.level}%` }}
                  animate={{
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Moving highlight */}
                <motion.div
                  className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: [-32, 400],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export function EpicSkills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <section 
      ref={ref}
      id="skills" 
      className="relative py-32 bg-gradient-to-br from-gray-900 via-blue-900/50 to-purple-900/50 overflow-hidden"
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 50%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)",
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.2} duration={5 + Math.random() * 5} />
        ))}
      </div>

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
            <SparklesIcon className="w-5 h-5" />
            <span className="text-sm font-medium">My Arsenal</span>
          </motion.div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-white">Skills & </span>
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
              Expertise
            </motion.span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Technologies and tools I use to craft digital experiences that push boundaries
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            animate={controls}
            variants={{
              visible: { width: "5rem" }
            }}
            transition={{ duration: 1, delay: 0.4 }}
            className="h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full mt-8"
          />
        </motion.div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {portfolioData.skills.map((category, index) => (
            <SkillCard key={category.category} category={category} index={index} />
          ))}
        </div>

        {/* Additional Skills Cloud */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-8">
            Additional Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Git', 'Linux', 'CI/CD', 'RabbitMQ', 'Power BI', 'Selenium', 
              'WebFlow', 'Kotlin', 'VB.NET', 'Cron Jobs', 'NLP', 'Data Encryption'
            ].map((tech, index) => (
              <motion.span
                key={tech}
                className="px-6 py-3 bg-white/10 backdrop-blur-xl text-blue-300 rounded-2xl text-sm font-medium border border-white/20 cursor-pointer"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 1.2 + index * 0.1,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -5,
                  backgroundColor: "rgba(59, 130, 246, 0.2)",
                  borderColor: "rgba(59, 130, 246, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}