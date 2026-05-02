import { notFound } from "next/navigation"
import { PageHeader } from "@/components/admin/page-header"
import { ProjectForm } from "@/components/admin/project-form"
import { createServerSupabase } from "@/lib/supabase/server"
import { isSupabaseConfigured } from "@/lib/env"
import { defaultProjects } from "@/lib/cms/defaults"
import { updateProjectAction } from "@/app/admin/(panel)/actions"
import type { Project } from "@/lib/supabase/types"

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  let project: Project | null = null

  if (isSupabaseConfigured) {
    const supabase = await createServerSupabase()
    const { data } = await supabase.from("projects").select("*").eq("id", id).maybeSingle()
    project = (data as Project | null) ?? null
  } else {
    project = defaultProjects.find(p => p.id === id) ?? null
  }

  if (!project) notFound()

  return (
    <div>
      <PageHeader
        title={`Edit · ${project.title}`}
        back={{ href: "/admin/projects", label: "Back to projects" }}
      />
      <ProjectForm
        project={project}
        action={updateProjectAction.bind(null, project.id)}
        submitLabel="Save changes"
      />
    </div>
  )
}
