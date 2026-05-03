import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/site/reveal"
import { GridBg } from "@/components/site/grid-bg"
import { WordRotate } from "@/components/site/word-rotate"
import type { SiteSettings } from "@/lib/supabase/types"

export interface HeroData {
  eyebrow?: string
  heading?: string
  highlight?: string
  rotating_words?: string[]
  subheading?: string
  primary_cta?: { label: string; href: string }
  secondary_cta?: { label: string; href: string }
}

export function HeroSection({
  data,
  settings,
}: {
  data: HeroData
  settings: SiteSettings
}) {
  const heading = data.heading ?? "Custom software, shipped with proof."
  const highlight = data.highlight
  const headingParts = highlight && heading.includes(highlight)
    ? heading.split(highlight)
    : null

  return (
    <section className="relative isolate overflow-hidden border-b border-border noise">
      <GridBg />

      <div className="container relative mx-auto px-4 py-20 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16 items-center">
          <div className="space-y-8">
            <Reveal>
              <Badge
                variant="outline"
                className="rounded-full border-border/80 bg-background/60 backdrop-blur px-3 py-1.5 text-xs"
              >
                <span className="relative mr-2 flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                {data.eyebrow ?? (settings.available_for_work ? "Available for new work" : "Currently booked")}
              </Badge>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
                {headingParts ? (
                  <>
                    {headingParts[0]}
                    <span className="gradient-text">{highlight}</span>
                    {headingParts[1]}
                  </>
                ) : (
                  heading
                )}
                {data.rotating_words && data.rotating_words.length > 0 && (
                  <>
                    {" "}
                    <WordRotate words={data.rotating_words} className="gradient-text" />
                  </>
                )}
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="max-w-xl text-lg md:text-xl text-muted-foreground leading-relaxed">
                {data.subheading ??
                  "I build CMS platforms, full-stack web apps and Chrome extensions for founders who care about outcomes — not slide decks."}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="rounded-full group h-12 px-6">
                  <Link href={data.primary_cta?.href ?? "/projects"}>
                    {data.primary_cta?.label ?? "See my work"}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full group h-12 px-6">
                  <Link href={data.secondary_cta?.href ?? "/contact"}>
                    {data.secondary_cta?.label ?? "Book a call"}
                    <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  100% job success · Top-rated on Upwork
                </div>
                <span className="hidden sm:inline">·</span>
                <span>{settings.location ?? "Remote worldwide"}</span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="relative mx-auto w-full max-w-md">
            {/* Decorative card */}
            <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-blue-500/30 via-cyan-400/30 to-fuchsia-400/30 blur-2xl opacity-70 dark:opacity-50" />

            {/* Image lives in its own overflow-hidden container so the rounded
                corners clip cleanly… */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-2xl">
              <Image
                src={settings.avatar_url || "/images/abid-formal.jpg"}
                alt={settings.brand_name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 480px"
                unoptimized
              />
            </div>

            {/* …but the floating badges are siblings, so they aren't clipped
                by the overflow-hidden above. */}
            <div className="pointer-events-none absolute -left-4 top-12 hidden md:block z-10">
              <div className="rounded-xl border border-border bg-background/90 backdrop-blur px-3 py-2 shadow-lg animate-float">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Avg rating</div>
                <div className="font-serif text-2xl font-bold">5.0 ★</div>
              </div>
            </div>
            <div className="pointer-events-none absolute -right-4 bottom-16 hidden md:block z-10">
              <div
                className="rounded-xl border border-border bg-background/90 backdrop-blur px-3 py-2 shadow-lg animate-float"
                style={{ animationDelay: "1.2s" }}
              >
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Projects</div>
                <div className="font-serif text-2xl font-bold">120+</div>
              </div>
            </div>
            <div className="pointer-events-none absolute right-4 top-4 z-10">
              <div className="rounded-full bg-background/80 backdrop-blur px-3 py-1 text-xs font-medium border border-border">
                Available
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
