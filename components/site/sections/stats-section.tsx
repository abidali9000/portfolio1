import { Reveal } from "@/components/site/reveal"

export interface StatsData {
  eyebrow?: string
  heading?: string
  items?: Array<{ value: string; label: string }>
}

export function StatsSection({ data }: { data: StatsData }) {
  const items = data.items ?? []
  if (!items.length) return null

  return (
    <section className="border-b border-border bg-muted/30">
      <div className="container mx-auto px-4 py-16">
        {(data.eyebrow || data.heading) && (
          <Reveal className="mb-10 text-center">
            {data.eyebrow && (
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                {data.eyebrow}
              </div>
            )}
            {data.heading && (
              <h2 className="font-serif text-3xl md:text-4xl font-bold">{data.heading}</h2>
            )}
          </Reveal>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((s, i) => (
            <Reveal key={`${s.label}-${i}`} delay={i * 0.05}>
              <div className="rounded-2xl border border-border bg-card p-6 text-center hover:border-foreground/30 transition-colors">
                <div className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
                  {s.value}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
