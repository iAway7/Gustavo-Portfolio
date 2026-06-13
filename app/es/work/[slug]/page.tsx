import type { Metadata } from "next";

import { CaseStudyContent, caseStudyMetadata } from "@/components/case-study/render";
import { projectCaseStudies } from "@/lib/site-data";

type WorkDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projectCaseStudies.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  return caseStudyMetadata(slug, "es");
}

export default async function WorkDetailPageEs({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  return <CaseStudyContent slug={slug} locale="es" />;
}
