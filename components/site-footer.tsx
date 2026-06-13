"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { contactChannels } from "@/lib/site-data";
import { getDict, localeFromPathname, localizedPath, resumeByLocale } from "@/lib/i18n";

export function SiteFooter() {
  const pathname = usePathname() || "/";
  const locale = localeFromPathname(pathname);
  const dict = getDict(locale);
  const resume = resumeByLocale[locale];

  const pages = [
    { href: "/", label: dict.nav.home },
    { href: "/work", label: dict.nav.work },
    { href: "/experience", label: dict.nav.experience },
    { href: "/approach", label: dict.nav.approach },
    { href: "/contact", label: dict.nav.contact }
  ];

  // Social channels (everything except the Resume entry, which is localized).
  const channels = contactChannels.filter((channel) => channel.label !== "Resume");

  return (
    <footer className="mt-20 border-t border-line bg-panel/80">
      <div className="shell py-12 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="max-w-xl">
            <p className="caption">Gustavo Polin</p>
            <p className="mt-4 text-2xl font-medium tracking-[-0.05em] text-text sm:text-3xl">
              {dict.footer.tagline}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <nav aria-label="Footer pages">
              <p className="caption">{dict.footer.pages}</p>
              <div className="mt-4 grid gap-3">
                {pages.map((item) => (
                  <Link
                    key={item.href}
                    href={localizedPath(item.href, locale)}
                    className="text-base text-muted transition-colors hover:text-[#244de8]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>

            <nav aria-label="Footer contact links">
              <p className="caption">{dict.footer.contact}</p>
              <div className="mt-4 grid gap-3">
                {channels.map((channel) => (
                  <a
                    key={channel.label}
                    href={channel.href}
                    target={channel.href.startsWith("http") ? "_blank" : undefined}
                    rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                    className="text-base text-muted transition-colors hover:text-[#244de8]"
                  >
                    {channel.label}
                  </a>
                ))}
                <a
                  href={resume.href}
                  download=""
                  className="text-base text-muted transition-colors hover:text-[#244de8]"
                >
                  {resume.label}
                </a>
              </div>
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-base text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{dict.footer.location}</p>
          <p>{dict.footer.note}</p>
        </div>
      </div>
    </footer>
  );
}
