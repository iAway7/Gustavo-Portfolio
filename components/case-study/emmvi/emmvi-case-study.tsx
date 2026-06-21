import type { ReactNode } from "react";

import { BrowserFrame } from "@/components/case-study/emmvi/browser-frame";
import { LeadCaptureFlow } from "@/components/case-study/emmvi/lead-capture-flow";
import {
  ProductSurfaceCarousel,
  type SurfaceSlide
} from "@/components/case-study/emmvi/product-surface-carousel";
import { CaseStudyHero, GlanceSection } from "@/components/case-study/sections";
import { MagneticLink } from "@/components/magnetic-link";
import { Reveal } from "@/components/reveal";
import type { Locale } from "@/lib/i18n";
import type { ProjectCaseStudy } from "@/lib/site-data";

type EmmviCaseStudyProps = {
  project: ProjectCaseStudy;
  nextProject?: {
    href: string;
    title: string;
  };
  locale?: Locale;
};

const IMG = "/projects/emmvi";

const surfaceSlides: SurfaceSlide[] = [
  {
    src: `${IMG}/homepage-full.png`,
    alt: "Emmvi homepage",
    label: "Homepage",
    url: "emmvi.com",
    intent:
      "Resolves the buyer's first question — is this for me? — with one outcome-led promise, recognizable client logos, and language that mirrors the visitor before offering the path forward."
  },
  {
    src: `${IMG}/service-website-design.png`,
    alt: "Emmvi website design service page",
    label: "Website Design",
    url: "emmvi.com/website-design",
    intent:
      "Opens on the business result and treats the craft as supporting evidence, so value is read before deliverables ever appear."
  },
  {
    src: `${IMG}/service-seo.png`,
    alt: "Emmvi SEO service page",
    label: "SEO",
    url: "emmvi.com/seo",
    intent:
      "Frames search as compounding growth rather than a checklist, keeping the same outcome-first template that holds the system together."
  },
  {
    src: `${IMG}/service-ppc.png`,
    alt: "Emmvi PPC service page",
    label: "PPC",
    url: "emmvi.com/ppc",
    intent:
      "Positions paid media as measured acquisition, pairing the promise with proof so spend reads as investment, not risk."
  },
  {
    src: `${IMG}/service-email.png`,
    alt: "Emmvi email marketing service page",
    label: "Email",
    url: "emmvi.com/email-marketing",
    intent:
      "Presents retention as the quiet engine of growth, completing a service set that argues each offer in the same disciplined voice."
  },
  {
    src: `${IMG}/about-full.png`,
    alt: "Emmvi about page",
    label: "About",
    url: "emmvi.com/about",
    intent:
      "Builds credibility on clarity, not adjectives: a one-line mission, three evenly weighted principles, and a tonal shift that marks what the studio stands for."
  },
  {
    src: `${IMG}/contact-full.png`,
    alt: "Emmvi contact page",
    label: "Contact",
    url: "emmvi.com/contact",
    intent:
      "Reframes the form as a conversation — asking which service and what's needed — so qualification begins in the input itself."
  }
];

const surfaceLabelsEs = ["Inicio", "Diseño Web", "SEO", "PPC", "Email", "Nosotros", "Contacto"];
const surfaceIntentsEs = [
  "Resuelve la primera pregunta del comprador —¿esto es para mí?— con una sola promesa orientada al resultado, logos de clientes reconocibles y un lenguaje que refleja al visitante antes de ofrecer el siguiente paso.",
  "Abre con el resultado de negocio y trata el oficio como evidencia de apoyo, de modo que el valor se lee antes de que aparezca ningún entregable.",
  "Plantea el posicionamiento en buscadores como un crecimiento que se acumula, no como una lista de tareas, manteniendo la misma plantilla orientada al resultado que cohesiona el sistema.",
  "Posiciona los medios de pago como adquisición medida, acompañando la promesa con pruebas para que el gasto se lea como inversión, no como riesgo.",
  "Presenta la retención como el motor silencioso del crecimiento, completando un conjunto de servicios que defiende cada oferta con la misma voz disciplinada.",
  "Construye credibilidad sobre la claridad, no sobre los adjetivos: una misión de una línea, tres principios con el mismo peso y un cambio de tono que marca lo que defiende el estudio.",
  "Replantea el formulario como una conversación —pregunta qué servicio y qué se necesita— para que la cualificación empiece en el propio campo."
];

const surfaceSlidesEs: SurfaceSlide[] = surfaceSlides.map((slide, index) => ({
  ...slide,
  label: surfaceLabelsEs[index],
  intent: surfaceIntentsEs[index]
}));

const COPY = {
  en: {
    productSurfaceEyebrow: "Product Surface",
    productSurfaceTitle: "The full surface, page by page.",
    productSurfaceIntro:
      "Emmvi is a complete digital platform, not a stack of marketing pages — a connected set of surfaces that carry one offer from first impression to qualified conversation. Move through the major pages below.",
    homepageEyebrow: "Homepage",
    homepageTitle: "One promise, made legible in a single screen.",
    homepageBody:
      "The homepage answers the hardest question first — is this for me? A single outcome-led headline carries the offer, recognizable client logos supply instant credibility, and a “Does this sound familiar?” section mirrors the visitor’s own words before pointing to the next step.",
    homepageMoves: [
      "Outcome-led headline in place of a feature list",
      "Client logos as immediate, low-effort credibility",
      "Objection-mirroring copy before the first ask"
    ],
    servicesEyebrow: "Services",
    servicesTitle: "Service pages that sell change, not deliverables.",
    servicesBody:
      "Website Design, SEO, PPC, and Email Marketing each open on the business result they produce and treat the method as supporting evidence. A shared template keeps the system coherent while letting every offer argue its own value in the same disciplined voice.",
    servicesMoves: [
      "A consistent, outcome-first template across all four services",
      "Benefit framing positioned ahead of process detail",
      "A conversion module that reinforces the single next step"
    ],
    aboutEyebrow: "About",
    aboutTitle: "Credibility built on clarity, not adjectives.",
    aboutBody:
      "“Streamlining entrepreneurial journeys” states the studio’s mission in one line, then three principles — expertise, client-centricity, transparency — ground it. A dark mission band interrupts the rhythm to signal the values at the core of the offer.",
    aboutMoves: [
      "A mission a visitor can repeat in one sentence",
      "Three principles, evenly weighted, no hierarchy games",
      "A tonal shift used to mark what actually matters"
    ],
    contactEyebrow: "Contact",
    contactTitle: "A form that starts qualification, not just collection.",
    contactBody:
      "“Talk to our specialists” reframes the form as a conversation. Asking which service and what’s needed begins qualification inside the input itself, while a testimonial placed beside the fields lowers the cost of hitting submit.",
    contactMoves: [
      "Service and intent captured up front",
      "Proof positioned right next to the form",
      "One unambiguous action, no competing CTAs"
    ],
    leadEyebrow: "Lead Capture Workflow",
    leadTitle: "A quiet system behind the conversation.",
    leadIntro:
      "Automation is supporting infrastructure here, not the product. A single linear path moves a form submission to a human reply without dropping context along the way.",
    outcomeEyebrow: "Outcome",
    outcomeTitle: "A repeatable growth system, owned end to end.",
    reflectionLabel: "Reflection",
    viewPdf: "View Full Case Study (PDF) →",
    nextProject: "Next project"
  },
  es: {
    productSurfaceEyebrow: "Superficie del producto",
    productSurfaceTitle: "Toda la superficie, página a página.",
    productSurfaceIntro:
      "Emmvi es una plataforma digital completa, no un montón de páginas de marketing: un conjunto conectado de superficies que llevan una sola oferta desde la primera impresión hasta una conversación cualificada. Recorre las páginas principales abajo.",
    homepageEyebrow: "Inicio",
    homepageTitle: "Una promesa, legible en una sola pantalla.",
    homepageBody:
      "La página de inicio responde primero la pregunta más difícil: ¿esto es para mí? Un único titular orientado al resultado carga con la oferta, los logos de clientes reconocibles aportan credibilidad instantánea y una sección de «¿te suena de algo?» refleja las palabras del propio visitante antes de señalar el siguiente paso.",
    homepageMoves: [
      "Titular orientado al resultado en lugar de una lista de funciones",
      "Logos de clientes como credibilidad inmediata y sin esfuerzo",
      "Texto que refleja las objeciones antes de la primera petición"
    ],
    servicesEyebrow: "Servicios",
    servicesTitle: "Páginas de servicio que venden el cambio, no los entregables.",
    servicesBody:
      "Diseño Web, SEO, PPC y Email Marketing abren cada uno con el resultado de negocio que producen y tratan el método como evidencia de apoyo. Una plantilla compartida mantiene el sistema coherente y, a la vez, deja que cada oferta defienda su propio valor con la misma voz disciplinada.",
    servicesMoves: [
      "Una plantilla consistente y orientada al resultado en los cuatro servicios",
      "El beneficio por delante del detalle del proceso",
      "Un módulo de conversión que refuerza el único siguiente paso"
    ],
    aboutEyebrow: "Nosotros",
    aboutTitle: "Credibilidad construida sobre la claridad, no sobre los adjetivos.",
    aboutBody:
      "«Simplificar el camino de los emprendedores» enuncia la misión del estudio en una línea, y luego tres principios —experiencia, foco en el cliente y transparencia— la sostienen. Una franja oscura de misión interrumpe el ritmo para señalar los valores que están en el centro de la oferta.",
    aboutMoves: [
      "Una misión que el visitante puede repetir en una frase",
      "Tres principios con el mismo peso, sin juegos de jerarquía",
      "Un cambio de tono para marcar lo que de verdad importa"
    ],
    contactEyebrow: "Contacto",
    contactTitle: "Un formulario que empieza a cualificar, no solo a recoger datos.",
    contactBody:
      "«Habla con nuestros especialistas» replantea el formulario como una conversación. Preguntar qué servicio y qué se necesita empieza la cualificación dentro del propio campo, mientras que un testimonio junto a los campos reduce el coste de pulsar enviar.",
    contactMoves: [
      "El servicio y la intención se capturan desde el principio",
      "La prueba social colocada justo al lado del formulario",
      "Una sola acción inequívoca, sin CTAs que compitan"
    ],
    leadEyebrow: "Flujo de captación de leads",
    leadTitle: "Un sistema silencioso detrás de la conversación.",
    leadIntro:
      "Aquí la automatización es infraestructura de apoyo, no el producto. Un único camino lineal lleva el envío de un formulario hasta una respuesta humana sin perder el contexto por el camino.",
    outcomeEyebrow: "Resultado",
    outcomeTitle: "Un sistema de crecimiento repetible, gestionado de principio a fin.",
    reflectionLabel: "Reflexión",
    viewPdf: "Ver el caso de estudio completo (PDF) →",
    nextProject: "Siguiente proyecto"
  }
} as const;

const narrativeEs = {
  hero: {
    title: "Emmvi",
    summary:
      "Trabajo en un estudio para ayudar a las empresas de servicios a crecer: posicionamiento, sistemas web e infraestructura de conversión abordados como un único problema de diseño.",
    role: "Cofundador · Diseño y Estrategia",
    period: "2023 - Actualidad",
    scope: "Posicionamiento, sistema web y embudo de conversión"
  },
  glance: {
    challenge:
      "Las empresas de servicios no fracasan por falta de web; fracasan por falta de una oferta clara. Emmvi existe para arreglar primero el posicionamiento y dejar que el diseño lo ejecute.",
    role:
      "Cofundador: diseño de la oferta, estrategia digital, UX/UI y entrega, responsable del resultado de negocio, no del mockup.",
    outcome:
      "Un sistema de crecimiento repetible —del posicionamiento al mensaje, al sitio y al embudo— aplicado de principio a fin, con responsabilidad de fundador sobre lo que produce."
  },
  results: [
    "Un método que funciona y conecta el posicionamiento con las decisiones de interfaz, el mismo sistema aplicado en el trabajo web que aparece en otras partes de este portafolio.",
    "La responsabilidad de fundador mantiene las decisiones de diseño atadas al alcance, al coste de entrega y a los ingresos, en lugar de a los entregables.",
    "Rango demostrado en todo el stack de crecimiento: marca, mensaje, sistema web y embudo."
  ],
  reflection:
    "Emmvi es el proyecto donde sostengo cada esquina del triángulo (usuarios, negocio y tecnología) sin nadie a quien pasarle un problema. La disciplina que obliga —decidir qué no construir— es lo más transferible que me ha enseñado."
};

/** Full-width section shell — eyebrow, heading, optional intro, then content. */
function EmmviSection({
  eyebrow,
  title,
  intro,
  children
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-line">
      <div className="shell py-16 sm:py-20">
        <Reveal className="max-w-3xl">
          <p className="section-label">{eyebrow}</p>
          <h2 className="section-title mt-4">{title}</h2>
          {intro ? <p className="body-copy mt-5 max-w-2xl">{intro}</p> : null}
        </Reveal>
        <div className="mt-10 sm:mt-12">{children}</div>
      </div>
    </section>
  );
}

/** Alternating two-column layout that fills the full content width. */
function EditorialSplit({
  media,
  reversed = false,
  children
}: {
  media: ReactNode;
  reversed?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
      <Reveal className={reversed ? "lg:order-2" : undefined}>{children}</Reveal>
      <Reveal delay={0.06} className={reversed ? "lg:order-1" : undefined}>
        {media}
      </Reveal>
    </div>
  );
}

function DesignMoves({ moves }: { moves: string[] }) {
  return (
    <ul className="mt-8 grid gap-3">
      {moves.map((move) => (
        <li
          key={move}
          className="flex gap-3 border-t border-line pt-3 text-sm leading-6 text-muted"
        >
          <span aria-hidden="true" className="text-text">
            —
          </span>
          <span>{move}</span>
        </li>
      ))}
    </ul>
  );
}

export function EmmviCaseStudy({ project, nextProject, locale = "en" }: EmmviCaseStudyProps) {
  const { outcome } = project;
  const isEs = locale === "es";
  const c = COPY[locale];

  const slides = isEs ? surfaceSlidesEs : surfaceSlides;
  const heroContent = isEs ? narrativeEs.hero : undefined;
  const glance = isEs ? narrativeEs.glance : project.glance;
  const results = isEs ? narrativeEs.results : outcome.results;
  const reflection = isEs ? narrativeEs.reflection : outcome.reflection;

  return (
    <main id="main-content" tabIndex={-1} className="pb-8 pt-10 sm:pt-14">
      <CaseStudyHero project={project} locale={locale} content={heroContent} />
      <GlanceSection glance={glance} locale={locale} />

      {/* Product Surface — the full platform at a glance. */}
      <EmmviSection
        eyebrow={c.productSurfaceEyebrow}
        title={c.productSurfaceTitle}
        intro={c.productSurfaceIntro}
      >
        <ProductSurfaceCarousel slides={slides} />
      </EmmviSection>

      {/* Homepage deep-dive. */}
      <EmmviSection eyebrow={c.homepageEyebrow} title={c.homepageTitle}>
        <EditorialSplit
          media={
            <BrowserFrame
              src={`${IMG}/homepage-full.png`}
              alt="Emmvi homepage hero and proof section"
              url="emmvi.com"
              aspect="aspect-[16/12]"
            />
          }
        >
          <p className="body-copy">{c.homepageBody}</p>
          <DesignMoves moves={[...c.homepageMoves]} />
        </EditorialSplit>
      </EmmviSection>

      {/* Services deep-dive (reversed). */}
      <EmmviSection eyebrow={c.servicesEyebrow} title={c.servicesTitle}>
        <EditorialSplit
          reversed
          media={
            <BrowserFrame
              src={`${IMG}/service-website-design.png`}
              alt="Emmvi website design service page"
              url="emmvi.com/website-design"
              aspect="aspect-[16/12]"
            />
          }
        >
          <p className="body-copy">{c.servicesBody}</p>
          <DesignMoves moves={[...c.servicesMoves]} />
        </EditorialSplit>
      </EmmviSection>

      {/* About deep-dive. */}
      <EmmviSection eyebrow={c.aboutEyebrow} title={c.aboutTitle}>
        <EditorialSplit
          media={
            <BrowserFrame
              src={`${IMG}/about-full.png`}
              alt="Emmvi about page with mission and principles"
              url="emmvi.com/about"
              aspect="aspect-[16/12]"
            />
          }
        >
          <p className="body-copy">{c.aboutBody}</p>
          <DesignMoves moves={[...c.aboutMoves]} />
        </EditorialSplit>
      </EmmviSection>

      {/* Contact deep-dive (reversed). */}
      <EmmviSection eyebrow={c.contactEyebrow} title={c.contactTitle}>
        <EditorialSplit
          reversed
          media={
            <BrowserFrame
              src={`${IMG}/contact-full.png`}
              alt="Emmvi contact page with lead form and testimonial"
              url="emmvi.com/contact"
              aspect="aspect-[16/13]"
            />
          }
        >
          <p className="body-copy">{c.contactBody}</p>
          <DesignMoves moves={[...c.contactMoves]} />
        </EditorialSplit>
      </EmmviSection>

      {/* Lead Capture Workflow — supporting system. */}
      <EmmviSection eyebrow={c.leadEyebrow} title={c.leadTitle} intro={c.leadIntro}>
        <LeadCaptureFlow
          locale={locale}
          screenshot={{
            src: `${IMG}/discord-automation.png`,
            alt: "Discord channel showing a structured Emmvi lead notification posted by a bot"
          }}
        />
      </EmmviSection>

      {/* Outcome & reflection — full width. */}
      <section className="border-t border-line">
        <div className="shell py-16 sm:py-20">
          <Reveal className="max-w-3xl">
            <p className="section-label">{c.outcomeEyebrow}</p>
            <h2 className="section-title mt-4">{c.outcomeTitle}</h2>
          </Reveal>

          <Reveal delay={0.06} className="mt-10 grid gap-5 md:grid-cols-3">
            {results.map((item) => (
              <div key={item} className="editorial-card p-6">
                <p className="text-base leading-7 text-muted">{item}</p>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.1} className="mt-12 max-w-3xl">
            <p className="section-label">{c.reflectionLabel}</p>
            <p className="body-copy mt-4">{reflection}</p>
          </Reveal>

          <Reveal delay={0.14} className="mt-12 grid gap-8">
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
          </Reveal>
        </div>
      </section>
    </main>
  );
}
