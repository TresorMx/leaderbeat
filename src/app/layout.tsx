import type { Metadata } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LEADERBEAT.IO — El sistema operativo comercial de las marcas inmobiliarias modernas",
  description:
    "Construimos las marcas, los procesos y la tecnología discreta que cierran ventas inmobiliarias mientras tu competencia todavía piensa en encender pauta.",
  metadataBase: new URL("https://leaderbeat.io"),
  openGraph: {
    title: "LEADERBEAT.IO",
    description:
      "El sistema operativo comercial de las marcas inmobiliarias modernas.",
    type: "website",
    locale: "es_LA",
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
      className={`${inter.variable} ${fraunces.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-cream text-graphite">{children}</body>
    </html>
  );
}
