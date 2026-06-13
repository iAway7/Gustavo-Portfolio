import Link from "next/link";

import { projectIndex } from "@/lib/site-data";
import { type Locale, localizedPath, projectMeta } from "@/lib/i18n";

import { ProjectVisual } from "@/components/project-visual";

type ProjectCardProps = {
  project: (typeof projectIndex)[number];
  compact?: boolean;
  visualClassName?: string;
  visualBordered?: boolean;
  visualImageClassName?: string;
  locale?: Locale;
};

export function ProjectCard({
  project,
  compact = false,
  visualClassName,
  visualBordered = true,
  visualImageClassName,
  locale = "en"
}: ProjectCardProps) {
  const { title, summary } = projectMeta(project.slug, locale, {
    title: project.title,
    summary: project.summary
  });

  return (
    <Link href={localizedPath(project.href, locale)} className="group block">
      <article className="interactive-card rounded-[1.75rem] border border-line bg-white p-3 sm:p-4">
        <div aria-hidden="true">
          <ProjectVisual
            visual={project.cardVisual}
            bordered={visualBordered}
            imageClassName={visualImageClassName}
            className={[compact ? "aspect-[16/11]" : undefined, visualClassName].filter(Boolean).join(" ")}
          />
        </div>
        <div className="px-1 pb-2 pt-5 sm:px-2 sm:pb-3 sm:pt-6">
          <div>
            <h3 className="text-[1.4rem] font-medium leading-[1.05] tracking-[-0.03em] text-text">{title}</h3>
            <p className="mt-4 text-[1rem] leading-[1.45] text-muted">{summary}</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.slice(0, compact ? 2 : 3).map((tag) => (
              <span key={tag} className="pill">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
