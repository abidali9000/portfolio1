"use server"

import { createServerSupabase, createServiceSupabase } from "@/lib/supabase/server"
import { env, isSupabaseConfigured } from "@/lib/env"

interface ContactFormData {
  name: string
  email: string
  company?: string
  budget?: string
  service: string
  timeline?: string
  message: string
}

export async function submitContactForm(formData: FormData) {
  try {
    const data: ContactFormData = {
      name: (formData.get("name") as string)?.trim(),
      email: (formData.get("email") as string)?.trim(),
      company: ((formData.get("company") as string) || "").trim() || undefined,
      budget: ((formData.get("budget") as string) || "").trim() || undefined,
      service: (formData.get("service") as string)?.trim(),
      timeline: ((formData.get("timeline") as string) || "").trim() || undefined,
      message: (formData.get("message") as string)?.trim(),
    }

    if (!data.name || !data.email || !data.service || !data.message) {
      return { success: false, error: "Please fill in all required fields." }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return { success: false, error: "Please enter a valid email address." }
    }

    // Persist to Supabase as a new lead (best-effort).
    if (isSupabaseConfigured) {
      try {
        const client = createServiceSupabase() ?? (await createServerSupabase())
        await client.from("leads").insert({
          name: data.name,
          email: data.email,
          company: data.company ?? null,
          budget: data.budget ?? null,
          service: data.service,
          timeline: data.timeline ?? null,
          message: data.message,
        })
      } catch (e) {
        console.error("[contact] failed to persist lead:", e)
      }
    }

    // Forward to email API (best-effort).
    const emailContent = `New contact form submission

Name: ${data.name}
Email: ${data.email}
Company: ${data.company ?? "—"}

Service: ${data.service}
Budget: ${data.budget ?? "—"}
Timeline: ${data.timeline ?? "—"}

Message:
${data.message}

—
Submitted: ${new Date().toISOString()}
`

    try {
      await fetch(`${env.siteUrl}/api/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: env.contactToEmail,
          subject: `New project inquiry from ${data.name}`,
          text: emailContent,
          replyTo: data.email,
        }),
      })
    } catch (e) {
      console.warn("[contact] email forward failed:", e)
    }

    return { success: true }
  } catch (error) {
    console.error("Contact form submission error:", error)
    return { success: false, error: "Failed to send message. Please try again." }
  }
}
