import Link from "next/link"
import { redirect } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createServerSupabase } from "@/lib/supabase/server"
import { isSupabaseConfigured } from "@/lib/env"

export const metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
}

async function signIn(formData: FormData) {
  "use server"
  if (!isSupabaseConfigured) {
    redirect("/admin/setup")
  }
  const email = String(formData.get("email") || "")
  const password = String(formData.get("password") || "")
  const next = String(formData.get("next") || "/admin")

  const supabase = await createServerSupabase()
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) {
    redirect(`/admin/login?error=${encodeURIComponent(error.message)}`)
  }
  redirect(next)
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>
}) {
  const { next, error } = await searchParams

  return (
    <div className="min-h-screen grid place-items-center bg-muted/40 p-4">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Back to site
        </Link>

        <Card className="border-border shadow-xl">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-foreground text-background font-serif text-lg font-bold">A</span>
              <div>
                <h1 className="font-serif text-2xl font-bold leading-none">Portfolio CMS</h1>
                <p className="mt-1 text-xs text-muted-foreground">Admin sign-in</p>
              </div>
            </div>

            {!isSupabaseConfigured ? (
              <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-4 text-sm">
                <p className="font-semibold mb-1">Supabase isn&apos;t configured yet.</p>
                <p className="text-muted-foreground">
                  Set <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
                  <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>, run the SQL in{" "}
                  <code>supabase/migrations</code>, then come back here.{" "}
                  <Link href="/admin/setup" className="underline font-medium">
                    See setup guide →
                  </Link>
                </p>
              </div>
            ) : (
              <form action={signIn} className="space-y-4">
                {error && (
                  <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                    {decodeURIComponent(error)}
                  </div>
                )}
                <input type="hidden" name="next" value={next ?? "/admin"} />
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" autoComplete="email" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" autoComplete="current-password" required />
                </div>
                <Button type="submit" className="w-full">Sign in</Button>
                <p className="text-center text-xs text-muted-foreground">
                  Forgot your password?{" "}
                  <Link href="/admin/setup" className="underline">
                    Reset via Supabase
                  </Link>
                </p>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
