import { SectionRenderer } from "@/components/site/section-renderer"
import {
  getProjects,
  getSections,
  getServices,
  getSiteSettings,
  getTestimonials,
} from "@/lib/cms/queries"

export const revalidate = 60

export default async function HomePage() {
  const [sections, settings, services, projects, testimonials] = await Promise.all([
    getSections("home"),
    getSiteSettings(),
    getServices(),
    getProjects({ featuredOnly: true, limit: 5 }),
    getTestimonials({ featuredOnly: true }),
  ])

  return (
    <SectionRenderer
      sections={sections}
      settings={settings}
      services={services}
      projects={projects}
      testimonials={testimonials}
    />
  )
}
