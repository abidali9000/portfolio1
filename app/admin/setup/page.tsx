import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export const metadata = {
  title: "Setup",
  robots: { index: false, follow: false },
}

export default function SetupPage() {
  return (
    <div className="min-h-screen bg-muted/40 py-12">
      <div className="container mx-auto max-w-3xl px-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Back to site
        </Link>

        <Card className="border-border shadow-xl">
          <CardContent className="p-8 md:p-10 prose prose-neutral dark:prose-invert max-w-none">
            <h1 className="font-serif">First-time setup</h1>
            <p>
              The portfolio uses Supabase as its database, auth and file store. Walk through these
              four steps once and you&apos;ll never have to think about it again.
            </p>

            <h2>1 · Create a Supabase project</h2>
            <ol>
              <li>Sign in at <a href="https://supabase.com" target="_blank" rel="noopener noreferrer">supabase.com</a> and create a new project.</li>
              <li>Once it&apos;s ready, open <strong>Project Settings → API</strong> and copy:
                <ul>
                  <li><code>Project URL</code> → <code>NEXT_PUBLIC_SUPABASE_URL</code></li>
                  <li><code>anon public key</code> → <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code></li>
                  <li><code>service_role secret</code> → <code>SUPABASE_SERVICE_ROLE_KEY</code></li>
                </ul>
              </li>
              <li>Paste them into <code>.env.local</code> at the project root (see <code>.env.example</code>).</li>
            </ol>

            <h2>2 · Run the migrations</h2>
            <p>
              Open the Supabase <strong>SQL editor</strong>, then paste and run, in order:
            </p>
            <ol>
              <li><code>supabase/migrations/0001_initial.sql</code> — schema, RLS, triggers</li>
              <li><code>supabase/migrations/0002_seed.sql</code> — sample content (optional but recommended)</li>
            </ol>

            <h2>3 · Create your admin user</h2>
            <ol>
              <li>In Supabase: <strong>Authentication → Users → Add user → Create new user</strong>. Use the email/password you want to log in with.</li>
              <li>In <strong>SQL editor</strong>, run:
                <pre><code>{`update public.profiles set is_admin = true where email = 'YOUR_EMAIL';`}</code></pre>
              </li>
            </ol>

            <h2>4 · Create the media storage bucket</h2>
            <ol>
              <li>Go to <strong>Storage → New bucket</strong> and create a <strong>public</strong> bucket named exactly <code>public-media</code>.</li>
              <li>Add a policy: <em>SELECT</em> for <strong>public</strong> + <em>INSERT/UPDATE/DELETE</em> for authenticated admins (or simply allow authenticated for all four to keep it simple).</li>
            </ol>

            <h2>You&apos;re done</h2>
            <p>
              Restart <code>npm run dev</code> if it was running, then sign in at{" "}
              <Link href="/admin/login">/admin/login</Link>.
            </p>

            <h2>What you can do from the admin</h2>
            <ul>
              <li><Check className="inline h-4 w-4" /> Add, edit, reorder, delete projects (with case studies, metrics, gallery, tech stack)</li>
              <li><Check className="inline h-4 w-4" /> Manage services and pricing</li>
              <li><Check className="inline h-4 w-4" /> Build the homepage out of typed sections — toggle, reorder and edit each one</li>
              <li><Check className="inline h-4 w-4" /> Manage testimonials with proof images</li>
              <li><Check className="inline h-4 w-4" /> Triage incoming leads (the contact form posts here)</li>
              <li><Check className="inline h-4 w-4" /> Upload images & files to a media library</li>
              <li><Check className="inline h-4 w-4" /> Edit global site settings (bio, contact info, social, hourly rate, primary colour, etc.)</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
