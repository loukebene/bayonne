"use client";

import React from "react";
import Link from "next/link";
import { UtensilsCrossed, Phone, MapPin, Clock, MessageCircle, ShieldCheck } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-jardin-dark border-t border-jardin-border pt-16 pb-24 md:pb-12 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-jardin-orange to-amber-600 flex items-center justify-center text-white font-bold">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                LE JARDIN DE BAYONNE
              </span>
            </Link>
            <p className="text-xs text-jardin-orange font-semibold uppercase tracking-wider">
              RESTO-BAR, TAPAS ET SERVICE TRAITEUR
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              La bonne cuisine africaine, au bout de vos doigts ! Découvrez une expérience culinaire authentique, généreuse et chaleureuse à Pointe-Noire.
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/242055245386"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-md transition"
              >
                <MessageCircle className="w-4 h-4" />
                Commander sur WhatsApp
              </a>
            </div>
          </div>

          {/* Navigation Rapide */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-base border-b border-jardin-border/50 pb-2">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-jardin-orange transition">
                  Page d'accueil
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-jardin-orange transition">
                  Menu Digital & Spécialités
                </Link>
              </li>
              <li>
                <Link href="/reservation" className="hover:text-jardin-orange transition">
                  Réserver une table
                </Link>
              </li>
              <li>
                <Link href="/traiteur" className="hover:text-jardin-orange transition">
                  Service Traiteur & Événements
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-jardin-orange transition">
                  Contact & Géolocalisation
                </Link>
              </li>
            </ul>
          </div>

          {/* Nos Spécialités */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-base border-b border-jardin-border/50 pb-2">
              Nos Spécialités
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-jardin-orange"></span>
                Poissons braisés & Capitaine
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-jardin-orange"></span>
                Maboké traditionnel (Feuilles de bananier)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-jardin-orange"></span>
                Grillades & Brochettes mixtes
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-jardin-orange"></span>
                Plats cuisiniers (Saka-Saka, Sibissi, Sanglier)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-jardin-orange"></span>
                Tapas & Assiettes gourmandes
              </li>
            </ul>
          </div>

          {/* Contact & Horaires */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-base border-b border-jardin-border/50 pb-2">
              Contact & Horaires
            </h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-jardin-orange mt-1 shrink-0" />
                <span>
                  Pointe-Noire, Songolo,
                  <br />
                  en face de El Maestro, République du Congo
                </span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-jardin-orange shrink-0" />
                <span>+242 05 524 53 86 / 05 577 43 58</span>
              </p>
              <p className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-jardin-orange mt-1 shrink-0" />
                <span>
                  Lundi - Dimanche : 11h00 - 23h00
                  <br />
                  <span className="text-xs text-emerald-400">Service continu & Livraison</span>
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-jardin-border/40 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} LE JARDIN DE BAYONNE. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <span>Pointe-Noire, République du Congo</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
