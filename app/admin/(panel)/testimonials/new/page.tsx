import { PageHeader } from "@/components/admin/page-header"
import { TestimonialForm } from "@/components/admin/testimonial-form"
import { createTestimonialAction } from "@/app/admin/(panel)/actions"

export default function NewTestimonialPage() {
  return (
    <div>
      <PageHeader title="Add a testimonial" back={{ href: "/admin/testimonials", label: "Back to testimonials" }} />
      <TestimonialForm action={createTestimonialAction} submitLabel="Create testimonial" />
    </div>
  )
}
