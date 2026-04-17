'use client'

import { useState, useRef, useEffect } from 'react'
import portfolioData from '@/data/portfolio.json'

const expIcons: Record<string, string> = {
  'Quatrohaus (Pvt) Ltd': 'groups',
  'Huawei': 'analytics',
  'Contessasoft (Pvt) Ltd': 'shopping_cart',
  'Olimem Enterprise Solutions (Pvt) Ltd': 'account_balance',
}

const expBadges: Record<string, string> = {
  'Quatrohaus (Pvt) Ltd': '100k+ Users',
  'Huawei': 'Enterprise Data',
  'Contessasoft (Pvt) Ltd': 'E-commerce',
  'Olimem Enterprise Solutions (Pvt) Ltd': 'Gov Systems',
}

// Animated timeline component
const TimelineDot = ({ isActive, index, total }: { isActive: boolean; index: number; total: number }) => {
  const [isVisible, setIsVisible] = useState(false)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 }
    )

    if (dotRef.current) observer.observe(dotRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={dotRef} className="flex flex-col items-center">
      <div 
        className={`w-3 h-3 rounded-full mt-3 shrink-0 ring-4 ring-primary/20 z-10 transition-all duration-500 ${
          isActive ? 'bg-tertiary animate-pulse' : 'bg-tertiary opacity-60'
        } ${isVisible ? 'scale-100' : 'scale-0'}`}
        style={{ transitionDelay: `${index * 150}ms` }}
      />
      {index < total - 1 && (
        <div className={`flex-1 w-px timeline-dashed opacity-20 mt-1 transition-all duration-1000 ${
          isVisible ? 'h-24' : 'h-0'
        }`} 
        style={{ transitionDelay: `${index * 150}ms` }} />
      )}
    </div>
  )
}

export function ExperienceProjectsTabs() {
  const [viewAll, setViewAll] = useState(false)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const displayed = viewAll ? portfolioData.projects : portfolioData.projects.slice(0, 6)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      {/* Experience Section */}
      <section id="experience" className="py-28 px-8 md:px-20 bg-surface-container-low relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10">
          <div className="mb-20">
            <div className="text-secondary font-headline font-bold uppercase tracking-[0.2em] text-sm mb-4 flex items-center gap-2">
              <span className="w-8 h-px bg-secondary" />
              Professional Path
            </div>
            <h1 className="text-on-surface font-headline text-5xl md:text-6xl font-black leading-tight tracking-tighter">
              Building Digital <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container relative inline-block">
                Architectures.
                <svg className="absolute -bottom-2 left-0 w-full" height="3" viewBox="0 0 100 3" preserveAspectRatio="none">
                  <path d="M0 1.5 L100 1.5" stroke="url(#gradient1)" strokeWidth="2" strokeDasharray="0 200" strokeDashoffset="0">
                    <animate attributeName="stroke-dashoffset" from="200" to="0" dur="2s" fill="freeze" />
                  </path>
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#a1faff" />
                      <stop offset="100%" stopColor="#69f6b8" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>
          </div>

          <div className="relative max-w-5xl">
            {portfolioData.experiences.map((exp, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-[120px_24px_1fr] gap-x-6 gap-y-4 mb-16 group">
                {/* Date */}
                <div className="md:text-right pt-3 hidden md:block">
                  <div className="text-on-surface-variant font-label text-xs uppercase tracking-widest font-bold leading-relaxed">
                    {exp.duration}
                  </div>
                </div>

                {/* Timeline column: dot + line */}
                <div className="hidden md:flex flex-col items-center">
                  <TimelineDot isActive={index === 0} index={index} total={portfolioData.experiences.length} />
                </div>

                {/* Card */}
                <div className="relative">
                  {/* Mobile date */}
                  <div className="md:hidden block text-on-surface-variant font-label text-xs uppercase tracking-widest font-bold mb-3">
                    {exp.duration}
                  </div>
                  <div className="glass-card p-8 rounded-xl border border-outline-variant/15 transition-all duration-500 hover:translate-x-2 neon-glow group/card relative overflow-hidden">
                    {/* Animated gradient overlay on hover */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(161,250,255,0.05) 0%, transparent 50%)`
                      }}
                    />
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 relative z-10">
                      <div>
                        <h3 className="text-on-surface font-headline text-2xl font-bold group-hover/card:text-primary transition-colors duration-300">
                          {exp.position}
                        </h3>
                        <p className="text-primary font-body font-medium">{exp.company}</p>
                      </div>
                      <div className="bg-surface-container-highest px-4 py-2 rounded-full flex items-center gap-2 shrink-0 hover:scale-105 transition-transform duration-300">
                        <span className="material-symbols-outlined text-secondary text-lg">{expIcons[exp.company] ?? 'work'}</span>
                        <span className="text-on-surface-variant text-xs font-bold">{expBadges[exp.company] ?? ''}</span>
                      </div>
                    </div>
                    <p className="text-on-surface/80 font-body mb-8 leading-relaxed max-w-2xl relative z-10">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2 relative z-10">
                      {exp.technologies.map((tech: string, i: number) => (
                        <span 
                          key={i} 
                          className="bg-surface-container-high text-on-surface-variant text-xs px-3 py-1 rounded-sm font-bold uppercase tracking-tighter hover:bg-primary/20 hover:text-primary transition-all duration-300 cursor-pointer"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
            {[
              { icon: 'terminal', color: 'text-primary', title: 'Architecture', desc: 'System design for high-load platforms.' },
              { icon: 'query_stats', color: 'text-secondary', title: 'Data Insights', desc: 'Turning complex data into intelligence.' },
              { icon: 'devices', color: 'text-tertiary', title: 'User Focus', desc: 'UX-driven development for final users.' },
            ].map((s, i) => (
              <div 
                key={i} 
                className="group bg-surface-container p-8 rounded-2xl border border-outline-variant/10 hover:border-primary/30 transition-all duration-500 hover:transform hover:-translate-y-2 cursor-pointer relative overflow-hidden"
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(161,250,255,0.08) 0%, transparent 50%)`
                  }}
                />
                <span className={`material-symbols-outlined ${s.color} text-3xl mb-4 block group-hover:scale-110 transition-transform duration-300`}>
                  {s.icon}
                </span>
                <h4 className="text-on-surface font-headline font-bold text-xl mb-1 group-hover:text-primary transition-colors duration-300">
                  {s.title}
                </h4>
                <p className="text-on-surface-variant font-body text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-28 px-8 md:px-20 relative">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h1 className="font-headline font-bold text-5xl md:text-7xl tracking-tighter mb-4 text-on-surface">
              Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary relative inline-block">
                Works
                <svg className="absolute -bottom-2 left-0 w-full" height="4" viewBox="0 0 100 4" preserveAspectRatio="none">
                  <path d="M0 2 L100 2" stroke="url(#gradient2)" strokeWidth="2" strokeDasharray="0 200" strokeDashoffset="0">
                    <animate attributeName="stroke-dashoffset" from="200" to="0" dur="2s" fill="freeze" />
                  </path>
                  <defs>
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#a1faff" />
                      <stop offset="100%" stopColor="#69f6b8" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>
            <p className="text-on-surface-variant max-w-2xl text-lg md:text-xl font-light">
              A showcase of architecting high-performance digital ecosystems, from large-scale e-commerce to AI-driven healthcare solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {displayed.map((project, index) => {
              const isFeatured = index === 0
              const isNarrow = index === 1
              const isHalf = index >= 2
              const colSpan = isFeatured ? 'md:col-span-8' : isNarrow ? 'md:col-span-4' : 'md:col-span-6'

              return (
                <div 
                  key={project.id} 
                  className={`${colSpan} group`}
                  onMouseEnter={() => setHoveredProject(index)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {isHalf ? (
                    <div className="glass-card rounded-xl overflow-hidden border border-outline-variant/15 transition-all duration-500 hover:border-primary/30 neon-glow h-full hover:transform hover:-translate-y-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                        <div className="h-64 md:h-full relative overflow-hidden">
                          <img 
                            src={project.image} 
                            alt={project.imageAlt || project.title} 
                            className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-[#091328]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                        <div className="p-8 flex flex-col justify-between">
                          <div>
                            <span className={`text-[10px] font-bold tracking-[0.2em] px-3 py-1 rounded-full uppercase mb-4 inline-block transition-all duration-300 hover:scale-105 ${
                              project.type === 'work' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'
                            }`}>
                              {project.type === 'work' ? '💼 Work' : '🚀 Personal'}
                            </span>
                            <h2 className="font-headline text-2xl font-bold text-on-surface mb-3 leading-tight group-hover:text-primary transition-colors duration-300">
                              {project.title}
                            </h2>
                            <p className="text-on-surface-variant text-sm leading-relaxed mb-6 line-clamp-3">
                              {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-6">
                              {project.technologies.slice(0, 3).map((tech, i) => (
                                <span 
                                  key={i} 
                                  className="bg-surface-container-highest px-3 py-1 rounded-lg text-xs font-label text-on-surface-variant hover:bg-primary/20 hover:text-primary transition-all duration-300 cursor-pointer"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <a 
                              href={project.demo} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="group/btn px-4 py-2 bg-primary text-on-primary rounded-xl text-xs font-bold tracking-widest transition-all duration-300 hover:shadow-[0_0_20px_rgba(161,250,255,0.3)] hover:scale-105"
                            >
                              DEMO
                            </a>
                            <a 
                              href={project.github} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="px-4 py-2 border border-outline-variant/30 text-on-surface-variant rounded-xl text-xs font-bold tracking-widest hover:border-primary/50 hover:text-primary transition-all duration-300 hover:scale-105"
                            >
                              SOURCE
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="glass-card rounded-xl overflow-hidden border border-outline-variant/15 h-full flex flex-col transition-all duration-500 hover:border-primary/30 neon-glow hover:transform hover:-translate-y-2">
                      <div className={`relative overflow-hidden ${isFeatured ? 'h-64 md:h-80' : 'h-48'}`}>
                        <img 
                          src={project.image} 
                          alt={project.imageAlt || project.title} 
                          className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#091328] via-[#091328]/20 to-transparent" />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        </div>
                        {isFeatured && (
                          <div className="absolute bottom-6 left-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <span className="bg-secondary/10 text-secondary text-[10px] font-bold tracking-[0.2em] px-3 py-1 rounded-full uppercase mb-2 inline-block">
                              {project.type === 'work' ? '💼 Work' : '🚀 Personal'}
                            </span>
                            <h2 className="font-headline text-3xl font-bold text-on-surface leading-tight">
                              {project.title}
                            </h2>
                          </div>
                        )}
                      </div>
                      <div className="p-8 flex-grow flex flex-col justify-between">
                        {!isFeatured && (
                          <>
                            <span className={`text-[10px] font-bold tracking-[0.2em] px-3 py-1 rounded-full uppercase mb-4 self-start transition-all duration-300 hover:scale-105 ${
                              project.type === 'work' ? 'bg-primary/10 text-primary' : 'bg-tertiary/10 text-tertiary'
                            }`}>
                              {project.type === 'work' ? '💼 Work' : '🚀 Personal'}
                            </span>
                            <h2 className="font-headline text-2xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors duration-300">
                              {project.title}
                            </h2>
                          </>
                        )}
                        <p className="text-on-surface-variant text-sm leading-relaxed mb-6 line-clamp-3">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-auto pb-6">
                          {project.technologies.slice(0, 3).map((tech, i) => (
                            <span 
                              key={i} 
                              className="bg-surface-container-highest px-3 py-1 rounded-lg text-xs font-label text-on-surface-variant hover:bg-primary/20 hover:text-primary transition-all duration-300 cursor-pointer"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-outline-variant/10">
                          <a 
                            href={project.demo} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="group/btn flex items-center gap-2 text-primary text-xs font-bold tracking-widest transition-all duration-300 hover:gap-3"
                          >
                            {isFeatured ? 'VIEW CASE STUDY' : 'VISIT SITE'}
                            <span className="material-symbols-outlined text-sm transition-transform duration-300 group-hover/btn:translate-x-1">arrow_forward</span>
                          </a>
                          <a 
                            href={project.github} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-on-surface-variant/50 hover:text-primary transition-all duration-300 hover:scale-110"
                          >
                            <span className="material-symbols-outlined">terminal</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {portfolioData.projects.length > 6 && (
            <div className="text-center mt-16">
              <button 
                onClick={() => setViewAll(!viewAll)} 
                className="group px-8 py-4 border border-outline-variant/30 text-on-surface rounded-xl font-headline font-bold hover:bg-surface-container-high hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
              >
                <span className="relative z-10">
                  {viewAll ? 'Show Less' : 'View All Projects'}
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </div>
          )}

          <div className="mt-32 mb-8 text-center">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-2xl opacity-20 animate-pulse" />
              <h3 className="font-headline text-2xl md:text-3xl font-bold mb-4 relative">
                Have a project in mind?
              </h3>
            </div>
            <p className="text-on-surface-variant mb-8 max-w-md mx-auto">
              I'm currently open to new collaborations and high-impact engineering opportunities.
            </p>
            <a 
              href="#contact" 
              className="group inline-flex items-center gap-3 text-secondary font-headline font-bold text-lg transition-all duration-300 hover:gap-5 hover:text-primary"
            >
              Let's talk 
              <span className="material-symbols-outlined transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                alternate_email
              </span>
            </a>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .timeline-dashed {
          background: repeating-linear-gradient(
            to bottom,
            rgba(161, 250, 255, 0.3),
            rgba(161, 250, 255, 0.3) 4px,
            transparent 4px,
            transparent 8px
          );
        }
      `}</style>
    </>
  )
}