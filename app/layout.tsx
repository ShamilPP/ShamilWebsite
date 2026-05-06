import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE = {
  name: "Shamil",
  title: "Shamil — Creative Developer · Portfolio",
  short: "Shamil — Creative Developer",
  description:
    "Shamil is a creative developer building mobile interfaces that feel inevitable. Flutter, React, UI craft — a cinematic portfolio.",
  url: "https://shamil.studio",
  ogImage: "/apple-touch-icon.png",
  twitter: "@shamil",
  locale: "en_US",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#06060a" },
    { media: "(prefers-color-scheme: dark)", color: "#06060a" },
  ],
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: "%s — Shamil",
  },
  description: SITE.description,
  applicationName: SITE.short,
  authors: [{ name: "Shamil" }],
  generator: "Next.js",
  keywords: [
    "Shamil",
    "creative developer",
    "Flutter developer",
    "mobile app developer",
    "portfolio",
    "UI / UX",
    "Dart",
    "React",
    "TypeScript",
    "motion design",
    "scroll animation",
  ],
  category: "portfolio",
  alternates: {
    canonical: "/",
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      { rel: "icon", url: "/android-chrome-192x192.png", sizes: "192x192" },
      { rel: "icon", url: "/android-chrome-512x512.png", sizes: "512x512" },
    ],
  },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.short,
    title: SITE.title,
    description: SITE.description,
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: "Shamil — Creative Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: [SITE.ogImage],
    creator: SITE.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { email: false, address: false, telephone: false },
};

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Shamil",
  url: SITE.url,
  jobTitle: "Creative Developer",
  description: SITE.description,
  knowsAbout: ["Flutter", "Dart", "React", "TypeScript", "UI/UX", "Mobile Apps", "Motion Design"],
  sameAs: [],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,200..900&family=Outfit:wght@100;200;300;400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />
      </head>
      <body className="bg-ink-50 text-mist antialiased">{children}</body>
    </html>
  );
}
