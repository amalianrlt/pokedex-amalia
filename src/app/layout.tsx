import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import { PokemonProvider } from "@/contexts/PokemonContext";
import ClientOnly from "@/components/ClientOnly";

export const metadata: Metadata = {
  title: "Pokedex Amalia",
  description: "A modern Pokedex app built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ClientOnly>
          <QueryProvider>
            <PokemonProvider>
              {children}
            </PokemonProvider>
          </QueryProvider>
        </ClientOnly>
      </body>
    </html>
  );
}
