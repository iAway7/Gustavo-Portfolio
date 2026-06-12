import { Reveal } from "@/components/reveal";
import type { ProductCaseStudy as ProductCaseStudyData } from "@/lib/site-data";

import {
  AnnotatedFigure,
  CaseStudyHero,
  CaseStudySection,
  ConstraintGrid,
  DecisionList,
  GlanceSection,
  OutcomeSection,
  ProseBlock
} from "./sections";

type ProductCaseStudyProps = {
  project: ProductCaseStudyData;
  nextProject?: {
    href: string;
    title: string;
  };
};

/**
 * Narrative: business context → operating reality → constraints →
 * decisions under those constraints → the system that scales them → outcome.
 */
export function ProductCaseStudy({ project, nextProject }: ProductCaseStudyProps) {
  return (
    <main className="pb-8 pt-10 sm:pt-14">
      <CaseStudyHero project={project} />
      <GlanceSection glance={project.glance} />

      <CaseStudySection label="Context">
        <ProseBlock paragraphs={project.context} />
      </CaseStudySection>

      <CaseStudySection label={project.usersLabel ?? "Users & operating conditions"}>
        <ProseBlock paragraphs={project.operatingConditions} />
        {project.usersVisual ? (
          <Reveal delay={0.06} className="mt-8">
            <AnnotatedFigure item={project.usersVisual} />
          </Reveal>
        ) : null}
      </CaseStudySection>

      <CaseStudySection label="Constraints">
        <ConstraintGrid constraints={project.constraints} />
      </CaseStudySection>

      <CaseStudySection label="Key decisions">
        <DecisionList decisions={project.decisions} />
      </CaseStudySection>

      <CaseStudySection label="System & workflows">
        <ProseBlock paragraphs={project.system.body} />
        {project.system.visual ? (
          <Reveal delay={0.06} className="mt-8">
            <AnnotatedFigure item={project.system.visual} />
          </Reveal>
        ) : null}
      </CaseStudySection>

      <OutcomeSection
        outcome={project.outcome}
        deckUrl={project.deckUrl}
        nextProject={nextProject}
      />
    </main>
  );
}
