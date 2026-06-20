import type { MetadataRoute } from "next"

const baseUrl = "https://aprilsuarnaba.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/work", "/work-with-me"]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }))
}
