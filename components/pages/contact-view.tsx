import { ContactEmailRow } from "@/components/contact-email-row";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { contactChannels } from "@/lib/site-data";
import { getDict, type Locale, resumeByLocale } from "@/lib/i18n";

export function ContactView({ locale }: { locale: Locale }) {
  const t = getDict(locale).contact;
  const resume = resumeByLocale[locale];
  const channels = contactChannels.filter((channel) => channel.label !== "Resume");

  return (
    <main id="main-content" tabIndex={-1} className="pb-8 pt-10 sm:pt-14">
      <section className="section-space">
        <div className="shell">
          <div className="section-rule">
            <div className="grid gap-24 lg:grid-cols-[0.92fr_1.08fr]">
              <Reveal>
                <p className="caption">{t.caption}</p>
                <h1 className="section-title mt-4">{t.h1}</h1>
                <p className="body-copy mt-6 max-w-xl">{t.intro}</p>

                <div className="mt-10">
                  <ContactEmailRow />
                  {channels.map((channel) => (
                    <a
                      key={channel.label}
                      href={channel.href}
                      target={channel.href.startsWith("http") ? "_blank" : undefined}
                      rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                      className="contact-link group"
                    >
                      <span>{channel.label}</span>
                      <span className="text-muted transition-colors duration-200 group-hover:text-accent">
                        {channel.value}
                      </span>
                    </a>
                  ))}
                  <a href={resume.href} download="" className="contact-link group">
                    <span>{resume.label}</span>
                    <span className="text-muted transition-colors duration-200 group-hover:text-accent">
                      {resume.value}
                    </span>
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.08} className="editorial-card p-6 sm:p-8">
                <ContactForm locale={locale} />
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
