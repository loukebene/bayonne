import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/store/cartContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { MobileBottomNav } from "@/components/MobileBottomNav";

export const metadata: Metadata = {
  title: "LE JARDIN DE BAYONNE | Resto-Bar, Tapas & Service Traiteur à Pointe-Noire",
  description: "Plateforme digitale officielle du restaurant Le Jardin de Bayonne à Pointe-Noire, Songolo. Menu digital, grillades, mabokés, plats cuisiniers, commande en ligne, réservation de table et service traiteur.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased bg-jardin-dark text-white flex flex-col min-h-screen">
        <CartProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <CartDrawer />
          <MobileBottomNav />
        </CartProvider>
      </body>
    </html>
  );
};
