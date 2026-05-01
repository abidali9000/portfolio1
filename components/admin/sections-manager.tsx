"use client"

import * as React from "react"
import { useTransition } from "react"
import {
  ChevronDown,
  ChevronUp,
  GripVertical,
  Save,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  reorderSectionsAction,
  toggleSectionAction,
  updateSectionDataAction,
  deleteSectionAction,
  createSectionAction,
} from "@/app/admin/(panel)/actions"
import type { Section, SectionType } from "@/lib/supabase/types"

const TYPE_LABELS: Record<SectionType, string> = {
  hero: "Hero",
  stats: "Stats",
  logos: "Logos / industries",
  services: "Services teaser",
  featured_projects: "Featured projects",
  testimonials: "Testimonials",
  process: "Process",
  tech_stack: "Tech stack",
  cta: "Closing CTA",
  rich_text: "Rich text",
  faq: "FAQ",
}

const TEMPLATES: Record<SectionType, Record<string, unknown>> = {
  hero: { eyebrow: "Available for new work", heading: "Custom software, shipped with proof.", highlight: "shipped with proof.", subheading: "…", primary_cta: { label: "See work", href: "/projects" }, secondary_cta: { label: "Contact", href: "/contact" } },
  stats: { items: [{ value: "120+", label: "Projects shipped" }] },
  logos: { items: ["B2B SaaS", "Healthcare"] },
  services: { eyebrow: "Services", heading: "What I do", subheading: "" },
  featured_projects: { eyebrow: "Case studies", heading: "Recent work", subheading: "" },
  process: { eyebrow: "Process", heading: "How I work", steps: [{ title: "Step", description: "…" }] },
  tech_stack: { items: ["TypeScript", "Next.js"] },
  testimonials: { eyebrow: "Reviews", heading: "What clients say", subheading: "" },
  cta: { heading: "Got a project?", subheading: "", primary_cta: { label: "Contact", href: "/contact" } },
  rich_text: { eyebrow: "", heading: "", body: "" },
  faq: { items: [{ question: "Q", answer: "A" }] },
}

export function SectionsManager({ initial }: { initial: Section[] }) {
  const [sections, setSections] = React.useState(() => [...initial].sort((a, b) => a.position - b.position))
  const { toast } = useToast()
  const [, start] = useTransition()

  const move = (idx: number, dir: -1 | 1) => {
    const newIdx = idx + dir
    if (newIdx < 0 || newIdx >= sections.length) return
    const next = [...sections]
    const [item] = next.splice(idx, 1)
    next.splice(newIdx, 0, item)
    setSections(next)
    start(async () => {
      try {
        await reorderSectionsAction(next.map(s => s.id))
      } catch (e) {
        toast({ title: "Reorder failed", description: String(e), variant: "destructive" })
      }
    })
  }

  const toggle = (id: string, enabled: boolean) => {
    setSections(prev => prev.map(s => (s.id === id ? { ...s, enabled } : s)))
    start(async () => {
      try {
        await toggleSectionAction(id, enabled)
      } catch (e) {
        toast({ title: "Failed to toggle", description: String(e), variant: "destructive" })
      }
    })
  }

  const remove = (id: string) => {
    setSections(prev => prev.filter(s => s.id !== id))
    start(async () => {
      try {
        await deleteSectionAction(id)
        toast({ title: "Section deleted" })
      } catch (e) {
        toast({ title: "Delete failed", description: String(e), variant: "destructive" })
      }
    })
  }

  return (
    <div className="space-y-6">
      <AddSectionDialog />

      <div className="space-y-2">
        {sections.map((s, i) => (
          <SectionRow
            key={s.id}
            section={s}
            isFirst={i === 0}
            isLast={i === sections.length - 1}
            onMoveUp={() => move(i, -1)}
            onMoveDown={() => move(i, 1)}
            onToggle={enabled => toggle(s.id, enabled)}
            onDelete={() => remove(s.id)}
          />
        ))}
        {sections.length === 0 && (
          <Card>
            <CardContent className="p-10 text-center text-sm text-muted-foreground">
              No sections yet. Add one to start composing the homepage.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

function SectionRow({
  section,
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown,
  onToggle,
  onDelete,
}: {
  section: Section
  isFirst: boolean
  isLast: boolean
  onMoveUp: () => void
  onMoveDown: () => void
  onToggle: (enabled: boolean) => void
  onDelete: () => void
}) {
  const [editing, setEditing] = React.useState(false)
  const [title, setTitle] = React.useState(section.title ?? "")
  const [json, setJson] = React.useState(JSON.stringify(section.data, null, 2))
  const [enabled, setEnabled] = React.useState(section.enabled)
  const [pending, start] = useTransition()
  const { toast } = useToast()

  const onSave = () => {
    try {
      JSON.parse(json)
    } catch (e) {
      toast({ title: "JSON is invalid", description: String(e), variant: "destructive" })
      return
    }
    start(async () => {
      try {
        const fd = new FormData()
        fd.set("data", json)
        fd.set("title", title)
        if (enabled) fd.set("enabled", "on")
        await updateSectionDataAction(section.id, fd)
        toast({ title: "Section saved" })
        setEditing(false)
      } catch (e) {
        toast({ title: "Save failed", description: String(e), variant: "destructive" })
      }
    })
  }

  return (
    <Card>
      <CardContent className={`p-3 ${section.enabled ? "" : "opacity-60"}`}>
        <div className="flex items-center gap-2">
          <GripVertical className="h-4 w-4 text-muted-foreground" />
          <div className="flex flex-col">
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onMoveUp} disabled={isFirst}>
              <ChevronUp className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onMoveDown} disabled={isLast}>
              <ChevronDown className="h-3.5 w-3.5" />
            </Button>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                {TYPE_LABELS[section.type]}
              </span>
              <span className="font-medium truncate">{section.title || TYPE_LABELS[section.type]}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={section.enabled} onCheckedChange={onToggle} />
            <Button variant="ghost" size="sm" onClick={() => setEditing(v => !v)}>
              {editing ? "Close" : "Edit"}
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={onDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {editing && (
          <div className="mt-4 space-y-4 border-t border-border pt-4">
            <div className="space-y-1.5">
              <Label htmlFor={`title-${section.id}`}>Internal title</Label>
              <Input id={`title-${section.id}`} value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor={`data-${section.id}`}>Data (JSON)</Label>
              <Textarea
                id={`data-${section.id}`}
                value={json}
                onChange={e => setJson(e.target.value)}
                rows={Math.min(20, json.split("\n").length + 2)}
                className="font-mono text-xs"
              />
              <p className="text-xs text-muted-foreground">Full schema is documented in the codebase. Save to apply changes immediately to the homepage.</p>
            </div>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-sm">
                <Switch checked={enabled} onCheckedChange={setEnabled} /> Enabled
              </label>
              <div className="ml-auto flex items-center gap-2">
                <Button size="sm" onClick={onSave} disabled={pending}>
                  <Save className="mr-2 h-3.5 w-3.5" />
                  {pending ? "Saving…" : "Save"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function AddSectionDialog() {
  const [open, setOpen] = React.useState(false)
  const [type, setType] = React.useState<SectionType>("rich_text")
  const [title, setTitle] = React.useState("")
  const [pending, start] = useTransition()
  const { toast } = useToast()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ Add section</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a homepage section</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="section-type">Type</Label>
            <select
              id="section-type"
              value={type}
              onChange={e => setType(e.target.value as SectionType)}
              className="w-full rounded-md border border-border bg-background p-2 text-sm"
            >
              {(Object.keys(TYPE_LABELS) as SectionType[]).map(t => (
                <option key={t} value={t}>{TYPE_LABELS[t]}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="section-title">Internal title (optional)</Label>
            <Input id="section-title" value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <details className="rounded-md border border-border p-2 text-xs">
            <summary className="cursor-pointer text-muted-foreground">Starter JSON for this type</summary>
            <pre className="mt-2 overflow-x-auto whitespace-pre-wrap text-[11px]">{JSON.stringify(TEMPLATES[type] ?? {}, null, 2)}</pre>
          </details>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button
              disabled={pending}
              onClick={() =>
                start(async () => {
                  try {
                    const fd = new FormData()
                    fd.set("type", type)
                    fd.set("title", title)
                    await createSectionAction(fd)
                    toast({ title: "Section added — edit it below to fill in content." })
                    setOpen(false)
                    setTitle("")
                  } catch (e) {
                    toast({ title: "Failed", description: String(e), variant: "destructive" })
                  }
                })
              }
            >
              {pending ? "Adding…" : "Add section"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
