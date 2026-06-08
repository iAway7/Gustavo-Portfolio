import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";

import "./globals.css";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";

const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gustavopolin.com"),
  title: {
    default: "Gustavo Polin | Product Designer",
    template: "%s | Gustavo Polin"
  },
  description:
    "I’m a Product Designer and UX/UI Designer based in Valencia, creating digital products that connect users, business, and technology.",
  openGraph: {
    title: "Gustavo Polin | Product Designer",
    description:
      "Product design, UX/UI, design systems, and technical implementation brought together in one editorial portfolio.",
    url: "https://gustavopolin.com",
    siteName: "Gustavo Polin",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Gustavo Polin | Product Designer",
    description:
      "I create digital products that connect users, business, and technology."
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={hostGrotesk.variable}>
        <SmoothScrollProvider />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
