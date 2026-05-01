export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-foreground/30 border-t-foreground" />
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Loading…</p>
      </div>
    </div>
  )
}
