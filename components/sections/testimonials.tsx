'use client'

import portfolioData from '@/data/portfolio.json'

export function Testimonials() {
  const { testimonials } = portfolioData

  return (
    <section id="testimonials" className="py-28 px-8 md:px-20 bg-surface-container-low">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="text-secondary font-headline text-lg font-medium mb-4">Words from Partners</h2>
            <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">
              Vouched by the <span className="text-primary">Industry Best.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map(t => (
            <div key={t.id} className="bg-surface-container rounded-xl p-10 flex flex-col justify-between">
              <div>
                <span className="material-symbols-outlined text-secondary text-5xl opacity-20 mb-6 block" style={{ fontVariationSettings: "'FILL' 1" }}>
                  format_quote
                </span>
                <p className="text-on-surface text-xl md:text-2xl font-light italic leading-relaxed mb-8">
                  "{t.content}"
                </p>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.avatarAlt}
                  className="w-14 h-14 rounded-full object-cover grayscale"
                />
                <div>
                  <div className="font-headline font-bold text-on-surface">{t.name}</div>
                  <div className="font-label text-xs uppercase tracking-widest text-on-surface-variant">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
