# Portfolio + CMS

A complete, self-hostable portfolio website with a built-in CMS dashboard. Built
on **Next.js 15**, **React 19**, **Tailwind 4**, **Supabase** and **shadcn/ui**.

## Features

### Public site
- Animated hero with rotating word effect, gradient blobs and grid background
- Dark mode (system / manual toggle)
- Modular **homepage section builder** — Hero, Stats, Logos marquee, Services,
  Featured projects, Process, Tech stack, Testimonials, FAQ, CTA and Rich text.
  Reorder, toggle and edit each section from the admin.
- Detail pages for every project (with metrics, gallery, tech stack)
- Detail pages for every service (with features, pricing, delivery time)
- Testimonials wall with verified Upwork-style proof images
- About page, dedicated case-studies page, contact form
- Page-level SEO metadata, dynamic sitemap, robots.txt, generated OG image
- All public pages render with sensible defaults even before Supabase is wired up,
  so it's safe to hand to a designer / CI before the database exists.

### Admin / CMS (`/admin`)
- Email + password login backed by Supabase Auth
- Profile-level admin gate (`profiles.is_admin = true`)
- Dashboard with counts and quick actions
- Projects CRUD (slug, tagline, summary, body, gallery, tech stack, metrics,
  case-study & featured toggles, position)
- Services CRUD (icon, features, pricing, delivery time)
- Testimonials CRUD with proof images
- **Homepage builder** — add typed sections, edit JSON, toggle, reorder, delete
- Leads inbox (contact-form submissions land here, with status pipeline)
- Media library — upload to Supabase Storage, copy URLs into any field
- Site settings (brand name, bio, contact info, social links, hourly rate,
  availability toggle, etc.)

## Quick start

```bash
npm install --legacy-peer-deps
cp .env.example .env.local
# fill in Supabase env vars (see /admin/setup once running)
npm run dev
```

## First-time setup

Visit `/admin/setup` once the dev server is running for a step-by-step guide.
The short version:

1. Create a Supabase project and copy the URL + anon key + service role key
   into `.env.local`.
2. In the Supabase SQL editor, run the migrations in order:
   - `supabase/migrations/0001_initial.sql` — schema, RLS, triggers
   - `supabase/migrations/0002_seed.sql` — sample content
3. Create your admin user via Supabase **Auth → Add user**, then run:
   ```sql
   update public.profiles set is_admin = true where email = 'YOUR_EMAIL';
   ```
4. Create a public Storage bucket named `public-media`.

## Architecture

```
app/
  (site)/                Public-facing pages, share a header/footer layout
  admin/
    (panel)/             Auth-required admin chrome with sidebar
    login/               Public-facing login page
    setup/               First-time setup walkthrough
  api/send-email/        Resend-backed email forwarder for the contact form

components/
  site/                  Public-site building blocks
    sections/            One file per typed homepage section
  admin/                 Admin-only UI (forms, sidebar, dialogs)
  ui/                    shadcn/ui primitives

lib/
  supabase/              Browser, server, middleware, service-role clients + types
  cms/queries.ts         Read-side helpers (with static fallbacks)
  cms/defaults.ts        Static seed content used when Supabase isn't configured
  admin/guard.ts         requireAdmin() helper for server actions

supabase/migrations/     SQL migrations (schema + seed)
middleware.ts            Auth gate for /admin
```

## Adding a new homepage section type

1. Add the new value to the `SectionType` union in `lib/supabase/types.ts`.
2. Add it to the `check (type in (...))` constraint in `0001_initial.sql`.
3. Create a renderer at `components/site/sections/foo-section.tsx`.
4. Wire it into `components/site/section-renderer.tsx`.
5. Add a label + JSON template to `TYPE_LABELS` and `TEMPLATES` in
   `components/admin/sections-manager.tsx`.

That's it — the new type is now creatable from the admin builder.

## Stack

- **Next.js 15.2** (App Router, Server Actions, RSC)
- **React 19**
- **Tailwind CSS 4** + **shadcn/ui** (new-york style)
- **Supabase** (Postgres, Auth, Storage, RLS)
- **framer-motion** for entrance/scroll animations
- **zod** for server-action validation
- **Resend** (optional) for transactional email

## License

MIT
