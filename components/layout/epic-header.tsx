'use client'

import { useState, useEffect } from 'react'
import portfolioData from '@/data/portfolio.json'

const navLinks = [
  { label: 'Overview', href: '#home', icon: 'grid_view' },
  { label: 'About', href: '#about', icon: 'person' },
  { label: 'Skills', href: '#skills', icon: 'terminal' },
  { label: 'Experience', href: '#experience', icon: 'timeline' },
  { label: 'Projects', href: '#projects', icon: 'rocket_launch' },
  { label: 'Contact', href: '#contact', icon: 'alternate_email' },
]

export function EpicHeader() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      // Order must match DOM order
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'testimonials', 'contact']
      let current = 'home'
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 150) {
            current = id
          }
        }
      }
      setActive(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const { personal, socials } = portfolioData

  return (
    <>
      {/* ── Sidebar desktop ── */}
      <aside
        className="fixed left-0 top-0 h-full hidden lg:flex flex-col z-40 w-64"
        style={{
          background: 'linear-gradient(180deg, rgba(9,19,40,0.97) 0%, rgba(6,14,32,0.98) 100%)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(161,250,255,0.07)',
          boxShadow: '4px 0 40px rgba(0,0,0,0.5), inset -1px 0 0 rgba(161,250,255,0.05)',
        }}
      >
        {/* Top shimmer line */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(161,250,255,0.3), transparent)' }} />

        {/* Avatar + name */}
        <div className="px-4 pt-5 pb-4 flex flex-col items-center text-center border-b border-outline-variant/10">
          <div className="relative mb-2">
            <div className="absolute -inset-1 rounded-full"
              style={{ background: 'conic-gradient(from 0deg, #a1faff, #69f6b8, #00f4fe, #a1faff)', opacity: 0.4, filter: 'blur(4px)' }} />
            <img
              src={personal.avatar}
              alt={personal.name}
              className="relative w-12 h-12 rounded-full object-cover border-2 border-[#a1faff]/20"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-secondary rounded-full border-2 border-[#091328]" />
          </div>
          <h2 className="font-headline font-black text-sm tracking-tight text-on-surface">{personal.name}</h2>
          <p className="text-[9px] uppercase tracking-[0.2em] text-on-surface-variant mt-0.5">{personal.title.split(' ').slice(0, 3).join(' ')}</p>

          {/* Social icons */}
          <div className="flex items-center gap-2 mt-3">
            {socials.map(s => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-primary transition-all duration-200"
                style={{ background: 'rgba(161,250,255,0.05)', border: '1px solid rgba(161,250,255,0.08)' }}
                title={s.name}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>
                  {s.icon === 'github' ? 'code' : s.icon === 'linkedin' ? 'person' : 'mail'}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-hidden">
          {navLinks.map(link => {
            const sectionId = link.href.replace('#', '')
            // Map multiple section IDs to a single nav item
            const activeMap: Record<string, string[]> = {
              'home': ['home'],
              'about': ['about'],
              'skills': ['skills'],
              'experience': ['experience'],
              'projects': ['projects'],
              'contact': ['contact', 'testimonials'],
            }
            const isActive = (activeMap[sectionId] || [sectionId]).includes(active)
            return (
              <a
                key={link.href}
                href={link.href}
                className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl font-headline text-sm transition-all duration-200 group"
                style={isActive ? {
                  background: 'linear-gradient(135deg, rgba(161,250,255,0.1), rgba(105,246,184,0.06))',
                  border: '1px solid rgba(161,250,255,0.15)',
                  color: '#a1faff',
                  boxShadow: '0 0 20px rgba(161,250,255,0.08), inset 0 1px 0 rgba(161,250,255,0.1)',
                } : {
                  color: '#a3aac4',
                  border: '1px solid transparent',
                }}
              >
                {/* Active left glow bar */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-full"
                    style={{ background: 'linear-gradient(180deg, #a1faff, #69f6b8)', boxShadow: '0 0 8px #a1faff' }} />
                )}

                <span
                  className="material-symbols-outlined text-xl transition-all duration-200"
                  style={isActive
                    ? { fontVariationSettings: "'FILL' 1", color: '#a1faff' }
                    : { color: '#a3aac4' }
                  }
                >
                  {link.icon}
                </span>
                <span className={`font-medium ${isActive ? 'text-[#a1faff]' : 'group-hover:text-[#dee5ff]'}`}>
                  {link.label}
                </span>

                {/* Hover shimmer */}
                {!isActive && (
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ background: 'rgba(161,250,255,0.04)', border: '1px solid rgba(161,250,255,0.06)' }} />
                )}
              </a>
            )
          })}
        </nav>

        {/* Resume CTA */}
        <div className="px-4 pb-5 pt-3 border-t border-outline-variant/10">
          <a
            href={`/${personal.resume}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary block w-full py-2.5 text-center rounded-xl font-headline font-bold text-sm transition-all"
          >
            Download Resume
          </a>
          <p className="text-center text-[9px] text-on-surface-variant mt-2 uppercase tracking-widest">
            {personal.location}
          </p>
        </div>

        {/* Bottom shimmer line */}
        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(105,246,184,0.2), transparent)' }} />
      </aside>

      {/* ── Mobile bottom nav ── */}
      <nav
        className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 z-50 lg:hidden"
        style={{
          background: 'rgba(9,19,40,0.85)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(161,250,255,0.08)',
          boxShadow: '0 -4px 40px rgba(0,0,0,0.4)',
        }}
      >
        {navLinks.slice(0, 4).map(item => {
          const isActive = active === item.href.replace('#', '')
          return (
            <a
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200"
              style={isActive ? {
                background: 'rgba(161,250,255,0.08)',
                border: '1px solid rgba(161,250,255,0.12)',
                color: '#a1faff',
                boxShadow: '0 0 15px rgba(161,250,255,0.15)',
              } : { color: '#a3aac4', border: '1px solid transparent' }}
            >
              <span
                className="material-symbols-outlined text-xl"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {item.icon}
              </span>
              <span className="font-label text-[9px] uppercase tracking-widest font-bold">{item.label}</span>
            </a>
          )
        })}
      </nav>
    </>
  )
}
