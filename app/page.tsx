import { SimpleStars } from '@/components/backgrounds/simple-stars'
import { EpicHeader } from '@/components/layout/epic-header'
import { EpicHero } from '@/components/sections/epic-hero'
import { EpicAbout } from '@/components/sections/epic-about'
import { EpicSkills } from '@/components/sections/epic-skills'
import { EpicExperience } from '@/components/sections/epic-experience'
import { Projects } from '@/components/sections/projects'
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
          <EpicAbout />
        </SectionTransition>
        
        <SectionTransition delay={0.4}>
          <EpicSkills />
        </SectionTransition>
        
        <SectionTransition delay={0.6}>
          <EpicExperience />
        </SectionTransition>
        
        <SectionTransition delay={0.8}>
          <Projects />
        </SectionTransition>
        
        <SectionTransition delay={1.0}>
          <Testimonials />
        </SectionTransition>
        
        <SectionTransition delay={1.2}>
          <Contact />
        </SectionTransition>
      </div>
      
      {/* Footer */}
      <Footer />
    </main>
  )
}