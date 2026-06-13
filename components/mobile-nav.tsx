"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { contactChannels, navItems } from "@/lib/site-data";
import { cn } from "@/lib/utils";

// Secondary links surfaced inside the mobile panel, derived from the single
// source of truth in site-data so menu definitions are never duplicated.
const secondaryLinks = (["Resume", "LinkedIn"] as const)
  .map((label) => contactChannels.find((channel) => channel.label === label))
  .filter((channel): channel is NonNullable<typeof channel> => Boolean(channel));

const isExternal = (href: string) => href.startsWith("http");

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Close whenever the route changes (link tap navigates).
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll, trap focus, wire ESC + Tab cycling while open.
  useEffect(() => {
    if (!open) {
      return;
    }

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const getFocusable = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) ?? []
      );

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusable = getFocusable();
      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    // Move focus into the panel.
    const focusTimer = window.setTimeout(() => {
      getFocusable()[0]?.focus();
    }, 0);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus?.();
    };
  }, [open, close]);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);

  const overlayMotion = prefersReducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: -12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -12 }
      };

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="dialog"
        className="relative -mr-1 flex h-10 w-10 items-center justify-center rounded-full text-text transition-colors duration-200 hover:text-[#244de8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244de8]/40"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span aria-hidden="true" className="relative block h-3.5 w-5">
          <motion.span
            className="absolute left-0 block h-[1.5px] w-full rounded-full bg-current"
            initial={false}
            animate={
              open ? { top: 6, rotate: 45 } : { top: 0, rotate: 0 }
            }
            transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: "easeOut" }}
          />
          <motion.span
            className="absolute left-0 top-1/2 block h-[1.5px] w-full -translate-y-1/2 rounded-full bg-current"
            initial={false}
            animate={{ opacity: open ? 0 : 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.15 }}
          />
          <motion.span
            className="absolute left-0 block h-[1.5px] w-full rounded-full bg-current"
            initial={false}
            animate={
              open ? { bottom: 6, rotate: -45 } : { bottom: 0, rotate: 0 }
            }
            transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: "easeOut" }}
          />
        </span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            id={panelId}
            ref={panelRef}
            className="fixed inset-0 z-[60] flex flex-col bg-white/97 backdrop-blur-xl"
            initial={overlayMotion.initial}
            animate={overlayMotion.animate}
            exit={overlayMotion.exit}
            transition={{ duration: prefersReducedMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Backdrop click target (top bar mirrors header height). */}
            <div className="shell flex items-center justify-between py-4">
              <Link
                href="/"
                className="text-lg font-medium tracking-[-0.05em] text-text"
                onClick={close}
              >
                Gustavo Polin
              </Link>
              <button
                type="button"
                onClick={close}
                aria-label="Close menu"
                className="relative -mr-1 flex h-10 w-10 items-center justify-center rounded-full text-text transition-colors duration-200 hover:text-[#244de8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244de8]/40"
              >
                <span aria-hidden="true" className="relative block h-4 w-4">
                  <span className="absolute left-0 top-1/2 block h-[1.5px] w-full -translate-y-1/2 rotate-45 rounded-full bg-current" />
                  <span className="absolute left-0 top-1/2 block h-[1.5px] w-full -translate-y-1/2 -rotate-45 rounded-full bg-current" />
                </span>
              </button>
            </div>

            <nav
              aria-label="Mobile primary"
              className="shell flex flex-1 flex-col justify-center gap-1 pb-24"
            >
              {navItems.map((item, index) => {
                const active = isActive(item.href);
                return (
                  <motion.div
                    key={item.href}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.3,
                      delay: prefersReducedMotion ? 0 : 0.04 * index,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block py-2 text-[clamp(2.4rem,11vw,3.4rem)] font-medium leading-[1.04] tracking-[-0.04em] transition-colors duration-200",
                        active ? "text-text" : "text-muted hover:text-text"
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}

              {secondaryLinks.length > 0 ? (
                <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6">
                  {secondaryLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={close}
                      {...(isExternal(link.href)
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="text-sm uppercase tracking-[0.18em] text-muted transition-colors duration-200 hover:text-[#244de8]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
