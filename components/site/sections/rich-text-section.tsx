import { Reveal } from "@/components/site/reveal"

export interface RichTextData {
  eyebrow?: string
  heading?: string
  body?: string
}

export function RichTextSection({ data }: { data: RichTextData }) {
  if (!data.body && !data.heading) return null
  return (
    <section className="border-b border-border py-24">
      <div className="container mx-auto px-4">
        <Reveal className="mx-auto max-w-3xl">
          {data.eyebrow && (
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              {data.eyebrow}
            </div>
          )}
          {data.heading && (
            <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-6">
              {data.heading}
            </h2>
          )}
          {data.body && (
            <div className="prose prose-neutral dark:prose-invert max-w-none whitespace-pre-line text-base md:text-lg text-muted-foreground leading-relaxed">
              {data.body}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}
