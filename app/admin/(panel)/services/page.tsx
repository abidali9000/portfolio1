import Link from "next/link"
import { Edit2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PageHeader } from "@/components/admin/page-header"
import { DeleteButton } from "@/components/admin/delete-button"
import { getAllServices } from "@/lib/cms/queries"
import { deleteServiceAction } from "@/app/admin/(panel)/actions"

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
      <div className="grid gap-3">
        {services.map(s => (
          <Card key={s.id}>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold truncate">{s.title}</h3>
                <p className="text-xs text-muted-foreground truncate">/services/{s.slug}{s.starting_price && ` · ${s.starting_price}`}</p>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link href={`/admin/services/${s.id}`}>
                  <Edit2 className="h-4 w-4" />
                </Link>
              </Button>
              <DeleteButton size="icon" label="" action={deleteServiceAction.bind(null, s.id)} />
            </CardContent>
          </Card>
        ))}
        {services.length === 0 && (
          <Card>
            <CardContent className="p-10 text-center text-sm text-muted-foreground">
              No services yet.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
