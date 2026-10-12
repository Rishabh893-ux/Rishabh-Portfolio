import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteUrl } from "@/lib/siteUrl";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl;
  return [
    { url: base, lastModified: new Date() },
    ...projects.map((p) => ({
      url: `${base}/project/${p.slug}`,
      lastModified: new Date(),
    })),
    { url: `${base}/blog`, lastModified: new Date() },
    ...getAllPosts().map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.date) })),
  ];
}
