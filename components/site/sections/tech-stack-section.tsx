import { Reveal } from "@/components/site/reveal"

export interface TechStackData {
  eyebrow?: string
  heading?: string
  items?: string[]
}

export function TechStackSection({ data }: { data: TechStackData }) {
  const items = data.items ?? []
  if (!items.length) return null
  return (
    <section className="border-b border-border py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <Reveal className="mb-10 text-center">
          {data.eyebrow && (
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              {data.eyebrow}
            </div>
          )}
          <h2 className="font-serif text-3xl md:text-4xl font-bold">
            {data.heading ?? "Tools I reach for"}
          </h2>
        </Reveal>
        <Reveal>
          <ul className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-2">
            {items.map(t => (
              <li
                key={t}
                className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium hover:border-foreground/40 transition-colors"
              >
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
