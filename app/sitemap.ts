import type { MetadataRoute } from "next";

import { projectCaseStudies } from "@/lib/site-data";
import { SITE_URL } from "@/lib/seo";
import { localizedPath } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const paths: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
    { path: "/", changeFrequency: "monthly", priority: 1 },
    { path: "/work", changeFrequency: "monthly", priority: 0.9 },
    { path: "/experience", changeFrequency: "monthly", priority: 0.7 },
    { path: "/approach", changeFrequency: "monthly", priority: 0.7 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
    ...projectCaseStudies.map((project) => ({
      path: `/work/${project.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.8
    }))
  ];

  // One entry per locale, each declaring its language alternates (hreflang).
  return paths.flatMap(({ path, changeFrequency, priority }) => {
    const languages = {
      en: `${SITE_URL}${localizedPath(path, "en")}`,
      es: `${SITE_URL}${localizedPath(path, "es")}`
    };

    return (["en", "es"] as const).map((locale) => ({
      url: `${SITE_URL}${localizedPath(path, locale)}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages }
    }));
  });
}
