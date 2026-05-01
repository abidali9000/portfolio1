import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Reveal } from "@/components/site/reveal"

export interface FaqData {
  eyebrow?: string
  heading?: string
  items?: Array<{ question: string; answer: string }>
}

export function FaqSection({ data }: { data: FaqData }) {
  const items = data.items ?? []
  if (!items.length) return null
  return (
    <section className="border-b border-border py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <Reveal>
            {data.eyebrow && (
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                {data.eyebrow}
              </div>
            )}
            <h2 className="font-serif text-4xl font-bold leading-tight">
              {data.heading ?? "Common questions"}
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <Accordion type="single" collapsible className="w-full">
              {items.map((q, i) => (
                <AccordionItem key={i} value={`q-${i}`}>
                  <AccordionTrigger className="text-left text-base md:text-lg font-medium">
                    {q.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                    {q.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
