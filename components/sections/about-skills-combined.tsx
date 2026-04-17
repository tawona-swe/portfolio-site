'use client'

import { useEffect, useRef, useState } from 'react'
import portfolioData from '@/data/portfolio.json'

// Map skill names to their icon filenames in /public/icons/
const skillIconMap: Record<string, string> = {
  'JavaScript/TypeScript': 'TypeScript.svg',
  'React': 'React.svg',
  'Next.js': 'Next.js.svg',
  'React Native': 'React.svg',
  'HTML/CSS': 'Tailwind-CSS.svg',
  'PHP/Laravel': 'Laravel.svg',
  'Python/Django': 'Python.svg',
  'Java/Spring Boot': 'Spring.svg',
  'RESTful APIs': 'Node.js.svg',
  'Node.js': 'Node.js.svg',
  'MySQL': 'MySQL.svg',
  'PostgreSQL': 'MongoDB.svg',
  'MongoDB': 'MongoDB.svg',
  'Docker': 'Docker.svg',
  'AWS': 'AWS.svg',
}

function SkillIcon({ name }: { name: string }) {
  const icon = skillIconMap[name]
  if (!icon) return null
  return (
    <img
      src={`/icons/${icon}`}
      alt={name}
      className="w-5 h-5 object-contain transition-transform duration-300 group-hover:scale-110"
    />
  )
}

// Animated counter component - fixed to avoid hydration issues
const AnimatedCounter = ({ 
  value, 
  suffix = '',
  as: Component = 'span'
}: { 
  value: string; 
  suffix?: string;
  as?: 'span' | 'div';
}) => {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLElement>(null)
  
  const numericValue = parseInt(value) || 0
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let start = 0
          const duration = 2000
          const increment = numericValue / (duration / 16)
          
          const timer = setInterval(() => {
            start += increment
            if (start >= numericValue) {
              setCount(numericValue)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 16)
          
          return () => clearInterval(timer)
        }
      },
      { threshold: 0.5 }
    )
    
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [numericValue, hasAnimated])
  
  return (
    <Component ref={ref as any}>
      {count}{suffix}
    </Component>
  )
}

export function AboutSkillsCombined() {
  const { about, skills, personal } = portfolioData
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      {/* About Section */}
      <section 
        id="about" 
        className="section-glow py-28 px-8 md:px-20 relative overflow-hidden" 
        style={{ background: 'linear-gradient(180deg, #060e20 0%, #091328 100%)' }}
      >
        {/* Animated background particles */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
                animationFillMode: 'both'
              }}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
          {/* Left: photo */}
          <div className="lg:col-span-5 space-y-12">
            <div className="relative inline-block">
              <h2 className="text-secondary font-headline text-3xl font-bold tracking-tight uppercase">
                Legacy &amp; Foundation
              </h2>
              <div className="absolute -bottom-2 left-0 w-12 h-[2px] bg-gradient-to-r from-primary to-transparent" />
            </div>
            <div className="relative group">
              {/* Animated border glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-xl opacity-20 group-hover:opacity-60 blur-xl transition-all duration-700 animate-spin-slow" />
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-xl opacity-20 group-hover:opacity-40 blur transition duration-500" />
              <div className="relative overflow-hidden rounded-xl bg-surface-container-highest aspect-[4/5] avatar-glow">
                <img
                  src={personal.avatar}
                  alt={personal.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                />
                {/* Overlay shimmer */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060e20]/80 via-transparent to-transparent" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
              </div>
            </div>
          </div>

          {/* Right: content */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-10">
            <div className="space-y-6">
              <h3 className="font-headline text-4xl md:text-5xl font-bold text-on-surface leading-tight">
                Engineering Excellence{' '}
                <span className="gradient-text">at its Core.</span>
              </h3>
              <div className="text-on-surface-variant text-lg leading-relaxed max-w-2xl animate-fade-in-up">
                {about.description}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: 'workspace_premium',
                  title: 'BSc Hons. Software Engineering',
                  desc: 'First Class Honours degree with a focus on systems architecture and cloud scalability.'
                },
                {
                  icon: 'stars',
                  title: 'Most Consistent Undergraduate',
                  desc: 'Awarded for maintaining peak performance and architectural discipline throughout the tenure.'
                }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="group p-8 rounded-xl bg-surface-container-high border border-outline-variant/10 hover:border-primary/30 transition-all duration-500 hover:transform hover:-translate-y-2 cursor-pointer relative overflow-hidden"
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(161,250,255,0.1) 0%, transparent 50%)`
                    }}
                  />
                  <span className="material-symbols-outlined text-primary text-4xl mb-4 block transform group-hover:scale-110 transition-transform duration-300" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {item.icon}
                  </span>
                  <h4 className="font-headline text-xl font-bold text-on-surface mb-2 group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h4>
                  <div className="text-sm text-on-surface-variant">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-28 px-8 md:px-20 relative">
        {/* Floating gradient orbs */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="mb-20 relative">
          <div className="text-secondary font-headline font-bold uppercase tracking-[0.2em] text-sm mb-4 flex items-center gap-2">
            <span className="w-8 h-px bg-secondary" />
            Technical Proficiency
          </div>
          <h2 className="text-on-surface font-headline text-5xl md:text-7xl font-bold tracking-tighter leading-none">
            Mastering the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container relative inline-block">
              Modern Stack
              <svg className="absolute -bottom-2 left-0 w-full" height="4" viewBox="0 0 100 4" preserveAspectRatio="none">
                <path d="M0 2 L100 2" stroke="url(#gradient)" strokeWidth="2" strokeDasharray="0 200" strokeDashoffset="0">
                  <animate attributeName="stroke-dashoffset" from="200" to="0" dur="2s" fill="freeze" />
                </path>
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#a1faff" />
                    <stop offset="100%" stopColor="#69f6b8" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Frontend - large */}
          <div 
            className="md:col-span-8 glass-card rounded-xl p-8 border border-outline-variant/15 neon-glow transition-all duration-500 hover:transform hover:-translate-y-2 group"
            style={{
              background: 'linear-gradient(135deg, rgba(20,31,56,0.8) 0%, rgba(9,19,40,0.6) 100%)'
            }}
          >
            <div className="flex justify-between items-end mb-10">
              <div>
                <span className="material-symbols-outlined text-primary mb-2 text-3xl block animate-pulse group-hover:animate-bounce">fluid</span>
                <h3 className="text-2xl font-headline font-bold text-secondary">Frontend Engineering</h3>
              </div>
              <div className="text-on-surface-variant font-label text-xs uppercase tracking-widest border-l border-primary/30 pl-3">Client Side</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
              {skills[0].items.map((skill, i) => (
                <div key={i} className="space-y-3 group/skill">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <SkillIcon name={skill.name} />
                      <span className="text-on-surface font-medium group-hover/skill:text-primary transition-colors duration-300">{skill.name}</span>
                    </div>
                    <span className="text-xs font-label text-primary-dim group-hover/skill:text-primary transition-colors duration-300">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-surface-container-highest skill-track overflow-hidden rounded-full">
                    <div 
                      className="h-full bg-gradient-to-r from-secondary to-secondary-dim rounded-full transform origin-left transition-transform duration-1000 group-hover/skill:scale-x-110"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Backend - narrow */}
          <div 
            className="md:col-span-4 glass-card rounded-xl p-8 border border-outline-variant/15 neon-glow transition-all duration-500 hover:transform hover:-translate-y-2 group"
            style={{
              background: 'linear-gradient(135deg, rgba(20,31,56,0.7) 0%, rgba(9,19,40,0.5) 100%)'
            }}
          >
            <div className="mb-10">
              <span className="material-symbols-outlined text-tertiary mb-2 text-3xl block group-hover:animate-spin">database</span>
              <h3 className="text-2xl font-headline font-bold text-secondary">Backend</h3>
            </div>
            <ul className="space-y-6">
              {skills[1].items.map((skill, i) => (
                <li key={i} className="flex items-center gap-4 group/skill">
                  <div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center shrink-0 group-hover/skill:bg-primary/20 transition-all duration-300">
                    <SkillIcon name={skill.name} />
                  </div>
                  <div className="flex-1">
                    <div className="text-on-surface font-medium group-hover/skill:text-primary transition-colors duration-300">{skill.name}</div>
                    <div className="w-full bg-surface-container-highest skill-track mt-1 overflow-hidden rounded-full">
                      <div 
                        className="h-full bg-gradient-to-r from-secondary to-secondary-dim rounded-full transition-all duration-500"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Infrastructure - full width */}
          <div 
            className="md:col-span-12 glass-card rounded-xl p-8 border border-outline-variant/15 neon-glow transition-all duration-500 hover:transform hover:-translate-y-2"
            style={{
              background: 'linear-gradient(135deg, rgba(20,31,56,0.6) 0%, rgba(9,19,40,0.4) 100%)'
            }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <div>
                <span className="material-symbols-outlined text-secondary mb-2 text-3xl block animate-spin-slow">settings_ethernet</span>
                <h3 className="text-2xl font-headline font-bold text-secondary">Infrastructure &amp; Data</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {skills[2].items.map((skill, i) => (
                  <span 
                    key={i} 
                    className="group/tag flex items-center gap-2 px-4 py-2 bg-surface-container-highest rounded-full text-xs font-label border border-outline-variant/20 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 cursor-pointer hover:transform hover:scale-105"
                  >
                    <SkillIcon name={skill.name} />
                    <span className="group-hover/tag:text-primary transition-colors duration-300">{skill.name}</span>
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: '100k+', label: 'Users Served', suffix: '+' },
                { value: '10+', label: 'Projects Shipped', suffix: '+' },
                { value: '99.9%', label: 'Uptime Record', suffix: '%' },
                { value: '1st', label: 'Class Honours', suffix: '' },
              ].map((stat, i) => (
                <div 
                  key={i} 
                  className="stat-card p-6 rounded-xl text-center group/stat hover:transform hover:-translate-y-2 transition-all duration-300 cursor-pointer relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(20,31,56,0.8) 0%, rgba(9,19,40,0.6) 100%)',
                    border: '1px solid rgba(161,250,255,0.1)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500" />
                  <div className="text-3xl md:text-4xl font-headline font-bold text-primary mb-1">
                    <AnimatedCounter 
                      as="span"
                      value={stat.value.replace(/[^0-9]/g, '')} 
                      suffix={stat.suffix} 
                    />
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-on-surface-variant group-hover/stat:text-primary transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 10s linear infinite;
          }
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.6s ease-out;
          }
        `}</style>
      </section>
    </>
  )
}