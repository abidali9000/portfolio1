import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/admin/page-header"
import { ProjectsList } from "@/components/admin/projects-list"
import { getAllProjects } from "@/lib/cms/queries"

export default async function AdminProjectsPage() {
  const projects = await getAllProjects()
  return (
    <div>
      <PageHeader
        title="Projects"
        description="Search, reorder, duplicate or edit. Toggle published / featured directly from the list."
        action={
          <Button asChild>
            <Link href="/admin/projects/new">
              <Plus className="mr-2 h-4 w-4" /> New project
            </Link>
          </Button>
        }
      />
      <ProjectsList initial={projects} />
    </div>
  )
}
