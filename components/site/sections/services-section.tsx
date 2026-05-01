import Link from "next/link"
import { ArrowUpRight, Chrome, Code, Database, Globe, Zap } from "lucide-react"
import { Reveal } from "@/components/site/reveal"
import type { Service } from "@/lib/supabase/types"

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  database: Database,
  code: Code,
  chrome: Chrome,
  globe: Globe,
  zap: Zap,
}

export interface ServicesData {
  eyebrow?: string
  heading?: string
  subheading?: string
}

export function ServicesSection({
  data,
  services,
}: {
  data: ServicesData
  services: Service[]
}) {
  if (!services.length) return null
  return (
    <section className="border-b border-border py-24" id="services">
      <div className="container mx-auto px-4">
        <Reveal className="mb-12 max-w-2xl">
          {data.eyebrow && (
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              {data.eyebrow}
            </div>
          )}
          <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight">
            {data.heading ?? "What I do"}
          </h2>
          {data.subheading && (
            <p className="mt-4 text-lg text-muted-foreground">{data.subheading}</p>
          )}
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2">
          {services.map((s, i) => {
            const Icon: React.ComponentType<{ className?: string }> = (s.icon && ICONS[s.icon]) || Code
            return (
              <Reveal key={s.id} delay={i * 0.05}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group relative block overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all hover:border-foreground/30 hover:shadow-2xl"
                >
                  <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl transition-opacity opacity-0 group-hover:opacity-100" />
                  <div className="flex items-start justify-between">
                    <div className="grid h-12 w-12 place-items-center rounded-xl border border-border bg-background">
                      <Icon className="h-5 w-5" />
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <h3 className="mt-6 font-serif text-2xl font-bold">{s.title}</h3>
                  {s.tagline && (
                    <p className="mt-1 text-sm text-muted-foreground">{s.tagline}</p>
                  )}
                  {s.description && (
                    <p className="mt-4 text-base text-muted-foreground leading-relaxed line-clamp-3">
                      {s.description}
                    </p>
                  )}
                  <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
                    {s.starting_price && (
                      <span><span className="text-foreground font-medium">{s.starting_price}</span></span>
                    )}
                    {s.delivery_time && (
                      <span>Delivery: <span className="text-foreground font-medium">{s.delivery_time}</span></span>
                    )}
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
