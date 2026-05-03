"use client"

import * as React from "react"
import { useTransition } from "react"
import Link from "next/link"
import { ChevronDown, ChevronUp, Edit2, Eye, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { DeleteButton } from "@/components/admin/delete-button"
import {
  deleteServiceAction,
  reorderServicesAction,
  toggleServicePublishedAction,
} from "@/app/admin/(panel)/actions"
import type { Service } from "@/lib/supabase/types"

export function ServicesList({ initial }: { initial: Service[] }) {
  const [items, setItems] = React.useState<Service[]>(() =>
    [...initial].sort((a, b) => a.position - b.position),
  )
  const [query, setQuery] = React.useState("")
  const [, start] = useTransition()
  const { toast } = useToast()

  const filtered = items.filter(s => {
    if (!query) return true
    const q = query.toLowerCase()
    return (
      s.title.toLowerCase().includes(q)
      || (s.tagline ?? "").toLowerCase().includes(q)
      || s.slug.toLowerCase().includes(q)
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
        await reorderServicesAction(next.map(s => s.id))
      } catch (e) {
        toast({ title: "Reorder failed", description: String(e), variant: "destructive" })
      }
    })
  }

  function setPublished(s: Service, value: boolean) {
    setItems(prev => prev.map(it => (it.id === s.id ? { ...it, published: value } : it)))
    start(async () => {
      try {
        await toggleServicePublishedAction(s.id, value)
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
          placeholder="Search services…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {filtered.length === 0 ? (
        <Card>
          <CardContent className="p-10 text-center text-sm text-muted-foreground">
            {items.length === 0 ? "No services yet." : "No services match this search."}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {filtered.map(s => {
            const idx = items.findIndex(it => it.id === s.id)
            return (
              <Card key={s.id} className={s.published ? "" : "opacity-70"}>
                <CardContent className="flex items-center gap-4 p-4">
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

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold truncate">{s.title}</h3>
                      {!s.published && (
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                          Draft
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      /services/{s.slug}{s.starting_price && ` · ${s.starting_price}`}{s.delivery_time && ` · ${s.delivery_time}`}
                    </p>
                  </div>

                  <label className="hidden items-center gap-1.5 text-xs md:flex">
                    <Switch checked={s.published} onCheckedChange={v => setPublished(s, v)} />
                    <span className="text-muted-foreground">Published</span>
                  </label>

                  <div className="flex items-center gap-1">
                    <Button asChild variant="ghost" size="sm" title="View">
                      <Link href={`/services/${s.slug}`} target="_blank">
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="ghost" size="sm" title="Edit">
                      <Link href={`/admin/services/${s.id}`}>
                        <Edit2 className="h-4 w-4" />
                      </Link>
                    </Button>
                    <DeleteButton size="icon" label="" action={deleteServiceAction.bind(null, s.id)} />
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
