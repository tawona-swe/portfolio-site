'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion'
import { BriefcaseIcon, CalendarIcon, MapPinIcon, SparklesIcon } from '@heroicons/react/24/outline'
import portfolioData from '@/data/portfolio.json'

const FloatingIcon = ({ icon: Icon, delay = 0 }: { icon: any, delay?: number }) => (
  <motion.div
    className="absolute w-8 h-8 text-blue-400 opacity-20"
    initial={{ 
      opacity: 0, 
      scale: 0,
      x: Math.random() * 200 - 100,
      y: Math.random() * 200 - 100,
    }}
    animate={{
      opacity: [0, 0.3, 0],
      scale: [0, 1, 0],
      x: Math.random() * 200 - 100,
      y: Math.random() * 200 - 100,
      rotate: [0, 360],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      repeatDelay: Math.random() * 3,
      ease: "easeInOut"
    }}
  >
    <Icon className="w-full h-full" />
  </motion.div>
)

const ExperienceCard = ({ exp, index, isActive, onClick }: { 
  exp: any, 
  index: number, 
  isActive: boolean,
  onClick: () => void 
}) => {
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
      className={`relative cursor-pointer group ${isActive ? 'z-20' : 'z-10'}`}
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, rotateY: -30 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.02,
        y: -10,
        rotateX: 5,
        rotateY: 5,
        transition: { duration: 0.3 }
      }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
    >
      {/* Timeline Connector */}
      <div className="absolute left-8 top-0 w-0.5 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500 opacity-30" />
      
      {/* Timeline Dot */}
      <motion.div
        className="absolute left-6 top-8 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-gray-900 z-10"
        whileHover={{ scale: 1.5, rotate: 360 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-md opacity-0 group-hover:opacity-60"
          animate={{
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Card */}
      <motion.div
        className={`ml-16 p-8 rounded-3xl border transition-all duration-500 ${
          isActive 
            ? 'bg-white/10 border-blue-500/50 shadow-2xl' 
            : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
        }`}
        style={{
          transform: `rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.02}deg)`,
          backdropFilter: 'blur(20px)',
        }}
        animate={isActive ? {
          boxShadow: [
            "0 0 20px rgba(59, 130, 246, 0.3)",
            "0 0 40px rgba(139, 92, 246, 0.4)",
            "0 0 20px rgba(59, 130, 246, 0.3)",
          ]
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <FloatingIcon icon={BriefcaseIcon} delay={0} />
          <FloatingIcon icon={CalendarIcon} delay={0.5} />
          <FloatingIcon icon={MapPinIcon} delay={1} />
        </div>

        {/* Company Header */}
        <motion.div 
          className="flex items-start justify-between mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 + 0.3 }}
        >
          <div className="flex-1">
            <motion.h3 
              className="text-2xl font-bold text-white mb-2"
              whileHover={{ scale: 1.02 }}
            >
              {exp.position}
            </motion.h3>
            <motion.p 
              className="text-blue-400 font-semibold text-lg mb-2"
              whileHover={{ scale: 1.02 }}
            >
              {exp.company}
            </motion.p>
            <div className="flex items-center text-gray-400 text-sm">
              <CalendarIcon className="w-4 h-4 mr-2" />
              {exp.duration}
            </div>
          </div>
          
          <motion.div
            className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <BriefcaseIcon className="w-8 h-8 text-white" />
          </motion.div>
        </motion.div>

        {/* Description */}
        <motion.p 
          className="text-gray-300 mb-6 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 + 0.5 }}
        >
          {exp.description}
        </motion.p>

        {/* Technologies */}
        <motion.div 
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 + 0.7 }}
        >
          {exp.technologies.map((tech: string, techIndex: number) => (
            <motion.span
              key={tech}
              className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: index * 0.2 + 0.8 + techIndex * 0.1,
                type: "spring",
                stiffness: 200
              }}
              whileHover={{ 
                scale: 1.1, 
                backgroundColor: "rgba(59, 130, 246, 0.3)",
                borderColor: "rgba(59, 130, 246, 0.6)"
              }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-3xl opacity-0 group-hover:opacity-100 pointer-events-none"
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
      </motion.div>
    </motion.div>
  )
}

export function EpicExperience() {
  const [activeIndex, setActiveIndex] = useState(0)
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
      id="experience" 
      className="relative py-32 bg-gradient-to-br from-gray-900 via-purple-900/30 to-blue-900/30 overflow-hidden"
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 70% 60%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 30%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)",
          ]
        }}
        transition={{
          duration: 10,
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
            <BriefcaseIcon className="w-5 h-5" />
            <span className="text-sm font-medium">My Journey</span>
          </motion.div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-white">Work </span>
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
              Experience
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
            My professional journey through innovative companies and impactful projects
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

        {/* Experience Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {portfolioData.experiences.map((exp, index) => (
            <ExperienceCard
              key={index}
              exp={exp}
              index={index}
              isActive={activeIndex === index}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { label: "Years Experience", value: "3+", icon: "🚀" },
            { label: "Projects Completed", value: "15+", icon: "💼" },
            { label: "Happy Clients", value: "100k+", icon: "😊" },
            { label: "Technologies", value: "20+", icon: "⚡" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: 1.2 + index * 0.1,
                type: "spring",
                stiffness: 200
              }}
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                backgroundColor: "rgba(255, 255, 255, 0.1)"
              }}
            >
              <motion.div
                className="text-4xl mb-2"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                {stat.icon}
              </motion.div>
              <motion.div
                className="text-3xl font-bold text-white mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 + index * 0.1 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}