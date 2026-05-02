import Link from "next/link"
import { Edit2, Plus, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PageHeader } from "@/components/admin/page-header"
import { DeleteButton } from "@/components/admin/delete-button"
import { getAllTestimonials } from "@/lib/cms/queries"
import { deleteTestimonialAction } from "@/app/admin/(panel)/actions"

export default async function AdminTestimonialsPage() {
  const items = await getAllTestimonials()
  return (
    <div>
      <PageHeader
        title="Testimonials"
        description="Client quotes & verified review screenshots."
        action={
          <Button asChild>
            <Link href="/admin/testimonials/new">
              <Plus className="mr-2 h-4 w-4" /> New testimonial
            </Link>
          </Button>
        }
      />
      <div className="grid gap-3">
        {items.map(t => (
          <Card key={t.id}>
            <CardContent className="flex items-start gap-4 p-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold truncate">{t.client_name}</h3>
                  <span className="inline-flex items-center gap-1 text-xs text-amber-500">
                    <Star className="h-3 w-3 fill-current" /> {Number(t.rating ?? 5).toFixed(1)}
                  </span>
                  {t.featured && (
                    <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-700 dark:text-amber-300">Featured</span>
                  )}
                  {!t.published && (
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">Draft</span>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{t.quote}</p>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link href={`/admin/testimonials/${t.id}`}>
                  <Edit2 className="h-4 w-4" />
                </Link>
              </Button>
              <DeleteButton size="icon" label="" action={deleteTestimonialAction.bind(null, t.id)} />
            </CardContent>
          </Card>
        ))}
        {items.length === 0 && (
          <Card>
            <CardContent className="p-10 text-center text-sm text-muted-foreground">No testimonials yet.</CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
