import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { RouteProvider } from "@/context/RouteContext";
import ClientLayout from "@/components/layout/ClientLayout";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "পুজো পথিক — Pujo Pathik 2026 | Kolkata Durga Puja Discovery & Route Guide",
  description:
    "Explore Kolkata Durga Puja 2026. Discover 227+ pandals, verified themes, metro connectivity, interactive city map, and custom smart route builder.",
  keywords: [
    "Kolkata Durga Puja 2026",
    "Durga Puja Pandals",
    "Pujo Pathik",
    "Pujo Route Builder",
    "Kolkata Metro Puja Guide",
    "Sreebhumi Hawa Mahal 2026",
    "Ekdalia Somnath Temple",
    "Kumartuli Durga Puja",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-[#faf7ee] text-stone-900 min-h-screen flex flex-col antialiased">
        <LanguageProvider>
          <RouteProvider>
            <ClientLayout>{children}</ClientLayout>
          </RouteProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

