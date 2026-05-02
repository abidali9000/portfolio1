-- Portfolio CMS schema
-- Run this in the Supabase SQL editor (or via `supabase db push`).

-- =============================================
-- Helpers
-- =============================================
create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- =============================================
-- Profiles (admin allow-list)
-- =============================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles read self" on public.profiles;
create policy "profiles read self"
  on public.profiles for select
  using (auth.uid() = id);

-- Auto-provision a profile row whenever a new auth user is created.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', new.email))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Convenience predicate used by every admin policy.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select coalesce((select is_admin from public.profiles where id = auth.uid()), false);
$$;

-- =============================================
-- Site settings (singleton row)
-- =============================================
create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  brand_name text not null default 'Abid Ali',
  tagline text,
  bio text,
  email text,
  phone text,
  location text,
  avatar_url text,
  resume_url text,
  upwork_url text,
  github_url text,
  linkedin_url text,
  twitter_url text,
  available_for_work boolean not null default true,
  hourly_rate text,
  primary_color text default '#2563eb',
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

drop policy if exists "site_settings public read" on public.site_settings;
create policy "site_settings public read"
  on public.site_settings for select
  using (true);

drop policy if exists "site_settings admin write" on public.site_settings;
create policy "site_settings admin write"
  on public.site_settings for all
  using (public.is_admin())
  with check (public.is_admin());

drop trigger if exists site_settings_updated_at on public.site_settings;
create trigger site_settings_updated_at
  before update on public.site_settings
  for each row execute function public.set_updated_at();

-- Seed a singleton row if missing.
insert into public.site_settings (brand_name, tagline, bio, email, phone, location, upwork_url, available_for_work, hourly_rate)
select
  'Abid Ali',
  'Custom CMS, Web & Browser Extensions',
  'I help founders and product teams turn ambiguous ideas into shipped, measurable software — from custom CMS platforms to Chrome extensions and end-to-end web apps.',
  'admin@abidali.vip',
  '+39 3927035373',
  'Italy · Remote worldwide',
  'https://www.upwork.com/freelancers/~01c94e6af3f2725140',
  true,
  '$45/hr'
where not exists (select 1 from public.site_settings);

-- =============================================
-- Projects
-- =============================================
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  tagline text,
  summary text,
  body text,
  cover_image text,
  gallery text[] default '{}',
  tech_stack text[] default '{}',
  category text,
  client text,
  industry text,
  year int,
  live_url text,
  repo_url text,
  case_study boolean not null default false,
  featured boolean not null default false,
  position int not null default 0,
  published boolean not null default true,
  metrics jsonb default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_position_idx on public.projects(position);
create index if not exists projects_slug_idx on public.projects(slug);

alter table public.projects enable row level security;

drop policy if exists "projects public read" on public.projects;
create policy "projects public read"
  on public.projects for select
  using (published = true or public.is_admin());

drop policy if exists "projects admin write" on public.projects;
create policy "projects admin write"
  on public.projects for all
  using (public.is_admin())
  with check (public.is_admin());

drop trigger if exists projects_updated_at on public.projects;
create trigger projects_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

-- =============================================
-- Services
-- =============================================
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  tagline text,
  description text,
  icon text,
  features text[] default '{}',
  starting_price text,
  delivery_time text,
  position int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists services_position_idx on public.services(position);

alter table public.services enable row level security;

drop policy if exists "services public read" on public.services;
create policy "services public read"
  on public.services for select
  using (published = true or public.is_admin());

drop policy if exists "services admin write" on public.services;
create policy "services admin write"
  on public.services for all
  using (public.is_admin())
  with check (public.is_admin());

drop trigger if exists services_updated_at on public.services;
create trigger services_updated_at
  before update on public.services
  for each row execute function public.set_updated_at();

-- =============================================
-- Testimonials
-- =============================================
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  client_role text,
  client_company text,
  client_avatar text,
  quote text not null,
  rating numeric(2,1) default 5.0,
  project_value text,
  source text default 'Upwork',
  source_url text,
  proof_image text,
  featured boolean not null default false,
  position int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists testimonials_position_idx on public.testimonials(position);

alter table public.testimonials enable row level security;

drop policy if exists "testimonials public read" on public.testimonials;
create policy "testimonials public read"
  on public.testimonials for select
  using (published = true or public.is_admin());

drop policy if exists "testimonials admin write" on public.testimonials;
create policy "testimonials admin write"
  on public.testimonials for all
  using (public.is_admin())
  with check (public.is_admin());

-- =============================================
-- Sections (homepage / page builder)
-- =============================================
create table if not exists public.sections (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in (
    'hero','stats','logos','services','featured_projects','testimonials',
    'process','tech_stack','cta','rich_text','faq'
  )),
  title text,
  data jsonb not null default '{}'::jsonb,
  position int not null default 0,
  enabled boolean not null default true,
  page text not null default 'home',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists sections_page_position_idx on public.sections(page, position);

alter table public.sections enable row level security;

drop policy if exists "sections public read" on public.sections;
create policy "sections public read"
  on public.sections for select
  using (enabled = true or public.is_admin());

drop policy if exists "sections admin write" on public.sections;
create policy "sections admin write"
  on public.sections for all
  using (public.is_admin())
  with check (public.is_admin());

drop trigger if exists sections_updated_at on public.sections;
create trigger sections_updated_at
  before update on public.sections
  for each row execute function public.set_updated_at();

-- =============================================
-- Media library (metadata for files in storage)
-- =============================================
create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  url text not null,
  filename text not null,
  mime_type text,
  size_bytes bigint,
  width int,
  height int,
  alt text,
  created_at timestamptz not null default now()
);

alter table public.media enable row level security;

drop policy if exists "media public read" on public.media;
create policy "media public read"
  on public.media for select
  using (true);

drop policy if exists "media admin write" on public.media;
create policy "media admin write"
  on public.media for all
  using (public.is_admin())
  with check (public.is_admin());

-- =============================================
-- Leads (contact form submissions)
-- =============================================
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  budget text,
  service text,
  timeline text,
  message text not null,
  status text not null default 'new' check (status in ('new','in_progress','won','lost')),
  notes text,
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

-- Anyone can submit a lead, only admins can read/edit.
drop policy if exists "leads public insert" on public.leads;
create policy "leads public insert"
  on public.leads for insert
  with check (true);

drop policy if exists "leads admin read" on public.leads;
create policy "leads admin read"
  on public.leads for select
  using (public.is_admin());

drop policy if exists "leads admin update" on public.leads;
create policy "leads admin update"
  on public.leads for update
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "leads admin delete" on public.leads;
create policy "leads admin delete"
  on public.leads for delete
  using (public.is_admin());
