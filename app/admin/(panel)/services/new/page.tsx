import { PageHeader } from "@/components/admin/page-header"
import { ServiceForm } from "@/components/admin/service-form"
import { createServiceAction } from "@/app/admin/(panel)/actions"

export default function NewServicePage() {
  return (
    <div>
      <PageHeader title="Add a new service" back={{ href: "/admin/services", label: "Back to services" }} />
      <ServiceForm action={createServiceAction} submitLabel="Create service" />
    </div>
  )
}
