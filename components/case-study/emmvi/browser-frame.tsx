import Image from "next/image";

import { cn } from "@/lib/utils";

type BrowserFrameProps = {
  src: string;
  alt: string;
  /** Address-bar label. */
  url?: string;
  /** Tailwind aspect-ratio class controlling the tall crop. */
  aspect?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  imageClassName?: string;
};

/**
 * A minimal browser chrome wrapping a full-page screenshot. The page is
 * cropped from the top (object-top) into a consistent tall viewport so every
 * surface reads like a live product rather than a flat marketing export.
 */
export function BrowserFrame({
  src,
  alt,
  url = "emmvi.com",
  aspect = "aspect-[16/12]",
  priority = false,
  sizes = "(min-width: 1024px) 60vw, 100vw",
  className,
  imageClassName
}: BrowserFrameProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[1.4rem] border border-line bg-white shadow-[0_18px_42px_rgba(23,23,23,0.06)]",
        className
      )}
    >
      <div className="flex items-center gap-3 border-b border-line bg-panel px-4 py-3">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
        </div>
        <div className="ml-1 flex h-7 flex-1 items-center rounded-full border border-line bg-white px-4 text-[0.7rem] tracking-[0.06em] text-muted">
          {url}
        </div>
      </div>
      <div className={cn("relative w-full overflow-hidden bg-panel", aspect)}>
        <Image
          src={src}
          alt={alt}
          fill
          className={cn("object-cover object-top", imageClassName)}
          sizes={sizes}
          priority={priority}
        />
      </div>
    </div>
  );
}
