import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/site/reveal"
import { GridBg } from "@/components/site/grid-bg"

export interface CtaData {
  eyebrow?: string
  heading?: string
  subheading?: string
  primary_cta?: { label: string; href: string }
  secondary_cta?: { label: string; href: string }
}

export function CtaSection({ data }: { data: CtaData }) {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="relative isolate overflow-hidden rounded-3xl border border-border bg-card px-6 py-20 md:px-16 md:py-24">
          <GridBg />
          <div className="relative mx-auto max-w-3xl text-center">
            {data.eyebrow && (
              <Reveal>
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                  {data.eyebrow}
                </div>
              </Reveal>
            )}
            <Reveal>
              <h2 className="font-serif text-4xl md:text-6xl font-bold leading-[1.05]">
                {data.heading ?? "Got a project in mind?"}
              </h2>
            </Reveal>
            {data.subheading && (
              <Reveal delay={0.05}>
                <p className="mt-5 text-lg text-muted-foreground">{data.subheading}</p>
              </Reveal>
            )}
            <Reveal delay={0.1}>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button asChild size="lg" className="rounded-full group h-12 px-6">
                  <Link href={data.primary_cta?.href ?? "/contact"}>
                    {data.primary_cta?.label ?? "Start a project"}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                {data.secondary_cta && (
                  <Button asChild size="lg" variant="outline" className="rounded-full group h-12 px-6">
                    <a
                      href={data.secondary_cta.href}
                      target={data.secondary_cta.href.startsWith("http") ? "_blank" : undefined}
                      rel={data.secondary_cta.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {data.secondary_cta.label}
                      <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </Button>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
