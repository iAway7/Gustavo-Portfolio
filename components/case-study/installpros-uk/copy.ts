import type { ComparisonSide } from "@/components/case-study/installpros-uk/comparison-panel";
import type { Pin } from "@/components/case-study/installpros-uk/annotated-screen";
import type { ContinuationRow, LighthouseScore, MetricRow, VitalRow } from "@/components/case-study/installpros-uk/tables";
import type { DecisionRow, EvidenceRow, Explainer, Hypothesis, Stat } from "@/components/case-study/installpros-uk/ledgers";
import type { FunnelStep } from "@/components/case-study/installpros-uk/funnel-bars";
import type { Locale } from "@/lib/i18n";

const IMG = "/projects/installpros-uk";
const LOGO = "/logos/tools";

/**
 * Intrinsic geometry of every screenshot. Kept apart from the copy so alt text
 * can be written per locale without repeating dimensions.
 */
export const SHOT = {
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

/** Source wordmarks. Hotjar sets its lettering larger inside the same box. */
const MARKS = {
  hotjar: { src: `${LOGO}/hotjar.svg`, alt: "Hotjar", width: 62, height: 16 },
  paperform: { src: `${LOGO}/paperform.svg`, alt: "Paperform", width: 95, height: 24 },
  ga4: { src: `${LOGO}/ga4.svg`, alt: "Google Analytics 4", width: 124, height: 24 }
};

type Figure = { label: string; lead: string; body: string; alt: string };

type Copy = {
  hero: {
    tags: string[];
    title: string;
    subtitle: string;
    meta: [string, string][];
    alt: string;
  };
  stats: Stat[];
  part01: { part: string; label: string; title: string; body: string[] };
  part02: {
    part: string;
    label: string;
    title: string;
    intro: string;
    hypotheses: Hypothesis[];
    pull: string;
    sourcesTitle: string;
    evidence: EvidenceRow[];
    exhibitA: Figure;
    exhibitB: Figure;
  };
  verdict: {
    part: string;
    label: string;
    title: string;
    funnelTitle: string;
    funnel: FunnelStep[];
    funnelNote: string;
    funnelRead: string;
    continuationTitle: string;
    continuationCaption: string;
    continuationColumns: [string, string, string];
    continuation: ContinuationRow[];
    continuationNote: string;
    continuationVerdict: string;
  };
  screens: {
    title: string;
    intro: string;
    labelOne: string;
    labelTwo: string;
    altOne: string;
    altTwo: string;
    pinsOne: Pin[];
    pinsTwo: Pin[];
    pull: string;
  };
  part03: {
    part: string;
    label: string;
    title: string;
    intro: string;
    decisions: DecisionRow[];
    heatmap: Figure;
  };
  comparisons: {
    title: string;
    intro: string;
    pairs: [ComparisonSide, ComparisonSide][];
    consentIntro: string;
    consentExplainers: Explainer[];
    mapTitle: string;
    mapIntro: string;
    mapPair: [ComparisonSide, ComparisonSide];
    mapExplainers: Explainer[];
    speedTitle: string;
    speed: Figure;
  };
  pagespeed: {
    title: string;
    intro: string;
    note: string;
    caption: string;
    columns: [string, string, string];
    vitals: VitalRow[];
    lighthouse: LighthouseScore[];
    pair: [ComparisonSide, ComparisonSide];
    pull: string;
  };
  part04: {
    part: string;
    label: string;
    title: string;
    body: string[];
    caption: string;
    columns: [string, string, string];
    metrics: MetricRow[];
    pull: string;
  };
  closing: {
    part: string;
    label: string;
    title: string;
    body: string;
    link: string;
    nextProject: string;
    footnote: string;
  };
};

export const COPY: Record<Locale, Copy> = {
  en: {
    hero: {
      tags: ["Conversion", "Funnel Redesign", "Analytics"],
      title: "A CRO audit and rebuild of the InstallPros U.K. landing page.",
      subtitle:
        "A Starlink installer buying almost all of its traffic, with no way of seeing where it lost it. Two out of three visits never typed a thing.",
      meta: [
        ["Role", "Product Designer"],
        ["Timeline", "2026"],
        ["Scope", "Funnel audit, UX/UI, front-end & analytics"]
      ],
      alt: "The landing I built: a postcode lookup returning the real district name, Westminster"
    },
    stats: [
      { value: "£19,000", caption: "monthly Google Ads spend" },
      { value: "87%", caption: "of traffic bought, 5% organic" },
      { value: "80%", caption: "of visits arriving on mobile" },
      { value: "61 → 1", caption: "pages sharing one thank-you page" }
    ],
    part01: {
      part: "Part 01",
      label: "Where the money went",
      title: "A business buying all of its traffic, and unable to see it.",
      body: [
        "The ads worked: strong click-through, efficient cost per click. The problem started after the click, and nobody could say where — one thank-you page served 61 unrelated pages, so every conversion figure in the account was inflated.",
        "Worse, the primary conversion was a WhatsApp click, so automated bidding went hunting for people who click WhatsApp links. It believed it was paying £5.61 a conversion while a real installation lead cost £10 to £22."
      ]
    },
    part02: {
      part: "Part 02",
      label: "The diagnosis",
      title: "Two problems that are easy to mistake for one.",
      intro:
        "A funnel that under-delivers fails in two unrelated ways. The remedies have nothing in common, so the first job was to find out which one this was.",
      hypotheses: [
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
      ],
      pull: "Every number the client held pointed at A.",
      sourcesTitle: "Four sources, and the one contradiction between them",
      evidence: [
        {
          logo: MARKS.hotjar,
          label: "Heatmaps & scroll maps",
          finding:
            "Mobile scroll died at 25% of the page. On desktop the two most-clicked elements were menu entries — no conversion button made the top three."
        },
        {
          logo: MARKS.paperform,
          label: "Form analytics",
          finding:
            "Drop-off by question: 76% postcode, 16% phone, 5% name, 2% email. The only source that let me rebuild continuation field by field."
        },
        {
          logo: MARKS.ga4,
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
      ],
      exhibitA: {
        label: "Exhibit A · drop-off by question",
        lead: "The last question answered before someone stopped, over 30 days.",
        body: "Note the second question's own title: “Starlink is Available! What's your Phone Number?”",
        alt: "Form drop-off report: 76% postcode, 16% phone, 5% name, 2% email"
      },
      exhibitB: {
        label: "Exhibit B · click heatmap",
        lead: "The most-clicked element is a menu entry, 5.73%.",
        body: "Where the form should be: “iframe: this zone can't be recorded”. Almost 1 in 5 cursor points fall there — the area holding the most attention is the only one that can't be measured.",
        alt: "Click heatmap: the menu concentrates the clicks and the form area appears as an unrecordable zone"
      }
    },
    verdict: {
      part: "The verdict",
      label: "Hypothesis B",
      title: "The leak was at the door, not inside the room.",
      funnelTitle: "The funnel, end to end",
      funnel: [
        { label: "Landing page visits", value: "100%", width: 100 },
        { label: "Start the form", value: "33%", width: 33, highlight: true },
        { label: "Complete it", value: "32%", width: 32 },
        { label: "Qualified lead", value: "~48%", width: 48 }
      ],
      funnelNote:
        "Each bar is against the previous step. End to end, roughly 5 visits in every 100 become a qualified lead.",
      funnelRead:
        "Completion, 32%, could be better. But two in three people leave before typing a character — and that is the step nobody was looking at. On mobile, where 80% of them arrive, the offer took 17.6 seconds to finish rendering.",
      continuationTitle: "Continuation, step by step",
      continuationCaption:
        "Continuation rate by form step: how many people reach each field and how many carry on from it.",
      continuationColumns: ["Step", "Reached", "Continued"],
      continuation: [
        { step: "Postcode", reached: "~12,300", percent: "49%", width: 49, highlight: true },
        { step: "Phone", reached: "~6,000", percent: "78%", width: 78 },
        { step: "Name", reached: "~4,600", percent: "91%", width: 91 },
        { step: "Email", reached: "~4,200", percent: "96%", width: 96 }
      ],
      continuationNote:
        "The drop-off report put 76% of abandonment at the postcode, but abandonment always over-indexes the first step — everybody passes through it. Continuation compares like with like: of those who reach a field, how many go on.",
      continuationVerdict: "One step loses half the people. The three after it keep nearly everyone."
    },
    screens: {
      title: "The two screens that explain it",
      intro:
        "The form showed one question per screen, and the tool records the last question answered — so that 49% covers two moments the data can't separate: abandoning while typing the postcode, and handing it over only to leave on the next screen. Both are explained by the same pair of screens.",
      labelOne: "Before · screen 1 · postcode",
      labelTwo: "Before · screen 2 · phone",
      altOne:
        "First screen of the original form: a postcode field with an unlabelled arrow as its only control",
      altTwo:
        "Second screen of the original form: the availability message appears as the title of the phone question",
      pinsOne: [
        {
          x: 8,
          y: 51,
          note: "“This allows us to check availability in your area.” A promise of a check."
        },
        { x: 80, y: 65, note: "A thin line over a photo: no box, no format example." },
        { x: 63, y: 80, note: "An unlabelled arrow. Nothing says what pressing it does." }
      ],
      pinsTwo: [
        {
          x: 7,
          y: 54,
          note: "The answer takes the slot where “Postcode” used to be — fixed text, identical for every postcode."
        },
        { x: 80, y: 65, note: "The phone number, asked for in the same breath." },
        { x: 11, y: 76, note: "The warning that they'll call you, a second time." }
      ],
      pull: "The user hands over the data that costs them little, receives an answer that doesn't answer their question, and is asked in the same movement for the data that costs them a lot. It wasn't the length of the form. It was the exchange."
    },
    part03: {
      part: "Part 03",
      label: "The answer",
      title: "Six decisions, each one traceable to a number.",
      intro:
        "The form itself lives inside a third-party iframe — unmeasurable field by field, and incapable of looking anything up. So the first step could only be rebuilt somewhere else: a landing page of my own, design, front-end and deployment.",
      decisions: [
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
      ],
      heatmap: {
        label: "Heatmap · desktop",
        lead: "The question they arrived with",
        body: "47 clicks on the coverage map, 4.56% of the page total: third most-clicked, ahead of any conversion button.",
        alt: "Desktop heatmap: the coverage map concentrates 47 clicks, 4.56% of the page total"
      }
    },
    comparisons: {
      title: "The same question, answered a different way.",
      intro:
        "Four comparisons on the same axis: the existing quote page on WordPress on the left, the landing I designed and built on the right.",
      pairs: [
        [
          {
            label: "Before · the iframe form",
            figure: "Fig. 01",
            lead: "A sign",
            body: "Fixed text, identical for any postcode, written into the title of the phone question.",
            alt: "Original desktop form: a fixed availability message sitting in the title of the phone question",
            ...SHOT.beforePaperform
          },
          {
            label: "After · my landing",
            figure: "Fig. 02",
            lead: "An answer",
            body: "The lookup returns the real district, and asking for the details is a separate step.",
            alt: "The new landing on desktop: the lookup returns the real district name, Westminster",
            ...SHOT.heroAfter
          }
        ],
        [
          {
            label: "Before · mobile",
            figure: "Fig. 03",
            lead: "Three bars before you start",
            body: "Trustpilot, phone and logo eat a third of the screen before the headline.",
            alt: "Original form on mobile: three header bars stacked above the content",
            ...SHOT.beforeMobile
          },
          {
            label: "After · mobile",
            figure: "Fig. 04",
            lead: "One bar, everything visible",
            body: "Field, answer and button fit in the first screenful, which is how 80% of the traffic arrives.",
            alt: "The new landing on mobile: field, answer and button all within the first screenful",
            ...SHOT.afterMobile
          }
        ],
        [
          {
            label: "Before · consent",
            figure: "Fig. 05",
            lead: "One tick doing three jobs",
            body: "A single mandatory box, pre-ticked, bundling permission to call with acceptance of the terms — and its link pointed at a different domain.",
            alt: "Original consent step: an “I Agree” option already selected, above the Continue button",
            ...SHOT.beforeConsent
          },
          {
            label: "After · final step",
            figure: "Fig. 06",
            lead: "Each job in its own place",
            body: "Accepting the terms happens by submitting, stated as plain text. Marketing is a separate checkbox, unticked and genuinely optional — the only real opt-in is now the one that needs to be.",
            alt: "The new final step: an unticked, optional marketing checkbox above the submit button, with terms stated as plain text",
            ...SHOT.afterFinalStep
          }
        ]
      ],
      consentIntro:
        "The ICO is unambiguous: consent needs a positive opt-in, so a pre-ticked box is not valid consent. But the tick was the smallest of three problems.",
      consentExplainers: [
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
      ],
      mapTitle: "The map was already the third most-clicked thing on the page",
      mapIntro:
        "It was not a button and it led nowhere, and they clicked it anyway. So the redesign gave that attention somewhere to go.",
      mapPair: [
        {
          label: "Before · the old map",
          figure: "Fig. 07",
          lead: "Pins that did nothing",
          body: "Decorative markers on a static image: nothing to click, nothing behind them, and no indication of where the company actually works.",
          alt: "The original coverage map: decorative pins on a static image of the United Kingdom",
          ...SHOT.beforeMap
        },
        {
          label: "After · coverage",
          figure: "Fig. 08",
          lead: "Every point is a destination",
          body: "Each city opens its own local SEO page, so the clicks the map was already earning feed the location pages instead of dying on the spot.",
          alt: "The new coverage section: a map of the United Kingdom with clickable city points and London highlighted",
          ...SHOT.afterCoverage
        }
      ],
      mapExplainers: [
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
      ],
      speedTitle: "The second most-visited page on the site was a speed test with no way out",
      speed: {
        label: "After · speed comparison",
        lead: "Measuring a problem you already have",
        body: "The site's own speed-test page drew 8,717 views and carried no call to action at all. That traffic arrives mostly from search, and whoever runs a speed test is measuring a problem they already have — so the new landing carries a speed test of its own, where the measurement becomes a comparison and the comparison becomes the reason to ask for a quote.",
        alt: "Before-and-after speed comparison with a drag handle: 3.0 Mbps of typical rural broadband against 239 Mbps with Starlink professionally installed"
      }
    },
    pagespeed: {
      title: "And 17.6 seconds before the offer finished rendering on mobile",
      intro:
        "80% of the traffic arrives on mobile and nearly all of it is paid. The page those ads point at takes 17.6 seconds to finish rendering its offer; the new landing takes 3.3. Same route, same offer, same paid traffic, measured on both stacks.",
      note: "PageSpeed Insights, mobile, 6 August 2026. Both runs on the quote page.",
      caption:
        "Core Web Vitals measured on the existing WordPress page and on the new landing. Lower is better throughout.",
      columns: ["What the visitor waits for", "WordPress, in production", "The new landing"],
      vitals: [
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
        {
          metric: "Speed Index",
          gloss: "how fast the page fills in",
          before: "10.1 s",
          after: "2.4 s"
        },
        {
          metric: "Total Blocking Time",
          gloss: "taps that do nothing",
          before: "380 ms",
          after: "10 ms"
        },
        {
          metric: "Cumulative Layout Shift",
          gloss: "things moving under your thumb",
          before: "0.209",
          after: "0"
        }
      ],
      lighthouse: [
        { label: "Performance", before: "39", after: "92" },
        { label: "Accessibility", before: "92", after: "100" },
        { label: "Best practices", before: "73", after: "100" },
        { label: "SEO", before: "85", after: "100" }
      ],
      pair: [
        {
          label: "Before · mobile, score 39",
          figure: "Fig. 09",
          lead: "Nobody waits this long",
          body: "The filmstrip shows what the visitor gets for their 17.6 seconds: a cookie dialogue over the offer.",
          alt: "PageSpeed Insights, mobile, existing WordPress page: performance score 39 with the filmstrip showing a cookie dialogue",
          ...SHOT.psiBefore
        },
        {
          label: "After · mobile, score 92",
          figure: "Fig. 10",
          lead: "The offer, and the field",
          body: "Same measurement, same device class. What renders first is the thing the visitor came to do.",
          alt: "PageSpeed Insights, mobile, the new landing: performance score 92 with the offer rendering first",
          ...SHOT.psiAfter
        }
      ],
      pull: "Speed is a barrier removed, not a conversion won. It changes how many people get to see the offer, not how many accept it."
    },
    part04: {
      part: "Part 04",
      label: "Scope and measurement",
      title: "Inside the budget, not around it.",
      body: [
        "100+ published pages and a fixed budget. The call was to work inside the existing WordPress template and prioritise by impact over effort, rather than propose the rebuild nobody had asked for. A slice of the time went purely into agreeing that scope in writing before touching production.",
        "Before any improvement could be measured, the measurement itself had to be fixed: with one thank-you page serving 61 pages, no conversion figure in the account was trustworthy."
      ],
      caption: "Baseline figures for each metric and the change expected to move it.",
      columns: ["Metric", "Now", "What should move it"],
      metrics: [
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
      ],
      pull: "Coverage isn't a variable — it's satellite, it reaches the whole country, so no postcode ever gets a no. What the user needed wasn't a verdict, it was evidence that somebody had looked."
    },
    closing: {
      part: "The other market",
      label: "A companion case",
      title: "Two markets, two kinds of evidence.",
      body: "This case is the quantitative half: analytics, heatmaps and form data converging on one broken step. The U.S. case is the qualitative half — 300+ support conversations turned into design principles. They read best together.",
      link: "Read the U.S. case study →",
      nextProject: "Next project",
      footnote:
        "Figures rounded. The analytics screenshots come from the client's accounts and are shown with their knowledge."
    }
  },

  es: {
    hero: {
      tags: ["Conversión", "Rediseño de funnel", "Analítica"],
      title: "Auditoría CRO y reconstrucción de la landing de InstallPros en Reino Unido.",
      subtitle:
        "Un instalador de Starlink que compraba casi todo su tráfico y no tenía forma de ver dónde lo perdía. Dos de cada tres visitas no llegaban a escribir nada.",
      meta: [
        ["Rol", "Diseñador de Producto"],
        ["Periodo", "2026"],
        ["Alcance", "Auditoría de funnel, UX/UI, front-end y analítica"]
      ],
      alt: "La landing que construí: la consulta del código postal devuelve el nombre real del distrito, Westminster"
    },
    stats: [
      { value: "19.000 £", caption: "al mes en Google Ads" },
      { value: "87%", caption: "del tráfico comprado, 5% orgánico" },
      { value: "80%", caption: "de las visitas llegan desde móvil" },
      { value: "61 → 1", caption: "páginas compartiendo una sola de gracias" }
    ],
    part01: {
      part: "Parte 01",
      label: "A dónde iba el dinero",
      title: "Un negocio que compraba todo su tráfico y no podía verlo.",
      body: [
        "Los anuncios funcionaban: buen CTR, coste por clic eficiente. El problema empezaba después del clic, y nadie sabía dónde: una única página de gracias servía a 61 páginas sin relación entre sí, así que todas las cifras de conversión de la cuenta estaban infladas.",
        "Y había algo peor. La conversión primaria era el clic en WhatsApp, así que la puja automática salía a buscar gente que hace clic en enlaces de WhatsApp. Creía estar pagando 5,61 £ por conversión cuando un lead real de instalación costaba entre 10 y 22 £."
      ]
    },
    part02: {
      part: "Parte 02",
      label: "El diagnóstico",
      title: "Dos problemas que es fácil confundir en uno.",
      intro:
        "Un embudo que rinde por debajo falla de dos maneras que no tienen nada que ver. Los remedios no se parecen en nada, así que lo primero era averiguar cuál de las dos era esta.",
      hypotheses: [
        {
          kicker: "Hipótesis A",
          statement: "Empiezan el formulario y lo dejan a medias.",
          body: "Un problema de formulario. Se arregla acortándolo, partiendo los pasos, reescribiendo los campos."
        },
        {
          kicker: "Hipótesis B",
          statement: "No lo empiezan nunca.",
          body: "Un problema de página. Se arregla con lo que la primera pantalla promete y con lo que pide."
        }
      ],
      pull: "Todas las cifras que tenía el cliente apuntaban a la A.",
      sourcesTitle: "Cuatro fuentes, y la única contradicción entre ellas",
      evidence: [
        {
          logo: MARKS.hotjar,
          label: "Mapas de calor y de scroll",
          finding:
            "El scroll en móvil moría en el 25% de la página. En escritorio, los dos elementos más clicados eran entradas del menú: ningún botón de conversión entraba en el top tres."
        },
        {
          logo: MARKS.paperform,
          label: "Analítica del formulario",
          finding:
            "Abandono por pregunta: 76% código postal, 16% teléfono, 5% nombre, 2% email. La única fuente que permitía reconstruir la continuación campo a campo."
        },
        {
          logo: MARKS.ga4,
          label: "Analítica web",
          finding:
            "Móvil convertía peor que escritorio, 18% frente a 24%. La lectura fácil era «arreglar el formulario en móvil»."
        },
        {
          label: "El cruce · dónde se cayó",
          finding:
            "Pero móvil completaba mejor que escritorio una vez empezado. La brecha no estaba dentro del formulario. Estaba en conseguir que alguien llegara a tocarlo.",
          turn: true
        }
      ],
      exhibitA: {
        label: "Prueba A · abandono por pregunta",
        lead: "La última pregunta contestada antes de parar, en una ventana de 30 días.",
        body: "Fijate en el título de la segunda pregunta: “Starlink is Available! What's your Phone Number?”",
        alt: "Informe de abandono del formulario: 76% código postal, 16% teléfono, 5% nombre, 2% email"
      },
      exhibitB: {
        label: "Prueba B · mapa de calor de clics",
        lead: "El elemento más clicado es una entrada del menú, 5,73%.",
        body: "Donde debería estar el formulario: “iframe: this zone can't be recorded”. Casi 1 de cada 5 puntos de cursor caen ahí: la zona que más atención concentra es la única que no se puede medir.",
        alt: "Mapa de calor de clics: el menú concentra los clics y el área del formulario aparece como zona no grabable"
      }
    },
    verdict: {
      part: "El veredicto",
      label: "Hipótesis B",
      title: "La fuga estaba en la puerta, no dentro de la sala.",
      funnelTitle: "El embudo, de extremo a extremo",
      funnel: [
        { label: "Visitas a la landing", value: "100%", width: 100 },
        { label: "Empiezan el formulario", value: "33%", width: 33, highlight: true },
        { label: "Lo completan", value: "32%", width: 32 },
        { label: "Lead cualificado", value: "~48%", width: 48 }
      ],
      funnelNote:
        "Cada barra es respecto al paso anterior. De extremo a extremo, unas 5 visitas de cada 100 acaban en lead cualificado.",
      funnelRead:
        "La finalización, un 32%, es mejorable. Pero dos de cada tres se van antes de escribir un carácter, y ese es el paso que nadie estaba mirando. En móvil, por donde llega el 80%, la oferta tardaba 17,6 segundos en terminar de renderizarse.",
      continuationTitle: "Continuación, paso a paso",
      continuationCaption:
        "Tasa de continuación por paso del formulario: cuánta gente llega a cada campo y cuánta sigue desde él.",
      continuationColumns: ["Paso", "Llegan", "Continúan"],
      continuation: [
        { step: "Código postal", reached: "~12.300", percent: "49%", width: 49, highlight: true },
        { step: "Teléfono", reached: "~6.000", percent: "78%", width: 78 },
        { step: "Nombre", reached: "~4.600", percent: "91%", width: 91 },
        { step: "Email", reached: "~4.200", percent: "96%", width: 96 }
      ],
      continuationNote:
        "El informe de abandono situaba el 76% en el código postal, pero el abandono sobre-indexa siempre el primer paso: por ahí pasa todo el mundo. La continuación compara peras con peras, de los que llegan a un campo cuántos siguen.",
      continuationVerdict:
        "Un paso pierde a la mitad de la gente. Los tres siguientes retienen a casi todos."
    },
    screens: {
      title: "Las dos pantallas que lo explican",
      intro:
        "El formulario mostraba una pregunta por pantalla, y la herramienta registra la última que llegó a contestarse, así que ese 49% cubre dos momentos que los datos no permiten separar: abandonar mientras se escribe el código postal, y entregarlo para irse en la pantalla siguiente. Las dos se explican con el mismo par de pantallas.",
      labelOne: "Antes · pantalla 1 · código postal",
      labelTwo: "Antes · pantalla 2 · teléfono",
      altOne:
        "Primera pantalla del formulario original: campo de código postal con una flecha sin etiqueta como único control",
      altTwo:
        "Segunda pantalla del formulario original: el mensaje de disponibilidad aparece como título de la pregunta del teléfono",
      pinsOne: [
        {
          x: 8,
          y: 51,
          note: "“This allows us to check availability in your area”. La promesa de una comprobación."
        },
        { x: 80, y: 65, note: "Una línea fina sobre una foto: sin caja, sin ejemplo de formato." },
        { x: 63, y: 80, note: "Una flecha sin etiqueta. Nada dice qué pasa al pulsarla." }
      ],
      pinsTwo: [
        {
          x: 7,
          y: 54,
          note: "La respuesta ocupa el sitio donde antes ponía “Postcode”: texto fijo, idéntico para cualquier código postal."
        },
        { x: 80, y: 65, note: "El teléfono, pedido en el mismo gesto." },
        { x: 11, y: 76, note: "El aviso de que le van a llamar, por segunda vez." }
      ],
      pull: "El usuario entrega el dato que le cuesta poco, recibe una respuesta que no responde a su pregunta, y en el mismo movimiento se le exige el dato que le cuesta mucho. No era la longitud del formulario. Era el intercambio."
    },
    part03: {
      part: "Parte 03",
      label: "La respuesta",
      title: "Seis decisiones, cada una trazable a un número.",
      intro:
        "El formulario vive dentro de un iframe de terceros: no se puede medir campo a campo ni consultar nada desde dentro. Así que el primer paso solo se podía reconstruir en otro sitio: una landing propia, con diseño, front-end y despliegue míos.",
      decisions: [
        {
          title: "Separar la respuesta de la petición",
          body: "Código postal, después la respuesta con el nombre real del distrito como pantalla propia, y solo entonces los datos de contacto.",
          emphasis: "La mitad de los que daban su código postal no pasaban de ahí."
        },
        {
          title: "Cambiar lo que promete el botón",
          body: "De “Get a quote” a “Check if we cover your area”. Un presupuesto suena a llamada comercial; una comprobación es una consulta.",
          emphasis: "Baja el coste del primer clic."
        },
        {
          title: "Una sola etiqueta de llamada a la acción",
          body: "Cuatro textos distintos para el mismo botón.",
          emphasis: "Cuatro etiquetas reparten los clics entre opciones que son la misma cosa."
        },
        {
          title: "Navegación mínima en la landing",
          body: "Logo y teléfono; fuera el menú de más de 40 enlaces.",
          emphasis:
            "Dos entradas del menú estaban entre los cinco elementos más clicados. En móvil, el menú le ganaba al botón principal."
        },
        {
          title: "Confianza sobre el pliegue",
          body: "Valoraciones y credenciales de prensa subidas a los dos primeros pantallazos en móvil.",
          emphasis:
            "El 75% inferior de la página no se veía en móvil, y la prueba estaba justo ahí abajo: invisible para el 80% del tráfico."
        },
        {
          title: "Consentimiento, desempaquetado",
          body: "Una única casilla obligatoria y premarcada que cubría a la vez el contacto y las condiciones.",
          emphasis:
            "Un consentimiento premarcado, empaquetado y obligatorio no es consentimiento válido, y la llamada por la que preguntaba no necesitaba ninguno."
        }
      ],
      heatmap: {
        label: "Mapa de calor · escritorio",
        lead: "La pregunta que traían",
        body: "47 clics en el mapa de cobertura, el 4,56% del total de la página: tercer elemento más clicado, por delante de cualquier botón de conversión.",
        alt: "Mapa de calor en escritorio: el mapa de cobertura concentra 47 clics, el 4,56% del total de la página"
      }
    },
    comparisons: {
      title: "La misma pregunta, resuelta de otra forma.",
      intro:
        "Cuatro comparaciones sobre el mismo eje: a la izquierda la página de presupuesto que sigue viva en WordPress; a la derecha la landing que diseñé y construí.",
      pairs: [
        [
          {
            label: "Antes · el formulario en iframe",
            figure: "Fig. 01",
            lead: "Un cartel",
            body: "Texto fijo, idéntico para cualquier código postal, escrito dentro del título de la pregunta del teléfono.",
            alt: "Formulario original en escritorio: el mensaje fijo de disponibilidad ocupa el título de la pregunta del teléfono",
            ...SHOT.beforePaperform
          },
          {
            label: "Después · mi landing",
            figure: "Fig. 02",
            lead: "Una respuesta",
            body: "La consulta devuelve el distrito real, y pedir los datos pasa a ser un paso aparte.",
            alt: "La landing nueva en escritorio: la consulta devuelve el nombre real del distrito, Westminster",
            ...SHOT.heroAfter
          }
        ],
        [
          {
            label: "Antes · móvil",
            figure: "Fig. 03",
            lead: "Tres barras antes de empezar",
            body: "Trustpilot, teléfono y logo se comen un tercio de la pantalla antes del titular.",
            alt: "Formulario original en móvil: tres barras de cabecera apiladas antes del contenido",
            ...SHOT.beforeMobile
          },
          {
            label: "Después · móvil",
            figure: "Fig. 04",
            lead: "Una barra, y todo a la vista",
            body: "Campo, respuesta y botón entran en el primer pantallazo, que es por donde llega el 80% del tráfico.",
            alt: "La landing nueva en móvil: campo, respuesta y botón dentro del primer pantallazo",
            ...SHOT.afterMobile
          }
        ],
        [
          {
            label: "Antes · consentimiento",
            figure: "Fig. 05",
            lead: "Una casilla haciendo tres trabajos",
            body: "Una sola casilla obligatoria y premarcada que juntaba el permiso para llamar con la aceptación de las condiciones, y cuyo enlace apuntaba a otro dominio.",
            alt: "Paso de consentimiento original: la opción “I Agree” ya viene seleccionada, encima del botón Continue",
            ...SHOT.beforeConsent
          },
          {
            label: "Después · último paso",
            figure: "Fig. 06",
            lead: "Cada cosa en su sitio",
            body: "Aceptar las condiciones ocurre al enviar, dicho como texto plano. El marketing es una casilla aparte, sin marcar y de verdad opcional: el único opt-in real es ahora el que tiene que serlo.",
            alt: "El último paso nuevo: casilla de marketing opcional y sin marcar sobre el botón de envío, con las condiciones como texto plano",
            ...SHOT.afterFinalStep
          }
        ]
      ],
      consentIntro:
        "El ICO no deja lugar a dudas: el consentimiento necesita un opt-in positivo, así que una casilla premarcada no es consentimiento válido. Pero el tick era el menor de tres problemas.",
      consentExplainers: [
        {
          heading: "Empaquetado",
          body: "El permiso para contactar y la aceptación de las condiciones viajaban en la misma casilla. El consentimiento tiene que ser separado y granular; empaquetado con otros términos, no vale."
        },
        {
          heading: "Obligatorio",
          body: "No se podía continuar sin marcarlo. El consentimiento debe darse libremente, así que condicionar el servicio a marcarlo lo invalida: fricción y debilidad legal a la vez."
        },
        {
          heading: "Innecesario",
          body: "Una llamada sobre esta consulta no necesita consentimiento: el usuario la pide al enviar su teléfono. Y el marketing futuro, lo único que sí necesita un opt-in, no estaba separado."
        }
      ],
      mapTitle: "El mapa ya era el tercer elemento más clicado de la página",
      mapIntro:
        "No era un botón y no llevaba a ninguna parte, y aun así lo clicaban. El rediseño le dio a esa atención a dónde ir.",
      mapPair: [
        {
          label: "Antes · el mapa viejo",
          figure: "Fig. 07",
          lead: "Chinchetas que no hacían nada",
          body: "Marcadores decorativos sobre una imagen estática: nada que clicar, nada detrás, y ninguna pista de dónde trabaja la empresa de verdad.",
          alt: "El mapa de cobertura original: chinchetas decorativas sobre una imagen estática del Reino Unido",
          ...SHOT.beforeMap
        },
        {
          label: "Después · cobertura",
          figure: "Fig. 08",
          lead: "Cada punto lleva a algún sitio",
          body: "Cada ciudad abre su propia página local de SEO, así que los clics que el mapa ya se estaba ganando alimentan las páginas de localidad en vez de morir ahí.",
          alt: "La sección de cobertura nueva: mapa del Reino Unido con puntos de ciudad clicables y Londres destacado",
          ...SHOT.afterCoverage
        }
      ],
      mapExplainers: [
        {
          heading: "Las ciudades no son decorativas",
          body: "Salen de la analítica y de la cuenta de anuncios: son los sitios de donde llega el tráfico de verdad, no un puñado de chinchetas para que el país parezca cubierto."
        },
        {
          heading: "Londres viene marcado de entrada",
          body: "La mayoría de los leads vienen de Londres, así que el estado por defecto responde la pregunta que trae la mayoría antes de que toque nada."
        },
        {
          heading: "La cobertura nunca fue la duda",
          body: "El satélite llega a todas partes. Lo que el mapa tiene que demostrar no es alcance, es que alguien trabaja cerca de ti, que es justo lo que hace una ciudad con nombre."
        }
      ],
      speedTitle: "La segunda página más visitada del sitio era un test de velocidad sin salida",
      speed: {
        label: "Después · comparador de velocidad",
        lead: "Medir un problema que ya tenés",
        body: "El test de velocidad del sitio recibía 8.717 vistas y no llevaba a ninguna parte. Ese tráfico llega sobre todo de búsqueda, y quien hace un test está midiendo un problema que ya sufre: así que la landing nueva lleva su propio test, donde la medición se convierte en comparación y la comparación en el motivo para pedir presupuesto.",
        alt: "Comparador de velocidad antes y después con tirador de arrastre: 3,0 Mbps de banda ancha rural típica frente a 239 Mbps con Starlink instalado por profesionales"
      }
    },
    pagespeed: {
      title: "Y 17,6 segundos hasta que la oferta terminaba de renderizarse en móvil",
      intro:
        "El 80% del tráfico llega por móvil y casi todo es de pago. La página a la que apuntan esos anuncios tarda 17,6 segundos en terminar de renderizar su oferta; la nueva tarda 3,3. Misma ruta, misma oferta, mismo tráfico pagado, medido sobre las dos tecnologías.",
      note: "PageSpeed Insights, móvil, 6 de agosto de 2026. Las dos mediciones sobre la página de presupuesto.",
      caption:
        "Core Web Vitals medidos sobre la página de WordPress existente y sobre la landing nueva. En todos los casos, menos es mejor.",
      columns: ["Lo que el visitante espera", "WordPress, en producción", "La landing nueva"],
      vitals: [
        {
          metric: "Largest Contentful Paint",
          gloss: "la oferta termina de renderizarse",
          before: "17,6 s",
          after: "3,3 s"
        },
        {
          metric: "First Contentful Paint",
          gloss: "aparece algo, lo que sea",
          before: "4,1 s",
          after: "1,1 s"
        },
        {
          metric: "Speed Index",
          gloss: "a qué velocidad se llena la página",
          before: "10,1 s",
          after: "2,4 s"
        },
        {
          metric: "Total Blocking Time",
          gloss: "toques que no hacen nada",
          before: "380 ms",
          after: "10 ms"
        },
        {
          metric: "Cumulative Layout Shift",
          gloss: "cosas que se mueven bajo el pulgar",
          before: "0,209",
          after: "0"
        }
      ],
      lighthouse: [
        { label: "Rendimiento", before: "39", after: "92" },
        { label: "Accesibilidad", before: "92", after: "100" },
        { label: "Prácticas recomendadas", before: "73", after: "100" },
        { label: "SEO", before: "85", after: "100" }
      ],
      pair: [
        {
          label: "Antes · móvil, puntuación 39",
          figure: "Fig. 09",
          lead: "Nadie espera tanto",
          body: "La tira de fotogramas muestra lo que el visitante recibe por sus 17,6 segundos: un diálogo de cookies encima de la oferta.",
          alt: "PageSpeed Insights en móvil, página de WordPress existente: puntuación 39 y la tira de fotogramas mostrando un diálogo de cookies",
          ...SHOT.psiBefore
        },
        {
          label: "Después · móvil, puntuación 92",
          figure: "Fig. 10",
          lead: "La oferta, y el campo",
          body: "Misma medición, misma clase de dispositivo. Lo primero que se renderiza es aquello a lo que el visitante venía.",
          alt: "PageSpeed Insights en móvil, la landing nueva: puntuación 92 y la oferta renderizando primero",
          ...SHOT.psiAfter
        }
      ],
      pull: "La velocidad es una barrera que se quita, no una conversión que se gana. Cambia cuánta gente llega a ver la oferta, no cuánta la acepta."
    },
    part04: {
      part: "Parte 04",
      label: "Alcance y medición",
      title: "Dentro del presupuesto, no alrededor.",
      body: [
        "Más de cien páginas publicadas y un presupuesto cerrado. La decisión fue trabajar dentro de la plantilla de WordPress existente y priorizar por impacto sobre esfuerzo, en vez de proponer el rediseño que nadie había pedido. Una parte del tiempo se fue solo en cerrar ese alcance por escrito antes de tocar producción.",
        "Y antes de poder medir cualquier mejora había que arreglar la medición: con una página de gracias sirviendo a 61 páginas, ninguna cifra de conversión de la cuenta era fiable."
      ],
      caption: "Cifras de partida de cada métrica y el cambio que debería moverla.",
      columns: ["Métrica", "Ahora", "Qué debería moverla"],
      metrics: [
        {
          metric: "Inicio de formulario",
          now: "33%",
          lever: "Cabecera mínima, etiqueta unificada, confianza sobre el pliegue"
        },
        {
          metric: "Continuación en el primer campo",
          now: "49%",
          lever: "Microcopy de expectativa y una confirmación de cobertura creíble"
        },
        {
          metric: "Salidas por el menú",
          now: "Top 5",
          lever: "Debería desaparecer del ranking de clics"
        },
        {
          metric: "Fiabilidad de la atribución",
          now: "61 → 1",
          lever: "Una página de gracias por servicio, en vez de 61 compartiendo una"
        }
      ],
      pull: "La cobertura no es una variable: es satélite, llega a todo el país, así que ningún código postal recibe un no. Lo que el usuario necesitaba no era un veredicto, era evidencia de que alguien había mirado."
    },
    closing: {
      part: "El otro mercado",
      label: "Un caso hermano",
      title: "Dos mercados, dos tipos de evidencia.",
      body: "Este caso es la mitad cuantitativa: analítica, mapas de calor y datos de formulario que convergen en un solo paso roto. El de EE. UU. es la mitad cualitativa: más de 300 conversaciones de soporte convertidas en principios de diseño. Se leen mejor juntos.",
      link: "Leer el caso de estudio de EE. UU. →",
      nextProject: "Siguiente proyecto",
      footnote:
        "Cifras redondeadas. Las capturas de analítica son de las cuentas del cliente y se muestran con su conocimiento."
    }
  }
};
