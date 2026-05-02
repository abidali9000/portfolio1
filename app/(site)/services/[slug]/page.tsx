import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Check, Chrome, Code, Database, Globe } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/site/reveal"
import { ProjectCard } from "@/components/site/project-card"
import { getProjects, getServiceBySlug, getServices } from "@/lib/cms/queries"
import type { Metadata } from "next"

export const revalidate = 60

export async function generateStaticParams() {
  const services = await getServices()
  return services.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  if (!service) return { title: "Not found" }
  return {
    title: service.title,
    description: service.tagline ?? service.description ?? undefined,
  }
}

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  database: Database,
  code: Code,
  chrome: Chrome,
  globe: Globe,
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  if (!service) notFound()

  const projects = await getProjects()
  const related = projects.filter(p =>
    p.category && service.title.toLowerCase().includes(p.category.toLowerCase())
  ).slice(0, 3)
  const fallback = projects.slice(0, 3)
  const showProjects = related.length ? related : fallback

  const Icon: React.ComponentType<{ className?: string }> = (service.icon && ICONS[service.icon]) || Code

  return (
    <article>
      <section className="border-b border-border py-20 md:py-28">
        <div className="container mx-auto px-4">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> Back to services
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="grid h-14 w-14 place-items-center rounded-xl border border-border bg-background">
              <Icon className="h-6 w-6" />
            </div>
            {service.tagline && <Badge variant="outline" className="rounded-full">{service.tagline}</Badge>}
          </div>
          <Reveal>
            <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] max-w-4xl">
              {service.title}
            </h1>
          </Reveal>
          {service.description && (
            <Reveal delay={0.05}>
              <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{service.description}</p>
            </Reveal>
          )}

          <Reveal delay={0.1}>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Starting price</div>
                <div className="mt-2 font-serif text-3xl font-bold">{service.starting_price ?? "Custom"}</div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Delivery</div>
                <div className="mt-2 font-serif text-3xl font-bold">{service.delivery_time ?? "TBD"}</div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Working style</div>
                <div className="mt-2 font-serif text-3xl font-bold">Fixed-price</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {service.features && service.features.length > 0 && (
        <section className="border-b border-border py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <Reveal className="mb-10">
              <h2 className="font-serif text-3xl md:text-4xl font-bold">What&apos;s included</h2>
            </Reveal>
            <ul className="grid gap-4 md:grid-cols-2">
              {service.features.map((f, i) => (
                <Reveal key={f} delay={i * 0.04}>
                  <li className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                    <span className="mt-0.5 grid h-6 w-6 place-items-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-base">{f}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="border-b border-border py-20">
        <div className="container mx-auto px-4">
          <Reveal className="mb-10">
            <h2 className="font-serif text-3xl md:text-4xl font-bold">Related work</h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {showProjects.map(p => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold">Ready to get started?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Tell me what you&apos;re building. I&apos;ll reply within a working day with a fixed quote.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/contact">
                Start a project <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </article>
  )
}
