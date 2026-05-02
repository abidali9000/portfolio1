import { notFound } from "next/navigation"
import { PageHeader } from "@/components/admin/page-header"
import { TestimonialForm } from "@/components/admin/testimonial-form"
import { createServerSupabase } from "@/lib/supabase/server"
import { isSupabaseConfigured } from "@/lib/env"
import { defaultTestimonials } from "@/lib/cms/defaults"
import { updateTestimonialAction } from "@/app/admin/(panel)/actions"
import type { Testimonial } from "@/lib/supabase/types"

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let item: Testimonial | null = null
  if (isSupabaseConfigured) {
    const supabase = await createServerSupabase()
    const { data } = await supabase.from("testimonials").select("*").eq("id", id).maybeSingle()
    item = (data as Testimonial | null) ?? null
  } else {
    item = defaultTestimonials.find(t => t.id === id) ?? null
  }
  if (!item) notFound()
  return (
    <div>
      <PageHeader title={`Edit testimonial · ${item.client_name}`} back={{ href: "/admin/testimonials", label: "Back to testimonials" }} />
      <TestimonialForm
        testimonial={item}
        action={updateTestimonialAction.bind(null, item.id)}
        submitLabel="Save changes"
      />
    </div>
  )
}
