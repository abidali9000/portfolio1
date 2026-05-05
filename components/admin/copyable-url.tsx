"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export function CopyableUrl({ url }: { url: string }) {
  const [copied, setCopied] = React.useState(false)
  const { toast } = useToast()

  async function copy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast({ title: "URL copied" })
      window.setTimeout(() => setCopied(false), 1500)
    } catch (e) {
      toast({
        title: "Couldn't copy",
        description: e instanceof Error ? e.message : String(e),
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex items-center gap-1">
      <input
        readOnly
        value={url}
        className="w-full rounded border border-border bg-muted/50 px-2 py-1 text-[10px] font-mono"
        onFocus={e => e.currentTarget.select()}
      />
      <Button
        type="button"
        size="icon"
        variant="ghost"
        className="h-7 w-7 shrink-0"
        onClick={copy}
        aria-label="Copy URL"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
      </Button>
    </div>
  )
}
