import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Project } from "@/lib/supabase/types"

export function ProjectCard({
  project,
  className,
  size = "default",
}: {
  project: Project
  className?: string
  size?: "default" | "large"
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group relative block overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-foreground/40 hover:shadow-2xl",
        className,
      )}
    >
      {project.cover_image && (
        <div className={cn("relative w-full overflow-hidden", size === "large" ? "aspect-[16/10]" : "aspect-[16/11]")}>
          <Image
            src={project.cover_image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/0 to-background/0" />
          {project.case_study && (
            <span className="absolute top-4 left-4 rounded-full bg-background/90 backdrop-blur px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider border border-border">
              Case study
            </span>
          )}
          <span className="absolute top-4 right-4 grid h-9 w-9 place-items-center rounded-full bg-background/90 backdrop-blur border border-border opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0 translate-x-2">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      )}
      <div className="space-y-3 p-6">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
          {project.category && <span>{project.category}</span>}
          {project.year && project.category && <span>·</span>}
          {project.year && <span>{project.year}</span>}
        </div>
        <h3 className={cn("font-serif font-bold leading-tight", size === "large" ? "text-2xl md:text-3xl" : "text-xl")}>
          {project.title}
        </h3>
        {project.tagline && (
          <p className="text-sm text-muted-foreground line-clamp-2">{project.tagline}</p>
        )}
        {project.tech_stack && project.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.tech_stack.slice(0, 5).map(t => (
              <span
                key={t}
                className="rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
