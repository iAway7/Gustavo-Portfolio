import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true }
};

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="pb-8 pt-10 sm:pt-14">
      <section className="section-space">
        <div className="shell">
          <div className="section-rule max-w-2xl">
            <p className="caption">404</p>
            <h1 className="section-title mt-4">This page could not be found.</h1>
            <p className="body-copy mt-6">
              The page you were looking for may have moved or no longer exists. Head back to the
              homepage or explore the work.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/" className="link-chip">
                Back to home
              </Link>
              <Link href="/work" className="link-chip link-chip--secondary">
                View work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
