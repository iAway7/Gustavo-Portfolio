import Link from "next/link";

import { projectIndex } from "@/lib/site-data";

import { ProjectVisual } from "@/components/project-visual";

type ProjectCardProps = {
  project: (typeof projectIndex)[number];
  compact?: boolean;
  visualClassName?: string;
  visualBordered?: boolean;
  visualImageClassName?: string;
};

export function ProjectCard({
  project,
  compact = false,
  visualClassName,
  visualBordered = true,
  visualImageClassName
}: ProjectCardProps) {
  return (
    <Link href={project.href} className="group block">
      <div className="interactive-card rounded-[1.75rem] border border-line bg-white p-3 sm:p-4">
        <ProjectVisual
          visual={project.cardVisual}
          bordered={visualBordered}
          imageClassName={visualImageClassName}
          className={[compact ? "aspect-[16/11]" : undefined, visualClassName].filter(Boolean).join(" ")}
        />
        <div className="px-1 pb-2 pt-5 sm:px-2 sm:pb-3 sm:pt-6">
          <div>
            <p className="text-[1.4rem] font-medium leading-[1.05] tracking-[-0.03em] text-text">{project.title}</p>
            <p className="mt-4 text-[1rem] leading-[1.45] text-muted">{project.summary}</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.slice(0, compact ? 2 : 3).map((tag) => (
              <span key={tag} className="pill">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
