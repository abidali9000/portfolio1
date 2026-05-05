import Image from "next/image"
import { PageHeader } from "@/components/admin/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { DeleteButton } from "@/components/admin/delete-button"
import { MediaUploader } from "@/components/admin/media-uploader"
import { CopyableUrl } from "@/components/admin/copyable-url"
import { createServerSupabase } from "@/lib/supabase/server"
import { isSupabaseConfigured } from "@/lib/env"
import { deleteMediaAction } from "@/app/admin/(panel)/actions"
import type { MediaAsset } from "@/lib/supabase/types"

async function fetchMedia(): Promise<MediaAsset[]> {
  if (!isSupabaseConfigured) return []
  const supabase = await createServerSupabase()
  const { data, error } = await supabase
    .from("media")
    .select("*")
    .order("created_at", { ascending: false })
  if (error) throw error
  return (data ?? []) as MediaAsset[]
}

export default async function AdminMediaPage() {
  const media = await fetchMedia()
  return (
    <div>
      <PageHeader
        title="Media library"
        description="Upload images and files. Copy any URL into a project, service, testimonial or section."
      />

      <MediaUploader />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {media.map(m => (
          <Card key={m.id} className="overflow-hidden">
            <div className="relative aspect-video bg-muted">
              {m.mime_type?.startsWith("image/") ? (
                <Image src={m.url} alt={m.alt ?? m.filename} fill className="object-cover" sizes="320px" />
              ) : (
                <div className="grid h-full place-items-center text-xs text-muted-foreground">{m.mime_type}</div>
              )}
            </div>
            <CardContent className="space-y-2 p-3">
              <div className="text-xs font-medium truncate">{m.filename}</div>
              <CopyableUrl url={m.url} />
              <div className="flex justify-end">
                <DeleteButton size="icon" label="" action={deleteMediaAction.bind(null, m.id, m.path)} />
              </div>
            </CardContent>
          </Card>
        ))}
        {media.length === 0 && (
          <div className="col-span-full text-sm text-muted-foreground text-center py-8">No uploads yet.</div>
        )}
      </div>
    </div>
  )
}
