import { SimpleStars } from '@/components/backgrounds/simple-stars'
import { EpicHeader } from '@/components/layout/epic-header'
import { EpicHero } from '@/components/sections/epic-hero'
import { AboutSkillsCombined } from '@/components/sections/about-skills-combined'
import { ExperienceProjectsTabs } from '@/components/sections/experience-projects-tabs'
import { Testimonials } from '@/components/sections/testimonials'
import { Contact } from '@/components/sections/contact'
import { Footer } from '@/components/layout/footer'
import { SectionTransition, FloatingElements } from '@/components/ui/section-transition'

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <SimpleStars />
      <FloatingElements />
      
      {/* Epic Header */}
      <EpicHeader />
      
      {/* Main Content with Epic Transitions */}
      <div className="relative z-10">
        <EpicHero />
        
        <SectionTransition delay={0.2}>
          <AboutSkillsCombined />
        </SectionTransition>
        
        <SectionTransition delay={0.4}>
          <ExperienceProjectsTabs />
        </SectionTransition>
        
        <SectionTransition delay={0.6}>
          <Testimonials />
        </SectionTransition>
        
        <SectionTransition delay={0.8}>
          <Contact />
        </SectionTransition>
      </div>
      
      {/* Footer */}
      <Footer />
    </main>
  )
}