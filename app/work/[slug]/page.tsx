import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EmmviCaseStudy } from "@/components/case-study/emmvi/emmvi-case-study";
import { ExperienceCaseStudy } from "@/components/case-study/experience-case-study";
import { ProductCaseStudy } from "@/components/case-study/product-case-study";
import { getProjectBySlug, projectCaseStudies } from "@/lib/site-data";

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
      title: "Work"
    };
  }

  return {
    title: project.title,
    description: project.summary
  };
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const next = project.nextSlug ? getProjectBySlug(project.nextSlug) : undefined;
  const nextProject = next ? { href: next.href, title: next.title } : undefined;

  if (project.slug === "emmvi-growth-platform") {
    return <EmmviCaseStudy project={project} nextProject={nextProject} />;
  }

  if (project.kind === "product") {
    return <ProductCaseStudy project={project} nextProject={nextProject} />;
  }

  return <ExperienceCaseStudy project={project} nextProject={nextProject} />;
}
