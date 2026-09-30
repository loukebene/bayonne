"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Phone, UtensilsCrossed, Calendar, ShieldCheck, MessageCircle } from "lucide-react";
import { useCart } from "@/store/cartContext";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { itemCount, setIsCartOpen } = useCart();

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Réserver une table", href: "/reservation" },
    { name: "Service Traiteur", href: "/traiteur" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-header">
      {/* Top Announcement Bar */}
      <div className="bg-jardin-dark/80 text-xs py-1.5 px-4 border-b border-jardin-border/40 text-gray-300 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <span className="flex items-center gap-1.5 text-jardin-orange">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Ouvert 7j/7 • Songolo, Pointe-Noire
          </span>
          <span className="hidden sm:inline-block text-gray-400">|</span>
          <span className="hidden sm:inline-block">En face de El Maestro</span>
        </div>
        <div className="flex items-center space-x-3">
          <a
            href="tel:+242055245386"
            className="hover:text-jardin-orange transition flex items-center gap-1 font-medium"
          >
            <Phone className="w-3 h-3 text-jardin-orange" />
            +242 05 524 53 86
          </a>
          <span className="text-gray-600">|</span>
          <Link
            href="/admin/login"
            className="hover:text-amber-400 text-gray-400 text-xs flex items-center gap-1 transition"
          >
            <ShieldCheck className="w-3 h-3" />
            Espace Admin
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-jardin-orange to-amber-600 flex items-center justify-center text-white font-bold shadow-lg shadow-jardin-orange/20 group-hover:scale-105 transition">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-jardin-orange transition">
              LE JARDIN DE BAYONNE
            </span>
            <span className="block text-[10px] sm:text-xs text-jardin-orange font-semibold tracking-wider uppercase">
              RESTO-BAR, TAPAS ET SERVICE TRAITEUR
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-jardin-orange text-white font-semibold shadow-md shadow-jardin-orange/30"
                    : "text-gray-200 hover:text-white hover:bg-jardin-surface/80"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center space-x-3">
          {/* WhatsApp Direct */}
          <a
            href="https://wa.me/242055245386?text=Bonjour%20Le%20Jardin%20de%20Bayonne,%20je%20souhaite%20commander%20ou%20reserver"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-emerald-600/90 hover:bg-emerald-500 text-white transition shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative px-3.5 py-2 rounded-xl bg-jardin-surface border border-jardin-border hover:border-jardin-orange text-white flex items-center gap-2 transition group shadow-md"
            aria-label="Ouvrir le panier"
          >
            <ShoppingBag className="w-5 h-5 text-jardin-orange group-hover:scale-110 transition" />
            <span className="hidden sm:inline font-medium text-sm">Panier</span>
            {itemCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-jardin-orange text-white text-xs font-bold flex items-center justify-center animate-pulse">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
