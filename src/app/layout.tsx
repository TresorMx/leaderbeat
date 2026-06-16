import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "MarketingAgency"],
      "@id": "https://leaderbeat.io/#organization",
      "name": "LEADERBEAT.IO",
      "alternateName": "Leaderbeat",
      "url": "https://leaderbeat.io",
      "logo": {
        "@type": "ImageObject",
        "url": "https://leaderbeat.io/icon.png",
      },
      "description":
        "Agencia de marketing digital especializada en proyectos inmobiliarios en Cancún, México y US Hispanic. Construimos el sistema comercial completo: marca, proceso y tecnología.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Cancún",
        "addressRegion": "Quintana Roo",
        "addressCountry": "MX",
      },
      "areaServed": [
        { "@type": "Country", "name": "México" },
        { "@type": "Country", "name": "United States" },
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "hola@leaderbeat.io",
        "contactType": "sales",
      },
      "knowsAbout": [
        "Marketing Digital Inmobiliario",
        "Automatización Comercial",
        "CRM para Desarrolladoras Inmobiliarias",
        "Generación de Leads Inmobiliarios",
        "Branding Inmobiliario",
        "Pauta Digital para Preventa",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://leaderbeat.io/#website",
      "name": "LEADERBEAT.IO",
      "url": "https://leaderbeat.io",
      "inLanguage": "es-MX",
      "publisher": { "@id": "https://leaderbeat.io/#organization" },
    },
    {
      "@type": "Service",
      "@id": "https://leaderbeat.io/#service",
      "name": "Sistema BEAT — Marketing Digital Inmobiliario",
      "provider": { "@id": "https://leaderbeat.io/#organization" },
      "description":
        "Sistema completo de marketing digital para desarrolladoras inmobiliarias: marca, CRM, automatización, pauta digital y analítica conectada.",
      "areaServed": [
        { "@type": "City", "name": "Cancún" },
        { "@type": "Country", "name": "México" },
      ],
      "serviceType": "Marketing Digital Inmobiliario",
      "offers": {
        "@type": "Offer",
        "description": "Diagnóstico estratégico gratuito para desarrolladoras inmobiliarias.",
      },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://leaderbeat.io"),
  title: {
    default:
      "LEADERBEAT — Sistema Comercial para Marcas Inmobiliarias | Cancún, México",
    template: "%s | LEADERBEAT.IO",
  },
  description:
    "El sistema operativo comercial de las marcas inmobiliarias: marca, CRM, pauta y automatización operando como una sola máquina. Agencia de marketing inmobiliario en Cancún, México y US Hispanic.",
  keywords: [
    "agencia de marketing digital cancún",
    "marketing digital inmobiliario",
    "agencia marketing digital méxico",
    "marketing inmobiliario cancún",
    "sistema comercial inmobiliario",
    "automatización ventas inmobiliarias",
    "generación de leads inmobiliarios",
    "marketing digital cancún quintana roo",
    "agencia publicidad cancún",
    "marketing para desarrolladoras",
    "crm inmobiliario",
    "pauta digital inmobiliaria",
    "preventa inmobiliaria digital",
    "marketing digital riviera maya",
  ],
  authors: [{ name: "LEADERBEAT.IO", url: "https://leaderbeat.io" }],
  creator: "LEADERBEAT.IO",
  publisher: "LEADERBEAT.IO",
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
  openGraph: {
    title: "LEADERBEAT — Sistema Comercial para Marcas Inmobiliarias",
    description:
      "Marca, proceso y tecnología para cerrar más ventas inmobiliarias. Cancún · México · US Hispanic.",
    url: "https://leaderbeat.io",
    siteName: "LEADERBEAT.IO",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LEADERBEAT — Sistema Comercial para Marcas Inmobiliarias",
    description:
      "Sistema operativo comercial para marcas inmobiliarias modernas. Cancún · México · US Hispanic.",
  },
  alternates: {
    canonical: "https://leaderbeat.io",
    languages: {
      "es-MX": "https://leaderbeat.io",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
    shortcut: "/favicon.ico",
  },
  verification: {
    // Agrega aquí tu código cuando lo tengas:
    // google: "TU_CODIGO_GOOGLE_SEARCH_CONSOLE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full bg-cream text-graphite">{children}</body>
    </html>
  );
}
