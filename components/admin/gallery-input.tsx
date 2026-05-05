"use client"

import * as React from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ImagePlus, Loader2, Plus, Trash2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { uploadMediaAction } from "@/app/admin/(panel)/actions"

/**
 * A multi-image editor: ordered list of URLs, each with a preview, reorder
 * arrows and a remove button. Posts as a hidden textarea named `gallery`
 * containing one URL per line — the project form action already parses that.
 */
export function GalleryInput({
  defaultValue = [],
}: {
  defaultValue?: string[]
}) {
  const [items, setItems] = React.useState<string[]>(defaultValue)
  const [uploading, setUploading] = React.useState(false)
  const [pasting, setPasting] = React.useState("")
  const fileRef = React.useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  async function uploadFiles(files: FileList | null) {
    if (!files || files.length === 0) return
    setUploading(true)
    try {
      const uploaded: string[] = []
      for (const file of Array.from(files)) {
        const fd = new FormData()
        fd.set("file", file)
        const res = await uploadMediaAction(fd)
        uploaded.push(res.url)
      }
      setItems(prev => [...prev, ...uploaded])
      toast({ title: `Uploaded ${uploaded.length} image${uploaded.length === 1 ? "" : "s"}` })
    } catch (e) {
      toast({
        title: "Upload failed",
        description: e instanceof Error ? e.message : String(e),
        variant: "destructive",
      })
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ""
    }
  }

  function move(idx: number, dir: -1 | 1) {
    const next = [...items]
    const target = idx + dir
    if (target < 0 || target >= items.length) return
    ;[next[idx], next[target]] = [next[target], next[idx]]
    setItems(next)
  }

  return (
    <div className="space-y-3">
      <Label>Gallery</Label>

      {/* The form-posted value: one URL per line. */}
      <textarea
        name="gallery"
        readOnly
        hidden
        value={items.join("\n")}
      />

      {items.length === 0 && (
        <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          <ImagePlus className="mx-auto mb-2 h-5 w-5" />
          No images in the gallery yet.
        </div>
      )}

      {items.length > 0 && (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {items.map((url, i) => (
            <li key={`${url}-${i}`} className="group relative overflow-hidden rounded-lg border border-border bg-muted">
              <div className="relative aspect-video">
                <Image src={url} alt={`Gallery image ${i + 1}`} fill className="object-cover" sizes="200px" unoptimized />
              </div>
              <div className="flex items-center justify-between gap-1 p-1">
                <div className="flex">
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7"
                    onClick={() => move(i, -1)}
                    disabled={i === 0}
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7"
                    onClick={() => move(i, 1)}
                    disabled={i === items.length - 1}
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7 text-muted-foreground hover:text-destructive"
                  onClick={() => setItems(prev => prev.filter((_, idx) => idx !== i))}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={e => uploadFiles(e.target.files)}
        />
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? (
            <><Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> Uploading…</>
          ) : (
            <><Upload className="mr-1.5 h-3.5 w-3.5" /> Upload images</>
          )}
        </Button>

        <div className="flex flex-1 items-center gap-2">
          <Input
            placeholder="…or paste an image URL"
            value={pasting}
            onChange={e => setPasting(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" && pasting.trim()) {
                e.preventDefault()
                setItems(prev => [...prev, pasting.trim()])
                setPasting("")
              }
            }}
          />
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => {
              if (!pasting.trim()) return
              setItems(prev => [...prev, pasting.trim()])
              setPasting("")
            }}
          >
            <Plus className="mr-1 h-3.5 w-3.5" /> Add
          </Button>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Drag-free reorder via the arrows. Posts as one URL per line in the saved record.
      </p>
    </div>
  )
}
