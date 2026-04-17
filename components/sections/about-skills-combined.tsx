'use client'

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
      className="w-5 h-5 object-contain"
    />
  )
}

export function AboutSkillsCombined() {
  const { about, skills, personal } = portfolioData

  return (
    <>
      {/* About Section */}
      <section id="about" className="section-glow py-28 px-8 md:px-20 relative" style={{ background: 'linear-gradient(180deg, #060e20 0%, #091328 100%)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left: photo */}
          <div className="lg:col-span-5 space-y-12">
            <h2 className="text-secondary font-headline text-3xl font-bold tracking-tight uppercase">Legacy &amp; Foundation</h2>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-xl opacity-20 group-hover:opacity-40 blur transition duration-500" />
              <div className="relative overflow-hidden rounded-xl bg-surface-container-highest aspect-[4/5] avatar-glow">
                <img
                  src={personal.avatar}
                  alt={personal.name}
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                />
                {/* Overlay shimmer */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060e20]/60 via-transparent to-transparent" />
              </div>
            </div>
          </div>

          {/* Right: content */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-10">
            <div className="space-y-6">
              <h3 className="font-headline text-4xl font-bold text-on-surface leading-tight">Engineering Excellence at its Core.</h3>
              <p className="text-on-surface-variant text-lg leading-relaxed max-w-2xl">{about.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 rounded-xl bg-surface-container-high border border-outline-variant/10">
                <span className="material-symbols-outlined text-primary text-4xl mb-4 block" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                <h4 className="font-headline text-xl font-bold text-on-surface mb-2">BSc Hons. Software Engineering</h4>
                <p className="text-sm text-on-surface-variant">First Class Honours degree with a focus on systems architecture and cloud scalability.</p>
              </div>
              <div className="p-8 rounded-xl bg-surface-container-high border border-outline-variant/10">
                <span className="material-symbols-outlined text-secondary text-4xl mb-4 block" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                <h4 className="font-headline text-xl font-bold text-on-surface mb-2">Most Consistent Undergraduate</h4>
                <p className="text-sm text-on-surface-variant">Awarded for maintaining peak performance and architectural discipline throughout the tenure.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-28 px-8 md:px-20">
        <div className="mb-16">
          <p className="text-secondary font-headline font-bold uppercase tracking-[0.2em] text-sm mb-4">Technical Proficiency</p>
          <h2 className="text-on-surface font-headline text-5xl md:text-7xl font-bold tracking-tighter leading-none">
            Mastering the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">Modern Stack</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Frontend - large */}
          <div className="md:col-span-8 glass-card rounded-xl p-8 border border-outline-variant/15 neon-glow transition-all duration-300">
            <div className="flex justify-between items-end mb-10">
              <div>
                <span className="material-symbols-outlined text-primary mb-2 text-3xl block">fluid</span>
                <h3 className="text-2xl font-headline font-bold text-secondary">Frontend Engineering</h3>
              </div>
              <span className="text-on-surface-variant font-label text-xs uppercase tracking-widest">Client Side</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
              {skills[0].items.map((skill, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <SkillIcon name={skill.name} />
                      <span className="text-on-surface font-medium">{skill.name}</span>
                    </div>
                    <span className="text-xs font-label text-primary-dim">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-surface-container-highest skill-track overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-secondary to-secondary-dim" style={{ width: `${skill.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Backend - narrow */}
          <div className="md:col-span-4 glass-card rounded-xl p-8 border border-outline-variant/15 neon-glow transition-all duration-300">
            <div className="mb-10">
              <span className="material-symbols-outlined text-tertiary mb-2 text-3xl block">database</span>
              <h3 className="text-2xl font-headline font-bold text-secondary">Backend</h3>
            </div>
            <ul className="space-y-6">
              {skills[1].items.map((skill, i) => (
                <li key={i} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center shrink-0">
                    <SkillIcon name={skill.name} />
                  </div>
                  <div>
                    <p className="text-on-surface font-medium">{skill.name}</p>
                    <div className="w-full bg-surface-container-highest skill-track mt-1 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-secondary to-secondary-dim" style={{ width: `${skill.level}%` }} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Infrastructure - full width */}
          <div className="md:col-span-12 glass-card rounded-xl p-8 border border-outline-variant/15 neon-glow transition-all duration-300 bg-gradient-to-br from-[#141f38]/60 to-[#091328]/40">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <div>
                <span className="material-symbols-outlined text-secondary mb-2 text-3xl block">settings_ethernet</span>
                <h3 className="text-2xl font-headline font-bold text-secondary">Infrastructure &amp; Data</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {skills[2].items.map((skill, i) => (
                  <span key={i} className="flex items-center gap-2 px-4 py-2 bg-surface-container-highest rounded-full text-xs font-label border border-outline-variant/20">
                    <SkillIcon name={skill.name} />
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: '100k+', label: 'Users Served' },
                { value: '10+', label: 'Projects Shipped' },
                { value: '99.9%', label: 'Uptime Record' },
                { value: '1st', label: 'Class Honours' },
              ].map((stat, i) => (
                <div key={i} className="stat-card p-6 rounded-xl text-center">
                  <p className="text-3xl font-headline font-bold text-primary mb-1">{stat.value}</p>
                  <p className="text-[10px] uppercase tracking-widest text-on-surface-variant">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
