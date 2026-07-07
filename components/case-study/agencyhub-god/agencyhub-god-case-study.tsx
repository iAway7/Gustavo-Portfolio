import Image from "next/image";
import type { ReactNode } from "react";

import { MagneticLink } from "@/components/magnetic-link";
import { Reveal } from "@/components/reveal";
import type { Locale } from "@/lib/i18n";
import {
  frameworkSteps,
  frameworkStepsEs,
  type ProductCaseStudy,
  type ProjectCaseStudy
} from "@/lib/site-data";

const BOARDS = "/projects/agencyhub/shots/boards";

// Reading paragraph, same scale as the official case studies.
const PARA = "text-[1.125rem] leading-[1.55] text-muted sm:text-[1.5rem] sm:leading-[1.5]";

/* ------------------------------------------------------------------ */
/* Building blocks                                                     */
/* ------------------------------------------------------------------ */

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
    <figure className="w-full">
      <div className="editorial-image paper-tint overflow-hidden">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-full"
          sizes="(min-width: 1440px) 88rem, 100vw"
        />
      </div>
      {caption ? (
        <figcaption className="mt-4 max-w-2xl text-base leading-7 text-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

/** Section header: oversized step number, question-led label, statement title. */
function StepHead({
  step,
  label,
  title,
  intro
}: {
  step?: string;
  label: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="max-w-2xl">
      {step ? (
        <p className="step-number" aria-hidden="true">
          {step}
        </p>
      ) : null}
      <p className={`section-label ${step ? "mt-5" : ""}`}>{label}</p>
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

/* ------------------------------------------------------------------ */
/* Localized copy                                                      */
/* ------------------------------------------------------------------ */

const COPY = {
  en: {
    summary:
      "A two-sided marketplace where agencies buy white-label services from vetted providers. This version of the case study walks through how I actually work: the questions I ask, the order I ask them in, and the artifacts each one produced.",
    roleLabel: "Role",
    timelineLabel: "Timeline",
    scopeLabel: "Scope",
    processCaption:
      "The spine of the project: a five-phase sprint, each phase opened by a question rather than a deliverable.",
    challengeLabel: "The Challenge",
    challengeTitle: "Agencies grow by saying yes — and every yes is a risk they absorb alone.",
    challengeCards: [
      {
        label: "Trust is the product",
        body: "The entire value proposition is that agencies stop vetting vendors themselves. Every catalog and listing decision had to defend that promise, even at the cost of growth."
      },
      {
        label: "Three parties, one transaction",
        body: "Payment can come from someone who isn't the buyer and never logs in. Orders, notifications, and checkout all inherit that complexity."
      },
      {
        label: "One designer, four surfaces",
        body: "Marketplace, cart, orders, and provider tools had to ship together, which made a shared component system a necessity, not a preference."
      }
    ],
    whyLabel: "Why — what problem are we solving?",
    whyTitle: "Before drawing anything: does this product deserve to exist?",
    whyIntro:
      "Every project starts with the same discipline: write the problem down until it stops being vague. If the problem statement can't name who loses money and why, the design that follows is decoration.",
    whyCaption:
      "The problem statement, written before any UI: failed partnerships cost agencies twice — the wasted spend, and the client who leaves.",
    whoLabel: "Who — who are we designing for?",
    whoTitle: "Two users with opposite incentives, and a third party who never logs in.",
    whoIntro:
      "Personas here weren't a formality. The agency owner and the service provider want contradictory things from the same catalog — speed to list versus confidence in what's listed. Naming that tension early is what made the later trade-offs decidable.",
    whoCaptionAgency:
      "The agency owner: growth by delegation, terrified of putting an unvetted vendor in front of their client.",
    whoCaptionProvider:
      "The provider: wants to list fast and fill capacity — friction in publishing feels like lost revenue.",
    reframeLabel: "Reframe — how might we make trust a feature?",
    reframeTitle: "Turning the challenge into questions the team could design against.",
    reframeIntro:
      "How Might We notes convert complaints into briefs. The useful ones aren't the obvious ones — 'HMW make vetting a platform feature' reframed trust from a support cost into the core product.",
    reframeCaption:
      "HMW notes, clustered and voted. The winning cluster became the approval gate that defines the product.",
    journeyLabel: "When & Where — where does the money actually move?",
    journeyTitle: "Mapping the journey exposed the flow nobody had scoped.",
    journeyIntro:
      "Walking both sides of the transaction end to end surfaced the design problem that shaped everything after: the agency buys, but its client often pays. The user flow made that detour visible before a single screen existed.",
    journeyCaption:
      "Two paths, one system: the provider route ends in an approval gate; the agency route can detour through the client before fulfillment begins.",
    whatLabel: "What — why isn't an existing marketplace enough?",
    whatTitle: "Studying what exists before deciding what to build.",
    whatIntro:
      "Lightning demos are cheap due diligence: an hour of looking at how Fiverr, Upwork, and vertical marketplaces solve listing, trust, and checkout — then being honest about why none of them fit a reseller triangle.",
    whatCaption:
      "Reference marketplaces, annotated for what to borrow and what to reject: none of them model a buyer who resells.",
    solveLabel: "Solve — what's the fewest screens that support the work?",
    solveTitle: "Paper first. Fidelity is earned, not assumed.",
    solveIntro:
      "Fast sketches are where bad ideas get to die cheaply. Marketplace, cart, and checkout were sketched on paper, argued over, and only the survivors were rebuilt as high-fidelity wireframes.",
    solveCaptionSketches:
      "Speedy sketching: minutes per concept, so the checkout-versus-payment-link question got explored wide before going deep.",
    solveCaptionWireframes:
      "The surviving concepts at high fidelity — structure locked before visual design, so review conversations stayed about flow, not color.",
    systemLabel: "The System",
    systemTitle: "One system behind every surface.",
    howLabel: "How — how do we know it worked?",
    howTitle: "A design isn't finished when it ships. It's finished when it's measured.",
    howIntro:
      "The honest version: I moved on before the metrics matured, so this section makes no claims I can't back. Instead, it shows what shipped and the instrumentation plan I'd use to judge it.",
    measureNext: "What I'd measure next",
    frameworkLabel: "The Framework",
    frameworkTitle: "The questions I carry into every project.",
    frameworkIntro:
      "This process isn't specific to AgencyHub. It's a question sequence I apply to any product problem — because a repeatable process is what makes design judgment transferable between projects.",
    viewPdf: "View Full Case Study (PDF) →",
    nextProject: "Next project"
  },
  es: {
    summary:
      "Un marketplace de dos lados donde las agencias compran servicios white-label a proveedores verificados. Esta versión del caso recorre cómo trabajo realmente: las preguntas que hago, el orden en que las hago y los artefactos que produjo cada una.",
    roleLabel: "Rol",
    timelineLabel: "Periodo",
    scopeLabel: "Alcance",
    processCaption:
      "La columna vertebral del proyecto: un sprint de cinco fases, cada una abierta por una pregunta en lugar de un entregable.",
    challengeLabel: "El Desafío",
    challengeTitle: "Las agencias crecen diciendo que sí — y cada sí es un riesgo que absorben solas.",
    challengeCards: [
      {
        label: "La confianza es el producto",
        body: "Toda la propuesta de valor es que las agencias dejen de verificar proveedores por su cuenta. Cada decisión de catálogo y de publicación tenía que defender esa promesa, incluso a costa del crecimiento."
      },
      {
        label: "Tres actores, una transacción",
        body: "El pago puede venir de alguien que no es el comprador y que nunca inicia sesión. Los pedidos, las notificaciones y el checkout heredan esa complejidad."
      },
      {
        label: "Un solo diseñador, todo el producto",
        body: "El marketplace, el carrito, los pedidos y las herramientas del proveedor tenían que salir juntos. Un sistema de componentes compartido no era una preferencia: era la única manera de llegar."
      }
    ],
    whyLabel: "Why — ¿qué problema estamos resolviendo?",
    whyTitle: "Antes de dibujar nada: ¿este producto merece existir?",
    whyIntro:
      "Cada proyecto empieza con la misma disciplina: escribir el problema hasta que deja de ser vago. Si el planteamiento no puede nombrar quién pierde dinero y por qué, el diseño que sigue es decoración.",
    whyCaption:
      "El planteamiento del problema, escrito antes de cualquier UI: una colaboración fallida cuesta dos veces — lo que se gasta de más y el cliente que se va.",
    whoLabel: "Who — ¿para quién diseñamos?",
    whoTitle: "Dos usuarios con incentivos opuestos, y un tercero que nunca inicia sesión.",
    whoIntro:
      "Las personas aquí no fueron una formalidad. La agencia y el proveedor quieren cosas contradictorias del mismo catálogo — rapidez para publicar frente a confianza en lo publicado. Nombrar esa tensión temprano es lo que hizo decidibles los trade-offs posteriores.",
    whoCaptionAgency:
      "La agencia: crecer delegando, con terror a poner un proveedor sin verificar frente a su cliente.",
    whoCaptionProvider:
      "El proveedor: quiere publicar rápido y llenar su capacidad — la fricción al publicar se siente como ingresos perdidos.",
    reframeLabel: "Reframe — ¿cómo podríamos hacer de la confianza una funcionalidad?",
    reframeTitle: "Convertir el desafío en preguntas contra las que el equipo pudiera diseñar.",
    reframeIntro:
      "Las notas de How Might We convierten quejas en briefs. Las útiles no son las obvias: 'HMW hacer de la verificación una funcionalidad de la plataforma' reencuadró la confianza de coste de soporte a núcleo del producto.",
    reframeCaption:
      "Notas HMW, agrupadas y votadas. El grupo ganador se convirtió en el control de aprobación que define el producto.",
    journeyLabel: "When & Where — ¿por dónde se mueve realmente el dinero?",
    journeyTitle: "Mapear el recorrido expuso el flujo que nadie había contemplado.",
    journeyIntro:
      "Recorrer ambos lados de la transacción de punta a punta reveló el problema de diseño que definió todo lo demás: la agencia compra, pero su cliente muchas veces paga. El user flow hizo visible ese desvío antes de que existiera una sola pantalla.",
    journeyCaption:
      "Dos rutas, un sistema: la del proveedor termina en un control de aprobación; la de la agencia puede desviarse hacia el cliente antes de que empiece la entrega.",
    whatLabel: "What — ¿por qué no basta un marketplace existente?",
    whatTitle: "Estudiar lo que existe antes de decidir qué construir.",
    whatIntro:
      "Los lightning demos son due diligence barata: una hora mirando cómo Fiverr, Upwork y marketplaces verticales resuelven publicación, confianza y checkout — y ser honesto sobre por qué ninguno encaja en un triángulo de reventa.",
    whatCaption:
      "Marketplaces de referencia, anotados con qué tomar y qué descartar: ninguno modela a un comprador que revende.",
    solveLabel: "Solve — ¿cuál es el mínimo de pantallas que sostiene el trabajo?",
    solveTitle: "Primero papel. La fidelidad se gana, no se asume.",
    solveIntro:
      "Los bocetos rápidos son donde las malas ideas mueren barato. El marketplace, el carrito y el checkout se bocetaron en papel, se discutieron, y solo las mejores ideas pasaron a wireframes de alta fidelidad.",
    solveCaptionSketches:
      "Bocetos veloces: minutos por concepto, para explorar en amplitud la pregunta del checkout frente al enlace de pago antes de profundizar.",
    solveCaptionWireframes:
      "Las ideas validadas, ya en alta fidelidad: la estructura se definió antes del diseño visual, para que las revisiones se centraran en el flujo y no en el color.",
    systemLabel: "El Sistema",
    systemTitle: "Un solo sistema para todo el producto.",
    howLabel: "How — ¿cómo sabemos que funcionó?",
    howTitle: "Un diseño no está terminado cuando se lanza. Está terminado cuando se mide.",
    howIntro:
      "La versión honesta: me fui antes de que las métricas maduraran, así que esta sección no reclama nada que no pueda respaldar. Muestra lo que se lanzó y el plan de instrumentación que usaría para juzgarlo.",
    measureNext: "Qué mediría a continuación",
    frameworkLabel: "El Framework",
    frameworkTitle: "Las preguntas que llevo a cada proyecto.",
    frameworkIntro:
      "Este proceso no es específico de AgencyHub. Es una secuencia de preguntas que aplico a cualquier problema de producto — porque un proceso repetible es lo que hace transferible el criterio de diseño entre proyectos.",
    viewPdf: "Ver el caso de estudio completo (PDF) →",
    nextProject: "Siguiente proyecto"
  }
} as const;

// Spanish narrative overriding the English fields stored in site-data.
const narrativeEs = {
  role: "Diseñador UX/UI",
  period: "2020 - 2024",
  scope: "Marketplace, checkout, pedidos y herramientas para proveedores",
  context: [
    "Las agencias digitales crecen diciendo que sí. Cuando un cliente pide SEO y la agencia solo hace ads, la agencia tiene tres opciones: contratar, rechazar o buscar un socio white-label. La mayoría elige socios, y la mayoría los encuentra a base de prueba y error. Cada colaboración fallida cuesta dinero dos veces: lo que se gasta de más y el cliente que se va.",
    "La apuesta de AgencyHub era que la verificación podía ser una función del producto en lugar de una lucha en privado. Para que eso funcionara, el producto tenía que servir a dos partes con necesidades opuestas: los proveedores quieren publicar rápido; las agencias quieren fiarse de lo que encuentran."
  ],
  system: [
    "El marketplace, el carrito, los pedidos y la tienda del proveedor comparten una misma librería de componentes y las mismas reglas de layout. Siendo el único diseñador, no era una cuestión estética: era la única manera de que las cuatro áreas del producto salieran con un diseño consistente.",
    "Esa misma librería resolvió también los casos especiales del producto —un pedido esperando a que pague el cliente, un servicio pendiente de aprobación— sin tener que diseñar componentes nuevos para cada situación."
  ],
  results: [
    "El diseño hizo posible un comportamiento nuevo: una agencia puede vender un servicio que no presta, con el pago, los requisitos y la entrega gestionados por la plataforma en lugar de hojas de cálculo y correos.",
    "La verificación pasó de ser una lucha privada de cada agencia a una funcionalidad de la plataforma. El control de aprobación es la promesa de confianza del producto, garantizada por diseño.",
    "Las cuatro áreas del producto se lanzaron a partir de una sola librería de componentes, diseñada por una sola persona."
  ],
  reflection:
    "Si continuara este trabajo, instrumentaría las dos decisiones más arriesgadas: cuántos checkouts terminan en un enlace de pago, que muestra si el flujo del tercero es demanda real, y cuánto tarda la aprobación de proveedores, porque la confianza solo es una funcionalidad si no estrangula la oferta."
};

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function AgencyHubGodCaseStudy({
  project,
  nextProject,
  locale = "en"
}: {
  project: ProjectCaseStudy;
  nextProject?: { href: string; title: string };
  locale?: Locale;
}) {
  const data = project as ProductCaseStudy;
  const isEs = locale === "es";
  const c = COPY[locale];

  const role = isEs ? narrativeEs.role : project.role;
  const period = isEs ? narrativeEs.period : project.period;
  const scope = isEs ? narrativeEs.scope : project.scope;
  const context = isEs ? narrativeEs.context : data.context;
  const systemBody = isEs ? narrativeEs.system : data.system.body;
  const results = isEs ? narrativeEs.results : data.outcome.results;
  const reflection = isEs ? narrativeEs.reflection : data.outcome.reflection;
  const framework = isEs ? frameworkStepsEs : frameworkSteps;

  return (
    <main id="main-content" tabIndex={-1} className="pb-8 pt-10 sm:pt-16">
      {/* Hero */}
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
              AgencyHub
            </h1>
            <p className={`mt-5 max-w-2xl ${PARA}`}>{c.summary}</p>

            <dl className="mt-10 grid gap-6 sm:grid-cols-3">
              {[
                [c.roleLabel, role],
                [c.timelineLabel, period],
                [c.scopeLabel, scope]
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="section-label">{label}</dt>
                  <dd className="mt-2 text-base text-text">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.08} className="mt-14">
            <Figure
              src={`${BOARDS}/design-process.png`}
              alt="Five-phase design sprint process board"
              width={2576}
              height={1632}
              caption={c.processCaption}
            />
          </Reveal>
        </div>
      </section>

      {/* 01 — The Challenge */}
      <Section>
        <StepHead step="01" label={c.challengeLabel} title={c.challengeTitle} />
        <div className="mt-8 grid max-w-2xl gap-5">
          {context.map((paragraph) => (
            <p key={paragraph} className={PARA}>
              {paragraph}
            </p>
          ))}
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {c.challengeCards.map((card, index) => (
            <Reveal key={card.label} delay={index * 0.06} className="editorial-card p-6">
              <p className="section-label">{card.label}</p>
              <p className="mt-4 text-base leading-7 text-muted">{card.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 02 — Why */}
      <Section>
        <StepHead step="02" label={c.whyLabel} title={c.whyTitle} intro={c.whyIntro} />
        <Reveal delay={0.06} className="mt-14">
          <Figure
            src={`${BOARDS}/problem-statement.webp`}
            alt="Problem statement and solution board"
            width={2000}
            height={1708}
            caption={c.whyCaption}
          />
        </Reveal>
      </Section>

      {/* 03 — Who */}
      <Section>
        <StepHead step="03" label={c.whoLabel} title={c.whoTitle} intro={c.whoIntro} />
        <Reveal delay={0.06} className="mt-14">
          <Figure
            src={`${BOARDS}/personas-agency.webp`}
            alt="Agency owner user persona board"
            width={2000}
            height={2672}
            caption={c.whoCaptionAgency}
          />
        </Reveal>
        <Reveal delay={0.06} className="mt-10">
          <Figure
            src={`${BOARDS}/personas-provider.webp`}
            alt="Service provider user persona board"
            width={2000}
            height={2031}
            caption={c.whoCaptionProvider}
          />
        </Reveal>
      </Section>

      {/* 04 — Reframe */}
      <Section>
        <StepHead step="04" label={c.reframeLabel} title={c.reframeTitle} intro={c.reframeIntro} />
        <Reveal delay={0.06} className="mt-14">
          <Figure
            src={`${BOARDS}/how-might-we.webp`}
            alt="How Might We questions board with categorization"
            width={2000}
            height={1922}
            caption={c.reframeCaption}
          />
        </Reveal>
      </Section>

      {/* 05 — The journey */}
      <Section>
        <StepHead step="05" label={c.journeyLabel} title={c.journeyTitle} intro={c.journeyIntro} />
        <Reveal delay={0.06} className="mt-14">
          <Figure
            src={`${BOARDS}/user-flow.webp`}
            alt="Provider and agency user flows including approval and payment link paths"
            width={2000}
            height={3028}
            caption={c.journeyCaption}
          />
        </Reveal>
      </Section>

      {/* 06 — What exists */}
      <Section>
        <StepHead step="06" label={c.whatLabel} title={c.whatTitle} intro={c.whatIntro} />
        <Reveal delay={0.06} className="mt-14">
          <Figure
            src={`${BOARDS}/lightning-demos.webp`}
            alt="Lightning demos board with marketplace references"
            width={2000}
            height={2874}
            caption={c.whatCaption}
          />
        </Reveal>
      </Section>

      {/* 07 — Solve */}
      <Section>
        <StepHead step="07" label={c.solveLabel} title={c.solveTitle} intro={c.solveIntro} />
        <Reveal delay={0.06} className="mt-14">
          <Figure
            src={`${BOARDS}/paper-sketches.webp`}
            alt="Paper sketches of marketplace, cart, and checkout concepts"
            width={2000}
            height={1780}
            caption={c.solveCaptionSketches}
          />
        </Reveal>
        <Reveal delay={0.06} className="mt-10">
          <Figure
            src={`${BOARDS}/wireframes.webp`}
            alt="High-fidelity wireframes of marketplace, cart, and checkout"
            width={2000}
            height={2225}
            caption={c.solveCaptionWireframes}
          />
        </Reveal>
      </Section>

      {/* 08 — The shipped system */}
      <Section>
        <StepHead step="08" label={c.systemLabel} title={c.systemTitle} />
        <div className="mt-8 grid max-w-2xl gap-5">
          {systemBody.map((paragraph) => (
            <p key={paragraph} className={PARA}>
              {paragraph}
            </p>
          ))}
        </div>
        <Reveal delay={0.06} className="mt-14">
          <Figure
            src={`${BOARDS}/ui-showcase.webp`}
            alt="Final UI showcase across marketplace, cart, and checkout"
            width={2000}
            height={2837}
          />
        </Reveal>
      </Section>

      {/* 09 — How: measurement */}
      <Section>
        <StepHead step="09" label={c.howLabel} title={c.howTitle} intro={c.howIntro} />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {results.map((item) => (
            <Reveal key={item} className="editorial-card p-6">
              <p className="text-[1.0625rem] leading-7 text-muted">{item}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.06} className="mt-12 max-w-3xl">
          <p className="section-label">{c.measureNext}</p>
          <p className="mt-6 text-[clamp(1.5rem,2.4vw,2rem)] font-medium leading-[1.4] tracking-[-0.02em] text-text">
            {reflection}
          </p>
        </Reveal>
      </Section>

      {/* 10 — The framework */}
      <Section>
        <StepHead label={c.frameworkLabel} title={c.frameworkTitle} intro={c.frameworkIntro} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {framework.map((step, index) => (
            <Reveal key={step.phase} delay={index * 0.05} className="editorial-card p-6">
              <p className="section-label">{step.phase}</p>
              <p className="mt-2 text-lg font-medium text-text">{step.goal}</p>
              <ul className="mt-4 grid gap-2">
                {step.questions.map((question) => (
                  <li key={question} className="text-base leading-7 text-muted">
                    {question}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        {project.deckUrl || nextProject ? (
          <div className="mt-14 grid gap-8 border-t border-line pt-10">
            {project.deckUrl ? (
              <a
                href={project.deckUrl}
                className="inline-flex text-base text-muted underline decoration-line underline-offset-4 transition-colors duration-200 hover:text-text"
              >
                {c.viewPdf}
              </a>
            ) : null}
            {nextProject ? (
              <div>
                <p className="section-label">{c.nextProject}</p>
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
