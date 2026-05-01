import Link from "next/link"
import { ArrowUpRight, Chrome, Code, Database, Globe } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Reveal } from "@/components/site/reveal"
import { getServices } from "@/lib/cms/queries"
import type { Metadata } from "next"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Services",
  description:
    "What I do — custom CMS development, full-stack web apps, Chrome extensions and bespoke automation. Pricing and timelines for each.",
}

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  database: Database,
  code: Code,
  chrome: Chrome,
  globe: Globe,
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <>
      <section className="border-b border-border py-20 md:py-28">
        <div className="container mx-auto px-4">
          <Reveal>
            <Badge variant="outline" className="rounded-full px-3 py-1 text-xs">
              Services
            </Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 font-serif text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] max-w-4xl">
              Built like a product, <span className="gradient-text">priced like a service.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Four focused offerings. Each one is fixed-price-able once we&apos;ve scoped it.
              Pick the one that matches the shape of your problem.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 grid gap-6 md:grid-cols-2">
          {services.map((s, i) => {
            const Icon: React.ComponentType<{ className?: string }> = (s.icon && ICONS[s.icon]) || Code
            return (
              <Reveal key={s.id} delay={i * 0.05}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group relative block h-full overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all hover:border-foreground/30 hover:shadow-2xl"
                >
                  <div className="flex items-start justify-between">
                    <div className="grid h-14 w-14 place-items-center rounded-xl border border-border bg-background">
                      <Icon className="h-6 w-6" />
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <h2 className="mt-6 font-serif text-3xl font-bold">{s.title}</h2>
                  {s.tagline && <p className="mt-1 text-sm text-muted-foreground">{s.tagline}</p>}
                  {s.description && (
                    <p className="mt-4 text-base text-muted-foreground leading-relaxed">{s.description}</p>
                  )}
                  {s.features && s.features.length > 0 && (
                    <ul className="mt-6 grid grid-cols-2 gap-2 text-sm">
                      {s.features.slice(0, 6).map(f => (
                        <li key={f} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1 w-1 rounded-full bg-foreground" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-8 flex items-center justify-between border-t border-border pt-4 text-sm">
                    <span><span className="text-muted-foreground">Starting</span>{" "}<span className="font-semibold">{s.starting_price ?? "Custom"}</span></span>
                    <span><span className="text-muted-foreground">Delivery</span>{" "}<span className="font-semibold">{s.delivery_time ?? "TBD"}</span></span>
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
