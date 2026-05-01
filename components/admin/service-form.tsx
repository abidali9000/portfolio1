"use client"

import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Service } from "@/lib/supabase/types"

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving…" : label}
    </Button>
  )
}

const ICONS = [
  { value: "database", label: "Database" },
  { value: "code", label: "Code" },
  { value: "chrome", label: "Chrome" },
  { value: "globe", label: "Globe" },
  { value: "zap", label: "Zap" },
]

export function ServiceForm({
  service,
  action,
  submitLabel = "Save service",
}: {
  service?: Service
  action: (formData: FormData) => void | Promise<void>
  submitLabel?: string
}) {
  const featuresString = (service?.features ?? []).join("\n")

  return (
    <form action={action} className="space-y-6">
      <Card>
        <CardContent className="p-5 grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="title">Title *</Label>
            <Input id="title" name="title" defaultValue={service?.title ?? ""} required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="slug">Slug *</Label>
            <Input id="slug" name="slug" defaultValue={service?.slug ?? ""} pattern="[a-z0-9-]+" required />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Input id="tagline" name="tagline" defaultValue={service?.tagline ?? ""} />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" rows={5} defaultValue={service?.description ?? ""} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5 grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="icon">Icon</Label>
            <Select name="icon" defaultValue={service?.icon ?? "code"}>
              <SelectTrigger><SelectValue placeholder="Pick icon" /></SelectTrigger>
              <SelectContent>
                {ICONS.map(i => (
                  <SelectItem key={i.value} value={i.value}>{i.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="position">Position</Label>
            <Input id="position" name="position" type="number" defaultValue={service?.position ?? 0} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="starting_price">Starting price</Label>
            <Input id="starting_price" name="starting_price" defaultValue={service?.starting_price ?? ""} placeholder="from $1,500" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="delivery_time">Delivery time</Label>
            <Input id="delivery_time" name="delivery_time" defaultValue={service?.delivery_time ?? ""} placeholder="2–4 weeks" />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <Label htmlFor="features">Features (one per line)</Label>
            <Textarea id="features" name="features" rows={6} defaultValue={featuresString} />
          </div>
          <label className="flex items-center justify-between rounded-lg border border-border p-3 cursor-pointer md:col-span-2">
            <span>
              <span className="block text-sm font-medium">Published</span>
              <span className="block text-xs text-muted-foreground">Show on the public services page</span>
            </span>
            <Switch name="published" defaultChecked={service?.published ?? true} />
          </label>
        </CardContent>
      </Card>

      <div className="flex items-center justify-end gap-2">
        <SubmitButton label={submitLabel} />
      </div>
    </form>
  )
}
