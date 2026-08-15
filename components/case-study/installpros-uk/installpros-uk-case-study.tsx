import Image from "next/image";
import type { ReactNode } from "react";

import { BrowserFrame } from "@/components/case-study/emmvi/browser-frame";
import { AnnotatedScreen } from "@/components/case-study/installpros-uk/annotated-screen";
import { ComparisonPanel } from "@/components/case-study/installpros-uk/comparison-panel";
import { COPY, SHOT } from "@/components/case-study/installpros-uk/copy";
import { FunnelBars } from "@/components/case-study/installpros-uk/funnel-bars";
import {
  DecisionLedger,
  EvidenceLedger,
  ExplainerColumns,
  HypothesisCards,
  PartLabel,
  PullStatement,
  StatStrip
} from "@/components/case-study/installpros-uk/ledgers";
import {
  ContinuationTable,
  CoreWebVitalsTable,
  LighthouseRow,
  MetricsTable
} from "@/components/case-study/installpros-uk/tables";
import { MagneticLink } from "@/components/magnetic-link";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";
import { localizedPath, type Locale } from "@/lib/i18n";
import type { ProjectCaseStudy } from "@/lib/site-data";

const US_CASE = "/work/installpros-website";

const PARA = "text-[clamp(1rem,1.05vw,1.125rem)] leading-[1.75] text-muted";
const STANDFIRST = "text-[clamp(1.125rem,1.6vw,1.5rem)] leading-[1.5] text-muted";
const H2 =
  "text-[clamp(1.7rem,2.8vw,2.4rem)] font-medium leading-[1.12] tracking-[-0.03em] text-text";
const H3 = "text-[clamp(1.3rem,2vw,1.7rem)] font-medium leading-[1.2] tracking-[-0.03em] text-text";

/** Alternating band. Tinted sections are separated from white ones by a rule. */
function Band({ tinted = false, children }: { tinted?: boolean; children: ReactNode }) {
  return (
    <section
      className={cn(
        "border-t border-line py-16 sm:py-24 lg:py-28",
        tinted ? "bg-panel" : "bg-canvas"
      )}
    >
      <div className="shell">{children}</div>
    </section>
  );
}

type FigureCopy = { label: string; lead: string; body: string; alt: string };

function Figure({
  shot,
  copy
}: {
  shot: { src: string; width: number; height: number };
  copy: FigureCopy;
}) {
  return (
    <Reveal>
      <figure>
        <p className="section-label">{copy.label}</p>
        <div className="editorial-image mt-4 overflow-hidden border border-line bg-canvas">
          <Image
            src={shot.src}
            alt={copy.alt}
            width={shot.width}
            height={shot.height}
            quality={90}
            unoptimized={shot.src.endsWith(".svg")}
            className="h-auto w-full"
            sizes="(min-width: 1408px) 1344px, (min-width: 1024px) calc(100vw - 4rem), 100vw"
          />
        </div>
        <figcaption className="mt-5 max-w-[44rem]">
          <span className="block text-[1.0625rem] font-medium leading-6 text-text">{copy.lead}</span>
          <span className={cn("mt-2 block", PARA)}>{copy.body}</span>
        </figcaption>
      </figure>
    </Reveal>
  );
}

export function InstallProsUkCaseStudy({
  nextProject,
  locale = "en"
}: {
  project: ProjectCaseStudy;
  nextProject?: { href: string; title: string };
  locale?: Locale;
}) {
  const c = COPY[locale];

  return (
    <main id="main-content" tabIndex={-1} className="pb-8 pt-10 sm:pt-16">
      {/* Hero */}
      <section className="pb-12 pt-6 sm:pb-16">
        <div className="shell">
          <Reveal className="max-w-[48rem]">
            <div className="flex flex-wrap gap-2">
              {c.hero.tags.map((tag) => (
                <span key={tag} className="pill">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="mt-6 text-[clamp(2.2rem,4.6vw,3.4rem)] font-medium leading-[1.02] tracking-[-0.045em] text-text">
              {c.hero.title}
            </h1>
            <p className={cn("mt-5", STANDFIRST)}>{c.hero.subtitle}</p>
          </Reveal>

          <Reveal delay={0.06} className="mt-12">
            <dl className="grid gap-y-8 border-y border-line py-8 sm:grid-cols-3">
              {c.hero.meta.map(([label, value], index) => (
                <div
                  key={label}
                  className={cn(
                    "sm:px-8",
                    index > 0 && "sm:border-l sm:border-line",
                    index === 0 && "sm:pl-0"
                  )}
                >
                  <dt className="section-label">{label}</dt>
                  <dd className="mt-3 text-base text-text">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.1} className="mx-auto mt-12 w-full max-w-[78rem]">
            <BrowserFrame
              src={SHOT.heroAfter.src}
              alt={c.hero.alt}
              url="installpros-uk.vercel.app"
              aspect="aspect-[1100/620]"
              sizes="(min-width: 1248px) 78rem, 100vw"
              quality={90}
              priority
            />
          </Reveal>
        </div>
      </section>

      {/* Part 01 */}
      <Band tinted>
        <PartLabel part={c.part01.part} label={c.part01.label} />
        <Reveal className="mt-6 max-w-[44rem]">
          <h2 className={H2}>{c.part01.title}</h2>
        </Reveal>
        <div className="mt-12">
          <StatStrip stats={c.stats} />
        </div>
        <Reveal delay={0.06} className="mt-12 grid max-w-[44rem] gap-6">
          {c.part01.body.map((paragraph) => (
            <p key={paragraph} className={PARA}>
              {paragraph}
            </p>
          ))}
        </Reveal>
      </Band>

      {/* Part 02 */}
      <Band>
        <PartLabel part={c.part02.part} label={c.part02.label} />
        <Reveal className="mt-6 max-w-[44rem]">
          <h2 className={H2}>{c.part02.title}</h2>
          <p className={cn("mt-6", PARA)}>{c.part02.intro}</p>
        </Reveal>
        <div className="mt-10">
          <HypothesisCards items={c.part02.hypotheses} />
        </div>
        <Reveal delay={0.06}>
          <p className="mt-8 text-[clamp(1.25rem,2vw,1.75rem)] leading-[1.35] tracking-[-0.02em] text-text">
            {c.part02.pull}
          </p>
        </Reveal>

        <Reveal className="mt-16 max-w-[44rem]">
          <h3 className={H3}>{c.part02.sourcesTitle}</h3>
        </Reveal>
        <div className="mt-8">
          <EvidenceLedger rows={c.part02.evidence} />
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          <Figure shot={SHOT.dropoff} copy={c.part02.exhibitA} />
          <Figure shot={SHOT.heatmapClicks} copy={c.part02.exhibitB} />
        </div>
      </Band>

      {/* The verdict */}
      <Band tinted>
        <PartLabel part={c.verdict.part} label={c.verdict.label} />
        <Reveal className="mt-6 max-w-[52rem]">
          <h2 className="text-[clamp(2rem,3.6vw,3rem)] font-medium leading-[1.06] tracking-[-0.04em] text-text">
            {c.verdict.title}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="section-label">{c.verdict.funnelTitle}</p>
            <div className="mt-6">
              <FunnelBars steps={c.verdict.funnel} />
            </div>
            <Reveal delay={0.06}>
              <p className={cn("mt-6", PARA)}>{c.verdict.funnelNote}</p>
              <p className={cn("mt-4", PARA)}>{c.verdict.funnelRead}</p>
            </Reveal>
          </div>

          <div>
            <p className="section-label">{c.verdict.continuationTitle}</p>
            <div className="mt-6">
              <ContinuationTable
                caption={c.verdict.continuationCaption}
                columns={c.verdict.continuationColumns}
                rows={c.verdict.continuation}
              />
            </div>
            <Reveal delay={0.06}>
              <p className={cn("mt-6", PARA)}>{c.verdict.continuationNote}</p>
              <p className="mt-6 text-[1.0625rem] font-medium leading-6 text-text">
                {c.verdict.continuationVerdict}
              </p>
            </Reveal>
          </div>
        </div>
      </Band>

      {/* The two annotated screens */}
      <Band>
        <Reveal className="max-w-[44rem]">
          <h2 className={H2}>{c.screens.title}</h2>
          <p className={cn("mt-6", PARA)}>{c.screens.intro}</p>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <AnnotatedScreen
            label={c.screens.labelOne}
            src={SHOT.beforeS1.src}
            alt={c.screens.altOne}
            width={SHOT.beforeS1.width}
            height={SHOT.beforeS1.height}
            pins={c.screens.pinsOne}
            startAt={1}
          />
          <AnnotatedScreen
            label={c.screens.labelTwo}
            src={SHOT.beforeS2.src}
            alt={c.screens.altTwo}
            width={SHOT.beforeS2.width}
            height={SHOT.beforeS2.height}
            pins={c.screens.pinsTwo}
            startAt={4}
          />
        </div>

        <div className="mt-14">
          <PullStatement lead={c.screens.pull} />
        </div>
      </Band>

      {/* Part 03 */}
      <Band tinted>
        <PartLabel part={c.part03.part} label={c.part03.label} />
        <Reveal className="mt-6 max-w-[44rem]">
          <h2 className={H2}>{c.part03.title}</h2>
          <p className={cn("mt-6", PARA)}>{c.part03.intro}</p>
        </Reveal>
        <div className="mt-10">
          <DecisionLedger rows={c.part03.decisions} />
        </div>

        <div className="mt-14 max-w-[52rem]">
          <Figure shot={SHOT.heatmapMap} copy={c.part03.heatmap} />
        </div>
      </Band>

      {/* The four comparisons */}
      <Band>
        <Reveal className="max-w-[44rem]">
          <h2 className={H2}>{c.comparisons.title}</h2>
          <p className={cn("mt-6", PARA)}>{c.comparisons.intro}</p>
        </Reveal>

        {c.comparisons.pairs.map(([before, after], index) => (
          <ComparisonPanel
            key={before.figure}
            className={index === 0 ? "mt-12" : "mt-8"}
            portrait={index === 1}
            before={before}
            after={after}
          />
        ))}

        <Reveal className="mt-12 max-w-[44rem]">
          <p className={PARA}>{c.comparisons.consentIntro}</p>
        </Reveal>
        <div className="mt-10">
          <ExplainerColumns items={c.comparisons.consentExplainers} />
        </div>

        <Reveal className="mt-20 max-w-[44rem]">
          <h2 className={H2}>{c.comparisons.mapTitle}</h2>
          <p className={cn("mt-6", PARA)}>{c.comparisons.mapIntro}</p>
        </Reveal>

        <ComparisonPanel
          className="mt-10"
          before={c.comparisons.mapPair[0]}
          after={c.comparisons.mapPair[1]}
        />
        <div className="mt-12">
          <ExplainerColumns items={c.comparisons.mapExplainers} />
        </div>

        <Reveal className="mt-20 max-w-[44rem]">
          <h2 className={H2}>{c.comparisons.speedTitle}</h2>
        </Reveal>
        <div className="mt-10 max-w-[52rem]">
          <Figure shot={SHOT.afterSpeed} copy={c.comparisons.speed} />
        </div>
      </Band>

      {/* Page speed */}
      <Band tinted>
        <Reveal className="max-w-[48rem]">
          <h2 className={H2}>{c.pagespeed.title}</h2>
          <p className={cn("mt-6", PARA)}>{c.pagespeed.intro}</p>
          <p className="mt-4 text-[0.9375rem] leading-6 text-muted">{c.pagespeed.note}</p>
        </Reveal>

        <div className="mt-12">
          <CoreWebVitalsTable
            caption={c.pagespeed.caption}
            columns={c.pagespeed.columns}
            rows={c.pagespeed.vitals}
          />
        </div>

        <div className="mt-14">
          <LighthouseRow scores={c.pagespeed.lighthouse} />
        </div>

        <ComparisonPanel
          className="mt-14"
          before={c.pagespeed.pair[0]}
          after={c.pagespeed.pair[1]}
        />

        <div className="mt-14">
          <PullStatement lead={c.pagespeed.pull} />
        </div>
      </Band>

      {/* Part 04 */}
      <Band>
        <PartLabel part={c.part04.part} label={c.part04.label} />
        <Reveal className="mt-6 max-w-[44rem]">
          <h2 className={H2}>{c.part04.title}</h2>
          {c.part04.body.map((paragraph, index) => (
            <p key={paragraph} className={cn(index === 0 ? "mt-6" : "mt-4", PARA)}>
              {paragraph}
            </p>
          ))}
        </Reveal>

        <div className="mt-12">
          <MetricsTable
            caption={c.part04.caption}
            columns={c.part04.columns}
            rows={c.part04.metrics}
          />
        </div>

        <div className="mt-14">
          <PullStatement lead={c.part04.pull} />
        </div>
      </Band>

      {/* Closing */}
      <Band>
        <PartLabel part={c.closing.part} label={c.closing.label} />
        <Reveal className="mt-6 max-w-[44rem]">
          <h2 className={H2}>{c.closing.title}</h2>
          <p className={cn("mt-6", PARA)}>{c.closing.body}</p>
        </Reveal>
        <Reveal delay={0.06} className="mt-8">
          <MagneticLink
            href={localizedPath(US_CASE, locale)}
            className="inline-flex text-xl font-medium tracking-[-0.03em] text-text"
          >
            {c.closing.link}
          </MagneticLink>
        </Reveal>

        {nextProject ? (
          <div className="mt-14 border-t border-line pt-10">
            <p className="section-label">{c.closing.nextProject}</p>
            <MagneticLink
              href={nextProject.href}
              className="mt-4 inline-flex text-2xl font-medium tracking-[-0.04em] text-text"
            >
              {nextProject.title}
            </MagneticLink>
          </div>
        ) : null}

        <Reveal delay={0.1}>
          <p className="mt-12 max-w-[44rem] text-sm leading-6 text-muted">{c.closing.footnote}</p>
        </Reveal>
      </Band>
    </main>
  );
}
