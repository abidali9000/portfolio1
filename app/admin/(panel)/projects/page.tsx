import Link from "next/link"
import Image from "next/image"
import { Edit2, Eye, EyeOff, Plus, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PageHeader } from "@/components/admin/page-header"
import { DeleteButton } from "@/components/admin/delete-button"
import { getAllProjects } from "@/lib/cms/queries"
import { deleteProjectAction } from "@/app/admin/(panel)/actions"

export default async function AdminProjectsPage() {
  const projects = await getAllProjects()
  return (
    <div>
      <PageHeader
        title="Projects"
        description="Add, edit, reorder and delete projects. Featured projects appear on the homepage; case studies appear on /case-studies."
        action={
          <Button asChild>
            <Link href="/admin/projects/new">
              <Plus className="mr-2 h-4 w-4" /> New project
            </Link>
          </Button>
        }
      />

      {projects.length === 0 ? (
        <Card>
          <CardContent className="p-10 text-center text-sm text-muted-foreground">
            No projects yet. <Link className="underline" href="/admin/projects/new">Add your first one →</Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {projects.map(p => (
            <Card key={p.id}>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-md border border-border bg-muted">
                  {p.cover_image && (
                    <Image src={p.cover_image} alt="" fill className="object-cover" sizes="96px" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold truncate">{p.title}</h3>
                    {p.featured && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-700 dark:text-amber-300">
                        <Sparkles className="h-3 w-3" /> Featured
                      </span>
                    )}
                    {p.case_study && (
                      <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold text-blue-700 dark:text-blue-300">
                        Case study
                      </span>
                    )}
                    {!p.published && (
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                        Draft
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground truncate">
                    /{p.slug}
                    {p.category && ` · ${p.category}`}
                    {p.year && ` · ${p.year}`}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/projects/${p.slug}`} target="_blank">
                      {p.published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/admin/projects/${p.id}`}>
                      <Edit2 className="h-4 w-4" />
                    </Link>
                  </Button>
                  <DeleteButton
                    size="icon"
                    label=""
                    description={`Permanently delete "${p.title}"?`}
                    action={deleteProjectAction.bind(null, p.id)}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
