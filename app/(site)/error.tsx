"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <section className="border-b border-border py-32">
      <div className="container mx-auto px-4 text-center max-w-xl">
        <p className="font-mono text-xs uppercase tracking-widest text-destructive">Error</p>
        <h1 className="mt-3 font-serif text-4xl md:text-6xl font-bold">Something broke.</h1>
        <p className="mt-4 text-sm text-muted-foreground">{error.message}</p>
        <div className="mt-8 flex justify-center gap-2">
          <Button onClick={reset}>Try again</Button>
          <Button asChild variant="outline">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
