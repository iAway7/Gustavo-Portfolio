"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { MobileNav } from "@/components/mobile-nav";
import { navItems } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/92 backdrop-blur-md">
      <div className="shell flex items-center justify-between gap-4 py-4">
        <Link href="/" className="text-lg font-medium tracking-[-0.05em] text-text">
          Gustavo Polin
        </Link>

        {/* Desktop navigation — unchanged, shown from md upward. */}
        <nav
          aria-label="Primary"
          className="hidden flex-wrap items-center gap-2 md:flex md:justify-end"
        >
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
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
        </nav>

        {/* Mobile navigation — hamburger + full-screen panel below md. */}
        <MobileNav />
      </div>
    </header>
  );
}
