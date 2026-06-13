import type { MetadataRoute } from "next";

import { projectCaseStudies } from "@/lib/site-data";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/work`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/experience`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/approach`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: "yearly", priority: 0.6 }
  ];

  const caseStudyRoutes: MetadataRoute.Sitemap = projectCaseStudies.map((project) => ({
    url: `${SITE_URL}/work/${project.slug}`,
    lastModified,
    changeFrequency: "yearly",
    priority: 0.8
  }));

  return [...staticRoutes, ...caseStudyRoutes];
}
