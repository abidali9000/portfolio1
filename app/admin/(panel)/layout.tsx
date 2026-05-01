import type React from "react"
import Link from "next/link"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { isSupabaseConfigured } from "@/lib/env"
import { requireAdmin } from "@/lib/admin/guard"

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = await requireAdmin()

  return (
    <div className="min-h-screen bg-muted/30">
      {!isSupabaseConfigured && (
        <div className="bg-amber-500/10 border-b border-amber-500/30 text-amber-900 dark:text-amber-200 text-sm px-4 py-2 text-center">
          Supabase isn&apos;t configured.{" "}
          <Link href="/admin/setup" className="underline font-medium">Setup guide →</Link>
        </div>
      )}
      <div className="grid lg:grid-cols-[260px_1fr]">
        <AdminSidebar email={user?.email ?? null} />
        <div className="min-h-screen">
          <main className="p-6 md:p-10 max-w-6xl mx-auto w-full">{children}</main>
        </div>
      </div>
    </div>
  )
}
