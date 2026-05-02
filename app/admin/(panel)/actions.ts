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
export async function uploadMediaAction(formData: FormData) {
  await requireAdmin()
  const file = formData.get("file") as File
  if (!file) throw new Error("No file provided")
  const service = createServiceSupabase()
  if (!service) throw new Error("SUPABASE_SERVICE_ROLE_KEY not set")

  const ext = file.name.split(".").pop() ?? "bin"
  const path = `media/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const arrayBuffer = await file.arrayBuffer()
  const { error: uploadErr } = await service.storage
    .from("public-media")
    .upload(path, arrayBuffer, { contentType: file.type, upsert: false })
  if (uploadErr) throw new Error(uploadErr.message)

  const { data: publicUrl } = service.storage.from("public-media").getPublicUrl(path)

  const supabase = await createServerSupabase()
  await supabase.from("media").insert({
    path,
    url: publicUrl.publicUrl,
    filename: file.name,
    mime_type: file.type,
    size_bytes: file.size,
    alt: (formData.get("alt") as string) || null,
  })
  revalidatePath("/admin/media")
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
