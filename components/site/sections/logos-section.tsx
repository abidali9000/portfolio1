import { Marquee } from "@/components/site/marquee"

export interface LogosData {
  eyebrow?: string
  items?: string[]
}

export function LogosSection({ data }: { data: LogosData }) {
  const items = data.items ?? []
  if (!items.length) return null
  return (
    <section className="border-b border-border py-14">
      <div className="container mx-auto px-4">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {data.eyebrow ?? "Trusted across industries"}
        </p>
        <Marquee items={items} />
      </div>
    </section>
  )
}
