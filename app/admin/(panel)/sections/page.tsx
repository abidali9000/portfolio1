import { PageHeader } from "@/components/admin/page-header"
import { SectionsManager } from "@/components/admin/sections-manager"
import { getAllSections } from "@/lib/cms/queries"

export default async function AdminSectionsPage() {
  const sections = await getAllSections("home")
  return (
    <div>
      <PageHeader
        title="Homepage builder"
        description="The homepage is a stack of typed sections. Reorder them with the arrows, toggle them on/off, edit content, or add new ones."
      />
      <SectionsManager initial={sections} />
    </div>
  )
}
