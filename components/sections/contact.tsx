'use client'

import { useState, useEffect, useRef } from 'react'
import portfolioData from '@/data/portfolio.json'

export function Contact() {
  const { personal } = portfolioData
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      // You could add validation feedback here
      return
    }
    window.location.href = `mailto:${personal.email}?subject=Project Inquiry from ${form.name}&body=${form.message}`
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

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
      id="contact" 
      className="py-28 px-8 md:px-20 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #060e20 0%, #091328 50%, #0a1435 100%)'
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-3xl animate-pulse delay-2000" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(161,250,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-label text-primary font-semibold">
              Available for Work
            </span>
          </div>
          <h2 className="font-headline text-4xl md:text-6xl font-bold tracking-tight">
            Let's Create{' '}
            <span className="gradient-text relative inline-block">
              Something Amazing
              <svg className="absolute -bottom-3 left-0 w-full" height="4" viewBox="0 0 100 4" preserveAspectRatio="none">
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
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto mt-6">
            Ready to transform your digital vision into reality? Let's collaborate and build something extraordinary.
          </p>
        </div>

        <div className="glass-card rounded-2xl border border-outline-variant/10 overflow-hidden relative">
          {/* Animated border gradient */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left side - Contact Info */}
            <div className="p-12 md:p-16 bg-gradient-to-br from-surface-container-high/50 to-surface-container/30 relative overflow-hidden group">
              {/* Animated background for left side */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(161,250,255,0.05) 0%, transparent 60%)`
                }}
              />
              
              <div className="relative z-10">
                <div className="mb-12">
                  <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mb-6" />
                  <h3 className="font-headline text-3xl font-bold text-on-surface mb-4">
                    Start a Conversation
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed">
                    Whether you have a project in mind or just want to explore possibilities, I'm here to help bring your ideas to life.
                  </p>
                </div>

                {/* Contact methods */}
                <div className="space-y-6 mb-12">
                  <div className="group/contact flex items-center gap-4 p-4 rounded-xl hover:bg-surface-container-highest transition-all duration-300 cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover/contact:scale-110 transition-transform duration-300">
                      <span className="material-symbols-outlined">mail</span>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-primary font-bold mb-1">Email Me</div>
                      <div className="text-on-surface font-medium group-hover/contact:text-primary transition-colors">
                        {personal.email}
                      </div>
                    </div>
                  </div>
                  
                  <div className="group/contact flex items-center gap-4 p-4 rounded-xl hover:bg-surface-container-highest transition-all duration-300 cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover/contact:scale-110 transition-transform duration-300">
                      <span className="material-symbols-outlined">location_on</span>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-secondary font-bold mb-1">Location</div>
                      <div className="text-on-surface font-medium group-hover/contact:text-secondary transition-colors">
                        {personal.location} / Remote Worldwide
                      </div>
                    </div>
                  </div>
                  
                  <div className="group/contact flex items-center gap-4 p-4 rounded-xl hover:bg-surface-container-highest transition-all duration-300 cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary group-hover/contact:scale-110 transition-transform duration-300">
                      <span className="material-symbols-outlined">schedule</span>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-tertiary font-bold mb-1">Response Time</div>
                      <div className="text-on-surface font-medium">Within 24 hours</div>
                    </div>
                  </div>
                </div>

                {/* Social/Trust badges */}
                <div className="flex flex-wrap gap-3 pt-6 border-t border-outline-variant/10">
                  {['24/7 Support', 'NDA Protected', '100% Confidential'].map((badge, i) => (
                    <span key={i} className="text-xs px-3 py-1 rounded-full bg-surface-container-highest text-on-surface-variant border border-outline-variant/10">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side - Form */}
            <div className="p-12 md:p-16 bg-surface-container-low/30">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
                      focusedField === 'name' ? 'text-primary' : 'text-on-surface-variant'
                    }`}>
                      Full Name <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-surface-container-highest border-2 border-outline-variant/15 rounded-xl py-4 px-6 text-on-surface focus:border-primary focus:ring-0 transition-all outline-none"
                        required
                      />
                      <span className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs transition-all duration-300 ${
                        form.name ? 'text-primary opacity-100' : 'opacity-0'
                      }`}>
                        ✓
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
                      focusedField === 'email' ? 'text-primary' : 'text-on-surface-variant'
                    }`}>
                      Email Address <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="john@company.com"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-surface-container-highest border-2 border-outline-variant/15 rounded-xl py-4 px-6 text-on-surface focus:border-primary focus:ring-0 transition-all outline-none"
                        required
                      />
                      <span className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs transition-all duration-300 ${
                        form.email && form.email.includes('@') ? 'text-primary opacity-100' : 'opacity-0'
                      }`}>
                        ✓
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
                    focusedField === 'message' ? 'text-primary' : 'text-on-surface-variant'
                  }`}>
                    Project Brief <span className="text-primary">*</span>
                  </label>
                  <textarea
                    placeholder="Tell me about your vision, goals, and how we can collaborate..."
                    rows={6}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-surface-container-highest border-2 border-outline-variant/15 rounded-xl py-4 px-6 text-on-surface focus:border-primary focus:ring-0 transition-all outline-none resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="group relative w-full py-5 rounded-xl text-lg font-bold overflow-hidden transition-all duration-500"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary translate-x-[-100%] group-hover:translate-x-100 transition-transform duration-500" />
                  <span className="relative z-10 flex items-center justify-center gap-2 text-on-primary">
                    {isSubmitted ? (
                      <>
                        Message Sent! 🎉
                        <span className="material-symbols-outlined text-lg">check_circle</span>
                      </>
                    ) : (
                      <>
                        Send Message
                        <span className="material-symbols-outlined text-lg transition-transform duration-300 group-hover:translate-x-1">
                          send
                        </span>
                      </>
                    )}
                  </span>
                </button>

                {/* Form footer note */}
                <p className="text-center text-xs text-on-surface-variant">
                  By submitting, you agree to the privacy policy and consent to being contacted.
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Floating CTA bar */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 px-8 py-4 rounded-full bg-surface-container-high border border-outline-variant/10 backdrop-blur-sm">
            <span className="text-sm text-on-surface-variant">Prefer a quick chat?</span>
            <a 
              href={`tel:${personal.phone || '+1234567890'}`}
              className="flex items-center gap-2 text-primary hover:text-secondary transition-colors group"
            >
              <span className="material-symbols-outlined text-lg group-hover:animate-pulse">call</span>
              <span className="font-medium">Schedule a Call</span>
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .group:hover .material-symbols-outlined {
          animation: float 1s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}