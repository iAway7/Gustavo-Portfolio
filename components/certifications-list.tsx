import { certifications } from "@/lib/site-data";

export function CertificationsList() {
  const leftColumn = certifications.slice(0, 8);
  const rightColumn = certifications.slice(8);

  return (
    <div className="mt-6 grid gap-x-16 gap-y-2 md:grid-cols-2">
      <div className="grid gap-2">
        {leftColumn.map((item) => (
          <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="certification-link"
          >
            <span>{item.title}</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="none"
              className="h-4 w-4 shrink-0"
            >
              <path
                d="M7 13L13 7M8.5 7H13V11.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        ))}
      </div>

      <div className="grid gap-2">
        {rightColumn.map((item) => (
          <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="certification-link"
          >
            <span>{item.title}</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="none"
              className="h-4 w-4 shrink-0"
            >
              <path
                d="M7 13L13 7M8.5 7H13V11.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}
