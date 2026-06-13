import { CertificationsList } from "@/components/certifications-list";
import { MagneticLink } from "@/components/magnetic-link";
import { Reveal } from "@/components/reveal";
import { approachPrinciples, capabilityTags } from "@/lib/site-data";
import { getDict, type Locale, localizedPath } from "@/lib/i18n";

export function ApproachView({ locale }: { locale: Locale }) {
  const t = getDict(locale).approach;

  return (
    <main id="main-content" tabIndex={-1} className="pb-8 pt-10 sm:pt-14">
      <section className="section-space">
        <div className="shell">
          <div className="section-rule">
            <Reveal className="max-w-4xl">
              <p className="caption">{t.caption}</p>
              <h1 className="section-title mt-4">{t.h1}</h1>
              <p className="body-copy mt-6 max-w-2xl">{t.intro}</p>
            </Reveal>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {approachPrinciples.map((principle, index) => (
                <Reveal key={principle.title} delay={index * 0.05} className="editorial-card p-6 sm:p-8">
                  <p className="text-xl font-medium tracking-[-0.04em] text-text">{principle.title}</p>
                  <p className="mt-4 text-base leading-7 text-muted">{principle.summary}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="shell">
          <div className="section-rule grid gap-10 lg:grid-cols-2">
            <Reveal>
              <p className="caption">{t.coreExpertise}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {capabilityTags.map((tag) => (
                  <span key={tag} className="pill">
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="caption">{t.relevantCertifications}</p>
              <CertificationsList />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="shell">
          <Reveal className="section-rule">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-2xl">
                <p className="caption">{t.startWork}</p>
                <h2 className="section-title mt-4">{t.flagshipHeading}</h2>
              </div>
              <MagneticLink
                href={localizedPath("/work/installpros-technician-app", locale)}
                className="link-chip"
              >
                {t.viewFeatured}
              </MagneticLink>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
