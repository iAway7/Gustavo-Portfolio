/**
 * Centralized i18n system.
 *
 * Routing: English is unprefixed ("/"), Spanish is under "/es".
 * Content: a single typed dictionary (`dict`) holds every UI string per locale.
 * Components derive the active locale from the pathname, so there is no context
 * provider and no extra client re-renders.
 */

export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/**
 * Master switch for the language system UI. Temporarily disabled until the
 * Spanish translation is finalized. Everything (routes, dictionaries, switcher,
 * resume swap) stays implemented — flip this to `true` to re-enable the toggle
 * and the stored-preference redirect. The /es routes remain reachable directly.
 */
export const ENABLE_LANGUAGE_SWITCHER = true;

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Active locale for a pathname ("/es" or "/es/..." => "es", else "en"). */
export function localeFromPathname(pathname: string): Locale {
  return pathname === "/es" || pathname.startsWith("/es/") ? "es" : "en";
}

/** Canonical (locale-stripped) path: "/es/work" -> "/work", "/es" -> "/". */
export function stripLocale(pathname: string): string {
  if (pathname === "/es") return "/";
  if (pathname.startsWith("/es/")) return pathname.slice(3);
  return pathname || "/";
}

/** Prefix a canonical path for a locale: ("/work","es") -> "/es/work". */
export function localizedPath(path: string, locale: Locale): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === "en") return clean;
  return clean === "/" ? "/es" : `/es${clean}`;
}

/** The same page in the other locale, given the current pathname. */
export function alternatePathname(pathname: string, target: Locale): string {
  return localizedPath(stripLocale(pathname), target);
}

/** Resume label + file per locale (English Resume / Spanish CV). */
export const resumeByLocale: Record<Locale, { label: string; href: string; value: string }> = {
  en: { label: "Resume", value: "Download PDF", href: "/docs/gustavo-polin-product-designer-en-2.pdf" },
  es: { label: "CV", value: "Descargar PDF", href: "/docs/gustavo-polin-product-designer-es-2.pdf" }
};

/** Localized project titles + card/meta summaries. Bodies stay English. */
export const projectI18n: Record<string, Record<Locale, { title: string; summary: string }>> = {
  "installpros-technician-app": {
    en: {
      title: "Field Operations Platform",
      summary:
        "A mobile platform that guides Starlink installation technicians through scheduling, on-site workflows, and job completion under real field conditions."
    },
    es: {
      title: "Plataforma de Operaciones de Campo",
      summary:
        "Una plataforma móvil que guía a los técnicos de instalación de Starlink en la programación, los flujos de trabajo in situ y el cierre de cada instalación en condiciones reales de campo."
    }
  },
  "agencyhub-platform": {
    en: {
      title: "AgencyHub",
      summary:
        "A two-sided marketplace where digital agencies buy white-label services from vetted providers and resell them to their own clients."
    },
    es: {
      title: "AgencyHub",
      summary:
        "Un marketplace B2B donde las agencias digitales compran servicios white-label a proveedores verificados y los revenden a sus propios clientes."
    }
  },
  "installpros-website": {
    en: {
      title: "InstallPros",
      summary:
        "A conversion-led redesign of Install Pros' web presence, turning a list of services into a clear path toward booking an installation."
    },
    es: {
      title: "InstallPros",
      summary:
        "Un rediseño orientado a la conversión de la presencia web de Install Pros, que convierte una lista de servicios en un camino claro hacia la reserva de una instalación."
    }
  },
  "emmvi-growth-platform": {
    en: {
      title: "Emmvi",
      summary:
        "Co-founded studio work helping service businesses grow: positioning, web systems, and conversion infrastructure treated as one design problem."
    },
    es: {
      title: "Emmvi",
      summary:
        "Trabajo en un estudio para ayudar a las empresas de servicios a crecer: posicionamiento, sistemas web e infraestructura de conversión abordados como un único problema de diseño."
    }
  }
};

export function projectMeta(slug: string, locale: Locale, fallback: { title: string; summary: string }) {
  return projectI18n[slug]?.[locale] ?? fallback;
}

const en = {
  nav: {
    home: "Home",
    work: "Work",
    experience: "Experience",
    approach: "Approach",
    contact: "Contact"
  },
  language: {
    label: "Language",
    en: "English",
    es: "Spanish",
    switchTo: "Switch to"
  },
  footer: {
    tagline:
      "Product Designer and UX/UI Designer building digital experiences that connect users, business, and technology.",
    pages: "Pages",
    contact: "Contact",
    location: "Based in Valencia, Spain.",
    note: "Product thinking, design systems, and implementation awareness."
  },
  home: {
    pill: "Product Designer",
    h1a: "Built around people.",
    h1b: "Grounded in reality.",
    intro:
      "Product Designer and UX/UI Designer with 9+ years of experience creating SaaS platforms and web applications, now designing AI-assisted digital experiences.",
    viewWork: "View Work",
    letsTalk: "Let’s Talk",
    workCaption: "Work",
    workHeading: "Selected product, platform, and growth-focused work.",
    credCaption: "Why this work feels different",
    credHeading: "This portfolio is built around product judgment, not just polished screens.",
    testimonials: "Testimonials",
    viewAll: "View all",
    expCaption: "Experience snapshot",
    expHeading: "Designing products that work beyond the screen.",
    expIntro:
      "I’ve worked across product teams, developers, stakeholders, marketing, and support, always balancing product intent with what can actually ship.",
    contactCaption: "Contact",
    contactHeading: "Looking for a designer who understands products, not just screens?",
    contactIntro:
      "I work with teams that need product thinking, UX clarity, and delivery-aware design execution.",
    startConversation: "Start a conversation"
  },
  work: {
    caption: "Work",
    h1: "Product, platform, and growth-focused work shaped by systems thinking.",
    intro:
      "The work is selected to show product judgment, design-system thinking, technical understanding, and business awareness across different contexts.",
    nextStep: "Next step",
    nextHeading: "Need the deeper story behind the featured work?",
    readCaseStudy: "Read the case study"
  },
  experience: {
    caption: "Experience",
    h1: "A product-design career shaped by systems, execution, and business context.",
    intro:
      "9+ years across SaaS, B2B, and operational tools — roles, certifications, and the systems thinking that connects users, business, and technology.",
    earlier: "Earlier",
    coreExpertise: "Core expertise",
    dailyTools: "Daily tools: Figma · ChatGPT · Claude · Codex · Lovable",
    certifications: "Certifications",
    certsSummary: "certifications in UX research, UX writing, and information architecture · Platzi, plus EF SET C1 English",
    viewAll: "View all",
    featuredNext: "Featured next",
    featuredHeading: "See how that background translates into actual product work.",
    browseProjects: "Browse projects"
  },
  approach: {
    caption: "Approach",
    h1: "The challenge isn’t adding functionality. It’s removing friction.",
    intro:
      "My goal is not just to make interfaces look good. It’s to help products work better for users, business stakeholders, and the teams responsible for shipping them.",
    coreExpertise: "Core expertise",
    relevantCertifications: "Relevant certifications",
    startWork: "Start with the work",
    flagshipHeading: "A closer look at my product design process.",
    viewFeatured: "View featured case study"
  },
  contact: {
    caption: "Contact",
    h1: "Have a project in mind?",
    intro:
      "Send some details about your product, platform, or service. I work with thoughtful teams building ambitious digital experiences.",
    form: {
      name: "Name",
      email: "Email",
      project: "Company (Optional)",
      message: "Message",
      required: "required",
      send: "Get in Touch",
      sending: "Sending...",
      success: "Thanks. Your message was sent successfully.",
      errorGeneric: "Please correct the highlighted fields and try again.",
      errName: "Please enter your name.",
      errEmail: "Please enter your email address.",
      errEmailValid: "Please enter a valid email address.",
      errMessage: "Please enter a short message.",
      errorSend: "We couldn't send your message right now. Please try again."
    }
  },
  caseStudy: {
    next: "Next project",
    viewPdf: "View Full Case Study (PDF) →"
  }
};

export type Dict = typeof en;

const es: Dict = {
  nav: {
    home: "Inicio",
    work: "Proyectos",
    experience: "Experiencia",
    approach: "Enfoque",
    contact: "Contacto"
  },
  language: {
    label: "Idioma",
    en: "Inglés",
    es: "Español",
    switchTo: "Cambiar a"
  },
  footer: {
    tagline:
      "Diseñador de Producto y UX/UI que crea experiencias digitales para conectar a las personas, el negocio y la tecnología.",
    pages: "Páginas",
    contact: "Contacto",
    location: "Con base en Valencia, España.",
    note: "Pensamiento de producto, sistemas de diseño y comprensión de la implementación."
  },
  home: {
    pill: "Diseñador de Producto",
    h1a: "Pensado para las personas.",
    h1b: "Anclado en la realidad.",
    intro:
      "Diseñador de Producto y Diseñador UX/UI con más de 9 años de experiencia creando plataformas SaaS y aplicaciones web, y ahora diseñando experiencias digitales asistidas por IA.",
    viewWork: "Ver proyectos",
    letsTalk: "Hablemos",
    workCaption: "Proyectos",
    workHeading: "Una selección de trabajo de producto, plataforma y crecimiento.",
    credCaption: "Por qué este trabajo se siente diferente",
    credHeading: "Detrás de este portafolio hay criterio de producto, no solo pantallas pulidas.",
    testimonials: "Testimonios",
    viewAll: "Ver todos",
    expCaption: "Resumen de experiencia",
    expHeading: "Diseñar productos que funcionan más allá de la pantalla.",
    expIntro:
      "He trabajado con equipos de producto, desarrolladores, stakeholders, marketing y soporte, equilibrando siempre la intención de producto con lo que de verdad puede salir a producción.",
    contactCaption: "Contacto",
    contactHeading: "¿Buscas un diseñador que entienda de productos, no solo de pantallas?",
    contactIntro:
      "Trabajo con equipos que necesitan pensamiento de producto, claridad de UX y un diseño que se ejecuta pensando en la entrega.",
    startConversation: "Iniciar una conversación"
  },
  work: {
    caption: "Proyectos",
    h1: "Trabajo de producto, plataforma y crecimiento moldeado por el pensamiento sistémico.",
    intro:
      "El trabajo está seleccionado para mostrar criterio de producto, pensamiento de sistemas de diseño, comprensión técnica y conciencia de negocio en distintos contextos.",
    nextStep: "Siguiente paso",
    nextHeading: "¿Quieres la historia completa detrás del proyecto destacado?",
    readCaseStudy: "Leer el caso de estudio"
  },
  experience: {
    caption: "Experiencia",
    h1: "Una carrera en diseño de producto moldeada por sistemas, ejecución y contexto de negocio.",
    intro:
      "Más de 9 años en SaaS, B2B y herramientas operativas — roles, certificaciones y el pensamiento sistémico que conecta a las personas, el negocio y la tecnología.",
    earlier: "Anteriormente",
    coreExpertise: "Especialidades principales",
    dailyTools: "Herramientas diarias: Figma · ChatGPT · Claude · Codex · Lovable",
    certifications: "Certificaciones",
    certsSummary: "certificaciones en investigación UX, redacción UX y arquitectura de información · Platzi, además del EF SET C1 de inglés",
    viewAll: "Ver todas",
    featuredNext: "A continuación",
    featuredHeading: "Mira cómo esa trayectoria se traduce en trabajo de producto real.",
    browseProjects: "Ver proyectos"
  },
  approach: {
    caption: "Enfoque",
    h1: "El reto no es añadir funcionalidad. Es eliminar fricción.",
    intro:
      "Mi objetivo no es solo que las interfaces se vean bien. Es ayudar a que los productos funcionen mejor para los usuarios, los stakeholders del negocio y los equipos responsables de lanzarlos.",
    coreExpertise: "Especialidades principales",
    relevantCertifications: "Certificaciones relevantes",
    startWork: "Empieza por el trabajo",
    flagshipHeading: "Una mirada más cercana a mi proceso de diseño de producto.",
    viewFeatured: "Ver caso de estudio destacado"
  },
  contact: {
    caption: "Contacto",
    h1: "¿Tienes un proyecto en mente?",
    intro:
      "Envíame algunos detalles sobre tu producto, plataforma o servicio. Trabajo con equipos reflexivos que construyen experiencias digitales ambiciosas.",
    form: {
      name: "Nombre",
      email: "Correo electrónico",
      project: "Empresa (Opcional)",
      message: "Mensaje",
      required: "obligatorio",
      send: "Enviar",
      sending: "Enviando...",
      success: "Gracias. Tu mensaje se envió correctamente.",
      errorGeneric: "Corrige los campos marcados e inténtalo de nuevo.",
      errName: "Introduce tu nombre.",
      errEmail: "Introduce tu correo electrónico.",
      errEmailValid: "Introduce un correo electrónico válido.",
      errMessage: "Escribe un mensaje breve.",
      errorSend: "No pudimos enviar tu mensaje ahora mismo. Inténtalo de nuevo."
    }
  },
  caseStudy: {
    next: "Siguiente proyecto",
    viewPdf: "Ver el caso de estudio completo (PDF) →"
  }
};

export const dict: Record<Locale, Dict> = { en, es };

export function getDict(locale: Locale): Dict {
  return dict[locale];
}
