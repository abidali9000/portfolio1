"use client"

import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
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
          <div className="space-y-1.5">
            <Label htmlFor="client_avatar">Avatar URL</Label>
            <Input id="client_avatar" name="client_avatar" defaultValue={testimonial?.client_avatar ?? ""} />
          </div>
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
          <div className="space-y-1.5 md:col-span-2">
            <Label htmlFor="proof_image">Proof image URL (e.g. Upwork screenshot)</Label>
            <Input id="proof_image" name="proof_image" defaultValue={testimonial?.proof_image ?? ""} />
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
