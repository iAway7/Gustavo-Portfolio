import Image from "next/image";

import { CertificationsList } from "@/components/certifications-list";
import { MagneticLink } from "@/components/magnetic-link";
import { Reveal } from "@/components/reveal";
import { capabilityTags, certifications, experienceEntries } from "@/lib/site-data";
import { getDict, type Locale, localizedPath } from "@/lib/i18n";

function CompanyLogo({
  logo,
  company,
  size
}: {
  logo?: string;
  company: string;
  size: "lg" | "sm";
}) {
  const frame = size === "lg" ? "h-14 w-14 rounded-2xl" : "h-10 w-10 rounded-xl";

  return (
    <div className={`flex shrink-0 items-center justify-center overflow-hidden ${frame}`}>
      {logo ? (
        <Image
          src={logo}
          alt={`${company} logo`}
          width={size === "lg" ? 56 : 40}
          height={size === "lg" ? 56 : 40}
          className="h-full w-full object-contain"
        />
      ) : (
        <span
          className={`flex h-full w-full items-center justify-center rounded-[inherit] bg-panel ${
            size === "lg" ? "text-xl font-medium text-muted" : "text-sm font-medium text-muted"
          }`}
        >
          {company[0]}
        </span>
      )}
    </div>
  );
}

export function ExperienceView({ locale }: { locale: Locale }) {
  const t = getDict(locale).experience;
  const current = experienceEntries.filter((entry) => entry.tier === "now");
  const earlier = experienceEntries.filter((entry) => entry.tier === "before");

  return (
    <main id="main-content" tabIndex={-1} className="pb-8 pt-10 sm:pt-14">
      <section className="section-space">
        <div className="shell">
          <div className="section-rule">
            <Reveal className="max-w-4xl">
              <p className="caption">{t.caption}</p>
              <h1 className="section-title mt-4">{t.h1}</h1>
            </Reveal>

            <div className="mt-12">
              {current.map((entry, index) => (
                <Reveal
                  key={`${entry.company}-${entry.period}`}
                  delay={index * 0.05}
                  className="border-t border-line py-10"
                >
                  <div className="flex items-start gap-5">
                    <CompanyLogo logo={entry.logo} company={entry.company} size="lg" />
                    <div>
                      <h2 className="text-2xl font-medium tracking-[-0.04em] text-text sm:text-3xl">
                        {entry.role}
                      </h2>
                      <p className="mt-1 text-base text-muted">{entry.company}</p>
                      <p className="mt-1 text-sm text-muted">{entry.period}</p>
                      <p className="body-copy mt-4 max-w-2xl">{entry.summary}</p>
                      {entry.tags ? (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {entry.tags.map((tag) => (
                            <span key={tag} className="pill">
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-16">
              <Reveal>
                <p className="caption">{t.earlier}</p>
              </Reveal>
              <div className="mt-4">
                {earlier.map((entry, index) => (
                  <Reveal
                    key={`${entry.company}-${entry.period}`}
                    delay={index * 0.04}
                    className="border-t border-line py-6"
                  >
                    <div className="grid gap-2 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
                      <div className="flex items-start gap-4">
                        <CompanyLogo logo={entry.logo} company={entry.company} size="sm" />
                        <div>
                          <p className="text-lg font-medium text-text">
                            {entry.role} <span className="font-normal text-muted">· {entry.company}</span>
                          </p>
                          <p className="mt-1 max-w-2xl text-base leading-7 text-muted">{entry.summary}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted lg:text-right">{entry.period}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
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
              <p className="mt-6 text-sm text-muted">{t.dailyTools}</p>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="caption">{t.certifications}</p>
              <p className="mt-6 text-base leading-7 text-muted">
                {certifications.length} {t.certsSummary}
              </p>
              <details className="mt-3">
                <summary className="cursor-pointer text-sm font-medium text-muted underline underline-offset-4 transition-colors duration-200 hover:text-text">
                  {t.viewAll}
                </summary>
                <CertificationsList />
              </details>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="shell">
          <Reveal className="section-rule">
            <div className="max-w-2xl">
              <p className="caption">{t.featuredNext}</p>
              <h2 className="section-title mt-4">{t.featuredHeading}</h2>
              <MagneticLink href={localizedPath("/work", locale)} className="link-chip mt-10">
                {t.browseProjects}
              </MagneticLink>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
