"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LanguageSwitcher } from "@/components/language-switcher";
import { MobileNav } from "@/components/mobile-nav";
import { getDict, localeFromPathname, localizedPath, stripLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname() || "/";
  const locale = localeFromPathname(pathname);
  const dict = getDict(locale);
  const canonicalPath = stripLocale(pathname);

  const items = [
    { href: "/", label: dict.nav.home },
    { href: "/work", label: dict.nav.work },
    { href: "/experience", label: dict.nav.experience },
    { href: "/approach", label: dict.nav.approach },
    { href: "/contact", label: dict.nav.contact }
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/92 backdrop-blur-md">
      <div className="shell flex items-center justify-between gap-4 py-4">
        <Link
          href={localizedPath("/", locale)}
          className="text-lg font-medium tracking-[-0.05em] text-text"
        >
          Gustavo Polin
        </Link>

        {/* Desktop navigation — unchanged layout, shown from md upward. */}
        <nav
          aria-label="Primary"
          className="hidden flex-wrap items-center gap-2 md:flex md:justify-end"
        >
          {items.map((item) => {
            const isActive =
              item.href === "/"
                ? canonicalPath === item.href
                : canonicalPath === item.href || canonicalPath.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={localizedPath(item.href, locale)}
                className={cn(
                  "rounded-full px-3 py-2 text-base transition-colors duration-200",
                  isActive ? "bg-text text-white" : "text-muted hover:text-[#244de8]"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
          <LanguageSwitcher className="ml-2" />
        </nav>

        {/* Mobile navigation — hamburger + full-screen panel below md. */}
        <MobileNav />
      </div>
    </header>
  );
}
