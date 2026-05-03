"use client"

import * as React from "react"
import { useTransition } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Box,
  ChevronDown,
  ChevronUp,
  Copy,
  Edit2,
  Eye,
  EyeOff,
  Search,
  Sparkles,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { DeleteButton } from "@/components/admin/delete-button"
import {
  deleteProjectAction,
  duplicateProjectAction,
  reorderProjectsAction,
  toggleProjectFlagAction,
} from "@/app/admin/(panel)/actions"
import type { Project } from "@/lib/supabase/types"

export function ProjectsList({ initial }: { initial: Project[] }) {
  const [items, setItems] = React.useState<Project[]>(() =>
    [...initial].sort((a, b) => a.position - b.position),
  )
  const [query, setQuery] = React.useState("")
  const [filter, setFilter] = React.useState<"all" | "featured" | "case_study" | "drafts">("all")
  const [, start] = useTransition()
  const { toast } = useToast()

  const filtered = React.useMemo(() => {
    return items.filter(p => {
      if (filter === "featured" && !p.featured) return false
      if (filter === "case_study" && !p.case_study) return false
      if (filter === "drafts" && p.published) return false
      if (query) {
        const q = query.toLowerCase()
        if (
          !p.title.toLowerCase().includes(q)
          && !(p.tagline ?? "").toLowerCase().includes(q)
          && !(p.category ?? "").toLowerCase().includes(q)
          && !p.slug.toLowerCase().includes(q)
        ) return false
      }
      return true
    })
  }, [items, query, filter])

  function move(idx: number, dir: -1 | 1) {
    const next = [...items]
    const target = idx + dir
    if (target < 0 || target >= items.length) return
    ;[next[idx], next[target]] = [next[target], next[idx]]
    setItems(next)
    start(async () => {
      try {
        await reorderProjectsAction(next.map(p => p.id))
      } catch (e) {
        toast({ title: "Reorder failed", description: String(e), variant: "destructive" })
      }
    })
  }

  function setFlag(p: Project, flag: "published" | "featured" | "case_study", value: boolean) {
    setItems(prev => prev.map(it => (it.id === p.id ? { ...it, [flag]: value } : it)))
    start(async () => {
      try {
        await toggleProjectFlagAction(p.id, flag, value)
      } catch (e) {
        toast({ title: "Couldn't update", description: String(e), variant: "destructive" })
      }
    })
  }

  function duplicate(id: string) {
    start(async () => {
      try {
        await duplicateProjectAction(id)
        toast({ title: "Duplicated — refresh to see the copy in the list" })
      } catch (e) {
        toast({ title: "Duplicate failed", description: String(e), variant: "destructive" })
      }
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by title, slug, tagline, category…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-1 rounded-full border border-border bg-card p-1 text-xs">
          {([
            ["all", "All"],
            ["featured", "Featured"],
            ["case_study", "Case studies"],
            ["drafts", "Drafts"],
          ] as const).map(([v, label]) => (
            <button
              key={v}
              type="button"
              onClick={() => setFilter(v)}
              className={`rounded-full px-3 py-1 transition-colors ${
                filter === v ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <Card>
          <CardContent className="p-10 text-center text-sm text-muted-foreground">
            {items.length === 0
              ? <>No projects yet. <Link className="underline" href="/admin/projects/new">Add your first one →</Link></>
              : "No projects match this filter."}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {filtered.map((p) => {
            const idx = items.findIndex(it => it.id === p.id)
            return (
              <Card key={p.id} className={p.published ? "" : "opacity-70"}>
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="flex flex-col">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => move(idx, -1)}
                      disabled={idx === 0 || query.length > 0 || filter !== "all"}
                      title={query || filter !== "all" ? "Clear search/filter to reorder" : ""}
                    >
                      <ChevronUp className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => move(idx, 1)}
                      disabled={idx === items.length - 1 || query.length > 0 || filter !== "all"}
                    >
                      <ChevronDown className="h-3.5 w-3.5" />
                    </Button>
                  </div>

                  <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-md border border-border bg-muted">
                    {p.cover_image ? (
                      <Image src={p.cover_image} alt="" fill className="object-cover" sizes="96px" unoptimized />
                    ) : (
                      <div className="grid h-full place-items-center text-muted-foreground"><Box className="h-4 w-4" /></div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold truncate">{p.title}</h3>
                      {p.featured && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-700 dark:text-amber-300">
                          <Sparkles className="h-3 w-3" /> Featured
                        </span>
                      )}
                      {p.case_study && (
                        <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold text-blue-700 dark:text-blue-300">
                          Case study
                        </span>
                      )}
                      {!p.published && (
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                          Draft
                        </span>
                      )}
                    </div>
                    <div className="mt-0.5 truncate text-xs text-muted-foreground">
                      /{p.slug}
                      {p.category && ` · ${p.category}`}
                      {p.year && ` · ${p.year}`}
                    </div>
                  </div>

                  <div className="hidden items-center gap-3 text-xs md:flex">
                    <label className="flex items-center gap-1.5">
                      <Switch checked={p.published} onCheckedChange={v => setFlag(p, "published", v)} />
                      <span className="text-muted-foreground">Published</span>
                    </label>
                    <label className="flex items-center gap-1.5">
                      <Switch checked={p.featured} onCheckedChange={v => setFlag(p, "featured", v)} />
                      <span className="text-muted-foreground">Featured</span>
                    </label>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/projects/${p.slug}`} target="_blank" title="View">
                        {p.published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => duplicate(p.id)} title="Duplicate">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button asChild variant="ghost" size="sm" title="Edit">
                      <Link href={`/admin/projects/${p.id}`}>
                        <Edit2 className="h-4 w-4" />
                      </Link>
                    </Button>
                    <DeleteButton
                      size="icon"
                      label=""
                      description={`Permanently delete "${p.title}"?`}
                      action={deleteProjectAction.bind(null, p.id)}
                    />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
