import Link from "next/link";

import { contactChannels, navItems } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line bg-panel/80">
      <div className="shell py-12 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="max-w-xl">
            <p className="caption">Gustavo Polin</p>
            <p className="mt-4 text-2xl font-medium tracking-[-0.05em] text-text sm:text-3xl">
              Product Designer and UX/UI Designer building digital experiences that connect users,
              business, and technology.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <nav aria-label="Footer pages">
              <p className="caption">Pages</p>
              <div className="mt-4 grid gap-3">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-base text-muted transition-colors hover:text-[#244de8]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>

            <nav aria-label="Footer contact links">
              <p className="caption">Contact</p>
              <div className="mt-4 grid gap-3">
                {contactChannels.map((channel) => (
                  <a
                    key={channel.label}
                    href={channel.href}
                    download={channel.href.endsWith(".pdf") ? "" : undefined}
                    target={channel.href.startsWith("http") ? "_blank" : undefined}
                    rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                    className="text-base text-muted transition-colors hover:text-[#244de8]"
                  >
                    {channel.label}
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-base text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>Based in Valencia, Spain.</p>
          <p>Product thinking, design systems, and implementation awareness.</p>
        </div>
      </div>
    </footer>
  );
}
