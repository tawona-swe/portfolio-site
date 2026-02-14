'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { EyeIcon, CodeBracketIcon } from '@heroicons/react/24/outline'
import { staggerContainer, staggerItem } from '@/lib/motion'
import portfolioData from '@/data/portfolio.json'
import { useState } from 'react'

export function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [viewAll, setViewAll] = useState(false)

  const displayedProjects = viewAll ? portfolioData.projects : portfolioData.projects.slice(0, 6)

  return (
    <section id="projects" className="py-20 bg-foreground/5">
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
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
              A showcase of my recent work and personal projects
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-400 to-accent-purple mx-auto rounded-full mt-6" />
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {displayedProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group bg-background/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-primary-400/50 transition-all duration-300"
                >
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {project.featured && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-primary-500 text-white text-xs font-medium rounded-full">
                      Featured
                    </div>
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-primary-500 hover:bg-primary-600 rounded-full text-white transition-colors cursor-hover"
                    >
                      <EyeIcon className="w-5 h-5" />
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-foreground/20 hover:bg-foreground/30 rounded-full text-white transition-colors cursor-hover"
                    >
                      <CodeBracketIcon className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-foreground/70 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-primary-500/10 text-primary-400 rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-foreground/10 text-foreground/60 rounded text-xs font-medium">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            </AnimatePresence>
          </div>

          {/* View All Projects Button */}
          {portfolioData.projects.length > 6 && (
            <div className="text-center mt-12">
              <button
                onClick={() => {
                  console.log('Button clicked, viewAll:', viewAll)
                  setViewAll(!viewAll)
                }}
                className="relative z-10 px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors cursor-pointer">
                {viewAll ? 'Show Less Projects' : 'View All Projects'}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}