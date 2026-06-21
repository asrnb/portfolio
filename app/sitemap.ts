import type { MetadataRoute } from "next"

const baseUrl = "https://asrnb.vercel.app"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/work", "/work-with-me"]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }))
}
