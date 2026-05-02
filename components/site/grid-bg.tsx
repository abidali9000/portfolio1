import { cn } from "@/lib/utils"

/**
 * Decorative animated grid + soft gradient blobs. Pure CSS — no client JS.
 */
export function GridBg({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div
        className="absolute inset-0 opacity-[0.18] dark:opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-500/30 blur-3xl animate-blob" />
      <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-cyan-400/30 blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute top-1/3 right-1/4 h-72 w-72 rounded-full bg-fuchsia-400/20 blur-3xl animate-blob animation-delay-4000" />
    </div>
  )
}
