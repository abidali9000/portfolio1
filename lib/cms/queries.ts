// Read-side helpers for the public site. Each function is safe to call from
// Server Components: it tries Supabase first and falls back to the static
// defaults so the site renders even when Supabase env vars aren't set yet.

import { createServerSupabase } from "@/lib/supabase/server"
import { isSupabaseConfigured } from "@/lib/env"
import {
  defaultProjects,
  defaultSections,
  defaultServices,
  defaultSiteSettings,
  defaultTestimonials,
} from "@/lib/cms/defaults"
import type {
  Project,
  Section,
  Service,
  SiteSettings,
  Testimonial,
} from "@/lib/supabase/types"

async function trySupabase<T>(fetcher: () => Promise<T | null>, fallback: T): Promise<T> {
  if (!isSupabaseConfigured) return fallback
  try {
    const result = await fetcher()
    return result ?? fallback
  } catch (err) {
    console.warn("[cms] Supabase query failed, using defaults:", err)
    return fallback
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return trySupabase(async () => {
    const supabase = await createServerSupabase()
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .limit(1)
      .maybeSingle()
    if (error) throw error
    return (data as SiteSettings) ?? null
  }, defaultSiteSettings)
}

export async function getServices({ onlyPublished = true }: { onlyPublished?: boolean } = {}): Promise<Service[]> {
  return trySupabase(async () => {
    const supabase = await createServerSupabase()
    let query = supabase.from("services").select("*").order("position", { ascending: true })
    if (onlyPublished) query = query.eq("published", true)
    const { data, error } = await query
    if (error) throw error
    return (data ?? null) as Service[] | null
  }, defaultServices)
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  if (!isSupabaseConfigured) {
    return defaultServices.find(s => s.slug === slug) ?? null
  }
  try {
    const supabase = await createServerSupabase()
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("slug", slug)
      .maybeSingle()
    if (error) throw error
    return (data as Service | null) ?? null
  } catch {
    return defaultServices.find(s => s.slug === slug) ?? null
  }
}

export async function getProjects({
  onlyPublished = true,
  featuredOnly = false,
  caseStudiesOnly = false,
  limit,
}: {
  onlyPublished?: boolean
  featuredOnly?: boolean
  caseStudiesOnly?: boolean
  limit?: number
} = {}): Promise<Project[]> {
  const fallback = defaultProjects
    .filter(p => (onlyPublished ? p.published : true))
    .filter(p => (featuredOnly ? p.featured : true))
    .filter(p => (caseStudiesOnly ? p.case_study : true))
    .slice(0, limit ?? defaultProjects.length)

  return trySupabase(async () => {
    const supabase = await createServerSupabase()
    let query = supabase.from("projects").select("*").order("position", { ascending: true })
    if (onlyPublished) query = query.eq("published", true)
    if (featuredOnly) query = query.eq("featured", true)
    if (caseStudiesOnly) query = query.eq("case_study", true)
    if (limit) query = query.limit(limit)
    const { data, error } = await query
    if (error) throw error
    return (data ?? null) as Project[] | null
  }, fallback)
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!isSupabaseConfigured) {
    return defaultProjects.find(p => p.slug === slug) ?? null
  }
  try {
    const supabase = await createServerSupabase()
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .maybeSingle()
    if (error) throw error
    return (data as Project | null) ?? null
  } catch {
    return defaultProjects.find(p => p.slug === slug) ?? null
  }
}

export async function getTestimonials({ featuredOnly = false }: { featuredOnly?: boolean } = {}): Promise<Testimonial[]> {
  const fallback = featuredOnly
    ? defaultTestimonials.filter(t => t.featured)
    : defaultTestimonials

  return trySupabase(async () => {
    const supabase = await createServerSupabase()
    let query = supabase
      .from("testimonials")
      .select("*")
      .eq("published", true)
      .order("position", { ascending: true })
    if (featuredOnly) query = query.eq("featured", true)
    const { data, error } = await query
    if (error) throw error
    return (data ?? null) as Testimonial[] | null
  }, fallback)
}

export async function getSections(page = "home"): Promise<Section[]> {
  return trySupabase(async () => {
    const supabase = await createServerSupabase()
    const { data, error } = await supabase
      .from("sections")
      .select("*")
      .eq("page", page)
      .eq("enabled", true)
      .order("position", { ascending: true })
    if (error) throw error
    return (data ?? null) as Section[] | null
  }, defaultSections.filter(s => s.page === page && s.enabled))
}

// Admin helpers (no fallback — these are only used from inside /admin)

export async function getAllSections(page = "home"): Promise<Section[]> {
  if (!isSupabaseConfigured) return defaultSections.filter(s => s.page === page)
  const supabase = await createServerSupabase()
  const { data, error } = await supabase
    .from("sections")
    .select("*")
    .eq("page", page)
    .order("position", { ascending: true })
  if (error) throw error
  return (data ?? []) as Section[]
}

export async function getAllProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured) return defaultProjects
  const supabase = await createServerSupabase()
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("position", { ascending: true })
  if (error) throw error
  return (data ?? []) as Project[]
}

export async function getAllServices(): Promise<Service[]> {
  if (!isSupabaseConfigured) return defaultServices
  const supabase = await createServerSupabase()
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("position", { ascending: true })
  if (error) throw error
  return (data ?? []) as Service[]
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured) return defaultTestimonials
  const supabase = await createServerSupabase()
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("position", { ascending: true })
  if (error) throw error
  return (data ?? []) as Testimonial[]
}
