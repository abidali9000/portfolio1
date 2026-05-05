import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/admin/page-header"
import { ServicesList } from "@/components/admin/services-list"
import { getAllServices } from "@/lib/cms/queries"

export default async function AdminServicesPage() {
  const services = await getAllServices()
  return (
    <div>
      <PageHeader
        title="Services"
        description="What you offer. Each service has its own detail page on the public site."
        action={
          <Button asChild>
            <Link href="/admin/services/new">
              <Plus className="mr-2 h-4 w-4" /> New service
            </Link>
          </Button>
        }
      />
      <ServicesList initial={services} />
    </div>
  )
}
