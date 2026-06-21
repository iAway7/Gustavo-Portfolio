import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true }
};

export default function NotFoundEs() {
  return (
    <main id="main-content" tabIndex={-1} className="pb-8 pt-10 sm:pt-14">
      <section className="section-space">
        <div className="shell">
          <div className="section-rule max-w-2xl">
            <p className="caption">404</p>
            <h1 className="section-title mt-4">No se encontró esta página.</h1>
            <p className="body-copy mt-6">
              Puede que la página que buscas se haya movido o ya no exista. Vuelve al inicio o
              explora los proyectos.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/es" className="link-chip">
                Volver al inicio
              </Link>
              <Link href="/es/work" className="link-chip link-chip--secondary">
                Ver proyectos
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
