"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { createServerSupabase, createServiceSupabase } from "@/lib/supabase/server"
import { requireAdmin } from "@/lib/admin/guard"
import { isSupabaseConfigured } from "@/lib/env"

// =============================================
// Auth
// =============================================
export async function signOutAction() {
  if (!isSupabaseConfigured) redirect("/admin/login")
  const supabase = await createServerSupabase()
  await supabase.auth.signOut()
  redirect("/admin/login")
}

// =============================================
// Projects
// =============================================
const projectSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "Lower-case letters, numbers, and dashes only"),
  title: z.string().min(1),
  tagline: z.string().optional().nullable(),
  summary: z.string().optional().nullable(),
  body: z.string().optional().nullable(),
  cover_image: z.string().optional().nullable(),
  gallery: z.array(z.string()).optional().nullable(),
  tech_stack: z.array(z.string()).optional().nullable(),
  category: z.string().optional().nullable(),
  client: z.string().optional().nullable(),
  industry: z.string().optional().nullable(),
  year: z.number().int().optional().nullable(),
  live_url: z.string().url().optional().or(z.literal("")).nullable(),
  repo_url: z.string().url().optional().or(z.literal("")).nullable(),
  case_study: z.boolean().default(false),
  featured: z.boolean().default(false),
  position: z.number().int().default(0),
  published: z.boolean().default(true),
  metrics: z.record(z.string(), z.string()).optional().nullable(),
})

function parseList(value: FormDataEntryValue | null): string[] {
  if (!value) return []
  return String(value)
    .split(/[\n,]/)
    .map(s => s.trim())
    .filter(Boolean)
}

function parseMetrics(value: FormDataEntryValue | null): Record<string, string> {
  if (!value) return {}
  const out: Record<string, string> = {}
  String(value)
    .split("\n")
    .forEach(line => {
      const [k, ...rest] = line.split(":")
      const v = rest.join(":").trim()
      if (k && v) out[k.trim()] = v
    })
  return out
}

function parseProjectForm(formData: FormData) {
  return projectSchema.parse({
    slug: formData.get("slug"),
    title: formData.get("title"),
    tagline: formData.get("tagline") || null,
    summary: formData.get("summary") || null,
    body: formData.get("body") || null,
    cover_image: formData.get("cover_image") || null,
    gallery: parseList(formData.get("gallery")),
    tech_stack: parseList(formData.get("tech_stack")),
    category: formData.get("category") || null,
    client: formData.get("client") || null,
    industry: formData.get("industry") || null,
    year: formData.get("year") ? Number(formData.get("year")) : null,
    live_url: (formData.get("live_url") as string) || null,
    repo_url: (formData.get("repo_url") as string) || null,
    case_study: formData.get("case_study") === "on",
    featured: formData.get("featured") === "on",
    position: Number(formData.get("position") || 0),
    published: formData.get("published") === "on",
    metrics: parseMetrics(formData.get("metrics")),
  })
}

export async function createProjectAction(formData: FormData) {
  await requireAdmin()
  const data = parseProjectForm(formData)
  const supabase = await createServerSupabase()
  const { error } = await supabase.from("projects").insert(data)
  if (error) throw new Error(error.message)
  revalidatePath("/projects")
  revalidatePath("/")
  redirect("/admin/projects")
}

export async function updateProjectAction(id: string, formData: FormData) {
  await requireAdmin()
  const data = parseProjectForm(formData)
  const supabase = await createServerSupabase()
  const { error } = await supabase.from("projects").update(data).eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/projects")
  revalidatePath(`/projects/${data.slug}`)
  revalidatePath("/")
  redirect("/admin/projects")
}

export async function deleteProjectAction(id: string) {
  await requireAdmin()
  const supabase = await createServerSupabase()
  const { error } = await supabase.from("projects").delete().eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/projects")
  revalidatePath("/")
}

export async function toggleProjectFlagAction(
  id: string,
  flag: "published" | "featured" | "case_study",
  value: boolean,
) {
  await requireAdmin()
  const supabase = await createServerSupabase()
  const { error } = await supabase.from("projects").update({ [flag]: value }).eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/projects")
  revalidatePath("/")
  revalidatePath("/case-studies")
  revalidatePath("/admin/projects")
}

export async function duplicateProjectAction(id: string) {
  await requireAdmin()
  const supabase = await createServerSupabase()
  const { data: src, error: e1 } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle()
  if (e1) throw new Error(e1.message)
  if (!src) throw new Error("Project not found")

  // Strip server-managed fields and force a unique slug.
  const stripped = { ...src } as Record<string, unknown>
  delete stripped.id
  delete stripped.created_at
  delete stripped.updated_at
  stripped.slug = `${(src as { slug: string }).slug}-copy-${Date.now().toString(36).slice(-4)}`
  stripped.title = `${(src as { title: string }).title} (copy)`
  stripped.featured = false
  stripped.published = false
  stripped.position = ((src as { position: number }).position ?? 0) + 1

  const { error: e2 } = await supabase.from("projects").insert(stripped)
  if (e2) throw new Error(e2.message)
  revalidatePath("/admin/projects")
}

export async function reorderProjectsAction(orderedIds: string[]) {
  await requireAdmin()
  const supabase = await createServerSupabase()
  await Promise.all(
    orderedIds.map((id, i) => supabase.from("projects").update({ position: i }).eq("id", id)),
  )
  revalidatePath("/projects")
  revalidatePath("/admin/projects")
  revalidatePath("/")
}

// =============================================
// Services
// =============================================
const serviceSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  tagline: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  features: z.array(z.string()).optional().nullable(),
  starting_price: z.string().optional().nullable(),
  delivery_time: z.string().optional().nullable(),
  position: z.number().int().default(0),
  published: z.boolean().default(true),
})

function parseServiceForm(formData: FormData) {
  return serviceSchema.parse({
    slug: formData.get("slug"),
    title: formData.get("title"),
    tagline: formData.get("tagline") || null,
    description: formData.get("description") || null,
    icon: formData.get("icon") || null,
    features: parseList(formData.get("features")),
    starting_price: formData.get("starting_price") || null,
    delivery_time: formData.get("delivery_time") || null,
    position: Number(formData.get("position") || 0),
    published: formData.get("published") === "on",
  })
}

export async function createServiceAction(formData: FormData) {
  await requireAdmin()
  const data = parseServiceForm(formData)
  const supabase = await createServerSupabase()
  const { error } = await supabase.from("services").insert(data)
  if (error) throw new Error(error.message)
  revalidatePath("/services")
  revalidatePath("/")
  redirect("/admin/services")
}

export async function updateServiceAction(id: string, formData: FormData) {
  await requireAdmin()
  const data = parseServiceForm(formData)
  const supabase = await createServerSupabase()
  const { error } = await supabase.from("services").update(data).eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/services")
  revalidatePath(`/services/${data.slug}`)
  revalidatePath("/")
  redirect("/admin/services")
}

export async function deleteServiceAction(id: string) {
  await requireAdmin()
  const supabase = await createServerSupabase()
  const { error } = await supabase.from("services").delete().eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/services")
  revalidatePath("/")
}

export async function toggleServicePublishedAction(id: string, published: boolean) {
  await requireAdmin()
  const supabase = await createServerSupabase()
  await supabase.from("services").update({ published }).eq("id", id)
  revalidatePath("/services")
  revalidatePath("/admin/services")
  revalidatePath("/")
}

export async function reorderServicesAction(orderedIds: string[]) {
  await requireAdmin()
  const supabase = await createServerSupabase()
  await Promise.all(
    orderedIds.map((id, i) => supabase.from("services").update({ position: i }).eq("id", id)),
  )
  revalidatePath("/services")
  revalidatePath("/admin/services")
  revalidatePath("/")
}

// =============================================
// Testimonials
// =============================================
const testimonialSchema = z.object({
  client_name: z.string().min(1),
  client_role: z.string().optional().nullable(),
  client_company: z.string().optional().nullable(),
  client_avatar: z.string().optional().nullable(),
  quote: z.string().min(1),
  rating: z.number().min(0).max(5).default(5),
  project_value: z.string().optional().nullable(),
  source: z.string().optional().nullable(),
  source_url: z.string().url().optional().or(z.literal("")).nullable(),
  proof_image: z.string().optional().nullable(),
  featured: z.boolean().default(false),
  position: z.number().int().default(0),
  published: z.boolean().default(true),
})

function parseTestimonialForm(formData: FormData) {
  return testimonialSchema.parse({
    client_name: formData.get("client_name"),
    client_role: formData.get("client_role") || null,
    client_company: formData.get("client_company") || null,
    client_avatar: formData.get("client_avatar") || null,
    quote: formData.get("quote"),
    rating: Number(formData.get("rating") || 5),
    project_value: formData.get("project_value") || null,
    source: formData.get("source") || null,
    source_url: (formData.get("source_url") as string) || null,
    proof_image: formData.get("proof_image") || null,
    featured: formData.get("featured") === "on",
    position: Number(formData.get("position") || 0),
    published: formData.get("published") === "on",
  })
}

export async function createTestimonialAction(formData: FormData) {
  await requireAdmin()
  const data = parseTestimonialForm(formData)
  const supabase = await createServerSupabase()
  const { error } = await supabase.from("testimonials").insert(data)
  if (error) throw new Error(error.message)
  revalidatePath("/testimonials")
  revalidatePath("/")
  redirect("/admin/testimonials")
}

export async function updateTestimonialAction(id: string, formData: FormData) {
  await requireAdmin()
  const data = parseTestimonialForm(formData)
  const supabase = await createServerSupabase()
  const { error } = await supabase.from("testimonials").update(data).eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/testimonials")
  revalidatePath("/")
  redirect("/admin/testimonials")
}

export async function deleteTestimonialAction(id: string) {
  await requireAdmin()
  const supabase = await createServerSupabase()
  const { error } = await supabase.from("testimonials").delete().eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/testimonials")
  revalidatePath("/")
}

export async function toggleTestimonialFlagAction(
  id: string,
  flag: "published" | "featured",
  value: boolean,
) {
  await requireAdmin()
  const supabase = await createServerSupabase()
  await supabase.from("testimonials").update({ [flag]: value }).eq("id", id)
  revalidatePath("/testimonials")
  revalidatePath("/admin/testimonials")
  revalidatePath("/")
}

export async function reorderTestimonialsAction(orderedIds: string[]) {
  await requireAdmin()
  const supabase = await createServerSupabase()
  await Promise.all(
    orderedIds.map((id, i) => supabase.from("testimonials").update({ position: i }).eq("id", id)),
  )
  revalidatePath("/testimonials")
  revalidatePath("/admin/testimonials")
  revalidatePath("/")
}

// =============================================
// Sections (homepage builder)
// =============================================
export async function updateSectionDataAction(id: string, formData: FormData) {
  await requireAdmin()
  const dataRaw = formData.get("data")
  let parsed: Record<string, unknown> = {}
  try {
    parsed = JSON.parse(String(dataRaw || "{}"))
  } catch {
    throw new Error("Section data is not valid JSON")
  }
  const enabled = formData.get("enabled") === "on"
  const title = (formData.get("title") as string) || null
  const supabase = await createServerSupabase()
  const { error } = await supabase
    .from("sections")
    .update({ data: parsed, enabled, title })
    .eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/")
}

export async function reorderSectionsAction(orderedIds: string[]) {
  await requireAdmin()
  const supabase = await createServerSupabase()
  await Promise.all(
    orderedIds.map((id, i) => supabase.from("sections").update({ position: i }).eq("id", id)),
  )
  revalidatePath("/")
}

export async function toggleSectionAction(id: string, enabled: boolean) {
  await requireAdmin()
  const supabase = await createServerSupabase()
  await supabase.from("sections").update({ enabled }).eq("id", id)
  revalidatePath("/")
}

export async function createSectionAction(formData: FormData) {
  await requireAdmin()
  const type = String(formData.get("type") || "rich_text")
  const title = (formData.get("title") as string) || null
  const supabase = await createServerSupabase()
  const { data: existing } = await supabase
    .from("sections")
    .select("position")
    .eq("page", "home")
    .order("position", { ascending: false })
    .limit(1)
    .maybeSingle()
  const nextPos = (existing?.position ?? -1) + 1
  const { error } = await supabase.from("sections").insert({
    type,
    title,
    data: {},
    position: nextPos,
    enabled: true,
    page: "home",
  })
  if (error) throw new Error(error.message)
  revalidatePath("/admin/sections")
}

export async function deleteSectionAction(id: string) {
  await requireAdmin()
  const supabase = await createServerSupabase()
  const { error } = await supabase.from("sections").delete().eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/admin/sections")
  revalidatePath("/")
}

// =============================================
// Site settings
// =============================================
export async function updateSiteSettingsAction(formData: FormData) {
  await requireAdmin()
  const payload = {
    brand_name: String(formData.get("brand_name") || "").trim(),
    tagline: (formData.get("tagline") as string) || null,
    bio: (formData.get("bio") as string) || null,
    email: (formData.get("email") as string) || null,
    phone: (formData.get("phone") as string) || null,
    location: (formData.get("location") as string) || null,
    avatar_url: (formData.get("avatar_url") as string) || null,
    resume_url: (formData.get("resume_url") as string) || null,
    upwork_url: (formData.get("upwork_url") as string) || null,
    github_url: (formData.get("github_url") as string) || null,
    linkedin_url: (formData.get("linkedin_url") as string) || null,
    twitter_url: (formData.get("twitter_url") as string) || null,
    available_for_work: formData.get("available_for_work") === "on",
    hourly_rate: (formData.get("hourly_rate") as string) || null,
    primary_color: (formData.get("primary_color") as string) || "#2563eb",
  }
  const supabase = await createServerSupabase()
  // Upsert the singleton row.
  const { data: existing } = await supabase.from("site_settings").select("id").limit(1).maybeSingle()
  if (existing) {
    const { error } = await supabase.from("site_settings").update(payload).eq("id", existing.id)
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase.from("site_settings").insert(payload)
    if (error) throw new Error(error.message)
  }
  revalidatePath("/", "layout")
}

// =============================================
// Leads
// =============================================
export async function updateLeadStatusAction(id: string, status: "new" | "in_progress" | "won" | "lost") {
  await requireAdmin()
  const supabase = await createServerSupabase()
  await supabase.from("leads").update({ status }).eq("id", id)
  revalidatePath("/admin/leads")
}

export async function deleteLeadAction(id: string) {
  await requireAdmin()
  const supabase = await createServerSupabase()
  await supabase.from("leads").delete().eq("id", id)
  revalidatePath("/admin/leads")
}

// =============================================
// Media (uploads via service-role client)
// =============================================

/**
 * Upload a single file to Supabase Storage and record the metadata in
 * `public.media`. Returns the public URL so callers can use it inline (e.g.
 * the inline ImageInput on a project form).
 */
export async function uploadMediaAction(
  formData: FormData,
): Promise<{ url: string; path: string; id: string; alt: string | null }> {
  await requireAdmin()
  const file = formData.get("file")
  if (!(file instanceof File) || file.size === 0) {
    throw new Error("No file provided")
  }
  // Hard cap matches next.config bodySizeLimit; surface a clean error first.
  if (file.size > 10 * 1024 * 1024) {
    throw new Error("File is too large (max 10 MB).")
  }
  const service = createServiceSupabase()
  if (!service) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY isn't set in Vercel — add it and redeploy.")
  }

  const ext = (file.name.split(".").pop() ?? "bin").toLowerCase().replace(/[^a-z0-9]/g, "") || "bin"
  const safeBase = file.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40) || "file"
  const path = `media/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeBase}.${ext}`

  const { error: uploadErr } = await service.storage
    .from("public-media")
    .upload(path, file, {
      contentType: file.type || "application/octet-stream",
      upsert: false,
      cacheControl: "31536000",
    })
  if (uploadErr) {
    throw new Error(`Storage upload failed: ${uploadErr.message}`)
  }

  const { data: publicUrl } = service.storage.from("public-media").getPublicUrl(path)
  const url = publicUrl.publicUrl
  const alt = (formData.get("alt") as string) || null

  // Record in the media table using the service-role client to bypass RLS
  // (callers who hit the size limit can still hit RLS edge-cases otherwise).
  const { data: row, error: insertErr } = await service
    .from("media")
    .insert({
      path,
      url,
      filename: file.name,
      mime_type: file.type || null,
      size_bytes: file.size,
      alt,
    })
    .select("id")
    .single()
  if (insertErr) {
    // Best-effort cleanup so we don't leave orphan storage objects.
    await service.storage.from("public-media").remove([path]).catch(() => undefined)
    throw new Error(`Failed to record media: ${insertErr.message}`)
  }

  revalidatePath("/admin/media")
  return { url, path, id: row.id as string, alt }
}

export async function deleteMediaAction(id: string, path: string) {
  await requireAdmin()
  const service = createServiceSupabase()
  if (service) {
    await service.storage.from("public-media").remove([path]).catch(() => undefined)
  }
  const supabase = await createServerSupabase()
  await supabase.from("media").delete().eq("id", id)
  revalidatePath("/admin/media")
}

/**
 * List media for picker UIs. Returns thumbnails + URLs sorted by recency.
 */
export async function listMediaAction(): Promise<Array<{ id: string; url: string; alt: string | null; filename: string; mime_type: string | null }>> {
  await requireAdmin()
  const supabase = await createServerSupabase()
  const { data, error } = await supabase
    .from("media")
    .select("id, url, alt, filename, mime_type")
    .order("created_at", { ascending: false })
    .limit(200)
  if (error) throw new Error(error.message)
  return (data ?? []) as Array<{ id: string; url: string; alt: string | null; filename: string; mime_type: string | null }>
}
