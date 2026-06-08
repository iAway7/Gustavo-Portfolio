export type NavItem = {
  href: string;
  label: string;
};

export type HomeSection = {
  id: string;
  label: string;
};

export type ExperienceEntry = {
  period: string;
  company: string;
  role: string;
  summary: string;
  highlights: string[];
};

export type ApproachPrinciple = {
  title: string;
  summary: string;
};

export type ContactChannel = {
  label: string;
  value: string;
  href: string;
};

export type Certification = {
  title: string;
  href: string;
};

export type ProjectVisual =
  | {
      type: "image";
      src: string;
      alt: string;
      tone?: "paper" | "sage" | "blush";
      imageClassName?: string;
    }
  | {
      type: "installpros";
      alt: string;
    }
  | {
      type: "system";
      alt: string;
    };

export type ProcessSection = {
  title: string;
  body: string;
};

export type ProjectArtifact = {
  title: string;
  description: string;
  visual: ProjectVisual;
};

export type ProjectCaseStudy = {
  slug: string;
  title: string;
  clientOrBrand: string;
  role: string;
  period: string;
  summary: string;
  tags: string[];
  featured: boolean;
  href: string;
  cardVisual: ProjectVisual;
  overview: string[];
  contributions: string[];
  context: string[];
  processSections: ProcessSection[];
  selectedArtifacts: ProjectArtifact[];
  outcomes: string[];
  nextSlug?: string;
  deckUrl?: string;
};

export const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/experience", label: "Experience" },
  { href: "/approach", label: "Approach" },
  { href: "/contact", label: "Contact" }
];

export const homeSections: HomeSection[] = [
  { id: "home", label: "Home" },
  { id: "work-preview", label: "Work" },
  { id: "credibility", label: "Proof" },
  { id: "experience-snapshot", label: "Experience" },
  { id: "contact-cta", label: "Contact" }
];

export const credibilityPoints = [
  {
    label: "Experience",
    value: "9+ years",
    detail: "Designing SaaS platforms, B2B2C products, web applications, and AI-assisted digital experiences."
  },
  {
    label: "Strength",
    value: "Design + technology",
    detail: "Comfortable at the intersection of product strategy, UI systems, technical constraints, and delivery."
  },
  {
    label: "Focus",
    value: "Products that ship",
    detail: "Work designed to support users, business goals, and technical realities at the same time."
  }
] as const;

export const capabilityTags = [
  "Product Design",
  "UX/UI Design",
  "Design Systems",
  "AI-Assisted Workflows",
  "Information Architecture",
  "Usability Testing",
  "HTML/CSS",
  "SEO & Infrastructure"
] as const;

export const experienceEntries: ExperienceEntry[] = [
  {
    period: "2024 - Present",
    company: "Install Pros",
    role: "UX/UI Designer",
    summary:
      "Designing digital experiences that support Starlink internet installation services across residential, commercial, and mobile sectors.",
    highlights: [
      "UX strategy, UI design, product design, and design systems",
      "Cross-functional collaboration with product, support, and delivery teams",
      "AI-assisted ideation and rapid prototyping with Figma, ChatGPT, Codex, Lovable, and Miro"
    ]
  },
  {
    period: "2023 - Present",
    company: "Emmvi",
    role: "Co-Founder",
    summary:
      "Helping service businesses grow through UX/UI design, websites, marketing systems, funnels, and conversion-focused digital experiences.",
    highlights: [
      "Brand and digital direction for service businesses",
      "Web strategy tied to business growth and conversion",
      "Hands-on implementation awareness from concept through launch"
    ]
  },
  {
    period: "2020 - 2024",
    company: "AgencyHub",
    role: "UX/UI Designer",
    summary:
      "Worked across SaaS products and digital platforms with a focus on scalable systems, UX workflows, and product coherence.",
    highlights: [
      "Design systems, card sorting, A/B testing, wireframing, and prototyping",
      "UX research and user-flow design for product clarity",
      "Strong collaboration across stakeholders and product teams"
    ]
  },
  {
    period: "2017 - 2020",
    company: "AgencyHub",
    role: "Web Designer",
    summary:
      "Built the technical foundation that still informs my product work today: websites, migrations, SEO, hosting, DNS, SSL, and Cloudflare.",
    highlights: [
      "WordPress and Elementor delivery",
      "Hosting, DNS, SPF, DKIM, DMARC, and website migrations",
      "Technical fluency that differentiates me from screen-only designers"
    ]
  },
  {
    period: "2015 - 2016",
    company: "AccelOne",
    role: "Web Research & HTML Developer",
    summary:
      "Started in hands-on web execution, combining HTML/CSS, web scraping, data extraction, and analysis work.",
    highlights: [
      "HTML and CSS implementation",
      "Web scraping and data extraction",
      "Analytical thinking that later evolved into product problem solving"
    ]
  }
];

export const approachPrinciples: ApproachPrinciple[] = [
  {
    title: "Connect user needs, business goals, and technical constraints",
    summary:
      "Every project is framed around product clarity first, so the interface supports real business and delivery decisions."
  },
  {
    title: "Design systems that make products easier to scale",
    summary:
      "Reusable UI logic, shared patterns, and implementation-aware structure help teams move faster without losing coherence."
  },
  {
    title: "Use AI as a workflow advantage, not a shortcut",
    summary:
      "AI-assisted ideation and prototyping are used to accelerate thinking, explore options, and sharpen delivery."
  },
  {
    title: "Stay close to execution",
    summary:
      "Technical context matters. I work comfortably with developers, stakeholders, and operational constraints to keep ideas buildable."
  }
];

export const contactChannels: ContactChannel[] = [
  {
    label: "LinkedIn",
    value: "linkedin.com/in/gustavo-polin",
    href: "https://www.linkedin.com/in/gustavo-polin/"
  },
  {
    label: "Behance",
    value: "behance.net/gustavopolin",
    href: "https://www.behance.net/gustavopolin"
  },
  {
    label: "Resume",
    value: "Download PDF",
    href: "/docs/gustavo-polin-product-designer.pdf"
  }
];

export const certifications: Certification[] = [
  {
    title: "UX/UI Designer",
    href: "https://platzi.com/p/gusaway/learning-path/7768-uxui/diploma/detalle/"
  },
  {
    title: "Foundations of UX/UI Interface Design",
    href: "https://platzi.com/p/gusaway/curso/5184-course/diploma/detalle/"
  },
  {
    title: "Dark Patterns",
    href: "https://platzi.com/p/gusaway/curso/2603-darkpatterns-ux/diploma/detalle/"
  },
  {
    title: "Usability",
    href: "https://platzi.com/p/gusaway/curso/1528-course/diploma/detalle/"
  },
  {
    title: "Accessibility",
    href: "https://platzi.com/p/gusaway/curso/1802-course/diploma/detalle/"
  },
  {
    title: "UX Writing",
    href: "https://platzi.com/p/gusaway/curso/1879-ux-writing/diploma/detalle/"
  },
  {
    title: "Advanced UX Writing",
    href: "https://platzi.com/p/gusaway/curso/2171-ux-writing-avanzado/diploma/detalle/"
  },
  {
    title: "Design Thinking",
    href: "https://platzi.com/p/gusaway/curso/1210-course/diploma/detalle/"
  },
  {
    title: "Design Sprint",
    href: "https://platzi.com/p/gusaway/curso/1702-design-sprint/diploma/detalle/"
  },
  {
    title: "Lean UX",
    href: "https://platzi.com/p/gusaway/curso/1429-lean-ux/diploma/detalle/"
  },
  {
    title: "User-Centered Design",
    href: "https://platzi.com/p/gusaway/curso/1562-course/diploma/detalle/"
  },
  {
    title: "Information Architecture",
    href: "https://platzi.com/p/gusaway/curso/1354-arquitectura-informacion/diploma/detalle/"
  },
  {
    title: "Idea Validation: Prototypes",
    href: "https://platzi.com/p/gusaway/curso/1970-prototipos-testing/diploma/detalle/"
  },
  {
    title: "User Research",
    href: "https://platzi.com/p/gusaway/curso/1742-user-research/diploma/detalle/"
  },
  {
    title: "CX Research and UX Testing",
    href: "https://platzi.com/p/gusaway/curso/1659-ux-testing/diploma/detalle/"
  },
  {
    title: "Fundamentals of UI and UX Interface Design",
    href: "https://platzi.com/p/gusaway/curso/1754-diseno-interfaces-ux/diploma/detalle/"
  }
] as const;

export const projectCaseStudies: ProjectCaseStudy[] = [
  {
    slug: "installpros-technician-app",
    title: "InstallPros Technician App",
    clientOrBrand: "Install Pros",
    role: "Product Designer / UX/UI Designer",
    period: "2024 - Present",
    summary:
      "A field-service experience designed to help technicians move faster, reduce uncertainty, and complete tasks with more confidence in real installation scenarios.",
    tags: ["Mobile UX", "Field workflows", "Product design", "Task efficiency"],
    featured: true,
    href: "/work/installpros-technician-app",
    cardVisual: {
      type: "image",
      src: "/projects/installpros-app/cover.png",
      alt: "InstallPros technician app cover showing the mobile product direction",
      tone: "paper",
      imageClassName: "scale-[1.14] object-center"
    },
    overview: [
      "InstallPros needed a technician-facing product experience that could support real field conditions, not just polished screen flows.",
      "The work focused on clarity, task sequencing, and decision support so technicians could complete installs with less friction."
    ],
    contributions: [
      "UX strategy and flow design",
      "UI design for mobile-first operational use",
      "Design systems thinking and implementation alignment",
      "AI-assisted ideation and rapid prototyping"
    ],
    context: [
      "The product serves Starlink internet installation workflows across residential, commercial, and mobile sectors.",
      "Technicians need quick access to status, next actions, and operational guidance while moving between environments and tasks."
    ],
    processSections: [
      {
        title: "Mapped field-service tasks around clarity and speed",
        body: "The work prioritized what a technician needs to know right now, what can wait, and how to reduce scanning effort under real working conditions."
      },
      {
        title: "Simplified operational complexity into a calmer mobile flow",
        body: "Screens and interactions were structured to support task completion, confidence, and fast recovery when something changes in the field."
      },
      {
        title: "Designed with implementation in mind",
        body: "Patterns were shaped to stay consistent, reusable, and practical for product and engineering teams to evolve over time."
      }
    ],
    selectedArtifacts: [
      {
        title: "Mobile workflow direction",
        description:
          "A compact visual direction showing how the product balances hierarchy, status, and action priority inside a field-ready interface.",
        visual: {
          type: "image",
          src: "/projects/installpros-app/overview.png",
          alt: "InstallPros technician app overview"
        }
      },
      {
        title: "Installation workflow",
        description:
          "A deeper look at the workflow structure designed to support technicians through installation tasks and task progression.",
        visual: {
          type: "image",
          src: "/projects/installpros-app/installation-workflow.png",
          alt: "InstallPros installation workflow screens"
        }
      },
      {
        title: "Job management",
        description:
          "Job management views focused on clarity, scanability, and better task control in the field.",
        visual: {
          type: "image",
          src: "/projects/installpros-app/job-management.png",
          alt: "InstallPros job management screens"
        }
      }
    ],
    outcomes: [
      "Clearer technician workflows with stronger action hierarchy",
      "A product direction grounded in real operational use cases",
      "A stronger bridge between UX thinking, UI execution, and delivery constraints"
    ],
    nextSlug: "agencyhub-platform",
    deckUrl: "/docs/installpros-technician-app-case-study.pdf"
  },
  {
    slug: "agencyhub-platform",
    title: "AgencyHub",
    clientOrBrand: "AgencyHub",
    role: "UX/UI Designer",
    period: "2020 - 2024",
    summary:
      "SaaS and platform design work focused on systems, workflow clarity, research, and product coherence across multiple surfaces.",
    tags: ["SaaS", "Design systems", "UX workflows", "Product thinking"],
    featured: false,
    href: "/work/agencyhub-platform",
    cardVisual: {
      type: "image",
      src: "/projects/agencyhub/cover.png",
      alt: "AgencyHub portfolio cover",
      tone: "paper",
      imageClassName: "scale-[1.12] object-center"
    },
    overview: [
      "AgencyHub work centered on helping product experiences feel more consistent, structured, and usable across screens and flows.",
      "The focus was less about visual novelty and more about improving everyday product behavior."
    ],
    contributions: [
      "Design systems and UI consistency",
      "Card sorting and UX research inputs",
      "A/B testing, wireframing, and prototyping",
      "User-flow design and cross-team product collaboration"
    ],
    context: [
      "The platform needed design decisions that could scale across multiple product surfaces and internal workflows.",
      "Consistency mattered both for users and for the teams maintaining the product over time."
    ],
    processSections: [
      {
        title: "Reduced fragmentation across flows",
        body: "The work connected product structure, navigation logic, and reusable interaction patterns so the experience felt less pieced together."
      },
      {
        title: "Validated ideas through lightweight research",
        body: "Card sorting, UX research, and testing activities helped clarify where mental models were mismatched or screens were harder to interpret than they needed to be."
      },
      {
        title: "Systemized what worked",
        body: "Repeated patterns were turned into stronger UI rules and reusable decisions, helping future work move faster and stay more coherent."
      }
    ],
    selectedArtifacts: [
      {
        title: "Interface system view",
        description:
          "A system-led representation of component thinking, layout consistency, and structured workflow design.",
        visual: {
          type: "image",
          src: "/projects/agencyhub/ui-showcase.png",
          alt: "AgencyHub UI showcase"
        }
      },
      {
        title: "User flow",
        description:
          "User-flow work used to shape the platform structure and make day-to-day journeys easier to understand.",
        visual: {
          type: "image",
          src: "/projects/agencyhub/user-flow.png",
          alt: "AgencyHub user flow"
        }
      },
      {
        title: "Design process",
        description:
          "A view into the design process behind the product decisions, from framing through interface refinement.",
        visual: {
          type: "image",
          src: "/projects/agencyhub/design-process.png",
          alt: "AgencyHub design process"
        }
      }
    ],
    outcomes: [
      "More coherent UX across product surfaces",
      "Stronger design-system thinking inside product delivery",
      "A better bridge between product structure and polished UI"
    ],
    nextSlug: "installpros-website"
  },
  {
    slug: "installpros-website",
    title: "InstallPros Website",
    clientOrBrand: "Install Pros",
    role: "UX/UI Designer",
    period: "2024 - Present",
    summary:
      "A service-led website redesign built to improve trust, conversion, and product clarity across residential and business installation services.",
    tags: ["Digital experience", "Conversion", "Service presentation", "User journeys"],
    featured: false,
    href: "/work/installpros-website",
    cardVisual: {
      type: "image",
      src: "/projects/installpros-website/Cover - InstallPros Website.png",
      alt: "InstallPros website redesign cover",
      tone: "paper"
    },
    overview: [
      "The website redesign focused on giving InstallPros a sharper, more premium digital presence while making services easier to understand and act on.",
      "The work connected trust signals, conversion flows, and service architecture so visitors could move from awareness to action with less friction."
    ],
    contributions: [
      "Website UX and information hierarchy",
      "UI design and content structure",
      "SEO and implementation awareness",
      "Cross-functional alignment around conversion goals"
    ],
    context: [
      "Install Pros serves multiple audiences and service types, from Starlink and home automation to newer offers like Amazon LEO.",
      "The site needed stronger trust, clearer service grouping, and better paths for users looking for installation help quickly."
    ],
    processSections: [
      {
        title: "Clarified the service architecture",
        body: "The experience was organized to make it easier to understand what InstallPros offers, who it serves, and which path a visitor should take next."
      },
      {
        title: "Balanced conversion with credibility",
        body: "Calls to action, testimonials, coverage, and service modules were arranged to support conversion without making the site feel pushy or cluttered."
      },
      {
        title: "Expanded the system for multiple landing pages",
        body: "The design direction needed to support homepage, contact, and campaign-style pages like Amazon LEO while staying visually coherent and easy to maintain."
      }
    ],
    selectedArtifacts: [
      {
        title: "Website design cover",
        description:
          "A project cover used to frame the redesign direction and communicate the updated InstallPros digital identity.",
        visual: {
          type: "image",
          src: "/projects/installpros-website/cover-2.png",
          alt: "InstallPros website redesign cover composition"
        }
      },
      {
        title: "Homepage redesign",
        description:
          "The homepage structure was reworked to improve hierarchy, showcase service breadth, and build confidence through clearer proof and coverage sections.",
        visual: {
          type: "image",
          src: "/projects/installpros-website/homepage-new.png",
          alt: "InstallPros website homepage redesign"
        }
      },
      {
        title: "Contact experience",
        description:
          "A supporting contact page that keeps lead capture simple while reinforcing trust and service access.",
        visual: {
          type: "image",
          src: "/projects/installpros-website/contact-us-new.png",
          alt: "InstallPros website contact page redesign"
        }
      },
      {
        title: "Amazon LEO landing page",
        description:
          "A targeted service page designed to support a newer offer with a stronger product-specific message and more tailored visual storytelling.",
        visual: {
          type: "image",
          src: "/projects/installpros-website/amazon-leo.png",
          alt: "InstallPros Amazon LEO landing page"
        }
      }
    ],
    outcomes: [
      "Stronger service communication across multiple offers",
      "A more premium and conversion-aware digital presence",
      "A flexible web system that can support both core pages and campaign-specific landing pages"
    ],
    nextSlug: "emmvi-growth-platform"
  },
  {
    slug: "emmvi-growth-platform",
    title: "Emmvi",
    clientOrBrand: "Emmvi",
    role: "Co-Founder / UX/UI Designer",
    period: "2023 - Present",
    summary:
      "Brand, UX/UI, and growth-oriented digital work built to help service businesses communicate value and convert attention into action.",
    tags: ["Branding", "UX/UI", "Marketing systems", "Business growth"],
    featured: false,
    href: "/work/emmvi-growth-platform",
    cardVisual: {
      type: "image",
      src: "/projects/emmvi/cover-awe.png",
      alt: "Emmvi website design cover",
      tone: "paper"
    },
    overview: [
      "Emmvi reflects my ability to connect brand direction, UX/UI decisions, and commercial thinking inside one offering.",
      "The work is intentionally close to business outcomes, from web positioning to funnels and digital systems."
    ],
    contributions: [
      "Brand and digital direction",
      "UX/UI and website planning",
      "Marketing systems and conversion thinking",
      "Founder-level alignment between service, offer, and delivery"
    ],
    context: [
      "Service businesses often need more than attractive screens. They need positioning, structure, and systems that help the business grow.",
      "Emmvi exists in that space between product thinking, implementation, and commercial clarity."
    ],
    processSections: [
      {
        title: "Tied design decisions to business framing",
        body: "The work starts with positioning and offer clarity so the eventual interface is anchored in a stronger strategy."
      },
      {
        title: "Built conversion-aware digital systems",
        body: "Web structure, funnels, and message hierarchy are treated as part of the experience design, not separate marketing tasks."
      },
      {
        title: "Kept delivery grounded",
        body: "Founder-level involvement means design choices stay close to execution realities, scope, and business priorities."
      }
    ],
    selectedArtifacts: [
      {
        title: "Brand and growth system direction",
        description:
          "A portfolio-safe visual representing the connection between positioning, UX/UI, and conversion-oriented digital systems.",
        visual: {
          type: "image",
          src: "/projects/emmvi/services-website-design.png",
          alt: "Emmvi services page"
        }
      },
      {
        title: "Contact and conversion",
        description:
          "A supporting view of how the Emmvi experience connects lead capture, service messaging, and credibility.",
        visual: {
          type: "image",
          src: "/projects/emmvi/contact-us.png",
          alt: "Emmvi contact page"
        }
      }
    ],
    outcomes: [
      "A stronger bridge between design, marketing, and growth",
      "Business-aware delivery systems for service clients",
      "A portfolio project that demonstrates entrepreneurial and strategic range"
    ],
    nextSlug: "installpros-technician-app"
  }
];

export const projectIndex = projectCaseStudies.map((project) => ({
  slug: project.slug,
  title: project.title,
  clientOrBrand: project.clientOrBrand,
  role: project.role,
  period: project.period,
  summary: project.summary,
  tags: project.tags,
  featured: project.featured,
  href: project.href,
  cardVisual: project.cardVisual
}));

export function getProjectBySlug(slug: string) {
  return projectCaseStudies.find((project) => project.slug === slug);
}
