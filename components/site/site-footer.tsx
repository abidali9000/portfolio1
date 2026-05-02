import Link from "next/link"
import { Github, Linkedin, Twitter } from "lucide-react"
import type { SiteSettings } from "@/lib/supabase/types"

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border mt-32">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-foreground text-background font-serif text-sm font-bold">
                A
              </span>
              <span className="font-serif text-xl font-semibold">{settings.brand_name}</span>
            </Link>
            <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
              {settings.tagline ?? "Custom CMS, Web & Browser Extensions"}. Building software that ships and stays shipped.
            </p>
            <div className="flex items-center gap-2">
              {settings.github_url && (
                <a
                  href={settings.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  <Github className="h-4 w-4" />
                </a>
              )}
              {settings.linkedin_url && (
                <a
                  href={settings.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
              {settings.twitter_url && (
                <a
                  href={settings.twitter_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Sitemap</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/projects" className="hover:text-foreground">Work</Link></li>
              <li><Link href="/services" className="hover:text-foreground">Services</Link></li>
              <li><Link href="/case-studies" className="hover:text-foreground">Case studies</Link></li>
              <li><Link href="/about" className="hover:text-foreground">About</Link></li>
              <li><Link href="/testimonials" className="hover:text-foreground">Testimonials</Link></li>
              <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Get in touch</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {settings.email && (
                <li><a href={`mailto:${settings.email}`} className="hover:text-foreground">{settings.email}</a></li>
              )}
              {settings.phone && <li>{settings.phone}</li>}
              {settings.location && <li>{settings.location}</li>}
              {settings.upwork_url && (
                <li>
                  <a href={settings.upwork_url} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                    Upwork profile
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-t border-border pt-8 text-xs text-muted-foreground">
          <p>© {year} {settings.brand_name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link href="/admin/login" className="hover:text-foreground">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
