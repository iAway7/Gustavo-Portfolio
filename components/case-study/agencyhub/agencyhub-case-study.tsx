import Image from "next/image";
import type { ReactNode } from "react";

import { MagneticLink } from "@/components/magnetic-link";
import { Reveal } from "@/components/reveal";
import {
  AgencyHubOverviewCarousel,
  type OverviewSlide
} from "@/components/case-study/agencyhub/overview-carousel";
import type { Locale } from "@/lib/i18n";
import type { ProductCaseStudy, ProjectCaseStudy } from "@/lib/site-data";

const IMG = "/projects/agencyhub";

// Overview walkthrough — the full design-process board set, so the Overview
// reads as a complete system: research, flows, personas, UI, and final screens.
const BOARDS = `${IMG}/shots/boards`;
const overviewSlides: OverviewSlide[] = [
  { src: `${BOARDS}/overview.webp`, alt: "AgencyHub project overview board", label: "Overview" },
  { src: `${BOARDS}/problem-statement.webp`, alt: "Problem statement board", label: "Problem Statement" },
  { src: `${BOARDS}/how-might-we.webp`, alt: "How Might We questions board", label: "How Might We" },
  { src: `${BOARDS}/design-process.png`, alt: "Five-phase design sprint process board", label: "Design Process" },
  { src: `${BOARDS}/personas-agency.webp`, alt: "Agency owner user persona board", label: "User Personas — Agency" },
  { src: `${BOARDS}/personas-provider.webp`, alt: "Service provider user persona board", label: "User Personas — Provider" },
  { src: `${BOARDS}/user-flow.webp`, alt: "Provider and agency user flows board", label: "User Flow" },
  { src: `${BOARDS}/lightning-demos.webp`, alt: "Lightning demos board with marketplace references", label: "Lightning Demos" },
  { src: `${BOARDS}/paper-sketches.webp`, alt: "Paper sketches of marketplace, cart, and checkout", label: "Paper Sketches" },
  { src: `${BOARDS}/wireframes.webp`, alt: "High-fidelity wireframes board", label: "High-Fidelity Wireframes" },
  { src: `${BOARDS}/typography.webp`, alt: "Typography system board", label: "Typography" },
  { src: `${BOARDS}/buttons.webp`, alt: "Button states board", label: "Buttons" },
  { src: `${BOARDS}/components.webp`, alt: "Component states board", label: "Components" },
  { src: `${BOARDS}/ui-colors.webp`, alt: "UI color system board with accessibility ratings", label: "UI Colors" },
  { src: `${BOARDS}/ui-showcase.webp`, alt: "Final UI showcase across marketplace, cart, and checkout", label: "UI Showcase" },
  { src: `${BOARDS}/final-reflection.webp`, alt: "Final reflection board", label: "Final Reflection" }
];

const overviewLabelsEs = [
  "Resumen",
  "Planteamiento del problema",
  "How Might We",
  "Proceso de diseño",
  "Perfiles — Agencia",
  "Perfiles — Proveedor",
  "Flujo de usuario",
  "Lightning Demos",
  "Bocetos en papel",
  "Wireframes de alta fidelidad",
  "Tipografía",
  "Botones",
  "Componentes",
  "Colores de UI",
  "Muestra de UI",
  "Reflexión final"
];

const overviewSlidesEs: OverviewSlide[] = overviewSlides.map((slide, index) => ({
  ...slide,
  label: overviewLabelsEs[index]
}));

// AgencyHub reading paragraph: ~24px desktop, scaling down on mobile, lh ~1.5.
const PARA = "text-[1.125rem] leading-[1.55] text-muted sm:text-[1.5rem] sm:leading-[1.5]";

// Static UI copy + section heads, localized.
const COPY = {
  en: {
    roleLabel: "Role",
    timelineLabel: "Timeline",
    scopeLabel: "Scope",
    contextLabel: "Context",
    contextTitle: "Agencies grow by saying yes — but vetting partners is a private struggle.",
    twoSidesLabel: "Two sides, three parties",
    twoSidesTitle: "The marketplace isn't just agency and provider.",
    twoSidesIntro:
      "The agency's own client never logs in — yet they pay, set requirements, and judge the result. Most of the hard decisions came from that triangle, not the marketplace.",
    processLabel: "Process",
    processTitle: "A five-phase design sprint, kept in view.",
    processIntro:
      "The work behind the product: from problem framing and lightning demos to sketches, wireframes, and the final system.",
    keyDecision: "Key Product Decision",
    tradeoffLabel: "Trade-off accepted: ",
    systemLabel: "System & workflows",
    systemTitle: "Four surfaces, one reusable system.",
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
    contextTitle: "Las agencias crecen diciendo que sí, pero verificar a los socios es una lucha en privado.",
    twoSidesLabel: "Dos partes, tres actores",
    twoSidesTitle: "El marketplace no es solo agencia y proveedor.",
    twoSidesIntro:
      "El cliente de la agencia nunca inicia sesión y, aun así, paga, define los requisitos y juzga el resultado. La mayoría de las decisiones difíciles salieron de ese triángulo, no del marketplace.",
    processLabel: "Proceso",
    processTitle: "Un design sprint de cinco fases, siempre a la vista.",
    processIntro:
      "El trabajo detrás del producto: desde el encuadre del problema y los lightning demos hasta los bocetos, los wireframes y el sistema final.",
    keyDecision: "Decisión Clave de Producto",
    tradeoffLabel: "Concesión asumida: ",
    systemLabel: "Sistema y flujos",
    systemTitle: "Cuatro superficies, un sistema reutilizable.",
    outcomeLabel: "Resultado",
    outcomeTitle: "Lo que el diseño hizo posible.",
    measureNext: "Qué mediría a continuación",
    viewPdf: "Ver el caso de estudio completo (PDF) →",
    nextProject: "Siguiente proyecto"
  }
} as const;

// Spanish narrative overriding the English fields stored in site-data.
const narrativeEs = {
  title: "AgencyHub",
  summary:
    "Un marketplace B2B donde las agencias digitales compran servicios white-label a proveedores verificados y los revenden a sus propios clientes.",
  role: "Diseñador UX/UI",
  period: "2020 - 2024",
  scope: "Marketplace, checkout, pedidos y herramientas para proveedores",
  context: [
    "Las agencias digitales crecen diciendo que sí. Cuando un cliente pide SEO y la agencia solo hace ads, la agencia tiene tres opciones: contratar, rechazar o buscar un socio white-label. La mayoría elige socios, y la mayoría los encuentra a base de prueba y error. Cada colaboración fallida cuesta dinero dos veces: lo que se gasta de más y el cliente que se va.",
    "La apuesta de AgencyHub era que la verificación podía ser una función del producto en lugar de una lucha en privado. Para que eso funcionara, el producto tenía que servir a dos partes con necesidades opuestas: los proveedores quieren publicar rápido; las agencias quieren fiarse de lo que encuentran."
  ],
  operatingConditions: [
    "Sobre el papel, esto es un marketplace estándar: los proveedores publican y prestan servicios, las agencias exploran y compran. Los flujos parecían normales hasta que un detalle lo cambió todo: la agencia no es el cliente final. Compra un servicio, le aplica un margen y se lo entrega a su propio cliente.",
    "Esa tercera parte nunca inicia sesión. Pero paga, aporta los requisitos y juzga el resultado. La mayoría de las decisiones de diseño más difíciles salieron de ese triángulo, no del marketplace en sí."
  ],
  usersVisualCaption:
    "El mapa del sistema con sus dos recorridos: la ruta del proveedor que termina en un control de aprobación, y la ruta de la agencia, donde el checkout puede desviarse hacia el cliente antes de que empiece la entrega.",
  decisions: [
    {
      question: "¿Quién paga en el checkout?",
      decision: "El checkout puede terminar con un enlace de pago en lugar de un pago.",
      rationale:
        "Un checkout normal da por hecho que paga quien compra. Aquí, la agencia a menudo necesita que su cliente pague primero. Por eso el checkout ofrece dos finales: pagar ahora o crear un enlace de pago y enviárselo al cliente. El pedido arranca cuando el cliente paga, y la agencia nunca adelanta dinero por un trabajo que ya ha vendido.",
      tradeoff:
        "Ahora un pedido puede existir en un estado de «esperando al cliente». Eso hizo más compleja la lógica de estados para todas las demás partes del sistema: los pedidos, las notificaciones y la entrega tuvieron que entender una compra que aún no está pagada.",
      caption:
        "La decisión en una sola pantalla: tarjeta, saldo o un enlace de pago enviado al cliente. Al elegir Enlace de pago, la acción principal pasa a ser «Crear un enlace de pago»."
    },
    {
      question: "¿Cómo entra la confianza en el catálogo?",
      decision: "Ningún servicio se publica sin aprobación.",
      rationale:
        "Los proveedores pueden crear una ficha en minutos, pero publicarla requiere una revisión. Esto es más lento para los proveedores y añade trabajo operativo a la plataforma. Asumimos ambos costes, porque un marketplace que lista a todo el mundo no es más que otro problema de búsqueda, y lo único que se les prometió a las agencias es que lo que encuentran ya está verificado.",
      tradeoff:
        "Un crecimiento del catálogo más lento, asumido a cambio de la única promesa que la competencia no podía hacer.",
      caption:
        "Lo que una agencia explora ya está aprobado: categorías curadas con el alcance y los precios de partida por delante, porque la verificación ocurrió antes de que la ficha se publicara."
    },
    {
      question: "¿Dónde encaja el cliente en la entrega?",
      decision: "La comunicación vive dentro del pedido, con espacio para tres partes.",
      rationale:
        "Los requisitos, las revisiones y las actualizaciones fluyen por un espacio compartido asociado al pedido —entre agencia, proveedor y, cuando hace falta, el cliente— en lugar de cadenas de correo que la plataforma no puede ver. La plataforma solo puede resolver disputas sobre el trabajo que puede observar, y el pedido es el único objeto que comparten las tres partes.",
      tradeoff:
        "Integrar la comunicación dentro del producto es caro, y pedirle a la gente que abandone el correo es un riesgo real de adopción. La apuesta fue que tener el contexto anclado al pedido compensa el coste de cambiar de hábito.",
      caption:
        "El pedido como objeto compartido: plan, cuota de alta, cantidad y totales que se arrastran desde el carrito hasta la entrega, para que cada conversación tenga la misma fuente de verdad."
    }
  ],
  system: [
    "El marketplace, el carrito, los pedidos y la tienda del proveedor se construyeron a partir de un único conjunto de componentes y reglas de layout. Para un único diseñador con un plazo de tres meses, esto no era disciplina estética: era la única forma de lanzar cuatro superficies coherentes a la vez.",
    "El mismo sistema absorbió los estados peculiares del proyecto —pedidos a la espera de un cliente, fichas a la espera de aprobación— sin inventar patrones nuevos para cada uno."
  ],
  results: [
    "El diseño hizo posible un comportamiento nuevo: una agencia puede vender un servicio que no presta, con el pago, los requisitos y la entrega gestionados por la plataforma en lugar de por hojas de cálculo y correos.",
    "La verificación pasó de ser una lucha privada de cada agencia a una función de la plataforma. El control de aprobación es la promesa de confianza del producto, garantizada por diseño.",
    "Cuatro superficies lanzadas en tres meses a partir de un solo sistema de componentes, por un único diseñador."
  ],
  reflection:
    "Si continuara este trabajo, instrumentaría las dos decisiones más arriesgadas: cuántos checkouts terminan en un enlace de pago, que muestra si el flujo con el tercero es demanda real, y cuánto tarda la aprobación de un proveedor, porque la confianza solo es una función si no asfixia la oferta."
};

/** Large, uncropped evidence image at its natural aspect ratio. */
function Figure({
  src,
  alt,
  width,
  height,
  caption,
  priority = false
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  priority?: boolean;
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
          priority={priority}
        />
      </div>
      {caption ? (
        <figcaption className="mt-4 max-w-2xl text-base leading-7 text-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

/** Left-aligned section header: label, moderate headline, optional intro. */
function SectionHead({
  label,
  title,
  intro
}: {
  label: string;
  title: string;
  intro?: string;
}) {
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

export function AgencyHubCaseStudy({
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
  const title = isEs ? narrativeEs.title : project.title;
  const summary = isEs ? narrativeEs.summary : project.summary;
  const role = isEs ? narrativeEs.role : project.role;
  const period = isEs ? narrativeEs.period : project.period;
  const scope = isEs ? narrativeEs.scope : project.scope;
  const context = isEs ? narrativeEs.context : data.context;
  const operatingConditions = isEs ? narrativeEs.operatingConditions : data.operatingConditions;
  const usersVisualCaption = isEs ? narrativeEs.usersVisualCaption : data.usersVisual?.caption;
  const systemBody = isEs ? narrativeEs.system : data.system.body;
  const results = isEs ? narrativeEs.results : outcome.results;
  const reflection = isEs ? narrativeEs.reflection : outcome.reflection;

  // Spanish overrides the decision copy while reusing the same images/structure.
  const decisions = isEs
    ? data.decisions.map((block, index) => {
        const tr = narrativeEs.decisions[index];
        return {
          ...block,
          question: tr.question,
          decision: tr.decision,
          rationale: tr.rationale,
          tradeoff: tr.tradeoff,
          visual: block.visual ? { ...block.visual, caption: tr.caption } : block.visual
        };
      })
    : data.decisions;

  const decisionShots = [
    { width: 2400, height: 1500 },
    { width: 2400, height: 1500 },
    { width: 2400, height: 1500 }
  ];

  return (
    <main id="main-content" tabIndex={-1} className="pb-8 pt-10 sm:pt-16">
      {/* Hero — left aligned */}
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
            <AgencyHubOverviewCarousel slides={slides} />
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

      {/* Two sides, three parties */}
      <Section>
        <SectionHead label={t.twoSidesLabel} title={t.twoSidesTitle} intro={t.twoSidesIntro} />
        <div className="mt-8 grid max-w-2xl gap-5">
          {operatingConditions.map((paragraph) => (
            <p key={paragraph} className={PARA}>
              {paragraph}
            </p>
          ))}
        </div>
        <Reveal delay={0.06} className="mt-14">
          <Figure
            src={`${BOARDS}/user-flow.webp`}
            alt="AgencyHub provider and agency user flows"
            width={2000}
            height={3028}
            caption={usersVisualCaption}
          />
        </Reveal>
      </Section>

      {/* Process */}
      <Section>
        <SectionHead label={t.processLabel} title={t.processTitle} intro={t.processIntro} />
        <Reveal delay={0.06} className="mt-14">
          <Figure
            src={`${BOARDS}/design-process.png`}
            alt="AgencyHub design sprint process across five phases"
            width={2000}
            height={1708}
          />
        </Reveal>
      </Section>

      {/* Three independent decision chapters: Problem → Decision → Evidence */}
      {decisions.map((block, index) => {
        const shot = decisionShots[index] ?? { width: 2400, height: 1500 };
        const image = block.visual && block.visual.visual.type === "image" ? block.visual.visual : null;
        return (
          <Section key={block.question}>
            <Reveal className="max-w-2xl">
              <p className="text-[clamp(3.25rem,6vw,5rem)] font-bold leading-none tracking-[-0.05em] text-accent/20">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="section-label mt-5">{block.question}</p>
              <h2 className="mt-4 text-[clamp(1.7rem,2.8vw,2.4rem)] font-medium leading-[1.12] tracking-[-0.03em] text-text">
                {block.decision}
              </h2>
              <div className="mt-8 grid gap-5">
                <p className={PARA}>{block.rationale}</p>
                <p className={PARA}>
                  <span className="font-medium text-text">{t.tradeoffLabel}</span>
                  {block.tradeoff}
                </p>
              </div>
            </Reveal>
            {image ? (
              <Reveal delay={0.06} className="mt-14">
                <Figure
                  src={image.src}
                  alt={image.alt}
                  width={shot.width}
                  height={shot.height}
                  caption={block.visual?.caption}
                />
              </Reveal>
            ) : null}
          </Section>
        );
      })}

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
        <Reveal delay={0.06} className="mt-14">
          <Figure
            src={`${BOARDS}/ui-showcase.webp`}
            alt="AgencyHub final UI across marketplace, cart, and checkout"
            width={2000}
            height={2837}
          />
        </Reveal>
      </Section>

      {/* Outcome */}
      <Section>
        <SectionHead label={t.outcomeLabel} title={t.outcomeTitle} />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {results.map((item) => (
            <Reveal key={item} className="editorial-card p-6">
              <p className="text-[1.0625rem] leading-7 text-muted">{item}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Reflection — promoted, prominent section */}
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
