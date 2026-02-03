import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { partSlugsQuery } from "@/sanity/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fleetparts.com";

  const partSlugs = await client.fetch(partSlugsQuery);

  const partUrls = partSlugs.map((item: { slug: string }) => ({
    url: `${baseUrl}/parts/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...partUrls,
  ];
}
