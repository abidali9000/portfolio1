import { PageHeader } from "@/components/admin/page-header"
import { ProjectForm } from "@/components/admin/project-form"
import { createProjectAction } from "@/app/admin/(panel)/actions"

export default function NewProjectPage() {
  return (
    <div>
      <PageHeader
        title="Add a new project"
        back={{ href: "/admin/projects", label: "Back to projects" }}
      />
      <ProjectForm action={createProjectAction} submitLabel="Create project" />
    </div>
  )
}
