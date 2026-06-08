import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MagneticLink } from "@/components/magnetic-link";
import { ProjectVisual } from "@/components/project-visual";
import { Reveal } from "@/components/reveal";
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

  const nextProject = project.nextSlug ? getProjectBySlug(project.nextSlug) : undefined;

  return (
    <main className="pb-8 pt-10 sm:pt-14">
      <section className="section-space">
        <div className="shell">
          <div className="section-rule">
            <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr]">
              <Reveal>
                <p className="section-label">Project</p>
                <h1 className="section-title mt-4">{project.title}</h1>
                <p className="body-copy mt-6 max-w-xl">{project.summary}</p>

                <div className="meta-grid mt-8">
                  <div className="meta-card">
                    <p className="section-label">Role</p>
                    <p className="mt-3 text-sm text-text">{project.role}</p>
                  </div>
                  <div className="meta-card">
                    <p className="section-label">Period</p>
                    <p className="mt-3 text-sm text-text">{project.period}</p>
                  </div>
                  <div className="meta-card">
                    <p className="section-label">Focus</p>
                    <p className="mt-3 text-sm text-text">{project.tags.join(", ")}</p>
                  </div>
                </div>

                {project.deckUrl ? (
                  <div className="mt-8">
                    <MagneticLink href={project.deckUrl} className="link-chip link-chip--secondary">
                      Open supporting PDF
                    </MagneticLink>
                  </div>
                ) : null}
              </Reveal>

              <Reveal delay={0.08}>
                <ProjectVisual visual={project.cardVisual} className="aspect-[16/11]" />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="shell grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <Reveal className="section-rule lg:border-t-0 lg:pt-0">
            <p className="section-label">Overview</p>
          </Reveal>
          <div className="section-rule lg:pt-0">
            <Reveal className="grid gap-5">
              {project.overview.map((item) => (
                <p key={item} className="body-copy max-w-3xl">
                  {item}
                </p>
              ))}
            </Reveal>

            <Reveal delay={0.08} className="mt-8 grid gap-5 md:grid-cols-2">
              <div className="editorial-card p-6">
                <p className="section-label">Contributions</p>
                <div className="mt-4 grid gap-3">
                  {project.contributions.map((item) => (
                    <p key={item} className="text-sm leading-7 text-muted">
                      {item}
                    </p>
                  ))}
                </div>
              </div>

              <div className="editorial-card p-6">
                <p className="section-label">Context</p>
                <div className="mt-4 grid gap-3">
                  {project.context.map((item) => (
                    <p key={item} className="text-sm leading-7 text-muted">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="shell grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <Reveal className="section-rule lg:border-t-0 lg:pt-0">
            <p className="section-label">Process</p>
          </Reveal>

          <div className="section-rule lg:pt-0">
            <div className="grid gap-5">
              {project.processSections.map((section, index) => (
                <Reveal key={section.title} delay={index * 0.06} className="editorial-card p-6 sm:p-8">
                  <p className="text-xl font-medium tracking-[-0.04em] text-text">{section.title}</p>
                  <p className="mt-4 text-sm leading-7 text-muted">{section.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="shell grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <Reveal className="section-rule lg:border-t-0 lg:pt-0">
            <p className="section-label">Selected artifacts</p>
          </Reveal>

          <div className="section-rule lg:pt-0">
            <div className="grid gap-10">
              {project.selectedArtifacts.map((artifact, index) => (
                <Reveal key={artifact.title} delay={index * 0.06}>
                  <div className="grid gap-5">
                    <ProjectVisual visual={artifact.visual} />
                    <div className="max-w-2xl">
                      <p className="text-lg font-medium text-text">{artifact.title}</p>
                      <p className="mt-3 text-sm leading-7 text-muted">{artifact.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="shell grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <Reveal className="section-rule lg:border-t-0 lg:pt-0">
            <p className="section-label">Outcome</p>
          </Reveal>

          <div className="section-rule lg:pt-0">
            <Reveal className="grid gap-5 md:grid-cols-3">
              {project.outcomes.map((item) => (
                <div key={item} className="editorial-card p-6">
                  <p className="text-sm leading-7 text-muted">{item}</p>
                </div>
              ))}
            </Reveal>

            {nextProject ? (
              <Reveal delay={0.08} className="mt-12">
                <div className="section-rule">
                  <p className="section-label">Next project</p>
                  <MagneticLink href={nextProject.href} className="mt-4 inline-flex text-2xl font-medium tracking-[-0.04em] text-text">
                    {nextProject.title}
                  </MagneticLink>
                </div>
              </Reveal>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
