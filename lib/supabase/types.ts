// Database types for the portfolio CMS. These mirror the SQL migration in
// supabase/migrations and are intentionally hand-written so the app builds
// without needing `supabase gen types` to be run.

export type SectionType =
  | "hero"
  | "stats"
  | "logos"
  | "services"
  | "featured_projects"
  | "testimonials"
  | "process"
  | "tech_stack"
  | "cta"
  | "rich_text"
  | "faq"

export type ImagePosition =
  | "top-left" | "top" | "top-right"
  | "left" | "center" | "right"
  | "bottom-left" | "bottom" | "bottom-right"

export type ImageFit = "cover" | "contain"

export interface Project {
  id: string
  slug: string
  title: string
  tagline: string | null
  summary: string | null
  body: string | null
  cover_image: string | null
  cover_position: ImagePosition
  cover_fit: ImageFit
  gallery: string[] | null
  tech_stack: string[] | null
  category: string | null
  client: string | null
  industry: string | null
  year: number | null
  live_url: string | null
  repo_url: string | null
  case_study: boolean
  featured: boolean
  position: number
  published: boolean
  metrics: Record<string, string> | null
  created_at: string
  updated_at: string
}

export interface Service {
  id: string
  slug: string
  title: string
  tagline: string | null
  description: string | null
  icon: string | null
  features: string[] | null
  starting_price: string | null
  delivery_time: string | null
  position: number
  published: boolean
  created_at: string
  updated_at: string
}

export interface Testimonial {
  id: string
  client_name: string
  client_role: string | null
  client_company: string | null
  client_avatar: string | null
  quote: string
  rating: number | null
  project_value: string | null
  source: string | null
  source_url: string | null
  proof_image: string | null
  proof_image_position: ImagePosition
  featured: boolean
  position: number
  published: boolean
  created_at: string
}

export interface Section {
  id: string
  type: SectionType
  title: string | null
  data: Record<string, unknown>
  position: number
  enabled: boolean
  page: string
  created_at: string
  updated_at: string
}

export interface SiteSettings {
  id: string
  brand_name: string
  tagline: string | null
  bio: string | null
  email: string | null
  phone: string | null
  location: string | null
  avatar_url: string | null
  resume_url: string | null
  upwork_url: string | null
  github_url: string | null
  linkedin_url: string | null
  twitter_url: string | null
  available_for_work: boolean
  hourly_rate: string | null
  primary_color: string | null
  avatar_position: ImagePosition
  updated_at: string
}

export interface MediaAsset {
  id: string
  path: string
  url: string
  filename: string
  mime_type: string | null
  size_bytes: number | null
  width: number | null
  height: number | null
  alt: string | null
  created_at: string
}

export interface Lead {
  id: string
  name: string
  email: string
  company: string | null
  budget: string | null
  service: string | null
  timeline: string | null
  message: string
  status: "new" | "in_progress" | "won" | "lost"
  notes: string | null
  created_at: string
}
