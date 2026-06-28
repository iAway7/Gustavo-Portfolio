import { HtmlLang } from "@/components/html-lang";

export default function EsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Runs during HTML parse on the statically-rendered /es pages, so the
          document language is "es" before first paint and before hydration —
          without forcing the whole app into dynamic rendering. HtmlLang then
          keeps it correct across client-side navigation. */}
      <script dangerouslySetInnerHTML={{ __html: 'document.documentElement.lang="es"' }} />
      <HtmlLang locale="es" />
      {children}
    </>
  );
}
