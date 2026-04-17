'use client'

import { useEffect, useRef, useState } from 'react'
import portfolioData from '@/data/portfolio.json'

export function Testimonials() {
  const { testimonials } = portfolioData
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
    
    const section = sectionRef.current
    if (section) {
      section.addEventListener('mousemove', handleMouseMove)
      return () => section.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <section 
      ref={sectionRef}
      id="testimonials" 
      className="py-28 px-8 md:px-20 bg-surface-container-low relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 6}s`,
              animationFillMode: 'both'
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <div className="text-secondary font-headline text-lg font-medium mb-4 flex items-center gap-2">
              <span className="w-8 h-px bg-secondary" />
              Words from Partners
            </div>
            <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">
              Vouched by the{' '}
              <span className="relative inline-block">
                <span className="text-primary relative z-10">Industry Best.</span>
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
          
          {/* Decorative element */}
          <div className="hidden md:block">
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-1 h-8 bg-gradient-to-t from-primary/30 to-transparent rounded-full"
                  style={{ animationDelay: `${i * 200}ms` }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, index) => (
            <div 
              key={t.id} 
              className="group relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Animated border glow */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r from-primary via-secondary to-primary rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 ${
                hoveredIndex === index ? 'opacity-30' : ''
              }`} />
              
              {/* Card */}
              <div className="relative bg-surface-container rounded-2xl p-10 flex flex-col justify-between transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl border border-outline-variant/10 hover:border-primary/30">
                {/* Mouse tracking gradient overlay */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{
                    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(161,250,255,0.08) 0%, transparent 70%)`
                  }}
                />
                
                {/* Quote icon with animation */}
                <div className="relative">
                  <span 
                    className="material-symbols-outlined text-secondary text-6xl opacity-20 mb-6 block transition-all duration-500 group-hover:opacity-40 group-hover:scale-110 group-hover:-translate-y-2"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    format_quote
                  </span>
                  
                  {/* Animated quote mark overlay */}
                  <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                    <span 
                      className="material-symbols-outlined text-primary/10 text-8xl absolute -top-6 -left-6 transition-all duration-700 group-hover:scale-150 group-hover:rotate-12"
                    >
                      format_quote
                    </span>
                  </div>
                </div>
                
                {/* Testimonial content */}
                <p className="text-on-surface text-xl md:text-2xl font-light italic leading-relaxed mb-8 relative z-10 transition-all duration-300 group-hover:text-on-surface/90">
                  "{t.content}"
                </p>
                
                {/* Author section */}
                <div className="flex items-center gap-4 relative z-10">
                  <div className="relative">
                    {/* Avatar glow ring */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-full opacity-0 group-hover:opacity-100 blur-md transition-all duration-500" />
                    
                    {/* Avatar image */}
                    <img
                      src={t.avatar}
                      alt={t.avatarAlt}
                      className="w-14 h-14 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 relative z-10 ring-2 ring-outline-variant/20 group-hover:ring-primary/50"
                    />
                    
                    {/* Online indicator */}
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-surface-container animate-pulse z-20" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="font-headline font-bold text-on-surface group-hover:text-primary transition-colors duration-300">
                      {t.name}
                    </div>
                    <div className="font-label text-xs uppercase tracking-widest text-on-surface-variant group-hover:text-secondary transition-colors duration-300">
                      {t.role}
                    </div>
                  </div>
                  
                  {/* Decorative line */}
                  <div className="hidden md:block w-px h-8 bg-gradient-to-b from-primary/0 via-primary/30 to-primary/0" />
                </div>
                
                {/* Hover reveal icon */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <span className="material-symbols-outlined text-primary/40 text-2xl">
                    arrow_forward
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Trust indicators */}
        <div className="mt-20 pt-8 border-t border-outline-variant/10">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-sm">verified</span>
              <span className="text-xs uppercase tracking-widest text-on-surface-variant">Trusted by Industry Leaders</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-sm">star_rate</span>
              <span className="text-xs uppercase tracking-widest text-on-surface-variant">5/5 Client Satisfaction</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-sm">schedule</span>
              <span className="text-xs uppercase tracking-widest text-on-surface-variant">On-Time Delivery Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.5;
          }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .group:hover {
          animation: slideIn 0.5s ease-out;
        }
      `}</style>
    </section>
  )
}