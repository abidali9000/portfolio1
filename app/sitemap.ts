import type { MetadataRoute } from "next"
import { getProjects, getServices } from "@/lib/cms/queries"
import { env } from "@/lib/env"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = env.siteUrl.replace(/\/$/, "")
  const now = new Date()

  const staticUrls: MetadataRoute.Sitemap = [
    "",
    "/projects",
    "/services",
    "/case-studies",
    "/about",
    "/testimonials",
    "/contact",
    "/privacy",
  ].map(path => ({
    url: `${base}${path || "/"}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }))

  const [projects, services] = await Promise.all([getProjects(), getServices()])

  const projectUrls: MetadataRoute.Sitemap = projects.map(p => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  const serviceUrls: MetadataRoute.Sitemap = services.map(s => ({
    url: `${base}/services/${s.slug}`,
    lastModified: new Date(s.updated_at),
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  return [...staticUrls, ...projectUrls, ...serviceUrls]
}
