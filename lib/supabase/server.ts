import { cookies } from "next/headers"
import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import { env, isSupabaseConfigured } from "@/lib/env"

/**
 * Server component / server action client. Reads/writes the auth cookie so
 * the user's session is available across the App Router.
 */
export async function createServerSupabase() {
  const cookieStore = await cookies()
  return createServerClient(env.supabaseUrl, env.supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }: { name: string; value: string; options: CookieOptions }) => {
            cookieStore.set(name, value, options)
          })
        } catch {
          // Called from a Server Component — cookies are read-only here.
        }
      },
    },
  })
}

/**
 * Service-role client for trusted server work (admin actions, contact form
 * persistence, migrations). Never expose to the browser.
 */
export function createServiceSupabase() {
  if (!env.supabaseUrl || !env.supabaseServiceRoleKey) {
    return null
  }
  return createSupabaseClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

export { isSupabaseConfigured }
