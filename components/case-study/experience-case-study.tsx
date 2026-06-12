import { Reveal } from "@/components/reveal";
import type { ExperienceCaseStudy as ExperienceCaseStudyData } from "@/lib/site-data";

import {
  AnnotatedFigure,
  CaseStudyHero,
  CaseStudySection,
  DecisionList,
  GlanceSection,
  OutcomeSection,
  ProseBlock
} from "./sections";

type ExperienceCaseStudyProps = {
  project: ExperienceCaseStudyData;
  nextProject?: {
    href: string;
    title: string;
  };
};

/**
 * Narrative: strategy precedes pixels. Business context → audience intent →
 * messaging → information architecture → conversion decisions → visual
 * direction (deliberately late and short) → final experience → outcome.
 */
export function ExperienceCaseStudy({ project, nextProject }: ExperienceCaseStudyProps) {
  return (
    <main id="main-content" tabIndex={-1} className="pb-8 pt-10 sm:pt-14">
      <CaseStudyHero project={project} />
      <GlanceSection glance={project.glance} />

      <CaseStudySection label="Business context">
        <ProseBlock paragraphs={project.businessContext} />
      </CaseStudySection>

      <CaseStudySection label="Audience & intent">
        <ProseBlock paragraphs={project.audience} />
      </CaseStudySection>

      <CaseStudySection label="Strategy & messaging">
        <ProseBlock paragraphs={project.strategy} />
      </CaseStudySection>

      <CaseStudySection label="Information architecture">
        <ProseBlock paragraphs={project.architecture.body} />
        {project.architecture.visual ? (
          <Reveal delay={0.06} className="mt-8">
            <AnnotatedFigure item={project.architecture.visual} />
          </Reveal>
        ) : null}
      </CaseStudySection>

      <CaseStudySection label="Conversion design">
        <DecisionList decisions={project.conversion} />
      </CaseStudySection>

      <CaseStudySection label="Visual direction">
        <ProseBlock paragraphs={[project.visualDirection]} />
      </CaseStudySection>

      <CaseStudySection label="The final experience">
        <div className="grid gap-10">
          {project.finalExperience.map((item, index) => (
            <Reveal key={item.caption} delay={index * 0.06}>
              <AnnotatedFigure item={item} />
            </Reveal>
          ))}
        </div>
      </CaseStudySection>

      <OutcomeSection
        outcome={project.outcome}
        deckUrl={project.deckUrl}
        nextProject={nextProject}
      />
    </main>
  );
}
