"use client"

import * as React from "react"
import { useTransition } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ChevronDown,
  ChevronUp,
  Edit2,
  Search,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { DeleteButton } from "@/components/admin/delete-button"
import {
  deleteTestimonialAction,
  reorderTestimonialsAction,
  toggleTestimonialFlagAction,
} from "@/app/admin/(panel)/actions"
import type { Testimonial } from "@/lib/supabase/types"

export function TestimonialsList({ initial }: { initial: Testimonial[] }) {
  const [items, setItems] = React.useState<Testimonial[]>(() =>
    [...initial].sort((a, b) => a.position - b.position),
  )
  const [query, setQuery] = React.useState("")
  const [, start] = useTransition()
  const { toast } = useToast()

  const filtered = items.filter(t => {
    if (!query) return true
    const q = query.toLowerCase()
    return (
      t.client_name.toLowerCase().includes(q)
      || t.quote.toLowerCase().includes(q)
      || (t.client_role ?? "").toLowerCase().includes(q)
      || (t.client_company ?? "").toLowerCase().includes(q)
    )
  })

  function move(idx: number, dir: -1 | 1) {
    const next = [...items]
    const target = idx + dir
    if (target < 0 || target >= items.length) return
    ;[next[idx], next[target]] = [next[target], next[idx]]
    setItems(next)
    start(async () => {
      try {
        await reorderTestimonialsAction(next.map(t => t.id))
      } catch (e) {
        toast({ title: "Reorder failed", description: String(e), variant: "destructive" })
      }
    })
  }

  function setFlag(t: Testimonial, flag: "published" | "featured", value: boolean) {
    setItems(prev => prev.map(it => (it.id === t.id ? { ...it, [flag]: value } : it)))
    start(async () => {
      try {
        await toggleTestimonialFlagAction(t.id, flag, value)
      } catch (e) {
        toast({ title: "Couldn't update", description: String(e), variant: "destructive" })
      }
    })
  }

  return (
    <div className="space-y-4">
      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search testimonials…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {filtered.length === 0 ? (
        <Card>
          <CardContent className="p-10 text-center text-sm text-muted-foreground">
            {items.length === 0 ? "No testimonials yet." : "No testimonials match this search."}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {filtered.map(t => {
            const idx = items.findIndex(it => it.id === t.id)
            return (
              <Card key={t.id} className={t.published ? "" : "opacity-70"}>
                <CardContent className="flex items-start gap-4 p-4">
                  <div className="flex flex-col">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => move(idx, -1)}
                      disabled={idx === 0 || query.length > 0}
                    >
                      <ChevronUp className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => move(idx, 1)}
                      disabled={idx === items.length - 1 || query.length > 0}
                    >
                      <ChevronDown className="h-3.5 w-3.5" />
                    </Button>
                  </div>

                  {t.client_avatar && (
                    <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border border-border">
                      <Image src={t.client_avatar} alt="" fill className="object-cover" sizes="40px" unoptimized />
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold truncate">{t.client_name}</h3>
                      <span className="inline-flex items-center gap-1 text-xs text-amber-500">
                        <Star className="h-3 w-3 fill-current" /> {Number(t.rating ?? 5).toFixed(1)}
                      </span>
                      {t.featured && (
                        <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-700 dark:text-amber-300">
                          Featured
                        </span>
                      )}
                      {!t.published && (
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                          Draft
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{t.quote}</p>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {[t.client_role, t.client_company, t.project_value].filter(Boolean).join(" · ")}
                    </div>
                  </div>

                  <div className="hidden items-center gap-3 text-xs md:flex">
                    <label className="flex items-center gap-1.5">
                      <Switch checked={t.published} onCheckedChange={v => setFlag(t, "published", v)} />
                      <span className="text-muted-foreground">Published</span>
                    </label>
                    <label className="flex items-center gap-1.5">
                      <Switch checked={t.featured} onCheckedChange={v => setFlag(t, "featured", v)} />
                      <span className="text-muted-foreground">Featured</span>
                    </label>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button asChild variant="ghost" size="sm" title="Edit">
                      <Link href={`/admin/testimonials/${t.id}`}>
                        <Edit2 className="h-4 w-4" />
                      </Link>
                    </Button>
                    <DeleteButton size="icon" label="" action={deleteTestimonialAction.bind(null, t.id)} />
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
