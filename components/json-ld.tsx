import { absoluteUrl, PERSON, SITE_NAME, SITE_URL } from "@/lib/seo";

/**
 * Renders a JSON-LD <script>. Next.js allows this in Server Components and it
 * is emitted into the static HTML, so crawlers see it without running JS.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // Content is built from trusted, static site data only.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Site-wide Person + WebSite graph. Rendered once in the root layout. */
export function siteJsonLd() {
  const personId = `${SITE_URL}/#person`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": personId,
      name: PERSON.name,
      jobTitle: PERSON.jobTitle,
      url: SITE_URL,
      image: absoluteUrl("/og/default.png"),
      address: {
        "@type": "PostalPlace",
        name: PERSON.location
      },
      sameAs: [...PERSON.sameAs]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "en",
      publisher: { "@id": personId },
      author: { "@id": personId }
    }
  ];
}

type Crumb = { name: string; path: string };

/** BreadcrumbList for a page. */
export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path)
    }))
  };
}

/** CreativeWork for an individual case study, attributed to the Person. */
export function caseStudyJsonLd({
  title,
  description,
  path,
  image,
  tags
}: {
  title: string;
  description: string;
  path: string;
  image: string;
  tags?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    headline: title,
    description,
    url: absoluteUrl(path),
    image: absoluteUrl(image),
    inLanguage: "en",
    keywords: tags?.join(", "),
    author: { "@id": `${SITE_URL}/#person` },
    creator: { "@id": `${SITE_URL}/#person` },
    isPartOf: { "@id": `${SITE_URL}/#website` }
  };
}
