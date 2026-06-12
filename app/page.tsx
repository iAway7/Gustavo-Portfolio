import { MagneticLink } from "@/components/magnetic-link";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { credibilityPoints, experienceEntries, projectIndex } from "@/lib/site-data";

const homeProjectSlugs = [
  "installpros-technician-app",
  "agencyhub-platform",
  "installpros-website",
  "emmvi-growth-platform"
] as const;

const homeProjects = homeProjectSlugs
  .map((slug) => projectIndex.find((project) => project.slug === slug))
  .filter((project): project is (typeof projectIndex)[number] => Boolean(project));

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1} className="pb-8 pt-10 sm:pt-14">
      <section id="home" className="section-space pt-20 sm:pt-24 lg:min-h-[78vh] lg:pt-24">
        <div className="shell">
          <div className="max-w-[72rem]">
            <div className="mt-4 flex flex-wrap gap-3">
              <span className="pill">Product Designer</span>
            </div>
            <h1 className="hero-title mt-8 max-w-[13ch]">
              Built around people.
              <br />
              Grounded in reality.
            </h1>
            <p className="body-copy mt-8 max-w-3xl text-[24px] leading-[1.55] text-[#4f4f4f]">
              Product Designer and UX/UI Designer with 9+ years of experience creating SaaS
              platforms, web applications, and AI-assisted digital experiences.
            </p>
            <div className="mt-12 flex flex-wrap gap-4">
              <MagneticLink href="/work" className="link-chip">
                View Work
              </MagneticLink>
              <MagneticLink href="/contact" className="link-chip link-chip--secondary">
                Let&apos;s Talk
              </MagneticLink>
            </div>
          </div>
        </div>
      </section>

      <section id="work-preview" className="section-space">
        <div className="shell">
          <div className="section-rule">
            <div>
              <p className="caption">Work</p>
              <h2 className="section-title mt-4">Selected product, platform, and growth-focused work.</h2>
            </div>
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-2">
            {homeProjects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.06}>
                <ProjectCard
                  project={project}
                  compact
                  visualBordered={false}
                  visualImageClassName={
                    project.slug === "installpros-technician-app"
                      ? "scale-[1.2] object-center"
                      : project.slug === "agencyhub-platform"
                        ? "scale-[1.16] object-center"
                        : undefined
                  }
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="credibility" className="section-space">
        <div className="shell">
          <div className="section-rule">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <Reveal>
                <p className="caption">Why this work feels different</p>
                <h2 className="section-title mt-4">
                  This portfolio is built around product judgment, not just polished screens.
                </h2>
              </Reveal>

              <div className="grid gap-5">
                {credibilityPoints.map((point, index) => (
                  <Reveal key={point.label} delay={index * 0.06} className="editorial-card p-6">
                    <p className="caption">{point.label}</p>
                    <p className="mt-4 text-2xl font-medium tracking-[-0.05em] text-text">
                      {point.value}
                    </p>
                    <p className="mt-3 text-base leading-7 text-muted">{point.detail}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="section-space">
        <div className="shell">
          <div className="section-rule">
            <div className="mb-10 flex items-end justify-between gap-6 pt-8">
              <Reveal>
                <h2 className="section-title">Testimonials</h2>
              </Reveal>
              <Reveal delay={0.04}>
                <a
                  href="https://www.linkedin.com/in/gustavo-polin/details/recommendations/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="View all testimonials on LinkedIn (opens in a new tab)"
                  className="inline-flex items-center gap-2 text-lg text-text transition-colors duration-200 hover:text-[#244de8]"
                >
                  View all
                  <span aria-hidden="true">-&gt;</span>
                </a>
              </Reveal>
            </div>

            <TestimonialsCarousel />
          </div>
        </div>
      </section>

      <section id="experience-snapshot" className="section-space">
        <div className="shell">
          <div className="section-rule">
            <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
              <Reveal>
                <p className="caption">Experience snapshot</p>
                <h2 className="section-title mt-4">
                  From SaaS workflows to service-business systems, the work stays close to execution.
                </h2>
                <p className="body-copy mt-6 max-w-xl">
                  I’ve worked across product teams, developers, stakeholders, marketing, and
                  support, always balancing product intent with what can actually ship.
                </p>
              </Reveal>

              <div className="grid gap-5">
                {experienceEntries.slice(0, 3).map((entry, index) => (
                  <Reveal key={`${entry.company}-${entry.period}`} delay={index * 0.06} className="editorial-card p-6">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-lg font-medium text-text">{entry.company}</p>
                        <p className="text-base text-muted">{entry.role}</p>
                      </div>
                      <p className="text-base text-muted">{entry.period}</p>
                    </div>
                    <p className="mt-4 text-base leading-7 text-muted">{entry.summary}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact-cta" className="section-space">
        <div className="shell">
          <Reveal className="section-rule">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-2xl">
                <p className="caption">Contact</p>
                <h2 className="section-title mt-4">Looking for a designer who understands products, not just screens?</h2>
                <p className="body-copy mt-6">
                  I work with teams that need product thinking, UX clarity, and delivery-aware
                  design execution.
                </p>
              </div>
              <MagneticLink href="/contact" className="link-chip">
                Start a conversation
              </MagneticLink>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
