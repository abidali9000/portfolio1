"use client"

import * as React from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { ImageInput } from "@/components/admin/image-input"
import { GalleryInput } from "@/components/admin/gallery-input"
import { ImagePositionInput } from "@/components/admin/image-position-input"
import type { Project } from "@/lib/supabase/types"

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving…" : label}
    </Button>
  )
}

export function ProjectForm({
  project,
  action,
  submitLabel = "Save project",
}: {
  project?: Project
  action: (formData: FormData) => void | Promise<void>
  submitLabel?: string
}) {
  const techString = (project?.tech_stack ?? []).join(", ")
  const metricsString = Object.entries((project?.metrics ?? {}) as Record<string, string>)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n")

  return (
    <form action={action} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="p-5 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="title">Title *</Label>
              <Input id="title" name="title" defaultValue={project?.title ?? ""} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                name="slug"
                defaultValue={project?.slug ?? ""}
                pattern="[a-z0-9-]+"
                required
              />
              <p className="text-xs text-muted-foreground">URL-safe — lowercase letters, numbers, dashes.</p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tagline">Tagline</Label>
              <Input id="tagline" name="tagline" defaultValue={project?.tagline ?? ""} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="summary">Summary</Label>
              <Textarea id="summary" name="summary" rows={3} defaultValue={project?.summary ?? ""} />
              <p className="text-xs text-muted-foreground">Short description shown on cards & top of detail page.</p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="body">Long-form body</Label>
              <Textarea id="body" name="body" rows={8} defaultValue={project?.body ?? ""} />
              <p className="text-xs text-muted-foreground">The case-study narrative. Newlines render as paragraph breaks.</p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardContent className="p-5 space-y-5">
              <ImageInput
                name="cover_image"
                label="Cover image"
                defaultValue={project?.cover_image ?? ""}
                aspect="video"
                hint="Used as the project's hero on its detail page and on the home/projects grid."
              />
              <ImagePositionInput
                name="cover_position"
                fitName="cover_fit"
                defaultPosition={project?.cover_position ?? "center"}
                defaultFit={project?.cover_fit ?? "cover"}
                withFit
                label="Cover image fit"
              />
              <GalleryInput defaultValue={project?.gallery ?? []} />
              <div className="space-y-1.5">
                <Label htmlFor="tech_stack">Tech stack (comma-separated)</Label>
                <Input id="tech_stack" name="tech_stack" defaultValue={techString} placeholder="Next.js, Stripe, Supabase" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" name="category" defaultValue={project?.category ?? ""} placeholder="Web App / Chrome Extension" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="year">Year</Label>
                  <Input id="year" name="year" type="number" defaultValue={project?.year ?? new Date().getFullYear()} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="industry">Industry</Label>
                  <Input id="industry" name="industry" defaultValue={project?.industry ?? ""} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="client">Client</Label>
                  <Input id="client" name="client" defaultValue={project?.client ?? ""} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="live_url">Live URL</Label>
                <Input id="live_url" name="live_url" type="url" defaultValue={project?.live_url ?? ""} placeholder="https://…" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="repo_url">Repository URL</Label>
                <Input id="repo_url" name="repo_url" type="url" defaultValue={project?.repo_url ?? ""} placeholder="https://github.com/…" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="metrics">Metrics (one per line, key: value)</Label>
                <Textarea id="metrics" name="metrics" rows={4} defaultValue={metricsString} placeholder={"Conversion: 1.9% → 4.4%\nMessages/day: 50,000"} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardContent className="p-5">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-1.5">
              <Label htmlFor="position">Position</Label>
              <Input id="position" name="position" type="number" defaultValue={project?.position ?? 0} />
            </div>
            <label className="flex items-center justify-between rounded-lg border border-border p-3 cursor-pointer">
              <span>
                <span className="block text-sm font-medium">Published</span>
                <span className="block text-xs text-muted-foreground">Show on public site</span>
              </span>
              <Switch name="published" defaultChecked={project?.published ?? true} />
            </label>
            <label className="flex items-center justify-between rounded-lg border border-border p-3 cursor-pointer">
              <span>
                <span className="block text-sm font-medium">Featured</span>
                <span className="block text-xs text-muted-foreground">Show on home grid</span>
              </span>
              <Switch name="featured" defaultChecked={project?.featured ?? false} />
            </label>
            <label className="flex items-center justify-between rounded-lg border border-border p-3 cursor-pointer">
              <span>
                <span className="block text-sm font-medium">Case study</span>
                <span className="block text-xs text-muted-foreground">Show on /case-studies</span>
              </span>
              <Switch name="case_study" defaultChecked={project?.case_study ?? false} />
            </label>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-end gap-2 pt-2">
        <SubmitButton label={submitLabel} />
      </div>
    </form>
  )
}
