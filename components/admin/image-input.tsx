"use client"

import * as React from "react"
import Image from "next/image"
import { ImagePlus, Loader2, Trash2, Upload, FolderOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { uploadMediaAction, listMediaAction } from "@/app/admin/(panel)/actions"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

type MediaItem = Awaited<ReturnType<typeof listMediaAction>>[number]

/**
 * Inline image field. Renders a preview, an upload button, a "browse library"
 * button and a manual URL field as the underlying form value.
 *
 * The component itself is uncontrolled — the actual `<input name=...>` is what
 * the parent form posts. Drop it in any form in place of a plain text Input.
 */
export function ImageInput({
  name,
  defaultValue = "",
  label,
  hint,
  required = false,
  className,
  aspect = "video",
}: {
  name: string
  defaultValue?: string | null
  label?: string
  hint?: string
  required?: boolean
  className?: string
  aspect?: "video" | "square" | "portrait" | "wide"
}) {
  const [value, setValue] = React.useState(defaultValue ?? "")
  const [uploading, setUploading] = React.useState(false)
  const fileRef = React.useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const aspectClass =
    aspect === "square" ? "aspect-square"
    : aspect === "portrait" ? "aspect-[4/5]"
    : aspect === "wide" ? "aspect-[16/7]"
    : "aspect-video"

  async function uploadFile(file: File) {
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.set("file", file)
      const result = await uploadMediaAction(fd)
      setValue(result.url)
      toast({ title: "Uploaded", description: file.name })
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

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label htmlFor={name}>
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
      )}

      <div className={cn("relative overflow-hidden rounded-lg border border-border bg-muted/40", aspectClass)}>
        {value ? (
          <Image
            src={value}
            alt={label ?? "Image preview"}
            fill
            className="object-cover"
            sizes="320px"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-xs text-muted-foreground">
            <div className="flex flex-col items-center gap-1">
              <ImagePlus className="h-5 w-5" />
              No image yet
            </div>
          </div>
        )}
        {uploading && (
          <div className="absolute inset-0 grid place-items-center bg-background/70 backdrop-blur-sm">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        )}
        {value && !uploading && (
          <button
            type="button"
            onClick={() => setValue("")}
            className="absolute top-2 right-2 grid h-7 w-7 place-items-center rounded-full bg-background/90 text-muted-foreground hover:text-destructive hover:bg-background border border-border"
            aria-label="Clear image"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => {
            const f = e.target.files?.[0]
            if (f) uploadFile(f)
          }}
        />
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
        >
          <Upload className="mr-1.5 h-3.5 w-3.5" />
          Upload
        </Button>
        <MediaPickerButton onPick={u => setValue(u)} />
      </div>

      <Input
        type="url"
        name={name}
        id={name}
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="…or paste a URL"
        required={required}
      />
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}

function MediaPickerButton({ onPick }: { onPick: (url: string) => void }) {
  const [open, setOpen] = React.useState(false)
  const [items, setItems] = React.useState<MediaItem[] | null>(null)
  const [loading, setLoading] = React.useState(false)

  async function load() {
    setLoading(true)
    try {
      const data = await listMediaAction()
      setItems(data)
    } catch {
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    if (open && items === null) load()
  }, [open, items])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" size="sm" variant="outline">
          <FolderOpen className="mr-1.5 h-3.5 w-3.5" />
          Browse library
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Pick from media library</DialogTitle>
        </DialogHeader>
        {loading && (
          <div className="grid place-items-center py-12">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        )}
        {!loading && items && items.length === 0 && (
          <p className="py-12 text-center text-sm text-muted-foreground">
            Nothing in the library yet — use the Upload button to add files.
          </p>
        )}
        {!loading && items && items.length > 0 && (
          <div className="grid max-h-[60vh] grid-cols-2 gap-2 overflow-y-auto sm:grid-cols-3 md:grid-cols-4">
            {items.map(m => (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  onPick(m.url)
                  setOpen(false)
                }}
                className="group relative aspect-video overflow-hidden rounded-lg border border-border bg-muted hover:border-foreground/50 transition-colors"
              >
                {m.mime_type?.startsWith("image/") ? (
                  <Image src={m.url} alt={m.alt ?? m.filename} fill className="object-cover" sizes="200px" unoptimized />
                ) : (
                  <div className="grid h-full place-items-center text-[10px] text-muted-foreground">
                    {m.mime_type ?? "file"}
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 truncate bg-background/85 backdrop-blur px-2 py-1 text-[10px] text-foreground">
                  {m.filename}
                </div>
              </button>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
