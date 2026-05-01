import { redirect } from "next/navigation"

// Case-study detail just redirects to the project's page — they share the same record.
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  redirect(`/projects/${slug}`)
}
