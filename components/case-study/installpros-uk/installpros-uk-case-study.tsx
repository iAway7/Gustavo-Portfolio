import Image from "next/image";
import type { ReactNode } from "react";

import { BrowserFrame } from "@/components/case-study/emmvi/browser-frame";
import { AnnotatedScreen } from "@/components/case-study/installpros-uk/annotated-screen";
import { ComparisonPanel } from "@/components/case-study/installpros-uk/comparison-panel";
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

const IMG = "/projects/installpros-uk";
const LOGO = "/logos/tools";
const US_CASE = "/work/installpros-website";

// Copy is final and English-only for now; the Spanish pass comes later, so both
// locales render this text. Only the in-locale links vary.
const SHOT = {
  heroAfter: { src: `${IMG}/after-desktop-westminster.webp`, width: 1100, height: 709 },
  dropoff: { src: `${IMG}/source-form-dropoff.webp`, width: 1200, height: 511 },
  heatmapClicks: { src: `${IMG}/source-heatmap-iframe.webp`, width: 1100, height: 801 },
  beforeS1: { src: `${IMG}/before-desktop-postcode.webp`, width: 1100, height: 709 },
  beforeS2: { src: `${IMG}/before-desktop-phone.webp`, width: 1100, height: 709 },
  heatmapMap: { src: `${IMG}/source-heatmap-coverage-map.webp`, width: 1000, height: 703 },
  beforePaperform: { src: `${IMG}/before-desktop-phone.webp`, width: 1100, height: 709 },
  beforeMobile: { src: `${IMG}/before-mobile.webp`, width: 700, height: 1199 },
  afterMobile: { src: `${IMG}/after-mobile.webp`, width: 700, height: 1199 },
  beforeConsent: { src: `${IMG}/before-consent.webp`, width: 1142, height: 436 },
  afterFinalStep: { src: `${IMG}/after-final-step.webp`, width: 1004, height: 383 },
  beforeMap: { src: `${IMG}/before-map.webp`, width: 2600, height: 1675 },
  afterCoverage: { src: `${IMG}/after-coverage-section.webp`, width: 2472, height: 1592 },
  afterSpeed: { src: `${IMG}/after-speed-comparison.svg`, width: 1140, height: 515 },
  psiBefore: { src: `${IMG}/psi-before-mobile.webp`, width: 1400, height: 1089 },
  psiAfter: { src: `${IMG}/psi-after-mobile.webp`, width: 1400, height: 1102 }
} as const;

const HERO = {
  tags: ["Conversion", "Funnel Redesign", "Analytics"],
  title: "A CRO audit and rebuild of the InstallPros U.K. landing page.",
  subtitle:
    "A Starlink installer buying almost all of its traffic, with no way of seeing where it lost it. Two out of three visits never typed a thing.",
  meta: [
    ["Role", "Product Designer"],
    ["Timeline", "2026"],
    ["Scope", "Funnel audit, UX/UI, front-end & analytics"]
  ] as [string, string][]
};

const STATS = [
  { value: "£19,000", caption: "monthly Google Ads spend" },
  { value: "87%", caption: "of traffic bought, 5% organic" },
  { value: "80%", caption: "of visits arriving on mobile" },
  { value: "61 → 1", caption: "pages sharing one thank-you page" }
];

const HYPOTHESES = [
  {
    kicker: "Hypothesis A",
    statement: "They start the form and give up partway through.",
    body: "A form problem. Fixed by shortening it, splitting steps, rewriting fields."
  },
  {
    kicker: "Hypothesis B",
    statement: "They never start it at all.",
    body: "A page problem. Fixed by what the first screen promises and asks for."
  }
];

const EVIDENCE = [
  {
    logo: { src: `${LOGO}/hotjar.svg`, alt: "Hotjar", width: 77, height: 20 },
    label: "Heatmaps & scroll maps",
    finding:
      "Mobile scroll died at 25% of the page. On desktop the two most-clicked elements were menu entries — no conversion button made the top three."
  },
  {
    logo: { src: `${LOGO}/paperform.svg`, alt: "Paperform", width: 95, height: 24 },
    label: "Form analytics",
    finding:
      "Drop-off by question: 76% postcode, 16% phone, 5% name, 2% email. The only source that let me rebuild continuation field by field."
  },
  {
    logo: { src: `${LOGO}/ga4.svg`, alt: "Google Analytics 4", width: 124, height: 24 },
    label: "Web analytics",
    finding:
      "Mobile converted worse than desktop, 18% against 24%. The easy read was “fix the form on mobile”."
  },
  {
    label: "The cross-check · where it broke down",
    finding:
      "But mobile completed better than desktop once started. The gap wasn't inside the form. It was in getting anyone to touch it.",
    turn: true
  }
];

const FUNNEL = [
  { label: "Landing page visits", value: "100%", width: 100 },
  { label: "Start the form", value: "33%", width: 33, highlight: true },
  { label: "Complete it", value: "32%", width: 32 },
  { label: "Qualified lead", value: "~48%", width: 48 }
];

const CONTINUATION = [
  { step: "Postcode", reached: "~12,300", percent: "49%", width: 49, highlight: true },
  { step: "Phone", reached: "~6,000", percent: "78%", width: 78 },
  { step: "Name", reached: "~4,600", percent: "91%", width: 91 },
  { step: "Email", reached: "~4,200", percent: "96%", width: 96 }
];

const SCREEN_ONE_PINS = [
  { x: 8, y: 51, note: "“This allows us to check availability in your area.” A promise of a check." },
  { x: 80, y: 65, note: "A thin line over a photo: no box, no format example." },
  { x: 63, y: 80, note: "An unlabelled arrow. Nothing says what pressing it does." }
];

const SCREEN_TWO_PINS = [
  {
    x: 7,
    y: 54,
    note: "The answer takes the slot where “Postcode” used to be — fixed text, identical for every postcode."
  },
  { x: 80, y: 65, note: "The phone number, asked for in the same breath." },
  { x: 11, y: 76, note: "The warning that they'll call you, a second time." }
];

const DECISIONS = [
  {
    title: "Separate the answer from the request",
    body: "Postcode, then the answer with the real district name as a screen of its own, then the contact details.",
    emphasis: "Half the people who gave a postcode went no further."
  },
  {
    title: "Change what the button promises",
    body: "From “Get a quote” to “Check if we cover your area”. A quote sounds like a sales call; a check is a query.",
    emphasis: "It lowers the cost of the first click."
  },
  {
    title: "One call-to-action label",
    body: "Four different texts for the same button.",
    emphasis: "Four labels split the clicks between options that are the same thing."
  },
  {
    title: "Minimal navigation on the landing",
    body: "Logo and phone number; the 40-plus-link menu is gone.",
    emphasis:
      "Two menu entries were among the five most-clicked elements. On mobile the menu beat the primary button."
  },
  {
    title: "Trust signals above the fold",
    body: "Ratings and press credentials moved into the first two screenfuls on mobile.",
    emphasis:
      "The bottom 75% of the page was never seen on mobile, and the proof lived down there — invisible to 80% of the traffic."
  },
  {
    title: "Consent, unbundled",
    body: "One mandatory pre-ticked box covering contact and terms at once.",
    emphasis:
      "Consent that is pre-ticked, bundled and compulsory is not valid consent — and the call it asked about needed none."
  }
];

const CONSENT_EXPLAINERS = [
  {
    heading: "Bundled",
    body: "Permission to contact and acceptance of the terms rode on the same tick. Consent has to be separate and granular; packaged with other terms it isn't valid."
  },
  {
    heading: "Mandatory",
    body: "You couldn't continue without it. Consent must be freely given, so making it a condition of the service invalidates it — friction and legal weakness at once."
  },
  {
    heading: "Unnecessary",
    body: "A call about this enquiry needs no consent — the user requests it by submitting their number. Meanwhile future marketing, the one thing that does need an opt-in, was never separated out."
  }
];

const MAP_EXPLAINERS = [
  {
    heading: "The cities aren't decorative",
    body: "They come from analytics and the ads account: the places the traffic actually arrives from, not a spread of pins to make the country look covered."
  },
  {
    heading: "London is highlighted on load",
    body: "Most of the leads come from London, so the default state answers the question the majority of visitors arrive with before they touch anything."
  },
  {
    heading: "Coverage was never the doubt",
    body: "Satellite reaches everywhere. What the map has to prove isn't reach, it's that somebody works near you — which is what a named city does."
  }
];

const VITALS = [
  {
    metric: "Largest Contentful Paint",
    gloss: "the offer finishes rendering",
    before: "17.6 s",
    after: "3.3 s"
  },
  {
    metric: "First Contentful Paint",
    gloss: "anything appears at all",
    before: "4.1 s",
    after: "1.1 s"
  },
  { metric: "Speed Index", gloss: "how fast the page fills in", before: "10.1 s", after: "2.4 s" },
  { metric: "Total Blocking Time", gloss: "taps that do nothing", before: "380 ms", after: "10 ms" },
  {
    metric: "Cumulative Layout Shift",
    gloss: "things moving under your thumb",
    before: "0.209",
    after: "0"
  }
];

const LIGHTHOUSE = [
  { label: "Performance", before: "39", after: "92" },
  { label: "Accessibility", before: "92", after: "100" },
  { label: "Best practices", before: "73", after: "100" },
  { label: "SEO", before: "85", after: "100" }
];

const METRICS = [
  {
    metric: "Form starts",
    now: "33%",
    lever: "Minimal header, unified label, trust above the fold"
  },
  {
    metric: "First-field continuation",
    now: "49%",
    lever: "Expectation microcopy and a credible coverage confirmation"
  },
  {
    metric: "Exits through the menu",
    now: "Top 5",
    lever: "Should drop out of the click ranking entirely"
  },
  {
    metric: "Attribution reliability",
    now: "61 → 1",
    lever: "One thank-you page per service, instead of 61 pages sharing one"
  }
];

const PARA = "text-[clamp(1rem,1.05vw,1.125rem)] leading-[1.75] text-muted";
const STANDFIRST = "text-[clamp(1.125rem,1.6vw,1.5rem)] leading-[1.5] text-muted";
const H2 =
  "text-[clamp(1.7rem,2.8vw,2.4rem)] font-medium leading-[1.12] tracking-[-0.03em] text-text";
const H3 = "text-[clamp(1.3rem,2vw,1.7rem)] font-medium leading-[1.2] tracking-[-0.03em] text-text";

/** Alternating band. Tinted sections are separated from white ones by a rule. */
function Band({ tinted = false, children }: { tinted?: boolean; children: ReactNode }) {
  return (
    <section
      className={cn("border-t border-line py-16 sm:py-24 lg:py-28", tinted ? "bg-panel" : "bg-canvas")}
    >
      <div className="shell">{children}</div>
    </section>
  );
}

function Figure({
  shot,
  label,
  lead,
  body,
  alt
}: {
  shot: { src: string; width: number; height: number };
  label: string;
  lead: string;
  body: string;
  alt: string;
}) {
  return (
    <Reveal>
      <figure>
        <p className="section-label">{label}</p>
        <div className="editorial-image mt-4 overflow-hidden border border-line bg-canvas">
          <Image
            src={shot.src}
            alt={alt}
            width={shot.width}
            height={shot.height}
            quality={90}
            unoptimized={shot.src.endsWith(".svg")}
            className="h-auto w-full"
            sizes="(min-width: 1408px) 1344px, (min-width: 1024px) calc(100vw - 4rem), 100vw"
          />
        </div>
        <figcaption className="mt-5 max-w-[44rem]">
          <span className="block text-[1.0625rem] font-medium leading-6 text-text">{lead}</span>
          <span className={cn("mt-2 block", PARA)}>{body}</span>
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
  return (
    <main id="main-content" tabIndex={-1} className="pb-8 pt-10 sm:pt-16">
      {/* Hero */}
      <section className="pb-12 pt-6 sm:pb-16">
        <div className="shell">
          <Reveal className="max-w-[48rem]">
            <div className="flex flex-wrap gap-2">
              {HERO.tags.map((tag) => (
                <span key={tag} className="pill">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="mt-6 text-[clamp(2.2rem,4.6vw,3.4rem)] font-medium leading-[1.02] tracking-[-0.045em] text-text">
              {HERO.title}
            </h1>
            <p className={cn("mt-5", STANDFIRST)}>{HERO.subtitle}</p>
          </Reveal>

          <Reveal delay={0.06} className="mt-12">
            <dl className="grid gap-y-8 border-y border-line py-8 sm:grid-cols-3">
              {HERO.meta.map(([label, value], index) => (
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
              alt="The landing I built: a postcode lookup returning the real district name, Westminster"
              url="installpros-uk.vercel.app"
              aspect="aspect-[1100/620]"
              sizes="(min-width: 1248px) 78rem, 100vw"
              quality={90}
              priority
            />
          </Reveal>
        </div>
      </section>

      {/* Part 01 · Where the money went */}
      <Band tinted>
        <PartLabel part="Part 01" label="Where the money went" />
        <Reveal className="mt-6 max-w-[44rem]">
          <h2 className={H2}>A business buying all of its traffic, and unable to see it.</h2>
        </Reveal>
        <div className="mt-12">
          <StatStrip stats={STATS} />
        </div>
        <Reveal delay={0.06} className="mt-12 grid max-w-[44rem] gap-6">
          <p className={PARA}>
            The ads worked: strong click-through, efficient cost per click. The problem started
            after the click, and nobody could say where — one thank-you page served 61 unrelated
            pages, so every conversion figure in the account was inflated.
          </p>
          <p className={PARA}>
            Worse, the primary conversion was a WhatsApp click, so automated bidding went hunting
            for people who click WhatsApp links. It believed it was paying £5.61 a conversion while
            a real installation lead cost £10 to £22.
          </p>
        </Reveal>
      </Band>

      {/* Part 02 · The diagnosis */}
      <Band>
        <PartLabel part="Part 02" label="The diagnosis" />
        <Reveal className="mt-6 max-w-[44rem]">
          <h2 className={H2}>Two problems that are easy to mistake for one.</h2>
          <p className={cn("mt-6", PARA)}>
            A funnel that under-delivers fails in two unrelated ways. The remedies have nothing in
            common, so the first job was to find out which one this was.
          </p>
        </Reveal>
        <div className="mt-10">
          <HypothesisCards items={HYPOTHESES} />
        </div>
        <Reveal delay={0.06}>
          <p className="mt-8 text-[clamp(1.25rem,2vw,1.75rem)] leading-[1.35] tracking-[-0.02em] text-text">
            Every number the client held pointed at A.
          </p>
        </Reveal>

        <Reveal className="mt-16 max-w-[44rem]">
          <h3 className={H3}>Four sources, and the one contradiction between them</h3>
        </Reveal>
        <div className="mt-8">
          <EvidenceLedger rows={EVIDENCE} />
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          <Figure
            shot={SHOT.dropoff}
            label="Exhibit A · drop-off by question"
            lead="The last question answered before someone stopped, over 30 days."
            body="Note the second question's own title: “Starlink is Available! What's your Phone Number?”"
            alt="Form drop-off report: 76% postcode, 16% phone, 5% name, 2% email"
          />
          <Figure
            shot={SHOT.heatmapClicks}
            label="Exhibit B · click heatmap"
            lead="The most-clicked element is a menu entry, 5.73%."
            body="Where the form should be: “iframe: this zone can't be recorded”. Almost 1 in 5 cursor points fall there — the area holding the most attention is the only one that can't be measured."
            alt="Click heatmap: the menu concentrates the clicks and the form area appears as an unrecordable zone"
          />
        </div>
      </Band>

      {/* The verdict */}
      <Band tinted>
        <PartLabel part="The verdict" label="Hypothesis B" />
        <Reveal className="mt-6 max-w-[52rem]">
          <h2 className="text-[clamp(2rem,3.6vw,3rem)] font-medium leading-[1.06] tracking-[-0.04em] text-text">
            The leak was at the door, not inside the room.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="section-label">The funnel, end to end</p>
            <div className="mt-6">
              <FunnelBars steps={FUNNEL} />
            </div>
            <Reveal delay={0.06}>
              <p className={cn("mt-6", PARA)}>
                Each bar is against the previous step. End to end, roughly 5 visits in every 100
                become a qualified lead.
              </p>
              <p className={cn("mt-4", PARA)}>
                Completion, 32%, could be better. But two in three people leave before typing a
                character — and that is the step nobody was looking at. On mobile, where 80% of them
                arrive, the offer took 17.6 seconds to finish rendering.
              </p>
            </Reveal>
          </div>

          <div>
            <p className="section-label">Continuation, step by step</p>
            <div className="mt-6">
              <ContinuationTable
                caption="Continuation rate by form step: how many people reach each field and how many carry on from it."
                columns={["Step", "Reached", "Continued"]}
                rows={CONTINUATION}
              />
            </div>
            <Reveal delay={0.06}>
              <p className={cn("mt-6", PARA)}>
                The drop-off report put 76% of abandonment at the postcode, but abandonment always
                over-indexes the first step — everybody passes through it. Continuation compares
                like with like: of those who reach a field, how many go on.
              </p>
              <p className="mt-6 text-[1.0625rem] font-medium leading-6 text-text">
                One step loses half the people. The three after it keep nearly everyone.
              </p>
            </Reveal>
          </div>
        </div>
      </Band>

      {/* The two annotated screens */}
      <Band>
        <Reveal className="max-w-[44rem]">
          <h2 className={H2}>The two screens that explain it</h2>
          <p className={cn("mt-6", PARA)}>
            {`The form showed one question per screen, and the tool records the last question
            answered — so that 49% covers two moments the data can't separate: abandoning while
            typing the postcode, and handing it over only to leave on the next screen. Both are
            explained by the same pair of screens.`}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <AnnotatedScreen
            label="Before · screen 1 · postcode"
            src={SHOT.beforeS1.src}
            alt="First screen of the original form: a postcode field with an unlabelled arrow as its only control"
            width={SHOT.beforeS1.width}
            height={SHOT.beforeS1.height}
            pins={SCREEN_ONE_PINS}
            startAt={1}
          />
          <AnnotatedScreen
            label="Before · screen 2 · phone"
            src={SHOT.beforeS2.src}
            alt="Second screen of the original form: the availability message appears as the title of the phone question"
            width={SHOT.beforeS2.width}
            height={SHOT.beforeS2.height}
            pins={SCREEN_TWO_PINS}
            startAt={4}
          />
        </div>

        <div className="mt-14">
          <PullStatement lead="The user hands over the data that costs them little, receives an answer that doesn't answer their question, and is asked in the same movement for the data that costs them a lot. It wasn't the length of the form. It was the exchange." />
        </div>
      </Band>

      {/* Part 03 · The answer */}
      <Band tinted>
        <PartLabel part="Part 03" label="The answer" />
        <Reveal className="mt-6 max-w-[44rem]">
          <h2 className={H2}>Six decisions, each one traceable to a number.</h2>
          <p className={cn("mt-6", PARA)}>
            The form itself lives inside a third-party iframe — unmeasurable field by field, and
            incapable of looking anything up. So the first step could only be rebuilt somewhere
            else: a landing page of my own, design, front-end and deployment.
          </p>
        </Reveal>
        <div className="mt-10">
          <DecisionLedger rows={DECISIONS} />
        </div>

        <div className="mt-14 max-w-[52rem]">
          <Figure
            shot={SHOT.heatmapMap}
            label="Heatmap · desktop"
            lead="The question they arrived with"
            body="47 clicks on the coverage map, 4.56% of the page total: third most-clicked, ahead of any conversion button."
            alt="Desktop heatmap: the coverage map concentrates 47 clicks, 4.56% of the page total"
          />
        </div>
      </Band>

      {/* The four comparisons */}
      <Band>
        <Reveal className="max-w-[44rem]">
          <h2 className={H2}>The same question, answered a different way.</h2>
          <p className={cn("mt-6", PARA)}>
            Four comparisons on the same axis: the existing quote page on WordPress on the left, the
            landing I designed and built on the right.
          </p>
        </Reveal>

        <ComparisonPanel
          className="mt-12"
          before={{
            label: "Before · the iframe form",
            figure: "Fig. 01",
            lead: "A sign",
            body: "Fixed text, identical for any postcode, written into the title of the phone question.",
            alt: "Original desktop form: a fixed availability message sitting in the title of the phone question",
            ...SHOT.beforePaperform
          }}
          after={{
            label: "After · my landing",
            figure: "Fig. 02",
            lead: "An answer",
            body: "The lookup returns the real district, and asking for the details is a separate step.",
            alt: "The new landing on desktop: the lookup returns the real district name, Westminster",
            ...SHOT.heroAfter
          }}
        />

        <ComparisonPanel
          className="mt-8"
          portrait
          before={{
            label: "Before · mobile",
            figure: "Fig. 03",
            lead: "Three bars before you start",
            body: "Trustpilot, phone and logo eat a third of the screen before the headline.",
            alt: "Original form on mobile: three header bars stacked above the content",
            ...SHOT.beforeMobile
          }}
          after={{
            label: "After · mobile",
            figure: "Fig. 04",
            lead: "One bar, everything visible",
            body: "Field, answer and button fit in the first screenful, which is how 80% of the traffic arrives.",
            alt: "The new landing on mobile: field, answer and button all within the first screenful",
            ...SHOT.afterMobile
          }}
        />

        <ComparisonPanel
          className="mt-8"
          before={{
            label: "Before · consent",
            figure: "Fig. 05",
            lead: "One tick doing three jobs",
            body: "A single mandatory box, pre-ticked, bundling permission to call with acceptance of the terms — and its link pointed at a different domain.",
            alt: "Original consent step: an “I Agree” option already selected, above the Continue button",
            ...SHOT.beforeConsent
          }}
          after={{
            label: "After · final step",
            figure: "Fig. 06",
            lead: "Each job in its own place",
            body: "Accepting the terms happens by submitting, stated as plain text. Marketing is a separate checkbox, unticked and genuinely optional — the only real opt-in is now the one that needs to be.",
            alt: "The new final step: an unticked, optional marketing checkbox above the submit button, with terms stated as plain text",
            ...SHOT.afterFinalStep
          }}
        />

        <Reveal className="mt-12 max-w-[44rem]">
          <p className={PARA}>
            The ICO is unambiguous: consent needs a positive opt-in, so a pre-ticked box is not
            valid consent. But the tick was the smallest of three problems.
          </p>
        </Reveal>
        <div className="mt-10">
          <ExplainerColumns items={CONSENT_EXPLAINERS} />
        </div>

        <Reveal className="mt-20 max-w-[44rem]">
          <h2 className={H2}>The map was already the third most-clicked thing on the page</h2>
          <p className={cn("mt-6", PARA)}>
            It was not a button and it led nowhere, and they clicked it anyway. So the redesign gave
            that attention somewhere to go.
          </p>
        </Reveal>

        <ComparisonPanel
          className="mt-10"
          before={{
            label: "Before · the old map",
            figure: "Fig. 07",
            lead: "Pins that did nothing",
            body: "Decorative markers on a static image: nothing to click, nothing behind them, and no indication of where the company actually works.",
            alt: "The original coverage map: decorative pins on a static image of the United Kingdom",
            ...SHOT.beforeMap
          }}
          after={{
            label: "After · coverage",
            figure: "Fig. 08",
            lead: "Every point is a destination",
            body: "Each city opens its own local SEO page, so the clicks the map was already earning feed the location pages instead of dying on the spot.",
            alt: "The new coverage section: a map of the United Kingdom with clickable city points and London highlighted",
            ...SHOT.afterCoverage
          }}
        />
        <div className="mt-12">
          <ExplainerColumns items={MAP_EXPLAINERS} />
        </div>

        <Reveal className="mt-20 max-w-[44rem]">
          <h2 className={H2}>
            The second most-visited page on the site was a speed test with no way out
          </h2>
        </Reveal>
        <div className="mt-10 max-w-[52rem]">
          <Figure
            shot={SHOT.afterSpeed}
            label="After · speed comparison"
            lead="Measuring a problem you already have"
            body="The site's own speed-test page drew 8,717 views and carried no call to action at all. That traffic arrives mostly from search, and whoever runs a speed test is measuring a problem they already have — so the new landing carries a speed test of its own, where the measurement becomes a comparison and the comparison becomes the reason to ask for a quote."
            alt="Before-and-after speed comparison with a drag handle: 3.0 Mbps of typical rural broadband against 239 Mbps with Starlink professionally installed"
          />
        </div>
      </Band>

      {/* Page speed */}
      <Band tinted>
        <Reveal className="max-w-[48rem]">
          <h2 className={H2}>And 17.6 seconds before the offer finished rendering on mobile</h2>
          <p className={cn("mt-6", PARA)}>
            80% of the traffic arrives on mobile and nearly all of it is paid. The page those ads
            point at takes 17.6 seconds to finish rendering its offer; the new landing takes 3.3.
            Same route, same offer, same paid traffic, measured on both stacks.
          </p>
          <p className="mt-4 text-[0.9375rem] leading-6 text-muted">
            PageSpeed Insights, mobile, 6 August 2026. Both runs on the quote page.
          </p>
        </Reveal>

        <div className="mt-12">
          <CoreWebVitalsTable
            caption="Core Web Vitals measured on the existing WordPress page and on the new landing. Lower is better throughout."
            columns={["What the visitor waits for", "WordPress, in production", "The new landing"]}
            rows={VITALS}
          />
        </div>

        <div className="mt-14">
          <LighthouseRow scores={LIGHTHOUSE} />
        </div>

        <ComparisonPanel
          className="mt-14"
          before={{
            label: "Before · mobile, score 39",
            figure: "Fig. 09",
            lead: "Nobody waits this long",
            body: "The filmstrip shows what the visitor gets for their 17.6 seconds: a cookie dialogue over the offer.",
            alt: "PageSpeed Insights, mobile, existing WordPress page: performance score 39 with the filmstrip showing a cookie dialogue",
            ...SHOT.psiBefore
          }}
          after={{
            label: "After · mobile, score 92",
            figure: "Fig. 10",
            lead: "The offer, and the field",
            body: "Same measurement, same device class. What renders first is the thing the visitor came to do.",
            alt: "PageSpeed Insights, mobile, the new landing: performance score 92 with the offer rendering first",
            ...SHOT.psiAfter
          }}
        />

        <div className="mt-14">
          <PullStatement lead="Speed is a barrier removed, not a conversion won. It changes how many people get to see the offer, not how many accept it." />
        </div>
      </Band>

      {/* Part 04 · Scope and measurement */}
      <Band>
        <PartLabel part="Part 04" label="Scope and measurement" />
        <Reveal className="mt-6 max-w-[44rem]">
          <h2 className={H2}>Inside the budget, not around it.</h2>
          <p className={cn("mt-6", PARA)}>
            100+ published pages and a fixed budget. The call was to work inside the existing
            WordPress template and prioritise by impact over effort, rather than propose the rebuild
            nobody had asked for. A slice of the time went purely into agreeing that scope in
            writing before touching production.
          </p>
          <p className={cn("mt-4", PARA)}>
            Before any improvement could be measured, the measurement itself had to be fixed: with
            one thank-you page serving 61 pages, no conversion figure in the account was
            trustworthy.
          </p>
        </Reveal>

        <div className="mt-12">
          <MetricsTable
            caption="Baseline figures for each metric and the change expected to move it."
            columns={["Metric", "Now", "What should move it"]}
            rows={METRICS}
          />
        </div>

        <div className="mt-14">
          <PullStatement lead="Coverage isn't a variable — it's satellite, it reaches the whole country, so no postcode ever gets a no. What the user needed wasn't a verdict, it was evidence that somebody had looked." />
        </div>
      </Band>

      {/* Closing */}
      <Band>
        <PartLabel part="The other market" label="A companion case" />
        <Reveal className="mt-6 max-w-[44rem]">
          <h2 className={H2}>Two markets, two kinds of evidence.</h2>
          <p className={cn("mt-6", PARA)}>
            This case is the quantitative half: analytics, heatmaps and form data converging on one
            broken step. The U.S. case is the qualitative half — 300+ support conversations turned
            into design principles. They read best together.
          </p>
        </Reveal>
        <Reveal delay={0.06} className="mt-8">
          <MagneticLink
            href={localizedPath(US_CASE, locale)}
            className="inline-flex text-xl font-medium tracking-[-0.03em] text-text"
          >
            Read the U.S. case study →
          </MagneticLink>
        </Reveal>

        {nextProject ? (
          <div className="mt-14 border-t border-line pt-10">
            <p className="section-label">Next project</p>
            <MagneticLink
              href={nextProject.href}
              className="mt-4 inline-flex text-2xl font-medium tracking-[-0.04em] text-text"
            >
              {nextProject.title}
            </MagneticLink>
          </div>
        ) : null}

        <Reveal delay={0.1}>
          <p className="mt-12 max-w-[44rem] text-sm leading-6 text-muted">
            {`Figures rounded. The analytics screenshots come from the client's accounts and are
            shown with their knowledge.`}
          </p>
        </Reveal>
      </Band>
    </main>
  );
}
