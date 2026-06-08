"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { homeSections, navItems } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function FloatingNav() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const sections = homeSections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean) as HTMLElement[];
    const updateActiveSection = () => {
      const focusLine = window.scrollY + 180;
      const active = sections
        .filter((section) => section.offsetTop <= focusLine)
        .sort((a, b) => b.offsetTop - a.offsetTop)[0];

      if (active?.id) {
        setActiveSection(active.id);
      }
    };

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [pathname]);

  const activeLabel = useMemo(() => {
    if (pathname === "/") {
      const current = homeSections.find((item) => item.id === activeSection);
      return current?.label ?? "Home";
    }

    const current = navItems.find((item) => item.href === pathname);
    return current?.label ?? "Home";
  }, [activeSection, pathname]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6">
      <nav className="pointer-events-auto eyeline shadow-float relative grid w-full max-w-[28rem] grid-cols-4 items-center gap-1 rounded-[1.75rem] p-1.5 sm:flex sm:w-auto sm:max-w-none sm:rounded-full sm:px-2 sm:py-2">
        {navItems.map((item) => {
          const isActive =
            pathname === "/" ? item.label === activeLabel : item.href === pathname;

          return (
            <Link
              key={item.href}
              href={item.href}
              data-cursor="link"
              className={cn(
                "relative rounded-full px-2 py-2 text-center text-[0.68rem] tracking-[0.14em] text-muted transition-colors duration-300 uppercase sm:px-4 sm:text-sm sm:tracking-[0.18em]",
                isActive && "text-text"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <AnimatePresence initial={false}>
                {isActive ? (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/[0.08]"
                    transition={{ type: "spring", stiffness: 280, damping: 28 }}
                  />
                ) : null}
              </AnimatePresence>
              <span className="relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
