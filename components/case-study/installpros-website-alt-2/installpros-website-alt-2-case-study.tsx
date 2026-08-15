import Image from "next/image";
import type { ReactNode } from "react";

import {
  AgencyHubOverviewCarousel as ProductCarousel,
  type OverviewSlide as ProductSlide
} from "@/components/case-study/agencyhub/overview-carousel";
import { BrowserFrame } from "@/components/case-study/emmvi/browser-frame";
import { GlanceSection } from "@/components/case-study/sections";
import { MagneticLink } from "@/components/magnetic-link";
import { Reveal } from "@/components/reveal";
import { localizedPath, type Locale } from "@/lib/i18n";
import type { CaseStudyGlance, ProjectCaseStudy } from "@/lib/site-data";

const IMG = "/projects/installpros-website/alt2";
const EVIDENCE = `${IMG}/evidence`;

// Same reading paragraph scale as the other case studies.
const PARA = "text-[1.125rem] leading-[1.55] text-muted sm:text-[1.5rem] sm:leading-[1.5]";

// This case study is a self-contained iteration: hero meta and glance are
// defined here (not pulled from the marketing-led project record) so the story
// reads as product design driven by research, not a site walkthrough.
const HERO = {
  en: {
    tags: ["Product Design", "Customer Research", "Conversion"],
    title: "InstallPros",
    summary:
      "I designed the InstallPros website from scratch — not as a visual exercise, but as the answer to one question the support inbox kept asking: why do people hesitate before booking an installation?",
    role: "Product Designer",
    timeline: "2024 — Present",
    scope: "Research, product decisions & web system — U.S."
  },
  es: {
    tags: ["Diseño de Producto", "Investigación de clientes", "Conversión"],
    title: "InstallPros",
    summary:
      "Diseñé la web de InstallPros desde cero, no como un ejercicio visual, sino como respuesta a la pregunta que la bandeja de soporte repetía una y otra vez: ¿por qué la gente duda antes de reservar una instalación?",
    role: "Diseñador de Producto",
    timeline: "2024 — Actualidad",
    scope: "Investigación, decisiones de producto y sistema web — EE. UU."
  }
} as const;

const GLANCE: Record<Locale, CaseStudyGlance> = {
  en: {
    challenge:
      "InstallPros could install Starlink anywhere, but visitors stalled before booking. The job was to find what created the hesitation and design it out — starting from evidence, not aesthetics.",
    role:
      "Sole Product Designer. I built a research workflow over 300+ support conversations, turned the patterns into product principles, and designed the site that acted on them.",
    outcome:
      "A website structured around certainty: availability, trust, and the next step are resolved in the order customers actually ask for them — before the form, not after."
  },
  es: {
    challenge:
      "InstallPros podía instalar Starlink en cualquier sitio, pero los visitantes se frenaban antes de reservar. El trabajo era encontrar qué generaba esa duda y diseñarla fuera, partiendo de la evidencia, no de la estética.",
    role:
      "Único Diseñador de Producto. Construí un flujo de investigación sobre más de 300 conversaciones de soporte, convertí los patrones en principios de producto y diseñé el sitio que actuaba sobre ellos.",
    outcome:
      "Una web estructurada en torno a la certeza: la disponibilidad, la confianza y el siguiente paso se resuelven en el orden en que los clientes realmente los piden, antes del formulario, no después."
  }
};

type QuestionTheme = { label: string; questions: string[]; insight: string };

const QUESTION_THEMES: Record<Locale, QuestionTheme[]> = {
  en: [
    {
      label: "Payment",
      questions: [
        "How much does installation cost?",
        "Can I see pricing before I schedule?",
        "What are the payment options? Do you offer financing?",
        "Why do I have to book before I get a quote?"
      ],
      insight:
        "The highest-volume category. People were hitting pricing uncertainty before they were ready to commit — and a hidden price reads as a risk, not a quote."
    },
    {
      label: "Availability",
      questions: [
        "Do you serve my area? Do you install in my state?",
        "Can you install on a metal roof? On a boat?",
        "Will this actually work where I live?"
      ],
      insight:
        "Availability is validated before scheduling. Customers first need confidence that InstallPros can help them at all — coverage is the real first question."
    },
    {
      label: "Scheduling",
      questions: [
        "How quickly can someone come out?",
        "What happens after I submit the form?",
        "How long does the installation take?"
      ],
      insight:
        "People aren't chasing megabits. They're chasing fast resolution of a painful problem — the speed they care about is how quickly it gets handled."
    }
  ],
  es: [
    {
      label: "Pago",
      questions: [
        "¿Cuánto cuesta la instalación?",
        "¿Puedo ver el precio antes de reservar?",
        "¿Qué opciones de pago hay? ¿Ofrecéis financiación?",
        "¿Por qué tengo que reservar antes de recibir un presupuesto?"
      ],
      insight:
        "La categoría con más volumen. La gente se topaba con la incertidumbre del precio antes de estar lista para comprometerse, y un precio oculto se lee como un riesgo, no como un presupuesto."
    },
    {
      label: "Disponibilidad",
      questions: [
        "¿Dais servicio en mi zona? ¿Instaláis en mi estado?",
        "¿Podéis instalar en un tejado de metal? ¿En un barco?",
        "¿Esto funcionará de verdad donde vivo?"
      ],
      insight:
        "La disponibilidad se valida antes de reservar. Los clientes primero necesitan la seguridad de que InstallPros puede ayudarlos siquiera: la cobertura es la verdadera primera pregunta."
    },
    {
      label: "Reserva",
      questions: [
        "¿Con qué rapidez puede venir alguien?",
        "¿Qué pasa después de enviar el formulario?",
        "¿Cuánto dura la instalación?"
      ],
      insight:
        "La gente no persigue megabits. Persigue resolver rápido un problema que les duele: la rapidez que les importa es lo pronto que se soluciona."
    }
  ]
};

type Persona = { name: string; traits: string; need: string };

const PERSONAS: Record<Locale, Persona[]> = {
  en: [
    {
      name: "The frustrated rural homeowner",
      traits: "Non-technical, risk-averse, tired of unreliable internet.",
      need: "Wants reliability and someone to handle the whole thing — not a spec sheet."
    },
    {
      name: "The remote worker under pressure",
      traits: "Internet affects their income, so every day offline costs them.",
      need: "Values responsiveness, speed, and certainty that the problem is being solved now."
    }
  ],
  es: [
    {
      name: "El propietario rural frustrado",
      traits: "Poco técnico, reacio al riesgo y cansado de un internet poco fiable.",
      need: "Quiere fiabilidad y que alguien se encargue de todo, no una ficha técnica."
    },
    {
      name: "El teletrabajador bajo presión",
      traits: "El internet afecta a sus ingresos, así que cada día sin conexión le cuesta dinero.",
      need: "Valora la capacidad de respuesta, la rapidez y la certeza de que el problema se está resolviendo ahora."
    }
  ]
};

type Insight = { kicker: string; statement: string; body: string };

const INSIGHTS: Record<Locale, Insight[]> = {
  en: [
    {
      kicker: "Insight 01",
      statement: "Customers aren't buying internet. They're buying certainty.",
      body: "The strongest pattern across conversations wasn't technical — it was uncertainty. People wanted to know who is coming, when, what it costs, whether their area is covered, and whether it will be done right. Reassurance was the product."
    },
    {
      kicker: "Insight 02",
      statement: "Availability comes before almost everything.",
      body: "Before pricing, before features, before scheduling, the question was “Can you help me where I live?” Coverage confidence is the gate every other decision sits behind — so it had to be answered immediately."
    },
    {
      kicker: "Insight 03",
      statement: "Trust beats technical specifications.",
      body: "People rarely asked about Mbps. They asked about reviews, legitimacy, professionalism, and installation quality. The site had to sell trust before it sold features."
    },
    {
      kicker: "Insight 04",
      statement: "Authority first, speed second.",
      body: "Customers do care about speed — but as quick scheduling, communication, and resolution, not raw megabits. So the promise leads with the outcome they want — fast, reliable internet — and immediately names the real wedge: getting it without the installation headache. The professional, done-for-you install is what makes that speed believable."
    }
  ],
  es: [
    {
      kicker: "Insight 01",
      statement: "Los clientes no compran internet. Compran certeza.",
      body: "El patrón más fuerte en las conversaciones no era técnico: era la incertidumbre. La gente quería saber quién viene, cuándo, cuánto cuesta, si su zona tiene cobertura y si lo van a hacer bien. La tranquilidad era el producto."
    },
    {
      kicker: "Insight 02",
      statement: "La disponibilidad va antes que casi todo.",
      body: "Antes que el precio, antes que las funciones, antes que la reserva, la pregunta era «¿podéis ayudarme donde vivo?». La seguridad sobre la cobertura es la puerta detrás de la que están todas las demás decisiones, así que había que responderla de inmediato."
    },
    {
      kicker: "Insight 03",
      statement: "La confianza gana a las especificaciones técnicas.",
      body: "La gente casi nunca preguntaba por los Mbps. Preguntaba por las reseñas, la legitimidad, la profesionalidad y la calidad de la instalación. El sitio tenía que vender confianza antes que funciones."
    },
    {
      kicker: "Insight 04",
      statement: "Primero autoridad, después rapidez.",
      body: "A los clientes sí les importa la rapidez, pero entendida como reserva, comunicación y resolución rápidas, no como megabits a secas. Por eso la promesa empieza por el resultado que quieren —internet rápido y fiable— y nombra de inmediato la verdadera palanca: conseguirlo sin el dolor de cabeza de la instalación. La instalación profesional, hecha por ti, es lo que hace creíble esa rapidez."
    }
  ]
};

type Principle = { title: string; body: string };

const PRINCIPLES: Record<Locale, Principle[]> = {
  en: [
    {
      title: "Reduce uncertainty early",
      body: "Answer the unspoken questions — cost signals, coverage, what happens next — before asking for anything."
    },
    {
      title: "Validate availability immediately",
      body: "Make “can you help me where I live?” the first interaction, not a buried step."
    },
    {
      title: "Build trust before selling features",
      body: "Lead with proof and professionalism; treat specifications as support, not the pitch."
    },
    {
      title: "Make the next step obvious",
      body: "One clear action, repeated at decision points, so no one has to hunt for how to move forward."
    },
    {
      title: "Design for mobile scanning",
      body: "Most visitors arrive on a phone, mid-frustration. Structure for fast scanning, not slow reading."
    }
  ],
  es: [
    {
      title: "Reducir la incertidumbre pronto",
      body: "Responder las preguntas no dichas —señales de precio, cobertura, qué pasa después— antes de pedir nada."
    },
    {
      title: "Validar la disponibilidad de inmediato",
      body: "Hacer de «¿podéis ayudarme donde vivo?» la primera interacción, no un paso escondido."
    },
    {
      title: "Generar confianza antes de vender funciones",
      body: "Empezar por las pruebas y la profesionalidad; tratar las especificaciones como apoyo, no como el argumento."
    },
    {
      title: "Hacer obvio el siguiente paso",
      body: "Una acción clara, repetida en los puntos de decisión, para que nadie tenga que buscar cómo avanzar."
    },
    {
      title: "Diseñar para escanear en móvil",
      body: "La mayoría llega desde el móvil, en plena frustración. Estructurar para escanear rápido, no para leer despacio."
    }
  ]
};

type DecisionItem = {
  eyebrow: string;
  title: string;
  body: string;
  image: { src: string; alt: string };
  imageCaption?: string;
  supportingArtifacts?: { src: string; alt: string; caption: string }[];
};

const DECISIONS: Record<Locale, DecisionItem[]> = {
  en: [
    {
      eyebrow: "Availability checker in the hero",
      title: "The first thing the page does is answer the first question.",
      body: "Because customers asked about coverage before anything else, the hero opens on a single positioning line and a zip-code availability check. Confidence about “can you help me?” is resolved in the first screen, before pricing or features are even introduced.",
      image: { src: `${EVIDENCE}/availability-texas.png`, alt: "Availability validation flow confirming service is available in Texas" },
      imageCaption: "Availability becomes a product response, not just a marketing claim."
    },
    {
      eyebrow: "Coverage as proof",
      title: "Show the footprint, then let them check it.",
      body: "Coverage doubts were answered twice: a national footprint with hard numbers establishes that InstallPros operates at scale, and a “Find My Installer” check turns that claim into a personal, location-specific answer.",
      image: { src: `${IMG}/coverage-v2.webp`, alt: "Nationwide coverage section with stats and service map" }
    },
    {
      eyebrow: "Sell certainty, not speed",
      title: "Frame the offer as a problem handled end to end.",
      body: "Service framing leads with an all-in-one, done-for-you promise, same-week scheduling, and clear upfront pricing — the certainty signals the inbox kept asking for — instead of technical performance claims.",
      image: { src: `${EVIDENCE}/quote-screen.png`, alt: "Quote flow showing a Starlink installation quote of $899" },
      imageCaption: "Pricing is surfaced as a concrete answer before commitment, not hidden behind a booking request.",
      supportingArtifacts: [
        {
          src: `${EVIDENCE}/scheduling-flow.png`,
          alt: "Scheduling flow asking when works best with preferred day and time selection",
          caption:
            "The same research insight continues into the next step: same-week installation becomes a visible scheduling preference flow instead of a vague promise."
        }
      ]
    },
    {
      eyebrow: "Authority before features",
      title: "Make professionalism the headline.",
      body: "The installation story leads with customized setup, complete installation, and quality of work — positioning InstallPros as the team that does it right the first time. Trust is established before any feature has to do the convincing.",
      image: { src: `${IMG}/installation.webp`, alt: "Professional installation section emphasizing quality and process" }
    }
  ],
  es: [
    {
      eyebrow: "Comprobador de disponibilidad en el hero",
      title: "Lo primero que hace la página es responder la primera pregunta.",
      body: "Como los clientes preguntaban por la cobertura antes que por nada, el hero abre con una única frase de posicionamiento y una comprobación de disponibilidad por código postal. La seguridad sobre «¿podéis ayudarme?» se resuelve en la primera pantalla, antes incluso de presentar el precio o las funciones.",
      image: { src: `${EVIDENCE}/availability-texas.png`, alt: "Availability validation flow confirming service is available in Texas" },
      imageCaption: "La disponibilidad se convierte en una respuesta del producto, no en una simple promesa de marketing."
    },
    {
      eyebrow: "La cobertura como prueba",
      title: "Mostrar el alcance y luego dejar que lo comprueben.",
      body: "Las dudas sobre la cobertura se respondían dos veces: un alcance nacional con cifras concretas demuestra que InstallPros opera a gran escala, y una comprobación de «encuentra mi instalador» convierte esa afirmación en una respuesta personal y específica para cada ubicación.",
      image: { src: `${IMG}/coverage-v2.webp`, alt: "Nationwide coverage section with stats and service map" }
    },
    {
      eyebrow: "Vender certeza, no rapidez",
      title: "Plantear la oferta como un problema resuelto de principio a fin.",
      body: "El planteamiento del servicio empieza por una promesa todo-en-uno y hecha por ti, reserva en la misma semana y un precio claro por adelantado —las señales de certeza que la bandeja pedía una y otra vez— en lugar de afirmaciones técnicas de rendimiento.",
      image: { src: `${EVIDENCE}/quote-screen.png`, alt: "Quote flow showing a Starlink installation quote of $899" },
      imageCaption: "El precio aparece como una respuesta concreta antes del compromiso, no escondido detrás de una solicitud de reserva.",
      supportingArtifacts: [
        {
          src: `${EVIDENCE}/scheduling-flow.png`,
          alt: "Scheduling flow asking when works best with preferred day and time selection",
          caption:
            "El mismo insight de la investigación continúa en el siguiente paso: la instalación en la misma semana se convierte en un flujo visible de preferencias de reserva en lugar de una promesa vaga."
        }
      ]
    },
    {
      eyebrow: "Autoridad antes que funciones",
      title: "Convertir la profesionalidad en el titular.",
      body: "La historia de la instalación empieza por la configuración a medida, la instalación completa y la calidad del trabajo, posicionando a InstallPros como el equipo que lo hace bien a la primera. La confianza se establece antes de que ninguna función tenga que convencer.",
      image: { src: `${IMG}/installation.webp`, alt: "Professional installation section emphasizing quality and process" }
    }
  ]
};

const SURFACE_LABELS: Record<Locale, string[]> = {
  en: ["Hero · Availability check", "Certainty framing", "Professional installation", "Coverage proof"],
  es: ["Hero · Comprobación de disponibilidad", "Enfoque en la certeza", "Instalación profesional", "Prueba de cobertura"]
};

const surfaceImages: { src: string; alt: string }[] = [
  { src: `${IMG}/hero.webp`, alt: "Hero with availability checker" },
  { src: `${IMG}/solution-v2.webp`, alt: "Complete Starlink solution" },
  { src: `${IMG}/installation.webp`, alt: "Professional installation" },
  { src: `${IMG}/coverage-v2.webp`, alt: "Nationwide coverage" }
];

type Opportunity = { title: string; body: string };

const OPPORTUNITIES: Record<Locale, Opportunity[]> = {
  en: [
    {
      title: "Pricing transparency",
      body: "Surface more of the cost picture earlier, so the highest-volume question is answered before the form."
    },
    {
      title: "Quote before scheduling",
      body: "Test a flow that returns an estimate without forcing a booking first — the friction customers named most."
    },
    {
      title: "Expectation setting",
      body: "Show clearly what happens after submitting: who reaches out, when, and what they'll need."
    },
    {
      title: "Scheduling visibility",
      body: "Give a real sense of timing and availability, turning “how soon?” into a visible answer."
    },
    {
      title: "Coverage discovery",
      body: "Make service-area and surface-type checks (roofs, boats, mounts) richer and more self-serve."
    }
  ],
  es: [
    {
      title: "Transparencia de precios",
      body: "Mostrar antes más del detalle de los costes, para que la pregunta con más volumen se responda antes del formulario."
    },
    {
      title: "Presupuesto antes de reservar",
      body: "Probar un flujo que devuelva una estimación sin obligar a reservar primero, la fricción que más mencionaban los clientes."
    },
    {
      title: "Definir expectativas",
      body: "Mostrar con claridad qué pasa tras enviar: quién contacta, cuándo y qué necesitará."
    },
    {
      title: "Visibilidad de la reserva",
      body: "Dar una idea real de los plazos y la disponibilidad, convirtiendo el «¿para cuándo?» en una respuesta visible."
    },
    {
      title: "Descubrir la cobertura",
      body: "Hacer las comprobaciones de zona de servicio y tipo de superficie (tejados, barcos, soportes) más ricas y autoservicio."
    }
  ]
};

const RESEARCH_STEPS: Record<Locale, [string, string][]> = {
  en: [
    ["Export", "Pulled 300+ Intercom conversations out of the support tool."],
    ["Structure", "Used a ChatGPT-assisted workflow to organize them into Google Sheets."],
    ["Analyze", "Tagged recurring questions and clustered them into recurring patterns."],
    ["Translate", "Turned each pattern into a concrete website decision."]
  ],
  es: [
    ["Exportar", "Extraje más de 300 conversaciones de Intercom de la herramienta de soporte."],
    ["Estructurar", "Usé un flujo asistido por ChatGPT para organizarlas en Google Sheets."],
    ["Analizar", "Etiqueté las preguntas recurrentes y las agrupé en patrones."],
    ["Traducir", "Convertí cada patrón en una decisión concreta para la web."]
  ]
};

const COPY = {
  en: {
    roleLabel: "Role",
    timelineLabel: "Timeline",
    scopeLabel: "Scope",
    stepWord: "Step",
    questionEyebrow: "The question",
    questionTitle: "Why do people hesitate before booking an installation?",
    questionIntro:
      "This wasn't a visual project. InstallPros could already install Starlink across the U.S., yet visitors stalled at the edge of booking. Rather than explore layouts, I started by trying to understand the hesitation — and let the evidence decide what the site needed to be.",
    researchEyebrow: "Research process",
    researchTitle: "I turned the support inbox into a design brief.",
    researchIntro:
      "The clearest signal of what customers were unsure about was already sitting in our conversations with them. I built a lightweight workflow to mine it.",
    corpusPara:
      "That corpus became the foundation of the project. Three categories of question dominated everything else.",
    evidenceCaption:
      "300+ customer conversations revealed recurring friction around pricing, scheduling, availability, and service coverage.",
    askingEyebrow: "What customers were asking",
    askingTitle: "Three questions, asked over and over.",
    audienceEyebrow: "Who we were designing for",
    audienceTitle: "Two people, one feeling: I need this handled.",
    insightsEyebrow: "What the research made clear",
    insightsTitle: "Four insights became the spine of the design.",
    principlesEyebrow: "Design principles",
    principlesTitle: "The rules the research handed me.",
    principlesIntro:
      "Before any layout, the insights resolved into five principles. Every decision on the site had to earn its place against them.",
    surfaceEyebrow: "The designed surface",
    surfaceTitle: "The same principles, made visible.",
    surfaceIntro:
      "Each moment on the page answers a question the research surfaced — in the order customers actually ask. Move through the key surfaces below.",
    decisionsEyebrow: "Design decisions",
    decisionsTitle: "How the research shaped the page.",
    ukEyebrow: "The other market",
    ukTitle: "Two markets, two kinds of evidence.",
    ukIntro:
      "InstallPros operates in the United States and the United Kingdom, and I design for both. This case is the qualitative half: 300+ support conversations turned into principles, and the site that acts on them. The U.K. is a separate piece of work with a separate problem — a funnel losing two out of three visits before anyone typed a character, diagnosed by crossing four data sources and rebuilt around the one step that was leaking.",
    ukLink: "Read the U.K. case study",
    nextEyebrow: "What I'd explore next",
    nextTitle: "The work isn't finished — the research pointed past it.",
    nextIntro:
      "The same conversations that shaped this version also flagged where it can go further. These are the next opportunities I'd pursue.",
    nextProject: "Next project"
  },
  es: {
    roleLabel: "Rol",
    timelineLabel: "Periodo",
    scopeLabel: "Alcance",
    stepWord: "Paso",
    questionEyebrow: "La pregunta",
    questionTitle: "¿Por qué la gente duda antes de reservar una instalación?",
    questionIntro:
      "No era un proyecto visual. InstallPros ya podía instalar Starlink por todo EE. UU., pero los visitantes se frenaban justo antes de reservar. En lugar de explorar layouts, empecé por intentar entender la duda y dejar que la evidencia decidiera qué tenía que ser el sitio.",
    researchEyebrow: "Proceso de investigación",
    researchTitle: "Convertí la bandeja de soporte en un brief de diseño.",
    researchIntro:
      "La señal más clara de lo que generaba dudas en los clientes ya estaba en nuestras conversaciones con ellos. Construí un flujo ligero para extraerla.",
    corpusPara:
      "Ese corpus se convirtió en la base del proyecto. Tres categorías de pregunta dominaban sobre todas las demás.",
    evidenceCaption:
      "Más de 300 conversaciones con clientes revelaron una fricción recurrente en torno al precio, la reserva, la disponibilidad y la cobertura del servicio.",
    askingEyebrow: "Lo que preguntaban los clientes",
    askingTitle: "Tres preguntas, repetidas una y otra vez.",
    audienceEyebrow: "Para quién diseñábamos",
    audienceTitle: "Dos personas, una misma sensación: necesito que me lo resuelvan.",
    insightsEyebrow: "Lo que dejó claro la investigación",
    insightsTitle: "Cuatro insights se convirtieron en la columna vertebral del diseño.",
    principlesEyebrow: "Principios de diseño",
    principlesTitle: "Las reglas que me dio la investigación.",
    principlesIntro:
      "Antes de cualquier layout, los insights se condensaron en cinco principios. Cada decisión del sitio tenía que ganarse su sitio frente a ellos.",
    surfaceEyebrow: "La superficie diseñada",
    surfaceTitle: "Los mismos principios, hechos visibles.",
    surfaceIntro:
      "Cada momento de la página responde una pregunta que sacó la investigación, en el orden en que los clientes realmente preguntan. Recorre las superficies clave abajo.",
    decisionsEyebrow: "Decisiones de diseño",
    decisionsTitle: "Cómo la investigación dio forma a la página.",
    ukEyebrow: "El otro mercado",
    ukTitle: "Dos mercados, dos tipos de evidencia.",
    ukIntro:
      "InstallPros opera en Estados Unidos y el Reino Unido, y diseño para ambos. Este caso es la mitad cualitativa: más de 300 conversaciones de soporte convertidas en principios, y el sitio que actúa sobre ellos. El Reino Unido es un trabajo aparte con un problema distinto: un embudo que perdía dos de cada tres visitas antes de que nadie escribiera un carácter, diagnosticado cruzando cuatro fuentes de datos y reconstruido en torno al único paso que tenía la fuga.",
    ukLink: "Leer el caso de estudio de Reino Unido",
    nextEyebrow: "Qué exploraría a continuación",
    nextTitle: "El trabajo no está terminado: la investigación señalaba más allá.",
    nextIntro:
      "Las mismas conversaciones que dieron forma a esta versión también marcaron por dónde puede ir más lejos. Estas son las siguientes oportunidades que perseguiría.",
    nextProject: "Siguiente proyecto"
  }
} as const;

function SectionHead({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <Reveal className="max-w-2xl">
      <p className="section-label">{eyebrow}</p>
      <h2 className="mt-4 text-[clamp(1.7rem,2.8vw,2.4rem)] font-medium leading-[1.12] tracking-[-0.03em] text-text">
        {title}
      </h2>
      {intro ? <p className={`mt-6 ${PARA}`}>{intro}</p> : null}
    </Reveal>
  );
}

function Section({ children }: { children: ReactNode }) {
  return (
    <section className="border-t border-line py-16 sm:py-24">
      <div className="shell">{children}</div>
    </section>
  );
}

function DecisionSplit({
  eyebrow,
  title,
  body,
  image,
  imageCaption,
  supportingArtifacts,
  reversed = false
}: DecisionItem & { reversed?: boolean }) {
  return (
    <section className="border-t border-line py-16 sm:py-24">
      <div className="shell">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal className={reversed ? "lg:order-2" : undefined}>
            <p className="section-label">{eyebrow}</p>
            <h2 className="mt-4 text-[clamp(1.5rem,2.4vw,2rem)] font-medium leading-[1.14] tracking-[-0.03em] text-text">
              {title}
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-7 text-muted sm:text-lg">{body}</p>
          </Reveal>
          <Reveal delay={0.06} className={reversed ? "lg:order-1" : undefined}>
            <figure className="editorial-image paper-tint overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                width={1800}
                height={1100}
                className="h-auto w-full"
                sizes="(min-width: 1024px) 48vw, 100vw"
              />
            </figure>
            {imageCaption ? (
              <p className="mt-4 max-w-2xl text-sm leading-6 text-muted sm:text-base">{imageCaption}</p>
            ) : null}
          </Reveal>
        </div>
        {supportingArtifacts?.length ? (
          <div className="mt-10 grid gap-8">
            {supportingArtifacts.map((artifact, index) => (
              <Reveal key={artifact.src} delay={0.1 + index * 0.04}>
                <figure className="editorial-image paper-tint overflow-hidden">
                  <Image
                    src={artifact.src}
                    alt={artifact.alt}
                    width={1800}
                    height={1100}
                    className="h-auto w-full"
                    sizes="100vw"
                  />
                </figure>
                <p className="mt-4 max-w-3xl text-sm leading-6 text-muted sm:text-base">{artifact.caption}</p>
              </Reveal>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function InstallProsWebsiteAlt2CaseStudy({
  nextProject,
  locale = "en"
}: {
  project: ProjectCaseStudy;
  nextProject?: { href: string; title: string };
  locale?: Locale;
}) {
  const hero = HERO[locale];
  const glance = GLANCE[locale];
  const c = COPY[locale];
  const questionThemes = QUESTION_THEMES[locale];
  const personas = PERSONAS[locale];
  const insights = INSIGHTS[locale];
  const principles = PRINCIPLES[locale];
  const decisions = DECISIONS[locale];
  const opportunities = OPPORTUNITIES[locale];
  const researchSteps = RESEARCH_STEPS[locale];
  const surfaceSlides: ProductSlide[] = surfaceImages.map((image, index) => ({
    ...image,
    label: SURFACE_LABELS[locale][index]
  }));

  return (
    <main id="main-content" tabIndex={-1} className="pb-8 pt-10 sm:pt-16">
      {/* Hero */}
      <section className="pb-12 pt-6 sm:pb-16">
        <div className="shell">
          <Reveal className="max-w-3xl">
            <div className="flex flex-wrap gap-2">
              {hero.tags.map((tag) => (
                <span key={tag} className="pill">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="mt-6 text-[clamp(2.2rem,4.4vw,3.2rem)] font-medium leading-[1.04] tracking-[-0.04em] text-text">
              {hero.title}
            </h1>
            <p className="mt-5 max-w-2xl text-[1.125rem] leading-[1.55] text-muted sm:text-[1.5rem] sm:leading-[1.5]">
              {hero.summary}
            </p>

            <dl className="mt-10 grid gap-6 sm:grid-cols-3">
              {[
                [c.roleLabel, hero.role],
                [c.timelineLabel, hero.timeline],
                [c.scopeLabel, hero.scope]
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="section-label">{label}</dt>
                  <dd className="mt-2 text-base text-text">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* First image: the homepage, framed and cropped to the top so the
              hero reads as a live product instead of a 6000px-tall scroll. */}
          <Reveal delay={0.08} className="mx-auto mt-12 w-full max-w-[78rem]">
            <BrowserFrame
              src={`${IMG}/landing.webp`}
              alt="InstallPros U.S. homepage"
              url="installpros.io"
              aspect="aspect-[16/10]"
              sizes="(min-width: 1248px) 78rem, 100vw"
              priority
            />
          </Reveal>
        </div>
      </section>

      {/* Glance — the 30-second read */}
      <GlanceSection glance={glance} locale={locale} />

      {/* The question that drove the project */}
      <Section>
        <SectionHead eyebrow={c.questionEyebrow} title={c.questionTitle} intro={c.questionIntro} />
      </Section>

      {/* Research process */}
      <Section>
        <SectionHead eyebrow={c.researchEyebrow} title={c.researchTitle} intro={c.researchIntro} />
        <Reveal delay={0.06} className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {researchSteps.map(([step, body], i) => (
            <div key={step} className="editorial-card p-6">
              <p className="section-label">{`${c.stepWord} ${i + 1}`}</p>
              <p className="mt-3 text-lg font-medium tracking-[-0.02em] text-text">{step}</p>
              <p className="mt-3 text-base leading-7 text-muted">{body}</p>
            </div>
          ))}
        </Reveal>
        <Reveal delay={0.1}>
          <p className={`mt-10 max-w-2xl ${PARA}`}>{c.corpusPara}</p>
        </Reveal>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <Reveal delay={0.12}>
            <figure className="editorial-image overflow-hidden border border-line bg-white">
              <Image
                src={`${EVIDENCE}/9topics.png`}
                alt="Intercom topics table showing recurring customer questions around payment, scheduling, location, quote, and related issues"
                width={1600}
                height={900}
                className="h-auto w-full"
                sizes="(min-width: 1024px) 48vw, 100vw"
              />
            </figure>
          </Reveal>
          <Reveal delay={0.16}>
            <figure className="editorial-image overflow-hidden border border-line bg-white">
              <Image
                src={`${EVIDENCE}/intercom-bubble-chart.png`}
                alt="Intercom bubble chart visualizing topic volume for payment, schedule, location, quote, roof, and tech support"
                width={1600}
                height={900}
                className="h-auto w-full"
                sizes="(min-width: 1024px) 48vw, 100vw"
              />
            </figure>
          </Reveal>
        </div>
        <Reveal delay={0.18}>
          <p className="mt-5 max-w-3xl text-sm leading-6 text-muted sm:text-base">{c.evidenceCaption}</p>
        </Reveal>
      </Section>

      {/* What customers were asking */}
      <Section>
        <SectionHead eyebrow={c.askingEyebrow} title={c.askingTitle} />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {questionThemes.map((theme, i) => (
            <Reveal key={theme.label} delay={i * 0.06} className="editorial-card flex flex-col p-7">
              <p className="section-label">{theme.label}</p>
              <ul role="list" className="mt-5 space-y-3">
                {theme.questions.map((q) => (
                  <li key={q} className="text-base leading-7 text-muted">
                    “{q}”
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-line pt-5 text-[1.0625rem] leading-7 text-text">
                {theme.insight}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Audience */}
      <Section>
        <SectionHead eyebrow={c.audienceEyebrow} title={c.audienceTitle} />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {personas.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.06} className="editorial-card p-7">
              <p className="text-xl font-medium tracking-[-0.03em] text-text">{p.name}</p>
              <p className="mt-4 text-base leading-7 text-muted">{p.traits}</p>
              <p className="mt-3 text-base leading-7 text-muted">{p.need}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* The four insights */}
      <Section>
        <SectionHead eyebrow={c.insightsEyebrow} title={c.insightsTitle} />
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
          {insights.map((ins, i) => (
            <Reveal key={ins.kicker} delay={i * 0.05} className="bg-canvas">
              <div className="grid gap-4 p-7 sm:p-9 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
                <div>
                  <p className="section-label">{ins.kicker}</p>
                  <p className="mt-3 text-[clamp(1.3rem,2vw,1.7rem)] font-medium leading-[1.2] tracking-[-0.03em] text-text">
                    {ins.statement}
                  </p>
                </div>
                <p className="text-[1.0625rem] leading-7 text-muted sm:text-lg lg:self-center">{ins.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Design principles */}
      <Section>
        <SectionHead eyebrow={c.principlesEyebrow} title={c.principlesTitle} intro={c.principlesIntro} />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05} className="editorial-card p-6">
              <p className="section-label">{`0${i + 1}`}</p>
              <p className="mt-3 text-lg font-medium tracking-[-0.02em] text-text">{p.title}</p>
              <p className="mt-3 text-base leading-7 text-muted">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Product surface carousel */}
      <Section>
        <SectionHead eyebrow={c.surfaceEyebrow} title={c.surfaceTitle} intro={c.surfaceIntro} />
        <Reveal delay={0.06} className="mt-12">
          <ProductCarousel slides={surfaceSlides} />
        </Reveal>
      </Section>

      {/* Design decisions, alternating */}
      <Section>
        <SectionHead eyebrow={c.decisionsEyebrow} title={c.decisionsTitle} />
      </Section>
      {decisions.map((d, i) => (
        <DecisionSplit key={d.eyebrow} {...d} reversed={i % 2 === 1} />
      ))}

      {/* The U.K. case — a separate piece of work, linked in both directions */}
      <Section>
        <SectionHead eyebrow={c.ukEyebrow} title={c.ukTitle} intro={c.ukIntro} />
        <Reveal delay={0.06} className="mt-8">
          <MagneticLink
            href={localizedPath("/work/installpros-uk-landing", locale)}
            className="inline-flex text-xl font-medium tracking-[-0.03em] text-text"
          >
            {c.ukLink} →
          </MagneticLink>
        </Reveal>
      </Section>

      {/* What I'd explore next */}
      <Section>
        <SectionHead eyebrow={c.nextEyebrow} title={c.nextTitle} intro={c.nextIntro} />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {opportunities.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.05} className="editorial-card p-6">
              <p className="text-lg font-medium tracking-[-0.02em] text-text">{o.title}</p>
              <p className="mt-3 text-base leading-7 text-muted">{o.body}</p>
            </Reveal>
          ))}
        </div>

        {nextProject ? (
          <div className="mt-14 border-t border-line pt-10">
            <p className="section-label">{c.nextProject}</p>
            <MagneticLink
              href={nextProject.href}
              className="mt-4 inline-flex text-2xl font-medium tracking-[-0.04em] text-text"
            >
              {nextProject.title}
            </MagneticLink>
          </div>
        ) : null}
      </Section>
    </main>
  );
}
