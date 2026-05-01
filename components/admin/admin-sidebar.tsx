"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Box,
  ExternalLink,
  Image as ImageIcon,
  Inbox,
  LayoutDashboard,
  LogOut,
  Settings,
  Sparkles,
  Star,
  Wrench,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { signOutAction } from "@/app/admin/(panel)/actions"

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/projects", label: "Projects", icon: Box },
  { href: "/admin/services", label: "Services", icon: Wrench },
  { href: "/admin/sections", label: "Homepage builder", icon: Sparkles },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star },
  { href: "/admin/leads", label: "Leads", icon: Inbox },
  { href: "/admin/media", label: "Media", icon: ImageIcon },
  { href: "/admin/settings", label: "Site settings", icon: Settings },
]

export function AdminSidebar({ email }: { email: string | null }) {
  const pathname = usePathname()
  return (
    <aside className="lg:sticky lg:top-0 lg:h-screen border-r border-border bg-background">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center gap-2 border-b border-border px-5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-foreground text-background font-serif text-sm font-bold">A</span>
          <div className="flex-1">
            <div className="font-serif text-base font-bold leading-none">Admin</div>
            <div className="mt-0.5 text-[11px] text-muted-foreground">Portfolio CMS</div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-3 overflow-y-auto">
          {NAV.map(item => {
            const active = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="space-y-2 border-t border-border p-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            <ExternalLink className="h-3.5 w-3.5" /> View live site
          </Link>
          {email && (
            <div className="px-3 py-1 text-[11px] text-muted-foreground truncate">
              Signed in as <span className="font-medium text-foreground">{email}</span>
            </div>
          )}
          <form action={signOutAction}>
            <Button variant="ghost" size="sm" type="submit" className="w-full justify-start text-muted-foreground">
              <LogOut className="mr-2 h-4 w-4" /> Sign out
            </Button>
          </form>
        </div>
      </div>
    </aside>
  )
}
