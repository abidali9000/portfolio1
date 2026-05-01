import { redirect } from "next/navigation"
import { createServerSupabase } from "@/lib/supabase/server"
import { isSupabaseConfigured } from "@/lib/env"

/**
 * Resolves the current admin user. Throws redirects if not signed in or not
 * an admin. Always call from a server component / server action that lives
 * inside /admin (the middleware handles the basic auth gate; this layer
 * additionally requires `is_admin = true` on the profile row).
 */
export async function requireAdmin() {
  if (!isSupabaseConfigured) {
    redirect("/admin/setup")
  }

  const supabase = await createServerSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/admin/login")

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email, full_name, is_admin")
    .eq("id", user.id)
    .maybeSingle()

  if (!profile?.is_admin) {
    redirect("/admin/login?error=not_admin")
  }

  return { user, profile }
}

export async function getCurrentUser() {
  if (!isSupabaseConfigured) return null
  try {
    const supabase = await createServerSupabase()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    return user
  } catch {
    return null
  }
}
