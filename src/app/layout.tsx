import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import { PokemonProvider } from "@/contexts/PokemonContext";
import ClientOnly from "@/components/ClientOnly";
import { Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

export const metadata: Metadata = {
  title: "Pokedex Amalia",
  description: "A modern Pokedex app built with Next.js",
};

// Add preconnect for external domains
const preconnectDomains = [
  'https://pokeapi.co',
  'https://raw.githubusercontent.com',
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com'
];

// Font preload
const fontPreload = 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {preconnectDomains.map((domain) => (
          <link key={domain} rel="preconnect" href={domain} crossOrigin="anonymous" />
        ))}
        <link rel="preload" href={fontPreload} as="style" />
        <link rel="stylesheet" href={fontPreload} />
      </head>
      <body suppressHydrationWarning={true}>
        <ClientOnly>
          <QueryProvider>
            <PokemonProvider>
              <Suspense fallback={<LoadingSpinner size="lg" text="Loading Pokedex..." />}>
                {children}
              </Suspense>
            </PokemonProvider>
          </QueryProvider>
        </ClientOnly>
      </body>
    </html>
  );
}
