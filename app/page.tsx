import { EpicHeader } from '@/components/layout/epic-header'
import { EpicHero } from '@/components/sections/epic-hero'
import { AboutSkillsCombined } from '@/components/sections/about-skills-combined'
import { ExperienceProjectsTabs } from '@/components/sections/experience-projects-tabs'
import { Testimonials } from '@/components/sections/testimonials'
import { Contact } from '@/components/sections/contact'
import { Footer } from '@/components/layout/footer'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-surface">
      <EpicHeader />
      {/* lg:ml-64 offsets content by sidebar width on desktop */}
      <div className="lg:ml-64 pb-24 lg:pb-0">
        <EpicHero />
        <AboutSkillsCombined />
        <ExperienceProjectsTabs />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </main>
  )
}
