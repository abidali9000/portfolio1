import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, ExternalLink, Github } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/site/reveal"
import { ProjectCard } from "@/components/site/project-card"
import { getProjectBySlug, getProjects } from "@/lib/cms/queries"
import type { Metadata } from "next"

export const revalidate = 60

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return { title: "Not found" }
  return {
    title: project.title,
    description: project.tagline ?? project.summary ?? undefined,
    openGraph: {
      title: project.title,
      description: project.tagline ?? project.summary ?? undefined,
      images: project.cover_image ? [project.cover_image] : undefined,
    },
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) notFound()

  const allProjects = await getProjects()
  const related = allProjects.filter(p => p.id !== project.id).slice(0, 3)
  const metricsEntries = Object.entries((project.metrics ?? {}) as Record<string, string>)

  return (
    <article>
      <section className="border-b border-border py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-10"
          >
            <ArrowLeft className="h-4 w-4" /> Back to all projects
          </Link>

          <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
            <div>
              <Reveal>
                <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                  {project.category && <Badge variant="outline">{project.category}</Badge>}
                  {project.year && <span>{project.year}</span>}
                  {project.industry && <span>· {project.industry}</span>}
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="mt-4 font-serif text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                  {project.title}
                </h1>
              </Reveal>
              {project.tagline && (
                <Reveal delay={0.1}>
                  <p className="mt-4 max-w-2xl text-xl text-muted-foreground">{project.tagline}</p>
                </Reveal>
              )}

              <Reveal delay={0.15}>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.live_url && (
                    <Button asChild size="sm" className="rounded-full">
                      <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                        Live demo <ExternalLink className="ml-1 h-3.5 w-3.5" />
                      </a>
                    </Button>
                  )}
                  {project.repo_url && (
                    <Button asChild size="sm" variant="outline" className="rounded-full">
                      <a href={project.repo_url} target="_blank" rel="noopener noreferrer">
                        Source <Github className="ml-1 h-3.5 w-3.5" />
                      </a>
                    </Button>
                  )}
                </div>
              </Reveal>
            </div>

            {metricsEntries.length > 0 && (
              <Reveal delay={0.2}>
                <aside className="rounded-2xl border border-border bg-card p-6">
                  <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                    Outcomes
                  </div>
                  <dl className="space-y-4">
                    {metricsEntries.map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-xs text-muted-foreground">{k}</dt>
                        <dd className="font-serif text-2xl font-bold">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </aside>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {project.cover_image && (
        <section className="border-b border-border bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <Reveal>
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-card">
                <Image
                  src={project.cover_image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className="border-b border-border py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
            <Reveal className="space-y-6">
              {project.summary && (
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">{project.summary}</p>
              )}
              {project.body && (
                <div className="whitespace-pre-line text-base md:text-lg leading-relaxed">{project.body}</div>
              )}
            </Reveal>

            <Reveal delay={0.05}>
              <aside className="rounded-2xl border border-border bg-card p-6 space-y-6">
                {project.tech_stack && project.tech_stack.length > 0 && (
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                      Built with
                    </div>
                    <ul className="flex flex-wrap gap-1.5">
                      {project.tech_stack.map(t => (
                        <li
                          key={t}
                          className="rounded-full border border-border bg-background px-2.5 py-0.5 text-xs font-medium"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                    Project type
                  </div>
                  <div className="text-sm">{project.case_study ? "Full case study" : "Project highlight"}</div>
                </div>
                <div className="pt-4 border-t border-border">
                  <Button asChild variant="outline" className="w-full rounded-full group">
                    <Link href="/contact">
                      Got something similar in mind?
                      <ArrowUpRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </Button>
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      {project.gallery && project.gallery.length > 0 && (
        <section className="border-b border-border py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl font-bold mb-8">Gallery</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {project.gallery.map((src, i) => (
                <Reveal key={src} delay={i * 0.05}>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border">
                    <Image
                      src={src}
                      alt={`${project.title} screenshot ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl font-bold mb-8">More work</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map(p => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  )
}
