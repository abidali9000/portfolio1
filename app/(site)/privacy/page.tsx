import { Reveal } from "@/components/site/reveal"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How I handle the small amount of personal data this site collects.",
}

export default function PrivacyPage() {
  return (
    <article className="border-b border-border py-20 md:py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <Reveal>
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight">Privacy policy</h1>
          <p className="mt-3 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}</p>
        </Reveal>

        <div className="prose prose-neutral dark:prose-invert mt-10 max-w-none">
          <h2>What data this site collects</h2>
          <p>
            This site collects only the personal data you voluntarily submit through the
            contact form: your name, email, company, the service you&apos;re interested in,
            project budget/timeline, and the message you send.
          </p>

          <h2>How that data is used</h2>
          <ul>
            <li>To reply to your enquiry by email.</li>
            <li>To track inbound leads in a private CMS dashboard.</li>
            <li>Never sold, never shared with third parties, never used for marketing.</li>
          </ul>

          <h2>Where it&apos;s stored</h2>
          <p>
            Submissions are stored in Supabase (Postgres) and forwarded once by email.
            Backups are kept for 30 days as part of the standard Supabase backup policy.
          </p>

          <h2>Cookies & analytics</h2>
          <p>
            This site does not use third-party tracking, advertising or analytics
            cookies. Authentication for the admin dashboard uses a single
            functional cookie that is required for the dashboard to work.
          </p>

          <h2>Your rights</h2>
          <p>
            You can request a copy or full deletion of any data you&apos;ve submitted at
            any time. Just email{" "}
            <a href="mailto:admin@abidali.vip">admin@abidali.vip</a>.
          </p>
        </div>
      </div>
    </article>
  )
}
