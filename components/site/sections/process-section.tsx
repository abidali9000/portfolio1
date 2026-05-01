import { Reveal } from "@/components/site/reveal"

export interface ProcessData {
  eyebrow?: string
  heading?: string
  steps?: Array<{ title: string; description: string }>
}

export function ProcessSection({ data }: { data: ProcessData }) {
  const steps = data.steps ?? []
  if (!steps.length) return null
  return (
    <section className="border-b border-border py-24">
      <div className="container mx-auto px-4">
        <Reveal className="mb-14 max-w-2xl">
          {data.eyebrow && (
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              {data.eyebrow}
            </div>
          )}
          <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight">
            {data.heading ?? "How I work"}
          </h2>
        </Reveal>

        <ol className="relative grid gap-8 md:grid-cols-4">
          <div className="absolute top-8 left-0 right-0 hidden h-px bg-border md:block" />
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.07}>
              <li className="relative">
                <div className="relative z-10 grid h-16 w-16 place-items-center rounded-full border border-border bg-background font-serif text-xl font-bold">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-5 font-serif text-xl font-bold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
