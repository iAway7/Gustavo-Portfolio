import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EmmviCaseStudy } from "@/components/case-study/emmvi/emmvi-case-study";
import { ExperienceCaseStudy } from "@/components/case-study/experience-case-study";
import { ProductCaseStudy } from "@/components/case-study/product-case-study";
import { breadcrumbJsonLd, caseStudyJsonLd, JsonLd } from "@/components/json-ld";
import { getProjectBySlug, projectCaseStudies } from "@/lib/site-data";
import { DEFAULT_OG_IMAGE, OG_IMAGE_BY_SLUG, pageMeta } from "@/lib/seo";

type WorkDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projectCaseStudies.map((project) => ({
    slug: project.slug
  }));
}

export async function generateMetadata({ params }: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Work",
      alternates: { canonical: "/work" }
    };
  }

  return pageMeta({
    title: project.title,
    description: project.summary,
    path: `/work/${project.slug}`,
    image: OG_IMAGE_BY_SLUG[project.slug] ?? DEFAULT_OG_IMAGE,
    imageAlt: `${project.title} — case study by Gustavo Polin`,
    ogType: "article"
  });
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const next = project.nextSlug ? getProjectBySlug(project.nextSlug) : undefined;
  const nextProject = next ? { href: next.href, title: next.title } : undefined;

  const structuredData = [
    caseStudyJsonLd({
      title: project.title,
      description: project.summary,
      path: `/work/${project.slug}`,
      image:
        typeof project.cardVisual === "object" && "src" in project.cardVisual
          ? project.cardVisual.src
          : OG_IMAGE_BY_SLUG[project.slug] ?? DEFAULT_OG_IMAGE,
      tags: project.tags
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Work", path: "/work" },
      { name: project.title, path: `/work/${project.slug}` }
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
