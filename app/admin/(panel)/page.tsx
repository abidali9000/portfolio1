import Link from "next/link"
import { ArrowRight, Box, Inbox, Sparkles, Star, Wrench } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { createServerSupabase } from "@/lib/supabase/server"
import { isSupabaseConfigured } from "@/lib/env"

async function getCounts() {
  if (!isSupabaseConfigured) {
    return { projects: 0, services: 0, testimonials: 0, sections: 0, leads: 0, newLeads: 0 }
  }
  const supabase = await createServerSupabase()
  const [projects, services, testimonials, sections, leads, newLeads] = await Promise.all([
    supabase.from("projects").select("id", { count: "exact", head: true }),
    supabase.from("services").select("id", { count: "exact", head: true }),
    supabase.from("testimonials").select("id", { count: "exact", head: true }),
    supabase.from("sections").select("id", { count: "exact", head: true }),
    supabase.from("leads").select("id", { count: "exact", head: true }),
    supabase.from("leads").select("id", { count: "exact", head: true }).eq("status", "new"),
  ])
  return {
    projects: projects.count ?? 0,
    services: services.count ?? 0,
    testimonials: testimonials.count ?? 0,
    sections: sections.count ?? 0,
    leads: leads.count ?? 0,
    newLeads: newLeads.count ?? 0,
  }
}

export default async function AdminDashboard() {
  const counts = await getCounts()

  const stats = [
    { label: "Projects", value: counts.projects, href: "/admin/projects", icon: Box },
    { label: "Services", value: counts.services, href: "/admin/services", icon: Wrench },
    { label: "Testimonials", value: counts.testimonials, href: "/admin/testimonials", icon: Star },
    { label: "Sections", value: counts.sections, href: "/admin/sections", icon: Sparkles },
    {
      label: counts.newLeads > 0 ? `${counts.newLeads} new leads` : "Leads",
      value: counts.leads,
      href: "/admin/leads",
      icon: Inbox,
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold">Welcome back.</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Everything that powers the public site lives here. Edit anything, hit save, and it&apos;s live in seconds.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map(s => (
          <Link key={s.label} href={s.href}>
            <Card className="group hover:border-foreground/30 transition-colors h-full">
              <CardContent className="p-5">
                <div className="flex items-center justify-between text-muted-foreground">
                  <s.icon className="h-4 w-4" />
                  <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" />
                </div>
                <div className="mt-3 font-serif text-3xl font-bold">{s.value}</div>
                <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h2 className="font-serif text-lg font-bold">Quick actions</h2>
            <p className="text-sm text-muted-foreground">Common things you&apos;ll do daily.</p>
            <div className="mt-4 grid gap-2">
              <Button asChild variant="outline" className="justify-between">
                <Link href="/admin/projects/new">
                  Add a new project <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="justify-between">
                <Link href="/admin/sections">
                  Edit homepage sections <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="justify-between">
                <Link href="/admin/testimonials/new">
                  Add a testimonial <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="justify-between">
                <Link href="/admin/settings">
                  Update site settings <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="font-serif text-lg font-bold">How this CMS works</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>• The homepage is built from typed <strong>sections</strong> — reorder them, toggle them, edit their JSON.</li>
              <li>• <strong>Projects</strong> show up automatically on /projects and the home featured grid (when marked featured).</li>
              <li>• <strong>Services</strong> live on /services, with one detail page each.</li>
              <li>• <strong>Testimonials</strong> appear on /testimonials and the home testimonials section.</li>
              <li>• Page caches refresh automatically after every save.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
