import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/site/reveal"
import { getTestimonials } from "@/lib/cms/queries"
import type { Metadata } from "next"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Testimonials & reviews",
  description: "What clients say — verified reviews and original screenshots from Upwork and direct projects.",
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials()

  return (
    <>
      <section className="border-b border-border py-20 md:py-28">
        <div className="container mx-auto px-4">
          <Reveal>
            <Badge variant="outline" className="rounded-full">Testimonials</Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 font-serif text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] max-w-4xl">
              The receipts. <span className="gradient-text">Every one verified.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              These aren&apos;t hand-picked quotes. Every review here is linked back to the original
              source so you can verify it yourself.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={(i % 6) * 0.04}>
              <figure className="rounded-2xl border border-border bg-card p-6 hover:border-foreground/30 transition-colors h-full flex flex-col">
                <div className="flex items-center gap-0.5 text-amber-500">
                  {Array.from({ length: Math.round(t.rating ?? 5) }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 text-base leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>

                {t.proof_image && (
                  <a
                    href={t.source_url ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block overflow-hidden rounded-lg border border-border"
                  >
                    <Image
                      src={t.proof_image}
                      alt={`${t.client_name} review on ${t.source ?? "Upwork"}`}
                      width={600}
                      height={120}
                      className="h-auto w-full"
                    />
                  </a>
                )}

                <figcaption className="mt-4 flex items-center justify-between gap-4 border-t border-border pt-4">
                  <div>
                    <div className="text-sm font-semibold">{t.client_name}</div>
                    <div className="text-xs text-muted-foreground">
                      {[t.client_role, t.client_company].filter(Boolean).join(" · ") || t.source}
                    </div>
                  </div>
                  {t.project_value && (
                    <div className="text-right">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Value</div>
                      <div className="font-serif text-sm font-bold">{t.project_value}</div>
                    </div>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold">Ready to add your name to this list?</h2>
          <div className="mt-8">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/contact">
                Start a project <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
