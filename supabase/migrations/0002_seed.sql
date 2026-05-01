-- Seed data for the portfolio. Safe to run multiple times.

insert into public.services (slug, title, tagline, description, icon, features, starting_price, delivery_time, position)
values
  ('cms', 'Custom CMS Development', 'Editorial control without the WordPress tax',
   'Tailored content management systems that match your real workflow. Multi-tenant, role-based, headless or coupled — built to be a joy for editors and a breeze for developers.',
   'database',
   array['Role-based access control','Live preview','Versioning & rollback','Custom field types','API + webhooks','Multi-language support'],
   'from $1,500', '2–4 weeks', 0),
  ('web', 'Full-Stack Web Apps', 'From idea to production with proof points',
   'Production-grade web applications with Next.js, TypeScript, Postgres and a tasteful eye for UX. I ship measurable outcomes — not landing pages dressed up as dashboards.',
   'code',
   array['Next.js / React 19','TypeScript end-to-end','Postgres + Prisma/Supabase','Auth, payments, file upload','Analytics & observability','CI/CD on Vercel/Fly.io'],
   'from $2,500', '3–6 weeks', 1),
  ('chrome-extensions', 'Chrome Extensions', 'Workflows that live where your users already are',
   'High-impact browser extensions that scrape, automate, augment or analyse. From LinkedIn outreach helpers to in-page co-pilots — Manifest V3, secure by default.',
   'chrome',
   array['Manifest V3','OAuth + secure storage','Background workers','Content script overlays','Stripe-billed paid tiers','Chrome Web Store launch'],
   'from $900', '1–3 weeks', 2),
  ('automation', 'Custom Automation & Scripts',
   'Boring work, automated. Quickly.',
   'One-off Python or Node scripts, scheduled jobs, scrapers, AI agents, internal tools — the unglamorous code that compounds your team''s leverage.',
   'globe',
   array['Web scraping at scale','LLM-powered agents','Stripe & QuickBooks plumbing','Spreadsheet/Notion sync','Cron + queue workers','Slack & email triggers'],
   'from $300', 'days, not weeks', 3)
on conflict (slug) do nothing;

insert into public.projects (slug, title, tagline, summary, body, cover_image, tech_stack, category, year, live_url, case_study, featured, position, metrics)
values
  ('linkreach', 'LinkReach — LinkedIn outreach extension',
   'A Chrome extension that turns LinkedIn into a CRM',
   'Built for a B2B agency in Berlin. LinkReach overlays an outreach inbox on top of LinkedIn so SDRs can sequence, track, and reply without leaving the page.',
   'LinkReach started as a small "saved replies" helper and grew into a full pipeline view. The hardest parts were keeping pace with LinkedIn''s frequent DOM changes and shipping a Manifest V3 background worker that survives restarts. Outcome: 4 SDRs replaced two SaaS tools and reclaimed ~6 hours each per week.',
   '/images/review-dashboard.png',
   array['Chrome MV3','TypeScript','React','Supabase','Stripe'],
   'Chrome Extension', 2025, 'https://abidali.vip/linkreach/', true, true, 0,
   '{"Active users":"4 SDRs","Hours saved per rep":"6/week","Tools replaced":"2"}'::jsonb),
  ('donations-payments', 'Custom donation payment system',
   'Stripe + Squarespace, glued together properly',
   'A non-profit needed recurring + one-off donations with country-specific receipts. We built a custom checkout layer on top of Squarespace using Stripe Elements and a tiny serverless backend.',
   'The client had been losing donors at the Stripe redirect. We replaced the off-site flow with an embedded checkout, added Apple Pay, and emitted IRS-compliant receipts in three currencies. Conversions on the donation page jumped from 1.9% to 4.4%.',
   '/images/review-donations.png',
   array['Stripe','Next.js','Squarespace','Vercel','Resend'],
   'Web App', 2025, null, true, true, 1,
   '{"Donation conversion":"1.9% → 4.4%","Avg gift size":"+18%","Project value":"$1,112"}'::jsonb),
  ('mass-messaging-dashboard', 'Mass-messaging dashboard',
   'Send 50,000 messages without setting your IP on fire',
   'A multi-tenant dashboard that lets a marketing team queue and throttle outbound campaigns across SMS, email, and Telegram with per-channel rate limits and a unified reply inbox.',
   'Built with Next.js and a Postgres-backed job queue (pg_boss). The trickiest design decision was the unified inbox — we ended up modelling threads as channel-agnostic conversations linked back to a contact graph. The result is a single screen reps can live in.',
   '/images/review-dashboard.png',
   array['Next.js','Postgres','pg_boss','Twilio','Resend','Telegram Bot API'],
   'Web App', 2024, null, true, true, 2,
   '{"Messages/day":"50,000","Channels":"3","Reply SLA":"under 90s"}'::jsonb),
  ('squarespace-multistep', 'Multi-step form for Squarespace',
   'A 7-step intake form that converts',
   'A medical clinic on Squarespace needed a HIPAA-aware multi-step intake form with conditional logic, file upload and a CRM hand-off. Native Squarespace forms don''t do any of that.',
   'We injected a React micro-app into the Squarespace page that posts to a serverless backend, encrypts uploads and forwards qualified leads to the clinic''s CRM. The form has a 71% completion rate — high for a 7-step, document-heavy flow.',
   '/images/review-squarespace.png',
   array['React','Squarespace','Vercel','Cloudflare R2','HIPAA-aware design'],
   'Web App', 2025, 'https://abidali.vip/referral', true, true, 3,
   '{"Completion rate":"71%","Steps":"7","Project value":"$1,400"}'::jsonb),
  ('anatomy-3d', '3D Human Anatomy explorer',
   'WebGL anatomy for med-school revision',
   'An interactive 3D anatomy viewer that lets students isolate systems, label structures and quiz themselves. Built for a private tutor in Italy.',
   'three.js with a custom GLTF pipeline, plus a quiz layer wired to Supabase for progress tracking. The performance budget was tight — the original model was 240MB; we got it to 22MB without losing fidelity.',
   '/images/abid-formal.jpg',
   array['three.js','GLTF','Next.js','Supabase'],
   'Web App', 2025, 'https://abidali.vip/anatomy/', false, true, 4,
   '{"Model size":"240MB → 22MB","Frame rate":"60fps on mid-tier laptops"}'::jsonb),
  ('operation-theatre', '3D operation theatre simulator',
   'A scrubbed-in surgical training environment',
   'WebGL operation theatre with interactive instruments and step-based procedure walkthroughs. Used as a study aid for surgical residents.',
   null,
   '/images/abid-formal.jpg',
   array['three.js','React','GLSL'],
   'Web App', 2025, 'https://abidali.vip/Room/', false, false, 5, '{}'::jsonb),
  ('image-to-text', 'Image-to-Text scanner',
   'OCR in the browser, no upload required',
   'A privacy-first OCR scanner — the entire pipeline runs client-side using Tesseract.js compiled to WASM, so no document ever leaves the user''s machine.',
   null,
   '/images/abid-formal.jpg',
   array['Tesseract.js','WASM','Next.js'],
   'Web App', 2024, 'https://abidali.vip/scanner/', false, false, 6, '{}'::jsonb),
  ('github-generator', 'GitHub repo generator',
   'Spin up a templated repo from a form',
   'A small tool that takes a project description and creates a fully-templated GitHub repo with README, license, CI and labels — useful for teaching workshops.',
   null,
   '/images/abid-formal.jpg',
   array['Next.js','GitHub API','OAuth'],
   'Web App', 2024, 'https://abidali.vip/github', false, false, 7, '{}'::jsonb),
  ('html-builder', 'HTML & code builder',
   'Drag-and-drop HTML for non-coders',
   'A no-code HTML builder used in coding bootcamps to teach beginners how layout maps to markup.',
   null,
   '/images/abid-formal.jpg',
   array['Next.js','Tiptap','TailwindCSS'],
   'Web App', 2024, 'https://html.abidali.vip/', false, false, 8, '{}'::jsonb),
  ('datascience', 'Data-science micro-site',
   'Interactive notebooks for a course',
   'A Next.js course site with embedded notebooks and progress tracking, replacing a Notion table-of-contents that wasn''t pulling its weight.',
   null,
   '/images/abid-formal.jpg',
   array['Next.js','MDX','Plotly'],
   'Web App', 2024, 'https://abidali.vip/datascience', false, false, 9, '{}'::jsonb)
on conflict (slug) do nothing;

insert into public.testimonials (client_name, client_role, client_company, quote, rating, project_value, source, source_url, proof_image, featured, position)
values
  ('Verified Upwork client', 'Founder', null,
   'Abid built a multi-page WordPress site for us in days, not weeks. Calm, fast, exactly what we asked for.',
   5.0, '$607.50', 'Upwork', 'https://www.upwork.com/freelancers/~01c94e6af3f2725140',
   '/images/review-wordpress.png', true, 0),
  ('Verified Upwork client', 'Director', null,
   'Custom donations payment system delivered on time and ahead of spec. Handles edge cases I didn''t even think about.',
   5.0, '$1,112.50', 'Upwork', 'https://www.upwork.com/freelancers/~01c94e6af3f2725140',
   '/images/review-donations.png', true, 1),
  ('Verified Upwork client', 'Head of Growth', null,
   'The mass-messaging dashboard he built has been running for months without a hiccup. Best contractor I''ve worked with on Upwork.',
   5.0, '$1,100.00', 'Upwork', 'https://www.upwork.com/freelancers/~01c94e6af3f2725140',
   '/images/review-dashboard.png', true, 2),
  ('Verified Upwork client', 'Operations Lead', null,
   'Squarespace doesn''t do multi-step forms — Abid made it do exactly that. Five stars.',
   5.0, '$1,400.00', 'Upwork', 'https://www.upwork.com/freelancers/~01c94e6af3f2725140',
   '/images/review-squarespace.png', true, 3)
on conflict do nothing;

-- Default homepage section ordering
insert into public.sections (type, title, data, position, enabled, page)
values
  ('hero', 'Hero',
   jsonb_build_object(
     'eyebrow','Available for new work',
     'heading','Custom software, shipped with proof.',
     'highlight','shipped with proof.',
     'subheading','I build CMS platforms, full-stack web apps, and Chrome extensions for founders who care about outcomes — not slide decks.',
     'primary_cta', jsonb_build_object('label','See my work','href','/projects'),
     'secondary_cta', jsonb_build_object('label','Book a call','href','/contact')
   ),
   0, true, 'home'),
  ('stats', 'By the numbers',
   jsonb_build_object('items', jsonb_build_array(
     jsonb_build_object('value','120+','label','Projects shipped'),
     jsonb_build_object('value','30+','label','Clients worldwide'),
     jsonb_build_object('value','100%','label','Job success on Upwork'),
     jsonb_build_object('value','5.0','label','Avg client rating')
   )),
   1, true, 'home'),
  ('logos', 'Trusted by teams in',
   jsonb_build_object('items', jsonb_build_array(
     'B2B SaaS','Healthcare','Education','Non-profits','Fin-tech','E-commerce'
   )),
   2, true, 'home'),
  ('services', 'What I do',
   jsonb_build_object(
     'eyebrow','Services',
     'heading','Built like a product, priced like a service',
     'subheading','Four focused offerings. Pick the one that matches the shape of your problem.'
   ),
   3, true, 'home'),
  ('featured_projects', 'Selected work',
   jsonb_build_object(
     'eyebrow','Case studies',
     'heading','Recent projects with measurable outcomes',
     'subheading','Each one ships with the metric the client cared about — not just a screenshot.'
   ),
   4, true, 'home'),
  ('process', 'How I work',
   jsonb_build_object(
     'eyebrow','Process',
     'heading','A predictable path from "idea" to "in production"',
     'steps', jsonb_build_array(
       jsonb_build_object('title','Discovery call','description','30-minute call to understand outcomes, constraints and budget. Free.'),
       jsonb_build_object('title','Scope & quote','description','Within 48 hours: a fixed quote, milestone breakdown, and a Notion plan you can comment on.'),
       jsonb_build_object('title','Build in slices','description','Weekly demos against a shared staging URL. You see progress; nothing surprises you at the end.'),
       jsonb_build_object('title','Ship & support','description','Production deploy, handover docs, and a 14-day support window included on every project.')
     )
   ),
   5, true, 'home'),
  ('tech_stack', 'Tools I reach for',
   jsonb_build_object('items', jsonb_build_array(
     'TypeScript','Next.js','React','Node.js','Postgres','Supabase','Stripe','Tailwind','three.js','Python','Chrome MV3','Vercel'
   )),
   6, true, 'home'),
  ('testimonials', 'What clients say',
   jsonb_build_object(
     'eyebrow','Reviews',
     'heading','Receipts from real clients',
     'subheading','All Upwork-verified, with original screenshots — not curated quotes.'
   ),
   7, true, 'home'),
  ('faq', 'Common questions',
   jsonb_build_object(
     'items', jsonb_build_array(
       jsonb_build_object('question','How do you price projects?','answer','Fixed-price for anything I can scope; hourly for ongoing work. You always see the number before we start.'),
       jsonb_build_object('question','Do you sign NDAs?','answer','Yes — I''ll happily sign a mutual NDA before we get into anything sensitive.'),
       jsonb_build_object('question','What about the code?','answer','You own it. I push to a repo you control on day one.'),
       jsonb_build_object('question','Can you work with my team?','answer','Yes. I''ve embedded into product teams as a contractor for sprints up to 6 months.')
     )
   ),
   8, true, 'home'),
  ('cta', 'Closing CTA',
   jsonb_build_object(
     'heading','Got a project in mind?',
     'subheading','Tell me what you''re trying to build. I''ll reply within a working day with a sharp opinion and a path forward.',
     'primary_cta', jsonb_build_object('label','Start a project','href','/contact'),
     'secondary_cta', jsonb_build_object('label','View Upwork profile','href','https://www.upwork.com/freelancers/~01c94e6af3f2725140')
   ),
   9, true, 'home')
on conflict do nothing;
