'use client'

import { useState } from 'react'
import portfolioData from '@/data/portfolio.json'

export function Contact() {
  const { personal } = portfolioData
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = `mailto:${personal.email}?subject=Project Inquiry from ${form.name}&body=${form.message}`
  }

  return (
    <section id="contact" className="py-28 px-8 md:px-20 bg-surface-container-low">
      <div className="max-w-6xl mx-auto">
        <div className="glass-card p-12 md:p-20 rounded-xl border border-outline-variant/10 grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-8">
            <h2 className="text-secondary font-headline text-3xl font-bold tracking-tight uppercase">Start a Project</h2>
            <h3 className="font-headline text-5xl font-bold leading-tight">
              Let's build something <span className="text-primary">luminous.</span>
            </h3>
            <p className="text-on-surface-variant text-lg">
              Ready to take your digital infrastructure to the next level? I'm currently accepting new high-performance architecture projects.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <span className="text-on-surface font-medium">{personal.email}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <span className="text-on-surface font-medium">{personal.location} / Remote</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-surface-container-lowest border border-outline-variant/15 rounded-xl py-4 px-6 text-on-surface focus:border-primary/50 focus:ring-0 transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Email Address</label>
                <input
                  type="email"
                  placeholder="john@company.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-surface-container-lowest border border-outline-variant/15 rounded-xl py-4 px-6 text-on-surface focus:border-primary/50 focus:ring-0 transition-all outline-none"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Project Brief</label>
              <textarea
                placeholder="Tell me about your vision..."
                rows={5}
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                className="w-full bg-surface-container-lowest border border-outline-variant/15 rounded-xl py-4 px-6 text-on-surface focus:border-primary/50 focus:ring-0 transition-all outline-none resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-5 btn-primary rounded-xl text-lg shadow-[0_0_20px_rgba(161,250,255,0.1)] hover:shadow-[0_0_30px_rgba(161,250,255,0.2)] transition-all"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
