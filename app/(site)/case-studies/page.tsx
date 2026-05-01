import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Reveal } from "@/components/site/reveal"
import { getProjects } from "@/lib/cms/queries"
import type { Metadata } from "next"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Case studies",
  description:
    "In-depth case studies of recent client projects — what we built, how we built it, and the metric it moved.",
}

export default async function CaseStudiesPage() {
  const projects = await getProjects({ caseStudiesOnly: true })

  return (
    <>
      <section className="border-b border-border py-20 md:py-28">
        <div className="container mx-auto px-4">
          <Reveal>
            <Badge variant="outline" className="rounded-full px-3 py-1 text-xs">Case studies</Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 font-serif text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] max-w-4xl">
              Real projects, <span className="gradient-text">real outcomes.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Pick any case study below to read the brief, the build and the measurable
              result the client cared about.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 space-y-10">
          {projects.length === 0 && (
            <p className="text-center text-muted-foreground">Case studies coming soon.</p>
          )}
          {projects.map((p, i) => {
            const metricsEntries = Object.entries((p.metrics ?? {}) as Record<string, string>)
            return (
              <Reveal key={p.id} delay={(i % 3) * 0.05}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="group grid gap-8 overflow-hidden rounded-3xl border border-border bg-card p-2 transition-all hover:border-foreground/30 hover:shadow-2xl md:grid-cols-2 md:p-0"
                >
                  {p.cover_image && (
                    <div className="relative aspect-[16/11] overflow-hidden rounded-2xl md:rounded-none">
                      <Image
                        src={p.cover_image}
                        alt={p.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                  )}
                  <div className="flex flex-col justify-between p-6 md:p-10">
                    <div>
                      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                        {p.category && <span>{p.category}</span>}
                        {p.year && <span>· {p.year}</span>}
                        {p.industry && <span>· {p.industry}</span>}
                      </div>
                      <h2 className="mt-3 font-serif text-3xl md:text-4xl font-bold leading-tight">
                        {p.title}
                      </h2>
                      {p.tagline && <p className="mt-3 text-lg text-muted-foreground">{p.tagline}</p>}
                      {p.summary && (
                        <p className="mt-4 text-sm text-muted-foreground line-clamp-3">{p.summary}</p>
                      )}
                    </div>

                    {metricsEntries.length > 0 && (
                      <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-5">
                        {metricsEntries.slice(0, 3).map(([k, v]) => (
                          <div key={k}>
                            <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">{k}</dt>
                            <dd className="mt-1 font-serif text-xl font-bold">{v}</dd>
                          </div>
                        ))}
                      </dl>
                    )}

                    <div className="mt-6 flex items-center gap-2 text-sm font-medium">
                      Read the case study
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </section>
    </>
  )
}
