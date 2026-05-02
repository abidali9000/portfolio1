import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export function PageHeader({
  title,
  description,
  back,
  action,
}: {
  title: string
  description?: string
  back?: { href: string; label: string }
  action?: React.ReactNode
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        {back && (
          <Link
            href={back.href}
            className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground mb-3"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> {back.label}
          </Link>
        )}
        <h1 className="font-serif text-2xl md:text-3xl font-bold leading-tight">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground max-w-xl">{description}</p>
        )}
      </div>
      {action}
    </div>
  )
}
