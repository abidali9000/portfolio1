import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <section className="border-b border-border py-32">
      <div className="container mx-auto px-4 text-center max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">404</p>
        <h1 className="mt-3 font-serif text-5xl md:text-7xl font-bold tracking-tight">
          Nothing&apos;s here.
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          That page doesn&apos;t exist (yet). Try one of the routes below.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <Button asChild>
            <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" /> Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/projects">Projects</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Contact</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
