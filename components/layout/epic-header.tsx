'use client'

import { useState, useEffect } from 'react'
import portfolioData from '@/data/portfolio.json'

const navLinks = [
  { label: 'Overview', href: '#home', icon: 'grid_view' },
  { label: 'Projects', href: '#projects', icon: 'rocket_launch' },
  { label: 'Experience', href: '#experience', icon: 'timeline' },
  { label: 'Skills', href: '#skills', icon: 'terminal' },
  { label: 'Contact', href: '#contact', icon: 'alternate_email' },
]

export function EpicHeader() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'experience', 'skills', 'contact']
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Sidebar — desktop only */}
      <aside className="fixed left-0 top-0 h-full hidden lg:flex flex-col py-8 bg-[#091328] w-64 shadow-[40px_0_40px_rgba(0,229,255,0.04)] z-40">
        {/* Logo */}
        <div className="px-6 mb-12">
          <div className="flex items-center gap-3 mb-1">
            <span className="material-symbols-outlined text-[#00E5FF]">terminal</span>
            <h2 className="text-xl font-black text-[#00E5FF] font-headline tracking-tighter">TAWONA</h2>
          </div>
          <p className="text-xs text-on-surface-variant font-label uppercase tracking-widest pl-9">
            Full Stack Developer
          </p>
        </div>

        {/* Nav links */}
        <nav className="flex-1 space-y-1">
          {navLinks.map(link => {
            const isActive = active === link.href.replace('#', '')
            return (
              <a
                key={link.href}
                href={link.href}
                className={`flex items-center gap-4 px-6 py-4 font-headline text-sm transition-all duration-200 ${
                  isActive
                    ? 'text-[#00E5FF] font-bold bg-[#141f38] border-r-4 border-[#00E5FF] translate-x-1'
                    : 'text-[#a3aac4] hover:bg-[#141f38]/50 hover:text-[#dee5ff]'
                }`}
              >
                <span className="material-symbols-outlined" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
                  {link.icon}
                </span>
                {link.label}
              </a>
            )
          })}
        </nav>

        {/* Resume CTA */}
        <div className="px-6 mt-auto">
          <a
            href={`/${portfolioData.personal.resume}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-4 text-center border border-primary/20 text-primary rounded-xl font-headline font-bold hover:bg-primary/10 transition-colors"
          >
            Resume
          </a>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 bg-[#141f38]/60 backdrop-blur-lg rounded-t-3xl border-t border-[#40485d]/15 z-50 shadow-[0_-4px_40px_rgba(0,229,255,0.08)] lg:hidden">
        {navLinks.slice(0, 4).map(item => {
          const isActive = active === item.href.replace('#', '')
          return (
            <a
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center transition-all ${
                isActive
                  ? 'text-[#00E5FF] bg-[#00E5FF]/10 rounded-xl px-3 py-1 shadow-[0_0_15px_rgba(0,229,238,0.3)]'
                  : 'text-[#a3aac4] opacity-60 hover:opacity-100 hover:text-[#69f6b8]'
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-label text-[10px] uppercase tracking-widest font-bold mt-1">{item.label}</span>
            </a>
          )
        })}
      </nav>
    </>
  )
}
