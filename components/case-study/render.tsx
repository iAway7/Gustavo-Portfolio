import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EmmviCaseStudy } from "@/components/case-study/emmvi/emmvi-case-study";
import { ExperienceCaseStudy } from "@/components/case-study/experience-case-study";
import { ProductCaseStudy } from "@/components/case-study/product-case-study";
import { breadcrumbJsonLd, caseStudyJsonLd, JsonLd } from "@/components/json-ld";
import { getProjectBySlug } from "@/lib/site-data";
import { DEFAULT_OG_IMAGE, OG_IMAGE_BY_SLUG, pageMeta } from "@/lib/seo";
import { getDict, type Locale, localizedPath, projectMeta } from "@/lib/i18n";

/** Locale-aware metadata for a case study, shared by the EN and ES routes. */
export function caseStudyMetadata(slug: string, locale: Locale): Metadata {
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: locale === "es" ? "Proyectos" : "Work",
      alternates: { canonical: localizedPath("/work", locale) }
    };
  }

  const meta = projectMeta(slug, locale, { title: project.title, summary: project.summary });

  return pageMeta({
    title: meta.title,
    description: meta.summary,
    path: `/work/${slug}`,
    locale,
    image: OG_IMAGE_BY_SLUG[slug] ?? DEFAULT_OG_IMAGE,
    imageAlt: `${meta.title} — case study by Gustavo Polin`,
    ogType: "article"
  });
}

/**
 * Renders a case study at the given locale. Deep body content is English;
 * metadata, structured data, the project title/summary, and in-locale
 * navigation (next project) are localized.
 */
export function CaseStudyContent({ slug, locale }: { slug: string; locale: Locale }) {
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const meta = projectMeta(slug, locale, { title: project.title, summary: project.summary });
  const next = project.nextSlug ? getProjectBySlug(project.nextSlug) : undefined;
  const nextProject = next
    ? {
        href: localizedPath(next.href, locale),
        title: projectMeta(next.slug, locale, { title: next.title, summary: next.summary }).title
      }
    : undefined;

  const nav = getDict(locale).nav;
  const structuredData = [
    caseStudyJsonLd({
      title: meta.title,
      description: meta.summary,
      path: localizedPath(`/work/${slug}`, locale),
      image:
        typeof project.cardVisual === "object" && "src" in project.cardVisual
          ? project.cardVisual.src
          : OG_IMAGE_BY_SLUG[slug] ?? DEFAULT_OG_IMAGE,
      tags: project.tags
    }),
    breadcrumbJsonLd([
      { name: nav.home, path: localizedPath("/", locale) },
      { name: nav.work, path: localizedPath("/work", locale) },
      { name: meta.title, path: localizedPath(`/work/${slug}`, locale) }
    ])
  ];

  const caseStudy =
    project.slug === "emmvi-growth-platform" ? (
      <EmmviCaseStudy project={project} nextProject={nextProject} />
    ) : project.kind === "product" ? (
      <ProductCaseStudy project={project} nextProject={nextProject} />
    ) : (
      <ExperienceCaseStudy project={project} nextProject={nextProject} />
    );

  return (
    <>
      <JsonLd data={structuredData} />
      {caseStudy}
    </>
  );
}
