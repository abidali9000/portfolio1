import { cn } from "@/lib/utils"

export function Marquee({
  items,
  className,
  reverse = false,
}: {
  items: string[]
  className?: string
  reverse?: boolean
}) {
  if (!items.length) return null
  return (
    <div className={cn("relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]", className)}>
      <div className={cn("flex w-max gap-12", reverse ? "animate-marquee-reverse" : "animate-marquee")}>
        {[...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="text-2xl md:text-3xl font-serif text-muted-foreground/60 whitespace-nowrap"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
