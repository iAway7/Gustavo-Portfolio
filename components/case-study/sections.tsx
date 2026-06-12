import type { ReactNode } from "react";

import { CaseStudyHeroCarousel } from "@/components/case-study/hero-carousel";
import { MagneticLink } from "@/components/magnetic-link";
import { ProjectVisual } from "@/components/project-visual";
import { Reveal } from "@/components/reveal";
import type {
  AnnotatedVisual,
  CaseStudyGlance,
  CaseStudyOutcome,
  DecisionBlock,
  NamedConstraint,
  ProjectCaseStudy
} from "@/lib/site-data";

type NextProjectLink = {
  href: string;
  title: string;
};

/**
 * Two-column section shell: sticky label rail on the left, content on the right.
 * Every narrative section in both case study types renders through this.
 */
export function CaseStudySection({
  label,
  children
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <section className="section-space pt-0">
      <div className="shell grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
        <Reveal className="section-rule lg:border-t-0 lg:pt-0">
          <h2 className="section-label lg:sticky lg:top-28">{label}</h2>
        </Reveal>
        <div className="section-rule lg:pt-0">{children}</div>
      </div>
    </section>
  );
}

export function CaseStudyHero({ project }: { project: ProjectCaseStudy }) {
  return (
    <section className="section-space">
      <div className="shell">
        <div className="section-rule">
          <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr]">
            <Reveal>
              <div className="flex flex-wrap items-center gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="pill">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="section-title mt-5">{project.title}</h1>
              <p className="body-copy mt-6 max-w-xl">{project.summary}</p>

              <div className="meta-grid mt-8">
                <div className="meta-card">
                  <p className="section-label">Role</p>
                  <p className="mt-3 text-base text-text">{project.role}</p>
                </div>
                <div className="meta-card">
                  <p className="section-label">Period</p>
                  <p className="mt-3 text-base text-text">{project.period}</p>
                </div>
                <div className="meta-card">
                  <p className="section-label">Scope</p>
                  <p className="mt-3 text-base text-text">{project.scope}</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              {project.heroSlides && project.heroSlides.length > 0 ? (
                <CaseStudyHeroCarousel slides={project.heroSlides} title={project.title} />
              ) : (
                <ProjectVisual visual={project.cardVisual} className="aspect-[16/11]" />
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 30-second read: the whole story in three blocks before any scrolling.
 */
export function GlanceSection({ glance }: { glance: CaseStudyGlance }) {
  const items = [
    { label: "The challenge", body: glance.challenge },
    { label: "My role", body: glance.role },
    { label: "The outcome", body: glance.outcome }
  ];

  return (
    <section className="section-space pt-0">
      <div className="shell">
        <Reveal className="grid gap-5 md:grid-cols-3">
          <h2 className="sr-only">Project at a glance</h2>
          {items.map((item) => (
            <div key={item.label} className="editorial-card p-6">
              <p className="section-label">{item.label}</p>
              <p className="mt-4 text-base leading-7 text-muted">{item.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function ProseBlock({ paragraphs }: { paragraphs: string[] }) {
  return (
    <Reveal className="grid gap-5">
      {paragraphs.map((item) => (
        <p key={item} className="body-copy max-w-3xl">
          {item}
        </p>
      ))}
    </Reveal>
  );
}

export function ConstraintGrid({ constraints }: { constraints: NamedConstraint[] }) {
  return (
    <Reveal className="grid gap-5 md:grid-cols-3">
      {constraints.map((constraint) => (
        <div key={constraint.label} className="editorial-card p-6">
          <p className="section-label">{constraint.label}</p>
          <p className="mt-4 text-base leading-7 text-muted">{constraint.body}</p>
        </div>
      ))}
    </Reveal>
  );
}

export function AnnotatedFigure({ item }: { item: AnnotatedVisual }) {
  return (
    <figure className="grid gap-4">
      <ProjectVisual visual={item.visual} fit="natural" />
      <figcaption className="max-w-2xl text-base leading-7 text-muted">
        {item.caption}
      </figcaption>
    </figure>
  );
}

/**
 * The core seniority unit: question → decision → rationale → trade-off,
 * with the supporting screen as evidence rather than decoration.
 */
export function DecisionList({ decisions }: { decisions: DecisionBlock[] }) {
  return (
    <div className="grid gap-10">
      {decisions.map((block, index) => (
        <Reveal key={block.question} delay={index * 0.05}>
          <article className="editorial-card p-6 sm:p-8">
            <p className="section-label">
              Decision {String(index + 1).padStart(2, "0")} · {block.question}
            </p>
            <p className="mt-4 text-xl font-medium tracking-[-0.04em] text-text">
              {block.decision}
            </p>
            <p className="mt-4 text-base leading-7 text-muted">{block.rationale}</p>
            <p className="mt-4 text-base leading-7 text-muted">
              <span className="font-medium text-text">Trade-off accepted: </span>
              {block.tradeoff}
            </p>
            {block.visual ? (
              <div className="mt-8">
                <AnnotatedFigure item={block.visual} />
              </div>
            ) : null}
          </article>
        </Reveal>
      ))}
    </div>
  );
}

export function OutcomeSection({
  outcome,
  deckUrl,
  nextProject
}: {
  outcome: CaseStudyOutcome;
  deckUrl?: string;
  nextProject?: NextProjectLink;
}) {
  return (
    <CaseStudySection label="Outcome & reflection">
      <Reveal className="grid gap-5 md:grid-cols-3">
        {outcome.results.map((item) => (
          <div key={item} className="editorial-card p-6">
            <p className="text-base leading-7 text-muted">{item}</p>
          </div>
        ))}
      </Reveal>

      <Reveal delay={0.06} className="mt-10">
        <p className="section-label">Reflection</p>
        <p className="body-copy mt-4 max-w-3xl">{outcome.reflection}</p>
      </Reveal>

      <Reveal delay={0.1} className="mt-12">
        <div className="section-rule grid gap-8">
          {deckUrl ? (
            <a
              href={deckUrl}
              className="inline-flex text-base text-muted underline decoration-line underline-offset-4 transition-colors duration-200 hover:text-text"
            >
              View Full Case Study (PDF) →
            </a>
          ) : null}

          {nextProject ? (
            <div>
              <p className="section-label">Next project</p>
              <MagneticLink
                href={nextProject.href}
                className="mt-4 inline-flex text-2xl font-medium tracking-[-0.04em] text-text"
              >
                {nextProject.title}
              </MagneticLink>
            </div>
          ) : null}
        </div>
      </Reveal>
    </CaseStudySection>
  );
}
