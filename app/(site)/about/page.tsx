import Image from "next/image"
import Link from "next/link"
import { Award, Briefcase, Clock, Globe, Mail, Sparkles, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/site/reveal"
import { getSiteSettings, getTestimonials } from "@/lib/cms/queries"
import type { Metadata } from "next"

export const revalidate = 60

export const metadata: Metadata = {
  title: "About",
  description:
    "About Abid Ali — senior freelance developer specialising in custom CMS, full-stack web apps and Chrome extensions.",
}

export default async function AboutPage() {
  const settings = await getSiteSettings()
  const testimonials = await getTestimonials({ featuredOnly: true })

  const facts = [
    { icon: Briefcase, label: "Projects shipped", value: "120+" },
    { icon: Star, label: "Avg client rating", value: "5.0" },
    { icon: Globe, label: "Countries served", value: "20+" },
    { icon: Clock, label: "Years freelancing", value: "5+" },
  ]

  const principles = [
    { title: "Outcomes over output", body: "Every project starts with the metric you want to move. The deliverable is whatever moves it." },
    { title: "Boring tech where it counts", body: "Postgres, TypeScript, Next.js. Reach for novelty only when it pays for itself." },
    { title: "Show your work weekly", body: "A live staging URL and a written update every Friday. Nothing surprises you at handover." },
    { title: "Own the code from day one", body: "Repo on your GitHub org. Deploy keys in your dashboards. You own everything I build." },
  ]

  return (
    <>
      <section className="border-b border-border py-20 md:py-28">
        <div className="container mx-auto px-4 grid gap-12 lg:grid-cols-[1.4fr_1fr] items-center">
          <div>
            <Reveal>
              <Badge variant="outline" className="rounded-full">About me</Badge>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-6 font-serif text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
                Hi, I&apos;m {settings.brand_name.split(" ")[0]}.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                {settings.bio ??
                  "I help founders and product teams turn ambiguous ideas into shipped, measurable software."}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  Top-rated on Upwork
                </span>
                {settings.location && <span>· {settings.location}</span>}
                {settings.hourly_rate && <span>· {settings.hourly_rate}</span>}
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/contact">
                    <Mail className="mr-2 h-4 w-4" /> Email me
                  </Link>
                </Button>
                {settings.upwork_url && (
                  <Button asChild size="lg" variant="outline" className="rounded-full">
                    <a href={settings.upwork_url} target="_blank" rel="noopener noreferrer">
                      Upwork profile
                    </a>
                  </Button>
                )}
                {settings.resume_url && (
                  <Button asChild size="lg" variant="outline" className="rounded-full">
                    <a href={settings.resume_url} target="_blank" rel="noopener noreferrer">
                      Download CV
                    </a>
                  </Button>
                )}
              </div>
            </Reveal>
          </div>
          {settings.avatar_url && (
            <Reveal delay={0.1} className="relative mx-auto w-full max-w-sm">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-blue-500/30 via-cyan-400/30 to-fuchsia-400/30 blur-2xl" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
                <Image src={settings.avatar_url} alt={settings.brand_name} fill className="object-cover" sizes="400px" />
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <section className="border-b border-border py-16 bg-muted/30">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {facts.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.04}>
              <div className="rounded-2xl border border-border bg-card p-6">
                <f.icon className="h-5 w-5 text-muted-foreground" />
                <div className="mt-4 font-serif text-3xl font-bold">{f.value}</div>
                <div className="mt-1 text-xs text-muted-foreground">{f.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-b border-border py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <Reveal>
            <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight">How I think about work</h2>
          </Reveal>
          <ul className="mt-10 space-y-8">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <li className="grid gap-4 md:grid-cols-[1fr_2fr] md:gap-12 border-b border-border pb-8 last:border-0">
                  <h3 className="font-serif text-2xl font-bold">{p.title}</h3>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{p.body}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="py-24">
          <div className="container mx-auto px-4">
            <Reveal className="mb-10 text-center">
              <h2 className="font-serif text-4xl md:text-5xl font-bold">Don&apos;t take my word for it.</h2>
              <p className="mt-3 text-muted-foreground">A few words from clients I&apos;ve worked with.</p>
            </Reveal>
            <div className="grid gap-6 md:grid-cols-2">
              {testimonials.slice(0, 4).map(t => (
                <figure key={t.id} className="rounded-2xl border border-border bg-card p-6">
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: Math.round(t.rating ?? 5) }).map((_, idx) => (
                      <Star key={idx} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="mt-3 text-base">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption className="mt-4 text-sm text-muted-foreground">
                    — {t.client_name}
                    {t.client_role && `, ${t.client_role}`}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
