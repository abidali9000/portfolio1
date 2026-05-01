import type React from "react"
import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"
import { ScrollProgress } from "@/components/site/scroll-progress"
import { getSiteSettings } from "@/lib/cms/queries"

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSiteSettings()

  return (
    <>
      <ScrollProgress />
      <SiteHeader brandName={settings.brand_name} upworkUrl={settings.upwork_url} />
      <main className="pt-16">{children}</main>
      <SiteFooter settings={settings} />
    </>
  )
}
