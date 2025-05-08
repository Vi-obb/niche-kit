import { MetadataRoute } from "next";
import { blocks } from "@/data/blocks";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://niche-kit.vercel.app";

  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changefrequency: "daily",
      priority: 1,
    },
  ];

  const nicheRoutes = blocks.map((block) => ({
    url: `${baseUrl}/${block.niche}`,
    lastModified: new Date(),
    changefrequency: "weekly",
    priority: 0.8,
  }));

  const categoryRoutes = blocks
    .map((block) => ({
      url: `${baseUrl}/${block.niche}/${block.category}`,
      lastModified: new Date(),
      changefrequency: "weekly",
      priority: 0.8,
    }))
    .filter(
      (route, index, self) =>
        index === self.findIndex((r) => r.url === route.url)
    );

  const blockRoutes = blocks.map((block) => ({
    url: `${baseUrl}/preview/${block.category}/${block.slug}`,
    lastModified: new Date(),
    changefrequency: "monthly",
    priority: 0.5,
  }));

  return [...routes, ...nicheRoutes, ...categoryRoutes, ...blockRoutes];
}
