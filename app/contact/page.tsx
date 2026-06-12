import type { Metadata } from "next";

import { ContactEmailRow } from "@/components/contact-email-row";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { contactChannels } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with me for product design and UX/UI collaborations."
};

export default function ContactPage() {
  return (
    <main id="main-content" tabIndex={-1} className="pb-8 pt-10 sm:pt-14">
      <section className="section-space">
        <div className="shell">
          <div className="section-rule">
            <div className="grid gap-24 lg:grid-cols-[0.92fr_1.08fr]">
              <Reveal>
                <p className="caption">Contact</p>
                <h1 className="section-title mt-4">Have a project in mind?</h1>
                <p className="body-copy mt-6 max-w-xl">
                  Send some details about your product, platform, or service. I work with
                  thoughtful teams building ambitious digital experiences.
                </p>

                <div className="mt-10">
                  <ContactEmailRow />
                  {contactChannels.map((channel) => (
                    <a
                      key={channel.label}
                      href={channel.href}
                      download={channel.href.endsWith(".pdf") ? "" : undefined}
                      target={channel.href.startsWith("http") ? "_blank" : undefined}
                      rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                      className="contact-link"
                    >
                      <span>{channel.label}</span>
                      <span className="text-muted">{channel.value}</span>
                    </a>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.08} className="editorial-card p-6 sm:p-8">
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
