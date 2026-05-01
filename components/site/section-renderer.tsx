import { HeroSection, type HeroData } from "@/components/site/sections/hero-section"
import { StatsSection, type StatsData } from "@/components/site/sections/stats-section"
import { LogosSection, type LogosData } from "@/components/site/sections/logos-section"
import { ServicesSection, type ServicesData } from "@/components/site/sections/services-section"
import { FeaturedProjectsSection, type FeaturedProjectsData } from "@/components/site/sections/featured-projects-section"
import { ProcessSection, type ProcessData } from "@/components/site/sections/process-section"
import { TechStackSection, type TechStackData } from "@/components/site/sections/tech-stack-section"
import { TestimonialsSection, type TestimonialsData } from "@/components/site/sections/testimonials-section"
import { FaqSection, type FaqData } from "@/components/site/sections/faq-section"
import { CtaSection, type CtaData } from "@/components/site/sections/cta-section"
import { RichTextSection, type RichTextData } from "@/components/site/sections/rich-text-section"
import type { Project, Section, Service, SiteSettings, Testimonial } from "@/lib/supabase/types"

export function SectionRenderer({
  sections,
  settings,
  services,
  projects,
  testimonials,
}: {
  sections: Section[]
  settings: SiteSettings
  services: Service[]
  projects: Project[]
  testimonials: Testimonial[]
}) {
  return (
    <>
      {sections.map(section => {
        switch (section.type) {
          case "hero":
            return <HeroSection key={section.id} data={section.data as HeroData} settings={settings} />
          case "stats":
            return <StatsSection key={section.id} data={section.data as StatsData} />
          case "logos":
            return <LogosSection key={section.id} data={section.data as LogosData} />
          case "services":
            return <ServicesSection key={section.id} data={section.data as ServicesData} services={services} />
          case "featured_projects":
            return (
              <FeaturedProjectsSection
                key={section.id}
                data={section.data as FeaturedProjectsData}
                projects={projects}
              />
            )
          case "process":
            return <ProcessSection key={section.id} data={section.data as ProcessData} />
          case "tech_stack":
            return <TechStackSection key={section.id} data={section.data as TechStackData} />
          case "testimonials":
            return (
              <TestimonialsSection
                key={section.id}
                data={section.data as TestimonialsData}
                testimonials={testimonials}
              />
            )
          case "faq":
            return <FaqSection key={section.id} data={section.data as FaqData} />
          case "cta":
            return <CtaSection key={section.id} data={section.data as CtaData} />
          case "rich_text":
            return <RichTextSection key={section.id} data={section.data as RichTextData} />
          default:
            return null
        }
      })}
    </>
  )
}
