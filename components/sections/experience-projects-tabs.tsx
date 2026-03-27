'use client'

import { useState } from 'react'
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

export function ExperienceProjectsTabs() {
  const [viewAll, setViewAll] = useState(false)
  const displayed = viewAll ? portfolioData.projects : portfolioData.projects.slice(0, 6)

  return (
    <>
      {/* Experience */}
      <section id="experience" className="py-28 px-8 md:px-20 bg-surface-container-low">
        <div className="mb-20">
          <p className="text-secondary font-headline font-bold uppercase tracking-[0.2em] text-sm mb-4">Professional Path</p>
          <h1 className="text-on-surface font-headline text-5xl md:text-6xl font-black leading-tight tracking-tighter">
            Building Digital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">Architectures.</span>
          </h1>
        </div>

        <div className="relative max-w-5xl">
          {portfolioData.experiences.map((exp, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-[120px_24px_1fr] gap-x-6 gap-y-4 mb-16 group">
              {/* Date */}
              <div className="md:text-right pt-3 hidden md:block">
                <span className="text-on-surface-variant font-label text-xs uppercase tracking-widest font-bold leading-relaxed">{exp.duration}</span>
              </div>

              {/* Timeline column: dot + line */}
              <div className="hidden md:flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full mt-3 shrink-0 ring-4 ring-primary/20 z-10 ${index === 0 ? 'bg-tertiary animate-pulse' : 'bg-tertiary opacity-60'}`} />
                {index < portfolioData.experiences.length - 1 && (
                  <div className="flex-1 w-px timeline-dashed opacity-20 mt-1" />
                )}
              </div>

              {/* Card */}
              <div className="relative">
                {/* Mobile date */}
                <span className="md:hidden block text-on-surface-variant font-label text-xs uppercase tracking-widest font-bold mb-3">{exp.duration}</span>
                <div className="glass-card p-8 rounded-xl border border-outline-variant/15 transition-all duration-300 hover:translate-x-1 neon-glow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-on-surface font-headline text-2xl font-bold">{exp.position}</h3>
                      <p className="text-primary font-body font-medium">{exp.company}</p>
                    </div>
                    <div className="bg-surface-container-highest px-4 py-2 rounded-full flex items-center gap-2 shrink-0">
                      <span className="material-symbols-outlined text-secondary text-lg">{expIcons[exp.company] ?? 'work'}</span>
                      <span className="text-on-surface-variant text-xs font-bold">{expBadges[exp.company] ?? ''}</span>
                    </div>
                  </div>
                  <p className="text-on-surface/80 font-body mb-8 leading-relaxed max-w-2xl">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech: string, i: number) => (
                      <span key={i} className="bg-surface-container-high text-on-surface-variant text-xs px-3 py-1 rounded-sm font-bold uppercase tracking-tighter">{tech}</span>
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
            <div key={i} className="bg-surface-container p-8 rounded-2xl border border-outline-variant/10">
              <span className={`material-symbols-outlined ${s.color} text-3xl mb-4 block`}>{s.icon}</span>
              <h4 className="text-on-surface font-headline font-bold text-xl mb-1">{s.title}</h4>
              <p className="text-on-surface-variant font-body text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-28 px-8 md:px-20">
        <div className="max-w-7xl mx-auto">
          <section className="mb-20">
            <h1 className="font-headline font-bold text-5xl md:text-7xl tracking-tighter mb-4 text-on-surface">
              Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Works</span>
            </h1>
            <p className="text-on-surface-variant max-w-2xl text-lg md:text-xl font-light">
              A showcase of architecting high-performance digital ecosystems, from large-scale e-commerce to AI-driven healthcare solutions.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {displayed.map((project, index) => {
              const isFeatured = index === 0
              const isNarrow = index === 1
              const isHalf = index >= 2
              const colSpan = isFeatured ? 'md:col-span-8' : isNarrow ? 'md:col-span-4' : 'md:col-span-6'

              return (
                <div key={project.id} className={`${colSpan} group`}>
                  {isHalf ? (
                    <div className="glass-card rounded-xl overflow-hidden border border-outline-variant/15 transition-all duration-300 hover:border-primary/30 neon-glow h-full">
                      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                        <div className="h-64 md:h-full relative overflow-hidden">
                          <img src={project.image} alt={project.imageAlt || project.title} className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105" />
                        </div>
                        <div className="p-8 flex flex-col justify-between">
                          <div>
                            <span className={`text-[10px] font-bold tracking-[0.2em] px-3 py-1 rounded-full uppercase mb-4 inline-block ${project.type === 'work' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
                              {project.type === 'work' ? '💼 Work' : '🚀 Personal'}
                            </span>
                            <h2 className="font-headline text-2xl font-bold text-on-surface mb-3 leading-tight">{project.title}</h2>
                            <p className="text-on-surface-variant text-sm leading-relaxed mb-6 line-clamp-3">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-6">
                              {project.technologies.slice(0, 3).map((tech, i) => (
                                <span key={i} className="bg-surface-container-highest px-3 py-1 rounded-lg text-xs font-label text-on-surface-variant">{tech}</span>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-primary text-on-primary rounded-xl text-xs font-bold tracking-widest">DEMO</a>
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-outline-variant/30 text-on-surface-variant rounded-xl text-xs font-bold tracking-widest hover:border-primary/50 transition-colors">SOURCE</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="glass-card rounded-xl overflow-hidden border border-outline-variant/15 h-full flex flex-col transition-all duration-300 hover:border-primary/30 neon-glow">
                      <div className={`relative overflow-hidden ${isFeatured ? 'h-64 md:h-80' : 'h-48'}`}>
                        <img src={project.image} alt={project.imageAlt || project.title} className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#091328] to-transparent" />
                        {isFeatured && (
                          <div className="absolute bottom-6 left-6">
                            <span className="bg-secondary/10 text-secondary text-[10px] font-bold tracking-[0.2em] px-3 py-1 rounded-full uppercase mb-2 inline-block">
                              {project.type === 'work' ? '💼 Work' : '🚀 Personal'}
                            </span>
                            <h2 className="font-headline text-3xl font-bold text-on-surface leading-tight">{project.title}</h2>
                          </div>
                        )}
                      </div>
                      <div className="p-8 flex-grow flex flex-col justify-between">
                        {!isFeatured && (
                          <>
                            <span className={`text-[10px] font-bold tracking-[0.2em] px-3 py-1 rounded-full uppercase mb-4 self-start ${project.type === 'work' ? 'bg-primary/10 text-primary' : 'bg-tertiary/10 text-tertiary'}`}>
                              {project.type === 'work' ? '💼 Work' : '🚀 Personal'}
                            </span>
                            <h2 className="font-headline text-2xl font-bold text-on-surface mb-3">{project.title}</h2>
                          </>
                        )}
                        <p className="text-on-surface-variant text-sm leading-relaxed mb-6 line-clamp-3">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-auto pb-6">
                          {project.technologies.slice(0, 3).map((tech, i) => (
                            <span key={i} className="bg-surface-container-highest px-3 py-1 rounded-lg text-xs font-label text-on-surface-variant">{tech}</span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-outline-variant/10">
                          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary text-xs font-bold tracking-widest hover:gap-3 transition-all">
                            {isFeatured ? 'VIEW CASE STUDY' : 'VISIT SITE'}
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                          </a>
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-on-surface-variant/50 hover:text-on-surface transition-colors">
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
              <button onClick={() => setViewAll(!viewAll)} className="px-8 py-4 border border-outline-variant/30 text-on-surface rounded-xl font-headline font-bold hover:bg-surface-container-high hover:border-primary/30 transition-all">
                {viewAll ? 'Show Less' : 'View All Projects'}
              </button>
            </div>
          )}

          <section className="mt-32 mb-8 text-center">
            <h3 className="font-headline text-2xl font-bold mb-4">Have a project in mind?</h3>
            <p className="text-on-surface-variant mb-8 max-w-md mx-auto">I'm currently open to new collaborations and high-impact engineering opportunities.</p>
            <a href="#contact" className="inline-flex items-center gap-3 text-secondary font-headline font-bold text-lg hover:gap-5 transition-all">
              Let's talk <span className="material-symbols-outlined">alternate_email</span>
            </a>
          </section>
        </div>
      </section>
    </>
  )
}
