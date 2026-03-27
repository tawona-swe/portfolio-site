'use client'

import { useEffect, useRef, useState } from 'react'
import portfolioData from '@/data/portfolio.json'
import { MouseParticles } from '@/components/ui/mouse-particles'

const roles = [
  'Full Stack Software Developer',
  'E-commerce Platform Architect',
  'AI & System Integration Expert',
  'Laravel & React Specialist',
]

export function EpicHero() {
  const { personal, socials } = portfolioData
  const [roleIndex, setRoleIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const interval = setInterval(() => setRoleIndex(i => (i + 1) % roles.length), 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section ref={sectionRef} id="home" className="relative min-h-screen flex flex-col justify-center px-8 md:px-20 overflow-hidden bg-surface">
      <MouseParticles containerRef={sectionRef} />
      {/* Ambient glows */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-4xl space-y-8">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/15">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] font-label text-secondary font-semibold">
            {roles[roleIndex]}
          </span>
        </div>

        {/* Name */}
        <h1 className="font-headline text-5xl md:text-[5.5rem] font-bold leading-[0.9] tracking-tighter">
          {personal.name}. /{' '}
          <br />
          <span className="gradient-text">Full Stack Architect.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl leading-relaxed">
          Specializing in designing and maintaining{' '}
          <span className="text-on-surface">scalable, high-performing</span> web and mobile applications with obsidian precision and minimalist ethos.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-6 pt-4">
          <a
            href="#projects"
            className="btn-primary px-10 py-5 rounded-xl text-lg shadow-[0_0_30px_rgba(161,250,255,0.2)] hover:shadow-[0_0_45px_rgba(161,250,255,0.3)] transition-all flex items-center gap-2"
          >
            View Projects
            <span className="material-symbols-outlined">arrow_forward</span>
          </a>
          <a
            href="#contact"
            className="px-10 py-5 border border-outline-variant/30 text-on-surface rounded-xl font-headline font-bold text-lg hover:bg-surface-container-high transition-all"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 right-8 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  )
}
