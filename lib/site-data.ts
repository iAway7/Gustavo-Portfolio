export type NavItem = {
  href: string;
  label: string;
};

export type HomeSection = {
  id: string;
  label: string;
};

export type ExperienceEntry = {
  tier: "now" | "before";
  period: string;
  company: string;
  role: string;
  summary: string;
  tags?: string[];
  logo?: string;
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

export type TestimonialEntry = {
  name: string;
  role: string;
  company?: string;
  image?: string;
  quote: string;
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

export type AnnotatedVisual = {
  caption: string;
  visual: ProjectVisual;
};

export type CaseStudyGlance = {
  challenge: string;
  role: string;
  outcome: string;
};

export type NamedConstraint = {
  label: string;
  body: string;
};

export type DecisionBlock = {
  question: string;
  decision: string;
  rationale: string;
  tradeoff: string;
  visual?: AnnotatedVisual;
};

export type CaseStudyOutcome = {
  results: string[];
  reflection: string;
};

export type HeroSlide = {
  src: string;
  alt: string;
  label: string;
};

type CaseStudyBase = {
  slug: string;
  title: string;
  clientOrBrand: string;
  role: string;
  period: string;
  scope: string;
  summary: string;
  tags: string[];
  featured: boolean;
  href: string;
  cardVisual: ProjectVisual;
  glance: CaseStudyGlance;
  heroSlides?: HeroSlide[];
  outcome: CaseStudyOutcome;
  nextSlug?: string;
  deckUrl?: string;
};

export type ProductCaseStudy = CaseStudyBase & {
  kind: "product";
  context: string[];
  usersLabel?: string;
  operatingConditions: string[];
  usersVisual?: AnnotatedVisual;
  constraints: NamedConstraint[];
  decisions: DecisionBlock[];
  system: {
    body: string[];
    visual?: AnnotatedVisual;
  };
};

export type ExperienceCaseStudy = CaseStudyBase & {
  kind: "experience";
  businessContext: string[];
  audience: string[];
  strategy: string[];
  architecture: {
    body: string[];
    visual?: AnnotatedVisual;
  };
  conversion: DecisionBlock[];
  visualDirection: string;
  finalExperience: AnnotatedVisual[];
};

export type ProjectCaseStudy = ProductCaseStudy | ExperienceCaseStudy;

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
  { id: "testimonials", label: "Testimonials" },
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

export const testimonials: TestimonialEntry[] = [
  {
    name: "Luis Arguello Herrera",
    role: ".Net Full-Stack Developer, Project Lead",
    image: "/Luis.jpeg",
    quote:
      "Gus is a talented UI/UX designer who excels at creating user-friendly and visually stunning designs. His creativity and attention to detail make him a key asset to any project. He's highly responsible and always meets deadlines, making him a reliable and valuable team member!"
  },
  {
    name: "Nicolas Mastromarino",
    role: "SEO Analyst / Email Marketing / Automation",
    image: "/Nico.jpeg",
    quote:
      "I had the privilege of working alongside Gustavo for over 6 years, where he played a pivotal role as our lead UX/UI designer. His ability to merge user-centric design with striking visuals is exceptional. Always ahead of UX/UI trends and a joy to work with, I highly recommend Gus for any design-driven project or team."
  },
  {
    name: "Edwin Morales Madrigal",
    role: "Analista y Desarrollador de Sistemas",
    image: "/Edwin.jpeg",
    quote:
      "Gustavo is a highly talented and dedicated professional with a strong background in interface design and user experience. His set of technical skills, ability to collaborate, and focus on continuous improvement make him a valuable asset to any digital product development team. I have no doubt that Gustavo will continue to have a positive impact wherever he chooses to apply his skills and knowledge in the future."
  },
  {
    name: "Kelsey Rogers",
    role: "Operations Manager @ InstallPros | Operations Management, Project Coordination",
    image: "/Kelsey.jpeg",
    quote:
      "I had the pleasure of working with Gustavo at InstallPros, where he served as our UX/UI Designer. What set Gustavo apart was his ability to take complex, multi-layered processes and distill them into intuitive, user-friendly experiences. He had a deep understanding of not just design, but the operational workflows behind it, which made him an incredibly effective collaborator across teams. He worked closely with developers and stakeholders alike, translating business needs and technical requirements into designs that were both functional and thoughtful. Gustavo approached every project with clarity and intention. He wasn't just focused on how something looked, but on how it worked and how it could work better. His contributions genuinely improved the way our teams operated and made systems easier for everyone to navigate. He is the kind of designer who makes the people around him better at their jobs. Any team would be lucky to have him."
  },
  {
    name: "Ezequiel Cenicola",
    role: "Product Designer | Especialista en UX/UI | Innovador en Soluciones Digitales @ICBC",
    image: "/Eze.jpeg",
    quote:
      "En el tiempo que trabaje con Gustavo conocí a un profesional muy responsable, autodidacta y dedicado. Trata de explotar sus aptitudes al máximo y estar en constante capacitación, forjando así, un conocimiento más sólido. Me gustaría volver a trabajar con él en un futuro."
  },
  {
    name: "Jared White",
    role: "JBZ Beats Inc.",
    image: "/Jared.jpeg",
    quote:
      "It has been a privilege to work alongside Gustavo for over half a decade, both at SteadyContent and AgencyHub. In the realm of UI design, I have seldom come across a talent as profound and consistent as his. Over the years, I've been fortunate to witness the hundreds of websites he's meticulously crafted. Each one not only showcases his expertise but is a testament to his innate ability to align design with functionality, ensuring an intuitive and seamless user experience."
  },
  {
    name: "Katrina Robinson, LMSW",
    role: "Clinical Social Worker - Therapist - Professional Writer and Editor",
    image: "/Katrina.jpeg",
    quote:
      "Gustavo is not only knowledgeable in his field, he is a gem and pleasure to work with. He approaches his work with professionalism and much-appreciated kindness and humor. If I have the chance to work with Gus again, I will take it with enthusiasm!"
  },
  {
    name: "Yaseen Chaudhary",
    role: "The Data Guy!",
    image: "/Yaseen.jpeg",
    quote:
      "Gustavo is a determined individual who worked on one of our key projects for the launch of Apartments.com. His detailed and analytical work was highly credited for our launch. It was very impressive that he came on board later than his coworkers, but was synced up and ready to perform. I highly recommend him for any HTML development position and I wish him all the best for his future endeavors."
  }
] as const;

export const experienceEntries: ExperienceEntry[] = [
  {
    tier: "now",
    period: "2024 - Present",
    company: "Install Pros",
    role: "UX/UI Designer",
    logo: "/logos/installpros.svg",
    summary:
      "Designing the technician platform behind a network that has completed 9,163 installations and processed $7.1M+ in revenue.",
    tags: ["Field operations", "Mobile platform", "Design system"]
  },
  {
    tier: "now",
    period: "2023 - Present",
    company: "Emmvi",
    role: "Co-Founder · Design & Strategy",
    logo: "/logos/emmvi.svg",
    summary:
      "Co-founded a growth studio for service businesses. Accountable for offer, web system, and revenue, not just deliverables.",
    tags: ["Business growth", "Digital strategy"]
  },
  {
    tier: "before",
    period: "2020 - 2024",
    company: "AgencyHub",
    role: "UX/UI Designer",
    logo: "/logos/agencyhub.svg",
    summary:
      "Designed a two-sided B2B marketplace end to end and turned a fragmented platform into one product language."
  },
  {
    tier: "before",
    period: "2017 - 2020",
    company: "AgencyHub",
    role: "Web Designer",
    logo: "/logos/agencyhub.svg",
    summary:
      "Web delivery and infrastructure: hosting, DNS, migrations. The technical base I still design with."
  },
  {
    tier: "before",
    period: "2015 - 2016",
    company: "AccelOne",
    role: "Web Research & HTML Developer",
    summary: "HTML implementation and web research. Where execution started."
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
    kind: "product",
    slug: "installpros-technician-app",
    title: "Field Operations Platform",
    clientOrBrand: "Install Pros",
    role: "UX/UI Designer",
    period: "2024 - Present",
    scope: "Technician mobile app: scheduling, installs, job completion",
    summary:
      "A mobile platform that guides Starlink installation technicians through scheduling, on-site workflows, and job completion under real field conditions.",
    tags: ["Field Operations", "Mobile Platform"],
    featured: true,
    href: "/work/installpros-technician-app",
    cardVisual: {
      type: "image",
      src: "/projects/installpros-app/Portfolio - Cover - InstallPros.png",
      alt: "Field Operations Platform cover showing the technician mobile product",
      tone: "paper",
      imageClassName: "scale-[1.14] object-center"
    },
    glance: {
      challenge:
        "Technicians ran installs from memory, paper, and phone calls. Every gap in guidance turned into a longer visit, a callback, or a failed install.",
      role:
        "Product design end to end: field workflows, mobile UI, and the pattern system engineering builds against.",
      outcome:
        "A field-ready operating tool: one legible next action in every job state, workflows that survive dead zones, and patterns engineering reuses without new design cycles."
    },
    heroSlides: [
      { src: "/projects/installpros-app/boards/01-overview.webp", alt: "Project overview with role, scope, and key app screens", label: "Overview" },
      { src: "/projects/installpros-app/boards/02-problem-statement.webp", alt: "The problem: job details scattered across emails and chat, with no consistent documentation", label: "Problem Statement" },
      { src: "/projects/installpros-app/boards/03-user-personas.webp", alt: "Technician personas across the digital fluency range", label: "User Personas" },
      { src: "/projects/installpros-app/boards/04-access-security.webp", alt: "Access and security screens for the technician network", label: "Access & Security" },
      { src: "/projects/installpros-app/boards/05-identity-verification.webp", alt: "Identity verification flow for technicians", label: "Identity Verification" },
      { src: "/projects/installpros-app/boards/06-onboarding-personalization.webp", alt: "Onboarding and personalization screens", label: "Onboarding & Personalization" },
      { src: "/projects/installpros-app/boards/07-job-management.webp", alt: "Job management: schedule, job details, and acceptance", label: "Job Management" },
      { src: "/projects/installpros-app/boards/08-installation-workflow.webp", alt: "Guided installation workflow with step states", label: "Installation Workflow" },
      { src: "/projects/installpros-app/boards/09-payment-flow.webp", alt: "Payment flow: earnings, payout status, Stripe and PayPal", label: "Payment Flow" },
      { src: "/projects/installpros-app/boards/10-completion-feedback.webp", alt: "Job completion with photo evidence and customer feedback", label: "Completion & Feedback" },
      { src: "/projects/installpros-app/boards/11-operational-context.webp", alt: "Operational context: 9,163 installations and over 7 million dollars processed across the network", label: "Operational Context" },
      { src: "/projects/installpros-app/boards/12-final-reflection.webp", alt: "Final reflection on balancing operational complexity with simplicity and trust", label: "Final Reflection" }
    ],
    context: [
      "Install Pros runs Starlink internet installations across residential, commercial, and mobile sectors. The unit economics are unforgiving: a truck roll costs the same whether the install succeeds or fails, and every clarification call routes through a small dispatch team.",
      "The business needed technicians to complete more installs per day with fewer escalations. Not a portal, but an operating tool that holds the job's state so the technician doesn't have to."
    ],
    operatingConditions: [
      "The interface is used standing, outdoors, often one-handed, in direct sunlight, between a ladder and a customer conversation. Sessions last seconds, not minutes: a technician checks the next action, then puts the phone away.",
      "Connectivity is unreliable by definition: the customer is buying satellite internet because coverage there is poor. The product has to assume a dead zone at the exact moment of work."
    ],
    constraints: [
      {
        label: "Connectivity",
        body: "Workflows had to survive offline moments without losing state or trust. A spinner in a dead zone reads as a broken product."
      },
      {
        label: "Attention",
        body: "Field attention is the scarcest resource in the system. Anything that requires reading a paragraph on-site is a design failure."
      },
      {
        label: "Delivery",
        body: "A small engineering team meant every pattern had to be reusable. Bespoke screens were a budget we didn't have."
      }
    ],
    decisions: [
      {
        question: "What does the home screen owe a technician?",
        decision: "One next action, not a dashboard.",
        rationale:
          "Early layouts surfaced everything: schedule, job list, statuses, messages. Walking the flows against real install scenarios showed none of it mattered at the moment of use; the only question in the field is \"what now?\". The home surface was rebuilt around the current job and its single next step, with everything else one level down.",
        tradeoff:
          "Managers wanted richer overview data on the first screen. That visibility moved into the job list, accepting an extra tap for the office in exchange for zero ambiguity in the field.",
        visual: {
          caption:
            "The home surface answers one question. Status, schedule, and history exist, but nothing competes with the current job's next action.",
          visual: {
            type: "image",
            src: "/projects/installpros-app/overview.png",
            alt: "Field Operations Platform home and overview screens"
          }
        }
      },
      {
        question: "How should an installation flow handle reality going off-script?",
        decision: "A step sequence with explicit, recoverable states.",
        rationale:
          "Installs rarely fail at step one; they fail in the middle: a blocked roof, a missing part, no signal. The workflow models progress as discrete states a technician can pause, annotate, and resume, so a deviation becomes structured data instead of a phone call to dispatch.",
        tradeoff:
          "Modeled states cost more design and engineering than a free-form checklist, and they constrain edge cases the team hasn't mapped yet. We accepted that rigidity because recoverability was worth more than flexibility.",
        visual: {
          caption:
            "Installation as a state machine: each step can be completed, paused, or flagged, and the flow knows how to resume from any of them.",
          visual: {
            type: "image",
            src: "/projects/installpros-app/installation-workflow.png",
            alt: "Installation workflow screens showing step states"
          }
        }
      },
      {
        question: "How much job management belongs in a technician's pocket?",
        decision: "Status, schedule, and proof of work. Nothing that belongs to dispatch.",
        rationale:
          "Job views were stripped to what a technician acts on: today's sequence, each job's state, and completion evidence. Assignment logic and exception handling stayed with dispatch, which kept the mobile scope shippable by a small team.",
        tradeoff:
          "Some technician autonomy, like reordering jobs and self-assignment, was deliberately left out of the first release to protect operational consistency.",
        visual: {
          caption:
            "Job management reduced to action: today's sequence and each job's state, scannable between tasks without re-reading.",
          visual: {
            type: "image",
            src: "/projects/installpros-app/job-management.png",
            alt: "Job management screens with status hierarchy"
          }
        }
      }
    ],
    system: {
      body: [
        "Screen patterns like status chips, action rows, and step headers were defined once and reused across scheduling, installation, and job views. The intent was economic: engineering builds from rules rather than mockups, and a technician never has to relearn what a color or a position means.",
        "Designing with implementation in mind is what kept the product buildable: every new screen since has been assembled from the existing pattern set rather than designed from scratch."
      ]
    },
    outcome: {
      results: [
        "Technicians get a single legible next action in every state of a job. The scanning effort the old process demanded is gone from the workflow itself.",
        "Off-script situations became structured states instead of dispatch calls, which is the difference between a tool and a phone tree.",
        "Engineering ships new screens from the established pattern set without a design cycle per screen."
      ],
      reflection:
        "The open question is measurement: install duration and callback rate are the metrics this design should answer to, and instrumenting them is the next thing I'd push for. I'd also revisit keeping job reordering away from technicians; the consistency argument may not survive contact with experienced crews."
    },
    nextSlug: "agencyhub-platform",
    deckUrl: "/docs/installpros-technician-app-case-study.pdf"
  },
  {
    kind: "product",
    slug: "agencyhub-platform",
    title: "AgencyHub",
    clientOrBrand: "AgencyHub",
    role: "UX/UI Designer",
    period: "3 months",
    scope: "Marketplace, checkout, orders, provider tools",
    summary:
      "A two-sided marketplace where digital agencies buy white-label services from vetted providers and resell them to their own clients.",
    tags: ["B2B SaaS", "Marketplace"],
    featured: false,
    href: "/work/agencyhub-platform",
    cardVisual: {
      type: "image",
      src: "/projects/agencyhub/Cover - Agencyhub Website.png",
      alt: "AgencyHub marketplace cover",
      tone: "paper",
      imageClassName: "scale-[1.12] object-center"
    },
    glance: {
      challenge:
        "Agencies wanted to offer more services without hiring. But finding reliable vendors was slow, and a bad vendor costs an agency its client.",
      role:
        "Product design end to end: research, flows, information architecture, UI, and the component system, for both sides of the marketplace.",
      outcome:
        "A marketplace where an agency can find a vetted provider, buy a service, charge its own client, and manage delivery, all in one system."
    },
    heroSlides: [
      { src: "/projects/agencyhub/boards/01-overview.webp", alt: "Project overview board with the marketplace summary, role, and duration", label: "Overview" },
      { src: "/projects/agencyhub/boards/02-problem-statement.webp", alt: "Problem statement and solution board", label: "Problem Statement" },
      { src: "/projects/agencyhub/boards/03-how-might-we.webp", alt: "How Might We questions and their categorization", label: "How Might We" },
      { src: "/projects/agencyhub/boards/04-design-process.webp", alt: "Design Sprint process board mapping the five phases", label: "Design Process" },
      { src: "/projects/agencyhub/boards/05-user-personas.webp", alt: "User personas for the agency owner and the service provider", label: "User Personas" },
      { src: "/projects/agencyhub/boards/06-user-flow.webp", alt: "Provider and agency user flows, including approval and payment link paths", label: "User Flow" },
      { src: "/projects/agencyhub/boards/07-lightning-demos.webp", alt: "Lightning demos board with marketplace references", label: "Lightning Demos" },
      { src: "/projects/agencyhub/boards/08-paper-sketches.webp", alt: "Paper sketches of marketplace, cart, and checkout concepts", label: "Paper Sketches" },
      { src: "/projects/agencyhub/boards/09-high-fidelity-wireframes.webp", alt: "High-fidelity wireframes of marketplace, cart, and checkout", label: "High-Fidelity Wireframes" },
      { src: "/projects/agencyhub/boards/10-typography.webp", alt: "Typography board showing the Inter type system", label: "Typography" },
      { src: "/projects/agencyhub/boards/11-components.webp", alt: "Component states board for inputs and controls", label: "Components" },
      { src: "/projects/agencyhub/boards/12-ui-colors.webp", alt: "UI color system board with accessibility ratings", label: "UI Colors" },
      { src: "/projects/agencyhub/boards/13-ui-showcase.webp", alt: "Final UI showcase across marketplace, cart, and checkout", label: "UI Showcase" },
      { src: "/projects/agencyhub/boards/14-key-takeaway.webp", alt: "Key takeaway board: good marketplace experiences are built on trust", label: "Key Takeaway" }
    ],
    context: [
      "Digital agencies grow by saying yes. When a client asks for SEO and the agency only does ads, the agency either hires, refuses, or finds a white-label partner. Most choose partners, and most find them by trial and error. Every failed partnership costs money twice: the wasted spend, and the client who leaves.",
      "AgencyHub's bet was that vetting could be a platform feature instead of a private struggle. For that to work, the product had to serve two sides with opposite needs: providers want to list fast, agencies want to trust what they find."
    ],
    usersLabel: "Two sides, three parties",
    operatingConditions: [
      "On paper this is a standard two-sided marketplace: providers list and fulfill services, agencies browse and buy. The flows looked normal until one detail changed everything: the agency is not the end customer. It buys a service, marks it up, and delivers it to its own client.",
      "That third party never logs in. But they pay, they provide requirements, and they judge the result. Most of the hardest design decisions came from this triangle, not from the marketplace itself."
    ],
    usersVisual: {
      caption:
        "The two-sided system map: a provider path that ends in an approval gate, and an agency path where checkout can detour through the client before fulfillment begins.",
      visual: {
        type: "image",
        src: "/projects/agencyhub/user-flow.png",
        alt: "AgencyHub provider and agency user flows"
      }
    },
    constraints: [
      {
        label: "Trust is the product",
        body: "The entire value proposition is that agencies stop vetting vendors themselves. Every catalog and listing decision had to defend that promise, even at the cost of growth."
      },
      {
        label: "Three parties, one transaction",
        body: "Payment can come from someone who isn't the buyer and never logs in. Orders, notifications, and checkout all inherit that complexity."
      },
      {
        label: "One designer, three months",
        body: "Marketplace, cart, orders, and provider tools had to ship together, which made a shared component system a necessity, not a preference."
      }
    ],
    decisions: [
      {
        question: "Who pays at checkout?",
        decision: "Checkout can end with a payment link instead of a payment.",
        rationale:
          "A normal checkout assumes the buyer pays. Here, the agency often needs its client to pay first. So checkout offers two endings: pay now, or create a payment link and send it to the client. The order starts when the client pays, and the agency never fronts money for work it has already sold.",
        tradeoff:
          "An order can now exist in a \"waiting for client\" state. That made status logic more complex for every other part of the system: orders, notifications, and fulfillment all had to understand a purchase that isn't paid yet.",
        visual: {
          caption:
            "The decision in one screen: card, balance, or a payment link sent to the client. Selecting Payment Link turns the primary action into \"Create A Payment Link\".",
          visual: {
            type: "image",
            src: "/projects/agencyhub/screen-checkout.webp",
            alt: "AgencyHub checkout with card, payment link, and account balance options"
          }
        }
      },
      {
        question: "How does trust get into the catalog?",
        decision: "No service goes live without approval.",
        rationale:
          "Providers can create a listing in minutes, but publishing requires review. This is slower for providers and adds operational work for the platform. We accepted both costs, because a marketplace that lists everyone is just another search problem, and the one thing agencies were promised is that what they find is already vetted.",
        tradeoff:
          "Slower catalog growth, accepted in exchange for the one claim competitors couldn't make.",
        visual: {
          caption:
            "What an agency browses is already approved: curated categories with scope and starting prices up front, because the vetting happened before the listing went live.",
          visual: {
            type: "image",
            src: "/projects/agencyhub/screen-marketplace.webp",
            alt: "AgencyHub marketplace with curated service listings"
          }
        }
      },
      {
        question: "Where does the client fit in delivery?",
        decision: "Communication lives inside the order, with room for three parties.",
        rationale:
          "Requirements, revisions, and updates flow through a shared space attached to the order, shared by agency, provider, and the client when needed, instead of email threads the platform can't see. The platform can only resolve disputes about work it can observe, and the order is the only object all three parties share.",
        tradeoff:
          "Building communication into the product is expensive, and asking users to leave email is a real adoption risk. The bet was that order-anchored context is worth the switching cost.",
        visual: {
          caption:
            "The order as the shared object: plan, setup fee, quantity, and totals carried from cart through fulfillment, so every conversation has the same source of truth.",
          visual: {
            type: "image",
            src: "/projects/agencyhub/screen-cart.webp",
            alt: "AgencyHub cart with order details and totals"
          }
        }
      }
    ],
    system: {
      body: [
        "Marketplace, cart, orders, and the provider's store were built from one set of components and layout rules. For a solo designer on a three-month timeline this wasn't aesthetic discipline; it was the only way to ship four coherent surfaces at once.",
        "The same system absorbed the project's odd states, like orders waiting on a client and listings waiting on approval, without inventing new patterns for each."
      ]
    },
    outcome: {
      results: [
        "The design made a new behavior possible: an agency can sell a service it doesn't deliver, with payment, requirements, and fulfillment handled by the platform instead of spreadsheets and email.",
        "Vetting moved from a private, per-agency struggle to a platform feature. The approval gate is the product's trust claim, enforced by design.",
        "Four surfaces shipped in three months from one component system, by one designer."
      ],
      reflection:
        "If I continued this work, I would instrument the two riskiest decisions: how many checkouts end in a payment link, which shows whether the third-party flow is real demand, and how long provider approval takes, because trust is only a feature if it doesn't strangle supply."
    },
    nextSlug: "installpros-website",
    deckUrl: "/docs/agencyhub-case-study.pdf"
  },
  {
    kind: "experience",
    slug: "installpros-website",
    title: "Digital Service Experience",
    clientOrBrand: "Install Pros",
    role: "UX/UI Designer",
    period: "2024 - Present",
    scope: "Web system: homepage, service pages, campaign landings",
    summary:
      "A conversion-led redesign of Install Pros' web presence, turning a list of services into a credible system that moves visitors from search to booked install.",
    tags: ["Service Business", "Conversion"],
    featured: false,
    href: "/work/installpros-website",
    cardVisual: {
      type: "image",
      src: "/projects/installpros-website/Cover - InstallPros Website.png",
      alt: "Install Pros digital service experience cover",
      tone: "paper"
    },
    glance: {
      challenge:
        "Install Pros sells trust: a stranger entering your home. The old site listed services but didn't carry credibility or direct intent; visitors arrived from search and stalled.",
      role:
        "Strategy through execution: positioning, information architecture, conversion design, UI, and SEO-aware implementation.",
      outcome:
        "A scalable web system of homepage, service pages, and campaign landings, built around intent paths and proof, extensible to new offers like Amazon LEO without redesign."
    },
    businessContext: [
      "Install Pros competes in local-service search, where the buying decision is fast and trust-driven: customers compare a handful of providers and choose the one that looks most credibly professional. The website isn't a brochure; it's the storefront where that comparison happens.",
      "The service mix was also widening, with Starlink, home automation, and the upcoming Amazon LEO offer, which the old structure could not present without burying each offer."
    ],
    audience: [
      "Two intent states drive nearly all traffic. The urgent buyer (\"I need Starlink installed this week\") needs the fastest path to coverage confirmation and contact. The comparison shopper needs proof: who you are, what you've installed, why you're the safe choice.",
      "Designing for both means one structure with two speeds, immediate action paths layered over deeper credibility content, instead of one homepage trying to do both jobs in a single scroll."
    ],
    strategy: [
      "Message hierarchy was settled before layout: lead with what the company does and where (service plus coverage), prove it (installs, reviews, certifications), then ask (booking). Each page makes one claim and supports it, rather than every page repeating the whole pitch.",
      "Positioning leaned into specialization, the installation professionals rather than generic handyman breadth, because in trust businesses the specialist premium is the conversion strategy."
    ],
    architecture: {
      body: [
        "The site was restructured from one stretched homepage into a system of page roles: the homepage routes intent, service pages own their offer and its search terms, and campaign landings run product-specific stories without disturbing the core structure. Grouping follows how customers name the need: by service, not by internal business unit. This is also where SEO stops being a separate project: page roles and search intent are the same map."
      ],
      visual: {
        caption:
          "A service page owning its offer end to end: one claim, its proof, and its conversion path, mapped to the search intent that lands there.",
        visual: {
          type: "image",
          src: "/projects/installpros-website/starlink-installs.png",
          alt: "Starlink installation service page"
        }
      }
    },
    conversion: [
      {
        question: "Where does the primary CTA earn its place?",
        decision: "After proof, then repeated at decision points, not stacked at every scroll stop.",
        rationale:
          "In a trust purchase, a contact form ahead of credibility converts nobody and signals pushiness. Calls to action follow trust moments: after coverage confirmation, after proof sections, and on exit paths.",
        tradeoff:
          "Fewer CTA instances means some impatient visitors scroll past a conversion moment. The bet is that qualified leads outweigh raw clicks.",
        visual: {
          caption:
            "The homepage sequence: claim, coverage, proof, ask. Conversion moments arrive after credibility is established, not before.",
          visual: {
            type: "image",
            src: "/projects/installpros-website/homepage-new.png",
            alt: "Install Pros homepage redesign"
          }
        }
      },
      {
        question: "How does a new offer launch without rebuilding the site?",
        decision: "A campaign-landing pattern with its own narrative arc inside the shared system.",
        rationale:
          "Amazon LEO needed a product-specific story for a product nobody knows yet: education before conversion. The landing pattern allows a tailored message hierarchy while reusing the system's components, so new offers launch without new design cycles.",
        tradeoff:
          "A constrained landing pattern limits how exotic a campaign can look. We traded maximal campaign creativity for launch speed and coherence.",
        visual: {
          caption:
            "The Amazon LEO landing: an education-first narrative for an unknown product, built entirely from the shared system.",
          visual: {
            type: "image",
            src: "/projects/installpros-website/amazon-leo.png",
            alt: "Amazon LEO campaign landing page"
          }
        }
      }
    ],
    visualDirection:
      "The visual language borrows from product companies rather than local-service sites: restrained palette, structured layout, real work over stock metaphors. Looking like a serious operation is the trust signal. One rule governed every screen: nothing decorative that doesn't support credibility.",
    finalExperience: [
      {
        caption:
          "Contact keeps lead capture short: the form asks only what dispatch needs to qualify a job, because every extra field is measurable friction in local services.",
        visual: {
          type: "image",
          src: "/projects/installpros-website/contact-us-new.png",
          alt: "Install Pros contact page redesign"
        }
      }
    ],
    outcome: {
      results: [
        "Service communication now scales: new offers get a launch-ready landing pattern instead of a fight for homepage space.",
        "Each service page owns its search intent, aligning information architecture with SEO instead of treating them as separate projects.",
        "The brand reads like a professional operation at the moment of comparison, which is the conversion event in this market."
      ],
      reflection:
        "The system is built to be measured: paths, CTAs, and pages map to funnel stages. The next step is closing the loop with analytics on booked installs per intent path, not just traffic."
    },
    nextSlug: "emmvi-growth-platform"
  },
  {
    kind: "experience",
    slug: "emmvi-growth-platform",
    title: "Emmvi",
    clientOrBrand: "Emmvi",
    role: "Co-Founder · Design & Strategy",
    period: "2023 - Present",
    scope: "Positioning, web system, conversion funnel",
    summary:
      "Co-founded studio work helping service businesses grow: positioning, web systems, and conversion infrastructure treated as one design problem.",
    tags: ["Business Growth", "Digital Strategy"],
    featured: false,
    href: "/work/emmvi-growth-platform",
    cardVisual: {
      type: "image",
      src: "/projects/emmvi/cover-awe.png",
      alt: "Emmvi growth studio cover",
      tone: "paper"
    },
    glance: {
      challenge:
        "Service businesses don't fail for lack of a website; they fail for lack of a clear offer. Emmvi exists to fix positioning first and let design execute it.",
      role:
        "Co-founder: offer design, digital strategy, UX/UI, and delivery, accountable for the business result, not the mockup.",
      outcome:
        "A repeatable growth system, from positioning to message to site to funnel, applied end to end, with founder-level accountability for what it produces."
    },
    businessContext: [
      "Emmvi is a venture, not a client brief: I co-own the offer, the pipeline, and the consequences of every design decision. When a page underperforms there is no handoff to blame; the strategy gets revised.",
      "The clients are service businesses whose growth ceiling is usually communicative: capable operators with an unclear offer, generic messaging, and websites built as brochures rather than as sales infrastructure."
    ],
    audience: [
      "Buyers are owner-operators who distrust marketing spend because they've bought websites before and seen nothing change. The audience question isn't what they like. It's what would make them believe this time is different. That's why the practice leads with offer clarity, not design portfolios."
    ],
    strategy: [
      "Every engagement runs the same sequence: clarify the offer, then the message, then the structure, then the interface. Skipping to screens is the failure mode of the entire category: an attractive site amplifying a vague offer just makes the vagueness load faster.",
      "Design, marketing, and funnel mechanics are treated as one system with one job: convert attention into qualified conversations. That framing is the product Emmvi sells."
    ],
    architecture: {
      body: [
        "Emmvi's own site practices the method it sells: services framed as business outcomes rather than deliverables, proof placed next to every claim, and a single conversion path toward a qualified conversation."
      ],
      visual: {
        caption:
          "Services framed as outcomes, not deliverables: the page sells what changes for the business, with the method as supporting evidence.",
        visual: {
          type: "image",
          src: "/projects/emmvi/services-website-design.png",
          alt: "Emmvi services page"
        }
      }
    },
    conversion: [
      {
        question: "What does the site optimize for: volume or qualification?",
        decision: "Qualified conversations over raw leads.",
        rationale:
          "A small practice drowns in unqualified leads faster than it starves from few ones. The messaging filters deliberately: outcome-led framing attracts businesses ready to invest in growth and repels brief-shoppers.",
        tradeoff:
          "A smaller top of funnel, accepted on purpose. The cost of a bad-fit engagement to a two-person studio is larger than the value of three extra inquiries.",
        visual: {
          caption:
            "The conversion path ends in a conversation, not a form dump. Qualification starts in the copy before the first reply is ever written.",
          visual: {
            type: "image",
            src: "/projects/emmvi/contact-us.png",
            alt: "Emmvi contact and conversion page"
          }
        }
      }
    ],
    visualDirection:
      "Confident and restrained: the site has to look like the advice it sells. Editorial typography and disciplined layout signal strategy work; anything trend-driven would undercut the positioning.",
    finalExperience: [
      {
        caption:
          "The homepage makes the offer legible in one screen: who it's for, what changes, and what to do next.",
        visual: {
          type: "image",
          src: "/projects/emmvi/homepage.png",
          alt: "Emmvi homepage"
        }
      }
    ],
    outcome: {
      results: [
        "A working method that connects positioning to interface decisions, the same system applied in the website work shown elsewhere in this portfolio.",
        "Founder-level accountability keeps design choices tethered to scope, delivery cost, and revenue rather than to deliverables.",
        "Demonstrated range across the full growth stack: brand, message, web system, funnel."
      ],
      reflection:
        "Emmvi is the project where I hold every corner of the triangle (users, business, technology) with no one to hand a problem to. The discipline it forces, deciding what not to build, is the most transferable thing it has taught me."
    },
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
