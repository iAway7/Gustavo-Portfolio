import type { Metadata, Viewport } from "next";
import { Host_Grotesk } from "next/font/google";

import "./globals.css";

import { JsonLd, siteJsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/seo";

const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const TITLE_DEFAULT = "Gustavo Polin | Product Designer";
const DESCRIPTION =
  "Gustavo Polin is a Product Designer and UX/UI Designer in Valencia with 9+ years building SaaS platforms, web apps, and AI-assisted digital products.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE_DEFAULT,
    template: "%s | Gustavo Polin"
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  keywords: [
    "Product Designer",
    "UX/UI Designer",
    "Design Systems",
    "SaaS design",
    "Gustavo Polin",
    "Portfolio",
    "Valencia"
  ],
  alternates: {
    canonical: "/"
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: SITE_URL,
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: TITLE_DEFAULT }]
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
    images: [DEFAULT_OG_IMAGE]
  }
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={hostGrotesk.variable}>
        <JsonLd data={siteJsonLd()} />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SmoothScrollProvider />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
