import { Badge } from "@/components/ui/badge"
import { Reveal } from "@/components/site/reveal"
import { ProjectCard } from "@/components/site/project-card"
import { getProjects } from "@/lib/cms/queries"
import type { Metadata } from "next"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Selected work",
  description:
    "Hand-picked work — Chrome extensions, web apps, custom CMS platforms and automation tools shipped for clients across SaaS, healthcare, education and non-profits.",
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const projects = await getProjects()
  const { category } = await searchParams

  const categories = Array.from(
    new Set(projects.map(p => p.category).filter((c): c is string => Boolean(c))),
  )
  const filtered = category ? projects.filter(p => p.category === category) : projects

  return (
    <>
      <section className="border-b border-border py-20 md:py-28">
        <div className="container mx-auto px-4">
          <Reveal>
            <Badge variant="outline" className="rounded-full px-3 py-1 text-xs">
              The work
            </Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 font-serif text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] max-w-4xl">
              Things I&apos;ve built. <span className="gradient-text">Receipts attached.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              A selection of recent client projects. Tap any card to see what I built, the
              tech behind it and the metric it moved.
            </p>
          </Reveal>
        </div>
      </section>

      {categories.length > 0 && (
        <section className="border-b border-border bg-muted/30 py-6">
          <div className="container mx-auto px-4">
            <ul className="flex flex-wrap items-center gap-2">
              <li>
                <a
                  href="/projects"
                  className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                    !category
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:border-foreground/40"
                  }`}
                >
                  All
                </a>
              </li>
              {categories.map(c => (
                <li key={c}>
                  <a
                    href={`/projects?category=${encodeURIComponent(c)}`}
                    className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                      category === c
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-foreground/40"
                    }`}
                  >
                    {c}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="py-16">
        <div className="container mx-auto px-4">
          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground">No projects in that category yet.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p, i) => (
                <Reveal key={p.id} delay={(i % 6) * 0.04}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
