import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Mail, MapPin, MessageSquare, Phone, Users } from "lucide-react"
import { ContactForm } from "@/components/contact-form"
import { Reveal } from "@/components/site/reveal"
import { getSiteSettings } from "@/lib/cms/queries"
import type { Metadata } from "next"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell me about your project. I'll reply within a working day.",
}

export default async function ContactPage() {
  const settings = await getSiteSettings()

  const contactInfo = [
    settings.email && {
      icon: Mail,
      title: "Email",
      value: settings.email,
      description: "Best way to reach me for project inquiries.",
    },
    settings.phone && {
      icon: Phone,
      title: "Phone",
      value: settings.phone,
      description: "Available for urgent consultations.",
    },
    {
      icon: Clock,
      title: "Response time",
      value: "Within 24 hours",
      description: "Quick turnaround on all inquiries.",
    },
    settings.location && {
      icon: MapPin,
      title: "Location",
      value: settings.location,
      description: "Working with clients globally.",
    },
  ].filter(Boolean) as Array<{
    icon: React.ComponentType<{ className?: string }>
    title: string
    value: string
    description: string
  }>

  const services = [
    {
      icon: MessageSquare,
      title: "Free 30-minute consultation",
      description: "I'll listen, ask sharp questions, and tell you whether I can help.",
    },
    {
      icon: Users,
      title: "Solo or embedded",
      description: "I can deliver as a one-person team or join your existing product squad.",
    },
  ]

  return (
    <>
      <section className="border-b border-border py-20 md:py-28">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Reveal>
            <Badge variant="outline" className="rounded-full">Let&apos;s work together</Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 font-serif text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
              Get in <span className="gradient-text">touch.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg text-muted-foreground">
              Tell me what you&apos;re building. I&apos;ll reply within one working day with a sharp
              opinion, a path forward, and (if it&apos;s a fit) a fixed quote.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 grid gap-12 lg:grid-cols-3">
          <Reveal className="space-y-8">
            <div>
              <h2 className="font-serif text-2xl font-bold mb-6">Contact information</h2>
              <div className="space-y-6">
                {contactInfo.map(info => (
                  <div key={info.title} className="flex items-start gap-4">
                    <div className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-card flex-shrink-0">
                      <info.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold">{info.title}</h3>
                      <p className="text-base font-medium">{info.value}</p>
                      <p className="text-xs text-muted-foreground">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-serif text-xl font-bold mb-4">What you get</h3>
              <div className="space-y-3">
                {services.map(service => (
                  <Card key={service.title} className="border-border">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <service.icon className="h-4 w-4 mt-1 text-muted-foreground" />
                        <div>
                          <h4 className="text-sm font-semibold">{service.title}</h4>
                          <p className="text-xs text-muted-foreground">{service.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05} className="lg:col-span-2">
            <Card className="border-border shadow-xl">
              <CardContent className="p-8 md:p-10">
                <div className="mb-6">
                  <h2 className="font-serif text-2xl font-bold">Send me a message</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Fields with * are required. Everything else is optional but helpful.
                  </p>
                </div>
                <ContactForm />
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>
    </>
  )
}
