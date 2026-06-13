"use client";

import { useMemo, useState } from "react";

import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";
import { projectIndex } from "@/lib/site-data";
import type { Locale } from "@/lib/i18n";

type WorkFilter = "All" | "Product" | "Web";

type WorkGalleryProps = {
  featuredProject: (typeof projectIndex)[number];
  supportingProjects: (typeof projectIndex)[number][];
  locale?: Locale;
};

const filters: WorkFilter[] = ["All", "Product", "Web"];

const filterLabels: Record<Locale, Record<WorkFilter, string>> = {
  en: { All: "All", Product: "Product", Web: "Web" },
  es: { All: "Todos", Product: "Producto", Web: "Web" }
};

function getProjectFilter(project: (typeof projectIndex)[number]): Exclude<WorkFilter, "All"> {
  if (project.slug === "installpros-technician-app" || project.slug === "agencyhub-platform") {
    return "Product";
  }

  return "Web";
}

export function WorkGallery({ featuredProject, supportingProjects, locale = "en" }: WorkGalleryProps) {
  const [activeFilter, setActiveFilter] = useState<WorkFilter>("All");
  const labels = filterLabels[locale];

  const filteredProjects = useMemo(() => {
    const allProjects = [...supportingProjects, featuredProject];

    if (activeFilter === "All") {
      return allProjects;
    }

    return allProjects.filter((project) => getProjectFilter(project) === activeFilter);
  }, [activeFilter, featuredProject, supportingProjects]);

  return (
    <div className="mt-10">
      <Reveal>
        <div className="mb-8 flex flex-wrap gap-3">
          {filters.map((filter) => {
            const isActive = filter === activeFilter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                aria-pressed={isActive}
                className={cn(
                  "rounded-full px-8 py-4 text-[1.05rem] font-medium tracking-[-0.03em] transition-colors duration-200",
                  isActive
                    ? "bg-black text-white"
                    : "bg-[#f2f2f0] text-text hover:bg-[#ebebe8]"
                )}
              >
                {labels[filter]}
              </button>
            );
          })}
        </div>
      </Reveal>

      {activeFilter === "All" ? (
        <>
          <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
            {supportingProjects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.06}>
                <ProjectCard project={project} compact locale={locale} />
              </Reveal>
            ))}
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-2 xl:grid-cols-3">
            <Reveal>
              <ProjectCard project={featuredProject} compact locale={locale} />
            </Reveal>
          </div>
        </>
      ) : (
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.06}>
              <ProjectCard project={project} compact locale={locale} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
