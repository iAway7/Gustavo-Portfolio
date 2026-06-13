import { HtmlLang } from "@/components/html-lang";

export default function EsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HtmlLang locale="es" />
      {children}
    </>
  );
}
