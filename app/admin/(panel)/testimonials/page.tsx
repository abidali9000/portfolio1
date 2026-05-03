import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/admin/page-header"
import { TestimonialsList } from "@/components/admin/testimonials-list"
import { getAllTestimonials } from "@/lib/cms/queries"

export default async function AdminTestimonialsPage() {
  const items = await getAllTestimonials()
  return (
    <div>
      <PageHeader
        title="Testimonials"
        description="Verified client quotes — featured ones appear on the homepage."
        action={
          <Button asChild>
            <Link href="/admin/testimonials/new">
              <Plus className="mr-2 h-4 w-4" /> New testimonial
            </Link>
          </Button>
        }
      />
      <TestimonialsList initial={items} />
    </div>
  )
}
