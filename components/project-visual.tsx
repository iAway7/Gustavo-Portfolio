import Image from "next/image";

import type { ProjectVisual as ProjectVisualType } from "@/lib/site-data";
import { cn } from "@/lib/utils";

type ProjectVisualProps = {
  visual: ProjectVisualType;
  className?: string;
  bordered?: boolean;
  imageClassName?: string;
  /**
   * "cover" crops into a fixed 16:10 frame (heroes, cards).
   * "natural" renders the full image at its intrinsic aspect ratio,
   * so screenshots are never clipped (decision evidence, figures).
   */
  fit?: "cover" | "natural";
};

export function ProjectVisual({
  visual,
  className,
  bordered = true,
  imageClassName,
  fit = "cover"
}: ProjectVisualProps) {
  if (visual.type === "image") {
    const toneClass =
      visual.tone === "sage" ? "sage-tint" : visual.tone === "blush" ? "blush-tint" : "paper-tint";

    if (fit === "natural") {
      return (
        <div
          className={cn(
            "editorial-image w-full overflow-hidden",
            !bordered && "border-0",
            toneClass,
            className
          )}
        >
          <Image
            src={visual.src}
            alt={visual.alt}
            width={2400}
            height={1500}
            className={cn("h-auto w-full", imageClassName)}
            sizes="(min-width: 1024px) 60vw, 100vw"
          />
        </div>
      );
    }

    return (
      <div
        className={cn(
          "editorial-image relative aspect-[16/10] w-full overflow-hidden",
          !bordered && "border-0",
          toneClass,
          className
        )}
      >
        <Image
          src={visual.src}
          alt={visual.alt}
          fill
          className={cn("object-cover object-top", visual.imageClassName, imageClassName)}
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>
    );
  }

  if (visual.type === "installpros") {
    return (
      <div
        className={cn(
          "editorial-image blush-tint relative aspect-[16/10] p-5 sm:p-8",
          !bordered && "border-0",
          className
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.7),transparent_36%)]" />
        <div className="relative flex h-full items-center justify-center gap-4 sm:gap-6">
          {["Task queue", "Install status", "Field actions"].map((label, index) => (
            <div
              key={label}
              className={cn(
                "phone-frame flex h-[72%] w-[28%] min-w-[6rem] flex-col bg-white px-3 py-3 sm:px-4",
                index === 0 && "-rotate-[12deg]",
                index === 1 && "translate-y-2",
                index === 2 && "rotate-[11deg]"
              )}
            >
              <div className="mx-auto phone-notch" />
              <div className="mt-4 text-[0.62rem] uppercase tracking-[0.18em] text-muted">{label}</div>
              <div className="mt-4 h-5 rounded-full bg-black/90" />
              <div className="mt-4 grid gap-2">
                <div className="h-16 rounded-2xl border border-line bg-panel" />
                <div className="h-10 rounded-xl border border-line bg-white" />
                <div className="h-10 rounded-xl border border-line bg-white" />
              </div>
              <div className="mt-auto flex h-10 items-center justify-center rounded-2xl bg-black text-[0.62rem] uppercase tracking-[0.18em] text-white">
                View task
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "editorial-image paper-tint relative aspect-[16/10] overflow-hidden p-6 sm:p-8",
        !bordered && "border-0",
        className
      )}
    >
      <div className="project-grid-lines absolute inset-0 opacity-50" />
      <div className="relative grid h-full gap-4 sm:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[1.3rem] border border-line bg-white p-4 sm:p-5">
          <div className="h-6 w-24 rounded-full bg-panel" />
          <div className="mt-4 grid gap-3">
            <div className="h-24 rounded-[1rem] border border-line bg-panel" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-16 rounded-[1rem] border border-line bg-white" />
              <div className="h-16 rounded-[1rem] border border-line bg-white" />
            </div>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="rounded-[1.3rem] border border-line bg-white p-4">
            <div className="h-5 w-16 rounded-full bg-panel" />
            <div className="mt-3 h-20 rounded-[1rem] border border-line bg-panel" />
          </div>
          <div className="rounded-[1.3rem] border border-line bg-white p-4">
            <div className="h-5 w-20 rounded-full bg-panel" />
            <div className="mt-3 grid gap-2">
              <div className="h-6 rounded-full bg-panel" />
              <div className="h-6 rounded-full bg-panel" />
              <div className="h-6 rounded-full bg-panel" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
