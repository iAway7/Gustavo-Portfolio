"use client";

import Link, { type LinkProps } from "next/link";
import type { PropsWithChildren, MouseEvent } from "react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

type MagneticLinkProps = PropsWithChildren<
  LinkProps & {
    className?: string;
    cursor?: "link" | "lift";
  }
>;

export function MagneticLink({
  children,
  className,
  cursor = "link",
  ...props
}: MagneticLinkProps) {
  const reduceMotion = useReducedMotion();

  const handleMove = (event: MouseEvent<HTMLAnchorElement>) => {
    if (reduceMotion) {
      return;
    }

    const target = event.currentTarget;
    const bounds = target.getBoundingClientRect();
    const offsetX = event.clientX - bounds.left - bounds.width / 2;
    const offsetY = event.clientY - bounds.top - bounds.height / 2;

    target.style.setProperty("--magnetic-x", `${offsetX * 0.14}px`);
    target.style.setProperty("--magnetic-y", `${offsetY * 0.18}px`);
  };

  const handleLeave = (event: MouseEvent<HTMLAnchorElement>) => {
    const target = event.currentTarget;
    target.style.setProperty("--magnetic-x", "0px");
    target.style.setProperty("--magnetic-y", "0px");
  };

  return (
    <motion.div whileTap={reduceMotion ? undefined : { scale: 0.985 }}>
      <Link
        {...props}
        data-cursor={cursor}
        className={cn("magnetic-link", className)}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <span className="magnetic-link__inner">{children}</span>
      </Link>
    </motion.div>
  );
}
