import { MagneticLink } from "@/components/magnetic-link";
import { Reveal } from "@/components/reveal";
import { WorkGallery } from "@/components/work-gallery";
import { projectIndex } from "@/lib/site-data";
import { getDict, type Locale, localizedPath } from "@/lib/i18n";

const featuredProject = projectIndex.find((project) => project.featured) ?? projectIndex[0];
const supportingProjects = projectIndex.filter((project) => project.slug !== featuredProject.slug);

export function WorkView({ locale }: { locale: Locale }) {
  const t = getDict(locale).work;

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

            <WorkGallery
              featuredProject={featuredProject}
              supportingProjects={supportingProjects}
              locale={locale}
            />
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="shell">
          <Reveal className="section-rule">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-2xl">
                <p className="caption">{t.nextStep}</p>
                <h2 className="section-title mt-4">{t.nextHeading}</h2>
              </div>
              <MagneticLink href={localizedPath(featuredProject.href, locale)} className="link-chip">
                {t.readCaseStudy}
              </MagneticLink>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
