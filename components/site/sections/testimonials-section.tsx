import Image from "next/image"
import { Star } from "lucide-react"
import { Reveal } from "@/components/site/reveal"
import { objectPositionStyle } from "@/lib/cms/image"
import type { Testimonial } from "@/lib/supabase/types"

export interface TestimonialsData {
  eyebrow?: string
  heading?: string
  subheading?: string
}

export function TestimonialsSection({
  data,
  testimonials,
}: {
  data: TestimonialsData
  testimonials: Testimonial[]
}) {
  if (!testimonials.length) return null
  return (
    <section className="border-b border-border py-24" id="testimonials">
      <div className="container mx-auto px-4">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          {data.eyebrow && (
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              {data.eyebrow}
            </div>
          )}
          <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight">
            {data.heading ?? "What clients say"}
          </h2>
          {data.subheading && (
            <p className="mt-4 text-lg text-muted-foreground">{data.subheading}</p>
          )}
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.05}>
              <figure className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 hover:border-foreground/30 transition-colors">
                <div className="flex items-center gap-0.5 text-amber-500">
                  {Array.from({ length: Math.round(t.rating ?? 5) }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 text-base leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {t.client_avatar ? (
                      <Image
                        src={t.client_avatar}
                        alt={t.client_name}
                        width={36}
                        height={36}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="grid h-9 w-9 place-items-center rounded-full bg-muted text-xs font-semibold">
                        {t.client_name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-semibold">{t.client_name}</div>
                      <div className="text-xs text-muted-foreground">
                        {[t.client_role, t.client_company].filter(Boolean).join(" · ") || t.source}
                      </div>
                    </div>
                  </div>
                  {t.project_value && (
                    <div className="text-right">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Value</div>
                      <div className="font-serif text-sm font-bold">{t.project_value}</div>
                    </div>
                  )}
                </figcaption>
                {t.proof_image && (
                  <a
                    href={t.source_url ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block overflow-hidden rounded-lg border border-border opacity-90 hover:opacity-100"
                  >
                    <Image
                      src={t.proof_image}
                      alt={`${t.client_name} review on ${t.source ?? "Upwork"}`}
                      width={600}
                      height={120}
                      className="h-auto w-full"
                      style={{ objectPosition: objectPositionStyle(t.proof_image_position) }}
                    />
                  </a>
                )}
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
