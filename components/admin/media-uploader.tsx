"use client"

import * as React from "react"
import { useTransition } from "react"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { uploadMediaAction } from "@/app/admin/(panel)/actions"

export function MediaUploader() {
  const [pending, start] = useTransition()
  const { toast } = useToast()
  const formRef = React.useRef<HTMLFormElement>(null)

  return (
    <form
      ref={formRef}
      action={(fd: FormData) =>
        start(async () => {
          try {
            await uploadMediaAction(fd)
            toast({ title: "Uploaded" })
            formRef.current?.reset()
          } catch (e) {
            toast({ title: "Upload failed", description: String(e), variant: "destructive" })
          }
        })
      }
      className="grid gap-3 rounded-2xl border border-dashed border-border p-6 md:grid-cols-[1fr_1fr_auto]"
    >
      <div className="space-y-1.5">
        <Label htmlFor="file">File</Label>
        <Input id="file" name="file" type="file" accept="image/*,application/pdf" required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="alt">Alt text</Label>
        <Input id="alt" name="alt" placeholder="Describe the image" />
      </div>
      <Button type="submit" disabled={pending} className="self-end">
        <Upload className="mr-2 h-4 w-4" />
        {pending ? "Uploading…" : "Upload"}
      </Button>
    </form>
  )
}
