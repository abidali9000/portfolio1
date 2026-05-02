import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/site/reveal"
import { ProjectCard } from "@/components/site/project-card"
import type { Project } from "@/lib/supabase/types"

export interface FeaturedProjectsData {
  eyebrow?: string
  heading?: string
  subheading?: string
}

export function FeaturedProjectsSection({
  data,
  projects,
}: {
  data: FeaturedProjectsData
  projects: Project[]
}) {
  if (!projects.length) return null
  const [first, second, ...rest] = projects
  return (
    <section className="border-b border-border py-24" id="work">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-2xl">
            {data.eyebrow && (
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                {data.eyebrow}
              </div>
            )}
            <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight">
              {data.heading ?? "Selected work"}
            </h2>
            {data.subheading && (
              <p className="mt-4 text-lg text-muted-foreground">{data.subheading}</p>
            )}
          </Reveal>
          <Reveal>
            <Button asChild variant="ghost" className="rounded-full group">
              <Link href="/projects">
                View all work
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {first && (
            <Reveal className="md:col-span-2">
              <ProjectCard project={first} size="large" />
            </Reveal>
          )}
          {second && (
            <Reveal delay={0.05}>
              <ProjectCard project={second} />
            </Reveal>
          )}
          {rest.map((p, i) => (
            <Reveal key={p.id} delay={(i + 2) * 0.05}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
