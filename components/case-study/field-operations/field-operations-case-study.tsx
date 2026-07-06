import Image from "next/image";
import type { ReactNode } from "react";

import {
  AgencyHubOverviewCarousel as ProductCarousel,
  type OverviewSlide as ProductSlide
} from "@/components/case-study/agencyhub/overview-carousel";
import { MagneticLink } from "@/components/magnetic-link";
import { Reveal } from "@/components/reveal";
import type { Locale } from "@/lib/i18n";
import type { ProductCaseStudy, ProjectCaseStudy } from "@/lib/site-data";

const IMG = "/projects/installpros-app/shots";
const BOARDS = `${IMG}/boards`;

// Same reading paragraph as AgencyHub: ~24px desktop, scaling down on mobile.
const PARA = "text-[1.125rem] leading-[1.55] text-muted sm:text-[1.5rem] sm:leading-[1.5]";

// Overview walkthrough — the full board set, so the Overview reads as a complete
// field operating system rather than one screen.
const overviewSlides: ProductSlide[] = [
  { src: `${BOARDS}/overview.webp`, alt: "Field Operations Platform overview board", label: "Overview" },
  { src: `${BOARDS}/problem-statement.webp`, alt: "Problem statement board", label: "Problem Statement" },
  { src: `${BOARDS}/personas.webp`, alt: "Technician personas board", label: "User Personas" },
  { src: `${BOARDS}/access-security.webp`, alt: "Access and security board", label: "Access & Security" },
  { src: `${BOARDS}/identity-verification.webp`, alt: "Identity verification board", label: "Identity Verification" },
  { src: `${BOARDS}/onboarding.webp`, alt: "Onboarding and personalization board", label: "Onboarding" },
  { src: `${BOARDS}/job-management.webp`, alt: "Job management board", label: "Job Management" },
  { src: `${BOARDS}/installation-workflow.webp`, alt: "Guided installation workflow board", label: "Installation Workflow" },
  { src: `${BOARDS}/payment.webp`, alt: "Payment and payout flow board", label: "Payment Flow" },
  { src: `${BOARDS}/completion.webp`, alt: "Job completion and feedback board", label: "Completion & Feedback" },
  { src: `${BOARDS}/operational-context.webp`, alt: "Operational context board with network scale", label: "Operational Context" },
  { src: `${BOARDS}/final-reflection.webp`, alt: "Final reflection board", label: "Final Reflection" }
];

// Spanish labels for the overview walkthrough (same boards, localized captions).
const overviewLabelsEs = [
  "Resumen",
  "Planteamiento del problema",
  "Perfiles de usuario",
  "Acceso y seguridad",
  "Verificación de identidad",
  "Onboarding",
  "Gestión de trabajos",
  "Flujo de instalación",
  "Flujo de pago",
  "Cierre y valoración",
  "Contexto operativo",
  "Reflexión final"
];

const overviewSlidesEs: ProductSlide[] = overviewSlides.map((slide, index) => ({
  ...slide,
  label: overviewLabelsEs[index]
}));

type Decision = {
  decision: string;
  problem: string;
  rationale: string;
  tradeoff: string;
  image: { src: string; alt: string };
};

// Field Operations key product decisions (offline-first, guided installation,
// trust/identity, centralized job management, payment in the workflow).
const decisionsEn: Decision[] = [
  {
    decision: "Workflows survive the dead zone.",
    problem:
      "The customer is buying satellite internet because coverage there is poor — so the product has to assume no signal at the exact moment of work.",
    rationale:
      "Every workflow is offline-first: progress, photo evidence, and completion are captured locally and reconciled when a connection returns. A technician never loses state or stares at a spinner mid-install — the app confirms the action and syncs later.",
    tradeoff:
      "More engineering complexity in local state and conflict resolution, accepted so the tool works where the job actually happens.",
    image: { src: `${BOARDS}/completion.webp`, alt: "Completion flow capturing photo evidence offline" }
  },
  {
    decision: "Installation runs as a recoverable state machine.",
    problem:
      "Installs rarely fail at step one; they fail in the middle — a blocked roof, a missing part, no signal.",
    rationale:
      "The workflow models progress as discrete states a technician can complete, pause, annotate, or flag, and the flow knows how to resume from any of them. A deviation becomes structured data instead of a phone call to dispatch.",
    tradeoff:
      "Modeled states cost more design and engineering than a free-form checklist and constrain edge cases not yet mapped. We accepted that rigidity because recoverability was worth more than flexibility.",
    image: { src: `${BOARDS}/installation-workflow.webp`, alt: "Installation workflow showing step states" }
  },
  {
    decision: "Trust is verified before the first job.",
    problem:
      "A stranger represents the brand on a customer's roof, so the network's integrity has to start at the door, not the install.",
    rationale:
      "Access, identity verification, and onboarding were designed as one gated sequence: a technician proves who they are, then is personalized into the work — not dropped into a feature set. Dispatch can't assign a job to an unverified installer.",
    tradeoff:
      "A heavier first-run experience, accepted because a failed-trust install costs far more than a few extra onboarding minutes.",
    image: { src: `${BOARDS}/identity-verification.webp`, alt: "Identity verification flow for technicians" }
  },
  {
    decision: "The pocket holds action; dispatch holds control.",
    problem: "How much job management actually belongs in a technician's pocket?",
    rationale:
      "Job views were stripped to what a technician acts on: today's sequence, each job's state, and completion evidence. Assignment logic and exception handling stayed with dispatch, which kept the mobile scope shippable by a small team.",
    tradeoff:
      "Some technician autonomy — reordering jobs, self-assignment — was deliberately left out of the first release to protect operational consistency.",
    image: { src: `${BOARDS}/job-management.webp`, alt: "Job management screens with status hierarchy" }
  },
  {
    decision: "Payment closes the job, inside the job.",
    problem:
      "Where should a technician collect and confirm payment — a separate app, or the workflow that completes the install?",
    rationale:
      "Earnings, payment capture, and payout status (Stripe, PayPal) live inside the job, not in a separate tool. The transaction becomes the natural last step of the work rather than an errand afterward, so nothing is left uncollected on site.",
    tradeoff:
      "Embedding payments widened compliance and integration scope, accepted because a job isn't done until it's paid — and splitting that across tools is where money and technicians get lost.",
    image: { src: `${BOARDS}/payment.webp`, alt: "Payment and payout flow with Stripe and PayPal" }
  }
];

const decisionsEs: Decision[] = [
  {
    decision: "Los flujos sobreviven a la zona sin cobertura.",
    problem:
      "El cliente compra internet por satélite porque la cobertura allí es mala, así que el producto tiene que dar por hecho que no habrá señal justo en el momento de trabajar.",
    rationale:
      "Cada flujo está pensado para funcionar primero sin conexión: el progreso, las fotos como evidencia y el cierre se guardan en local y se reconcilian cuando vuelve la conexión. El técnico nunca pierde el estado ni se queda mirando un indicador de carga a mitad de instalación: la app confirma la acción y sincroniza después.",
    tradeoff:
      "Más complejidad de ingeniería en el estado local y la resolución de conflictos, asumida para que la herramienta funcione donde realmente ocurre el trabajo.",
    image: decisionsEn[0].image
  },
  {
    decision: "La instalación funciona como una máquina de estados recuperable.",
    problem:
      "Las instalaciones rara vez fallan en el primer paso; fallan a mitad de camino: un tejado inaccesible, una pieza que falta, falta de señal.",
    rationale:
      "El flujo modela el progreso como estados discretos que el técnico puede completar, pausar, anotar o marcar, y sabe cómo reanudarse desde cualquiera de ellos. Una desviación se convierte en datos estructurados en lugar de una llamada al despacho.",
    tradeoff:
      "Los estados modelados cuestan más diseño e ingeniería que una lista libre y limitan los casos extremos que aún no se han mapeado. Aceptamos esa rigidez porque la recuperabilidad valía más que la flexibilidad.",
    image: decisionsEn[1].image
  },
  {
    decision: "La confianza se verifica antes del primer trabajo.",
    problem:
      "Un desconocido representa a la marca sobre el tejado de un cliente, así que la integridad de la red tiene que empezar en la puerta, no en la instalación.",
    rationale:
      "El acceso, la verificación de identidad y el onboarding se diseñaron como una única secuencia con control de acceso: el técnico demuestra quién es y luego se le adapta al trabajo, en lugar de soltarlo ante un montón de funciones. El despacho no puede asignar un trabajo a un instalador sin verificar.",
    tradeoff:
      "Una primera experiencia más pesada, asumida porque una instalación con la confianza rota cuesta mucho más que unos minutos extra de onboarding.",
    image: decisionsEn[2].image
  },
  {
    decision: "El técnico actúa; el despacho coordina.",
    problem: "¿Cuánta gestión de trabajos corresponde realmente al bolsillo de un técnico?",
    rationale:
      "Las vistas de trabajo se redujeron a aquello sobre lo que el técnico actúa: la secuencia de hoy, el estado de cada trabajo y la evidencia de cierre. La lógica de asignación y la gestión de excepciones se quedaron en el despacho, lo que mantuvo el alcance móvil abordable para un equipo pequeño.",
    tradeoff:
      "Parte de la autonomía del técnico —reordenar trabajos, autoasignarse— se dejó fuera de la primera versión a propósito para proteger la consistencia operativa.",
    image: decisionsEn[3].image
  },
  {
    decision: "Cobrar es el último paso del trabajo, no un trámite aparte.",
    problem:
      "¿Dónde debería un técnico cobrar y confirmar el pago: en una app aparte o en el mismo flujo que completa la instalación?",
    rationale:
      "Las ganancias, el cobro y el estado de los pagos (Stripe, PayPal) viven dentro del trabajo, no en una herramienta aparte. La transacción se convierte en el último paso natural del trabajo en lugar de un recado posterior, de modo que no queda nada por cobrar en el sitio.",
    tradeoff:
      "Integrar los pagos amplió el alcance de cumplimiento e integración, asumido porque un trabajo no está terminado hasta que está cobrado, y repartir eso entre varias herramientas es donde se pierden el dinero y los técnicos.",
    image: decisionsEn[4].image
  }
];

// Static UI copy + section heads, localized.
const COPY = {
  en: {
    roleLabel: "Role",
    timelineLabel: "Timeline",
    scopeLabel: "Scope",
    contextLabel: "Context",
    contextTitle: "A truck roll costs the same whether the install succeeds or fails.",
    fieldLabel: "The field is the spec",
    fieldTitle: "The hardest part of the spec is the field itself.",
    personasCaption:
      "The product had to work for technicians across the digital-fluency range, not just the most confident ones.",
    keyDecision: "Key Product Decision",
    tradeoffLabel: "Trade-off accepted: ",
    systemLabel: "System & workflows",
    systemTitle: "One pattern set, reused across every surface.",
    outcomeLabel: "Outcome",
    outcomeTitle: "What the design made possible.",
    measureNext: "What I'd measure next",
    viewPdf: "View Full Case Study (PDF) →",
    nextProject: "Next project"
  },
  es: {
    roleLabel: "Rol",
    timelineLabel: "Periodo",
    scopeLabel: "Alcance",
    contextLabel: "Contexto",
    contextTitle: "Una visita cuesta lo mismo tanto si la instalación sale bien como si falla.",
    fieldLabel: "El campo es la especificación",
    fieldTitle: "La parte más difícil de la especificación es el propio campo.",
    personasCaption:
      "El producto tenía que funcionar para técnicos de todo el rango de soltura digital, no solo para los más seguros.",
    keyDecision: "Decisión Clave de Producto",
    tradeoffLabel: "Concesión asumida: ",
    systemLabel: "Sistema y flujos",
    systemTitle: "Un único conjunto de patrones, reutilizado en cada superficie.",
    outcomeLabel: "Resultado",
    outcomeTitle: "Lo que el diseño hizo posible.",
    measureNext: "Qué mediría a continuación",
    viewPdf: "Ver el caso de estudio completo (PDF) →",
    nextProject: "Siguiente proyecto"
  }
} as const;

// Spanish narrative overriding the English fields stored in site-data.
const narrativeEs = {
  title: "Plataforma de Operaciones de Campo",
  summary:
    "Una plataforma móvil que guía a los técnicos de instalación de Starlink en la programación, los flujos de trabajo in situ y el cierre de cada instalación en condiciones reales de campo.",
  role: "Diseñador de Producto",
  period: "2024 - Actualidad",
  scope: "App móvil para técnicos: programación, instalaciones y cierre de trabajos",
  context: [
    "Install Pros realiza instalaciones de internet Starlink en los sectores residencial, comercial y móvil. La economía unitaria no perdona: desplazar a un técnico cuesta lo mismo tanto si la instalación sale bien como si falla, y cada llamada para resolver dudas pasa por un pequeño equipo de despacho.",
    "El negocio necesitaba que los técnicos completaran más instalaciones al día con menos escalados. No un portal, sino una herramienta operativa que mantenga el estado del trabajo para que el técnico no tenga que hacerlo."
  ],
  operatingConditions: [
    "La interfaz se usa de pie, a la intemperie, muchas veces con una sola mano, bajo el sol directo, entre una escalera y una conversación con el cliente. Las sesiones duran segundos, no minutos: el técnico consulta la siguiente acción y vuelve a guardar el teléfono.",
    "La conectividad es poco fiable por definición: el cliente compra internet por satélite precisamente porque la cobertura allí es mala. El producto tiene que dar por hecho que no habrá señal justo en el momento de trabajar."
  ],
  system: [
    "Los patrones de pantalla —chips de estado, action rows y step headers— se definieron una sola vez y se reutilizaron en las vistas de programación, instalación y trabajos. La intención era económica: ingeniería construye a partir de reglas en lugar de mockups, y el técnico nunca tiene que volver a aprender qué significa un color o una posición.",
    "Diseñar pensando en la implementación es lo que mantuvo el producto construible: desde entonces, cada pantalla nueva se ha montado a partir del conjunto de patrones existente en lugar de diseñarse desde cero."
  ],
  results: [
    "Los técnicos tienen una única acción siguiente, legible en cualquier estado del trabajo. El esfuerzo de búsqueda que exigía el proceso anterior desaparece del propio flujo.",
    "Las situaciones que se salen del guion se convierten en estados estructurados en lugar de llamadas al despacho, que es la diferencia entre una herramienta y una centralita.",
    "Ingeniería lanza nuevas pantallas a partir del conjunto de patrones establecido, sin un ciclo de diseño por pantalla."
  ],
  reflection:
    "Los trabajos ya se completan un 25% más rápido. Lo que todavía me falta medir es la tasa de revisitas —cuántas instalaciones obligan a volver—, porque esa es la prueba real de si los flujos guiados evitan errores y no solo aceleran el trabajo. También repensaría si los técnicos deberían poder reordenar sus propios trabajos: lo dejé fuera para mantener la consistencia, pero con equipos con experiencia quizá no tenga sentido."
};

function Figure({
  src,
  alt,
  width,
  height,
  caption
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}) {
  return (
    <figure className="mx-auto w-full max-w-[78rem]">
      <div className="editorial-image paper-tint overflow-hidden">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-full"
          sizes="(min-width: 1248px) 78rem, 100vw"
        />
      </div>
      {caption ? (
        <figcaption className="mt-4 max-w-2xl text-base leading-7 text-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

function SectionHead({ label, title, intro }: { label: string; title: string; intro?: string }) {
  return (
    <div className="max-w-2xl">
      <p className="section-label">{label}</p>
      <h2 className="mt-4 text-[clamp(1.7rem,2.8vw,2.4rem)] font-medium leading-[1.12] tracking-[-0.03em] text-text">
        {title}
      </h2>
      {intro ? <p className={`mt-6 ${PARA}`}>{intro}</p> : null}
    </div>
  );
}

function Section({ children }: { children: ReactNode }) {
  return (
    <section className="border-t border-line py-16 sm:py-24">
      <div className="shell">{children}</div>
    </section>
  );
}

export function FieldOperationsCaseStudy({
  project,
  nextProject,
  locale = "en"
}: {
  project: ProjectCaseStudy;
  nextProject?: { href: string; title: string };
  locale?: Locale;
}) {
  const data = project as ProductCaseStudy;
  const { outcome } = data;
  const isEs = locale === "es";
  const t = COPY[locale];

  const slides = isEs ? overviewSlidesEs : overviewSlides;
  const decisions = isEs ? decisionsEs : decisionsEn;
  const title = isEs ? narrativeEs.title : project.title;
  const summary = isEs ? narrativeEs.summary : project.summary;
  const role = isEs ? narrativeEs.role : project.role;
  const period = isEs ? narrativeEs.period : project.period;
  const scope = isEs ? narrativeEs.scope : project.scope;
  const context = isEs ? narrativeEs.context : data.context;
  const operatingConditions = isEs ? narrativeEs.operatingConditions : data.operatingConditions;
  const systemBody = isEs ? narrativeEs.system : data.system.body;
  const results = isEs ? narrativeEs.results : outcome.results;
  const reflection = isEs ? narrativeEs.reflection : outcome.reflection;

  return (
    <main id="main-content" tabIndex={-1} className="pb-8 pt-10 sm:pt-16">
      {/* Overview — hero + product walkthrough */}
      <section className="pb-12 pt-6 sm:pb-16">
        <div className="shell">
          <Reveal className="max-w-3xl">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="pill">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="mt-6 text-[clamp(2.2rem,4.4vw,3.2rem)] font-medium leading-[1.04] tracking-[-0.04em] text-text">
              {title}
            </h1>
            <p className={`mt-5 max-w-2xl ${PARA}`}>{summary}</p>

            <dl className="mt-10 grid gap-6 sm:grid-cols-3">
              {[
                [t.roleLabel, role],
                [t.timelineLabel, period],
                [t.scopeLabel, scope]
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="section-label">{label}</dt>
                  <dd className="mt-2 text-base text-text">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.08} className="mt-12">
            <ProductCarousel slides={slides} />
          </Reveal>
        </div>
      </section>

      {/* Context */}
      <Section>
        <SectionHead label={t.contextLabel} title={t.contextTitle} />
        <div className="mt-8 grid max-w-2xl gap-5">
          {context.map((paragraph) => (
            <p key={paragraph} className={PARA}>
              {paragraph}
            </p>
          ))}
        </div>
      </Section>

      {/* The field is the spec (operating conditions + personas) */}
      <Section>
        <SectionHead label={t.fieldLabel} title={t.fieldTitle} />
        <div className="mt-8 grid max-w-2xl gap-5">
          {operatingConditions.map((paragraph) => (
            <p key={paragraph} className={PARA}>
              {paragraph}
            </p>
          ))}
        </div>
        <Reveal delay={0.06} className="mt-14">
          <Figure
            src={`${BOARDS}/personas.webp`}
            alt="Technician personas across the digital-fluency range"
            width={2000}
            height={3281}
            caption={t.personasCaption}
          />
        </Reveal>
      </Section>

      {/* Key Product Decisions — independent chapters */}
      {decisions.map((block, index) => (
        <Section key={block.decision}>
          <Reveal className="max-w-2xl">
            <p className="text-[clamp(3.25rem,6vw,5rem)] font-bold leading-none tracking-[-0.05em] text-accent/20">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-4 text-[clamp(1.7rem,2.8vw,2.4rem)] font-medium leading-[1.12] tracking-[-0.03em] text-text">
              {block.decision}
            </h2>
            <p className="mt-8 text-[1.375rem] font-medium leading-[1.25] text-text sm:mt-11 sm:text-[1.875rem]">
              {block.problem}
            </p>
            <div className="mt-8 grid gap-5">
              <p className={PARA}>{block.rationale}</p>
              <p className={PARA}>
                <span className="font-medium text-text">{t.tradeoffLabel}</span>
                {block.tradeoff}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.06} className="mt-14">
            <Figure src={block.image.src} alt={block.image.alt} width={2000} height={1787} />
          </Reveal>
        </Section>
      ))}

      {/* System & workflows */}
      <Section>
        <SectionHead label={t.systemLabel} title={t.systemTitle} />
        <div className="mt-8 grid max-w-2xl gap-5">
          {systemBody.map((paragraph) => (
            <p key={paragraph} className={PARA}>
              {paragraph}
            </p>
          ))}
        </div>
      </Section>

      {/* Outcome */}
      <Section>
        <SectionHead label={t.outcomeLabel} title={t.outcomeTitle} />
        <Reveal delay={0.06} className="mt-12">
          <Figure
            src={`${BOARDS}/operational-context.webp`}
            alt="Operational context: 9,163 installations and over $7M processed across the network"
            width={2000}
            height={1787}
          />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {results.map((item) => (
            <Reveal key={item} className="editorial-card p-6">
              <p className="text-[1.0625rem] leading-7 text-muted">{item}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* What I'd measure next — promoted reflection */}
      <Section>
        <Reveal className="max-w-3xl">
          <p className="section-label">{t.measureNext}</p>
          <p className="mt-6 text-[clamp(1.5rem,2.4vw,2rem)] font-medium leading-[1.4] tracking-[-0.02em] text-text">
            {reflection}
          </p>
        </Reveal>

        {project.deckUrl || nextProject ? (
          <div className="mt-14 grid gap-8 border-t border-line pt-10">
            {project.deckUrl ? (
              <a
                href={project.deckUrl}
                className="inline-flex text-base text-muted underline decoration-line underline-offset-4 transition-colors duration-200 hover:text-text"
              >
                {t.viewPdf}
              </a>
            ) : null}
            {nextProject ? (
              <div>
                <p className="section-label">{t.nextProject}</p>
                <MagneticLink
                  href={nextProject.href}
                  className="mt-4 inline-flex text-2xl font-medium tracking-[-0.04em] text-text"
                >
                  {nextProject.title}
                </MagneticLink>
              </div>
            ) : null}
          </div>
        ) : null}
      </Section>
    </main>
  );
}
