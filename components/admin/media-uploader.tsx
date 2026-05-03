"use client"

import * as React from "react"
import { useTransition } from "react"
import { Loader2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { uploadMediaAction } from "@/app/admin/(panel)/actions"

export function MediaUploader() {
  const [pending, start] = useTransition()
  const { toast } = useToast()
  const formRef = React.useRef<HTMLFormElement>(null)
  const [fileName, setFileName] = React.useState("")

  return (
    <form
      ref={formRef}
      action={(fd: FormData) =>
        start(async () => {
          try {
            const result = await uploadMediaAction(fd)
            toast({ title: "Uploaded", description: result.url })
            formRef.current?.reset()
            setFileName("")
          } catch (e) {
            toast({
              title: "Upload failed",
              description: e instanceof Error ? e.message : String(e),
              variant: "destructive",
            })
          }
        })
      }
      className="grid gap-3 rounded-2xl border border-dashed border-border p-6 md:grid-cols-[1fr_1fr_auto]"
    >
      <div className="space-y-1.5">
        <Label htmlFor="file">File (max 10 MB)</Label>
        <Input
          id="file"
          name="file"
          type="file"
          accept="image/*,application/pdf"
          required
          onChange={e => setFileName(e.target.files?.[0]?.name ?? "")}
        />
        {fileName && <p className="text-xs text-muted-foreground truncate">{fileName}</p>}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="alt">Alt text</Label>
        <Input id="alt" name="alt" placeholder="Describe the image" />
      </div>
      <Button type="submit" disabled={pending} className="self-end">
        {pending ? (
          <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading…</>
        ) : (
          <><Upload className="mr-2 h-4 w-4" /> Upload</>
        )}
      </Button>
    </form>
  )
}
