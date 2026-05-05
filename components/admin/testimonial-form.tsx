"use client"

import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { ImageInput } from "@/components/admin/image-input"
import { ImagePositionInput } from "@/components/admin/image-position-input"
import type { Testimonial } from "@/lib/supabase/types"

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus()
  return <Button type="submit" disabled={pending}>{pending ? "Saving…" : label}</Button>
}

export function TestimonialForm({
  testimonial,
  action,
  submitLabel = "Save",
}: {
  testimonial?: Testimonial
  action: (formData: FormData) => void | Promise<void>
  submitLabel?: string
}) {
  return (
    <form action={action} className="space-y-6">
      <Card>
        <CardContent className="p-5 grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="client_name">Client name *</Label>
            <Input id="client_name" name="client_name" defaultValue={testimonial?.client_name ?? ""} required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="client_role">Role</Label>
            <Input id="client_role" name="client_role" defaultValue={testimonial?.client_role ?? ""} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="client_company">Company</Label>
            <Input id="client_company" name="client_company" defaultValue={testimonial?.client_company ?? ""} />
          </div>
          <ImageInput
            name="client_avatar"
            label="Client avatar"
            aspect="square"
            defaultValue={testimonial?.client_avatar ?? ""}
            hint="Optional — shown next to the quote."
          />
          <div className="space-y-1.5 md:col-span-2">
            <Label htmlFor="quote">Quote *</Label>
            <Textarea id="quote" name="quote" rows={4} defaultValue={testimonial?.quote ?? ""} required />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5 grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="rating">Rating</Label>
            <Input id="rating" name="rating" type="number" min={0} max={5} step={0.1} defaultValue={testimonial?.rating ?? 5} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="project_value">Project value</Label>
            <Input id="project_value" name="project_value" defaultValue={testimonial?.project_value ?? ""} placeholder="$1,400" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="source">Source</Label>
            <Input id="source" name="source" defaultValue={testimonial?.source ?? "Upwork"} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="source_url">Source URL</Label>
            <Input id="source_url" name="source_url" type="url" defaultValue={testimonial?.source_url ?? ""} />
          </div>
          <div className="md:col-span-2 space-y-4">
            <ImageInput
              name="proof_image"
              label="Proof image (e.g. Upwork review screenshot)"
              aspect="wide"
              defaultValue={testimonial?.proof_image ?? ""}
              hint="Shown below the quote and on /testimonials. Linking to the original review builds trust."
            />
            <ImagePositionInput
              name="proof_image_position"
              defaultPosition={testimonial?.proof_image_position ?? "center"}
              label="Proof image fit"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="position">Position</Label>
            <Input id="position" name="position" type="number" defaultValue={testimonial?.position ?? 0} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <label className="flex items-center justify-between rounded-lg border border-border p-3 cursor-pointer">
              <span className="text-sm font-medium">Featured</span>
              <Switch name="featured" defaultChecked={testimonial?.featured ?? false} />
            </label>
            <label className="flex items-center justify-between rounded-lg border border-border p-3 cursor-pointer">
              <span className="text-sm font-medium">Published</span>
              <Switch name="published" defaultChecked={testimonial?.published ?? true} />
            </label>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-end gap-2">
        <SubmitButton label={submitLabel} />
      </div>
    </form>
  )
}
