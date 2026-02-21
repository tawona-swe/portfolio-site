'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { EyeIcon, CodeBracketIcon, BriefcaseIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'
import portfolioData from '@/data/portfolio.json'

export function ExperienceProjectsTabs() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [activeTab, setActiveTab] = useState<'experience' | 'projects'>('projects')

  return (
    <section id="work" className="relative py-20 bg-foreground/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
              My <span className="gradient-text">Work</span>
            </motion.h2>
            <motion.div
              className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-12">
            <motion.button
              onClick={() => setActiveTab('experience')}
              className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'experience'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <BriefcaseIcon className="w-5 h-5" />
              Experience
            </motion.button>
            <motion.button
              onClick={() => setActiveTab('projects')}
              className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'projects'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <RocketLaunchIcon className="w-5 h-5" />
              Projects
            </motion.button>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'experience' ? (
              <motion.div
                key="experience"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto space-y-6"
              >
                {portfolioData.experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-blue-400/50 transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1">
                          {exp.position}
                        </h3>
                        <p className="text-blue-300 font-medium">{exp.company}</p>
                      </div>
                      <span className="text-sm text-gray-400 whitespace-nowrap">
                        {exp.duration}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-4">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-blue-500/10 text-blue-300 rounded-lg text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="projects"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="max-w-6xl mx-auto"
              >
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {portfolioData.projects.slice(0, 6).map((project, index) => {
                    const colors = [
                      { from: 'from-blue-500/10', to: 'to-purple-500/10', border: 'border-blue-400/30' },
                      { from: 'from-purple-500/10', to: 'to-pink-500/10', border: 'border-purple-400/30' },
                      { from: 'from-cyan-500/10', to: 'to-blue-500/10', border: 'border-cyan-400/30' },
                      { from: 'from-violet-500/10', to: 'to-purple-500/10', border: 'border-violet-400/30' },
                      { from: 'from-indigo-500/10', to: 'to-blue-500/10', border: 'border-indigo-400/30' },
                      { from: 'from-fuchsia-500/10', to: 'to-pink-500/10', border: 'border-fuchsia-400/30' },
                    ]
                    const color = colors[index % colors.length]

                    return (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 100, rotate: -5 }}
                        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                        viewport={{ amount: 0.3, once: true }}
                        transition={{ 
                          type: "spring",
                          bounce: 0.3,
                          duration: 0.8,
                          delay: (index % 3) * 0.1
                        }}
                        whileHover={{ 
                          y: -10,
                          rotate: 0,
                          scale: 1.02,
                          transition: { duration: 0.3 }
                        }}
                        className={`group relative bg-gradient-to-br ${color.from} ${color.to} backdrop-blur-sm rounded-2xl overflow-hidden border ${color.border} hover:border-blue-400/50 transition-all duration-300 shadow-xl`}
                      >
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300" />
                        
                        {/* Image */}
                        <div className="relative overflow-hidden h-48">
                          <motion.img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.4 }}
                          />
                          
                          {/* Featured badge */}
                          {project.featured && (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              whileInView={{ scale: 1, rotate: 0 }}
                              transition={{ delay: 0.3, type: "spring" }}
                              className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold rounded-full shadow-lg"
                            >
                              ⭐ Featured
                            </motion.div>
                          )}
                          
                          {/* Overlay with buttons */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                          >
                            <motion.a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-3 bg-blue-500 hover:bg-blue-600 rounded-full text-white transition-colors shadow-lg"
                              whileHover={{ scale: 1.2, rotate: 5 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <EyeIcon className="w-5 h-5" />
                            </motion.a>
                            <motion.a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-3 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors shadow-lg backdrop-blur-sm"
                              whileHover={{ scale: 1.2, rotate: -5 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <CodeBracketIcon className="w-5 h-5" />
                            </motion.a>
                          </motion.div>
                        </div>
                        
                        {/* Content */}
                        <div className="relative p-6">
                          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                            {project.description}
                          </p>
                          
                          {/* Technologies */}
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.slice(0, 3).map((tech, techIndex) => (
                              <motion.span
                                key={techIndex}
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ delay: 0.5 + techIndex * 0.1, type: "spring" }}
                                className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-xs font-medium border border-blue-400/30"
                              >
                                {tech}
                              </motion.span>
                            ))}
                            {project.technologies.length > 3 && (
                              <motion.span
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ delay: 0.8, type: "spring" }}
                                className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded-lg text-xs font-medium border border-gray-400/30"
                              >
                                +{project.technologies.length - 3}
                              </motion.span>
                            )}
                          </div>

                          {/* Decorative corner accent */}
                          <div className="absolute bottom-2 right-2 w-12 h-12 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-xl" />
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
