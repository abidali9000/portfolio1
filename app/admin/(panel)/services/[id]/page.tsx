import { notFound } from "next/navigation"
import { PageHeader } from "@/components/admin/page-header"
import { ServiceForm } from "@/components/admin/service-form"
import { createServerSupabase } from "@/lib/supabase/server"
import { isSupabaseConfigured } from "@/lib/env"
import { defaultServices } from "@/lib/cms/defaults"
import { updateServiceAction } from "@/app/admin/(panel)/actions"
import type { Service } from "@/lib/supabase/types"

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let service: Service | null = null
  if (isSupabaseConfigured) {
    const supabase = await createServerSupabase()
    const { data } = await supabase.from("services").select("*").eq("id", id).maybeSingle()
    service = (data as Service | null) ?? null
  } else {
    service = defaultServices.find(s => s.id === id) ?? null
  }
  if (!service) notFound()
  return (
    <div>
      <PageHeader title={`Edit · ${service.title}`} back={{ href: "/admin/services", label: "Back to services" }} />
      <ServiceForm
        service={service}
        action={updateServiceAction.bind(null, service.id)}
        submitLabel="Save changes"
      />
    </div>
  )
}
