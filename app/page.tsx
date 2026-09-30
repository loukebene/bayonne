import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  UtensilsCrossed,
  Sparkles,
  ShoppingBag,
  Calendar,
  Phone,
  MapPin,
  Clock,
  Star,
  Award,
  ChevronRight,
  Flame,
  MessageCircle,
  Users,
  CheckCircle2,
} from "lucide-react";
import { popularDishes } from "@/lib/menu";
import { DishCard } from "@/components/DishCard";

export default function HomePage() {
  return (
    <div className="space-y-16 pb-12">
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-6 pb-12">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&auto=format&fit=crop&q=80"
            alt="Ambiance Le Jardin de Bayonne"
            fill
            className="object-cover opacity-20 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-jardin-dark via-jardin-dark/85 to-jardin-dark/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          {/* Main Title Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-jardin-surface/90 border border-jardin-orange/50 text-jardin-orange text-xs sm:text-sm font-semibold mb-6 shadow-xl backdrop-blur-md animate-fade-in">
            <Flame className="w-4 h-4 text-jardin-orange animate-pulse" />
            <span>La bonne cuisine, au bout de vos doigts !</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
            LE JARDIN DE BAYONNE
          </h1>

          <p className="text-base sm:text-xl font-bold text-jardin-orange tracking-widest uppercase mt-2 mb-6">
            RESTO-BAR, TAPAS ET SERVICE TRAITEUR
          </p>

          <p className="text-gray-300 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            Bienvenue dans votre destination gourmande à Pointe-Noire (Songolo). Savourez l&apos;authenticité de nos poissons braisés, mabokés en feuilles de bananier, grillades et tapas africaines.
          </p>

          {/* Core Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <Link
              href="/menu"
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-jardin-orange to-amber-600 hover:from-jardin-orange-hover hover:to-amber-500 text-white font-extrabold text-sm sm:text-base flex items-center gap-2 shadow-xl shadow-jardin-orange/30 transition hover:scale-105"
            >
              <UtensilsCrossed className="w-5 h-5" />
              <span>Voir le menu</span>
            </Link>

            <Link
              href="/menu"
              className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm sm:text-base flex items-center gap-2 shadow-xl shadow-emerald-600/30 transition hover:scale-105"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Commander</span>
            </Link>

            <Link
              href="/reservation"
              className="px-6 py-3.5 rounded-2xl bg-jardin-surface hover:bg-jardin-card text-white font-bold text-sm sm:text-base flex items-center gap-2 border border-jardin-border hover:border-jardin-orange transition hover:scale-105"
            >
              <Calendar className="w-5 h-5 text-jardin-orange" />
              <span>Réserver une table</span>
            </Link>
          </div>

          {/* 4 Feature Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-4 border-t border-jardin-border/50">
            <div className="glass-panel p-3.5 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold text-gray-200">
              <UtensilsCrossed className="w-4 h-4 text-jardin-orange" />
              <span>Cuisine Africaine</span>
            </div>
            <div className="glass-panel p-3.5 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold text-gray-200">
              <Sparkles className="w-4 h-4 text-jardin-orange" />
              <span>Resto-bar & Atmosphere</span>
            </div>
            <div className="glass-panel p-3.5 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold text-gray-200">
              <Flame className="w-4 h-4 text-jardin-orange" />
              <span>Tapas & Brochettes</span>
            </div>
            <div className="glass-panel p-3.5 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold text-gray-200">
              <Award className="w-4 h-4 text-jardin-orange" />
              <span>Service Traiteur Pro</span>
            </div>
          </div>
        </div>
      </section>

      {/* PRÉSENTATION & NOS VALEURS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden border border-jardin-border shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80"
              alt="Poisson braisé Le Jardin de Bayonne"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-jardin-dark/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-panel text-xs text-gray-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-white text-sm">Spécialité du chef</p>
                <p className="text-gray-300">Poisson braisé au charbon & marinade maison</p>
              </div>
              <span className="px-3 py-1 bg-jardin-orange text-white font-bold rounded-lg text-xs">
                7 000 FCFA
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-jardin-orange uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>À propos du Jardin de Bayonne</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              L&apos;Art de la Gastronomie Africaine à Pointe-Noire
            </h2>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Implanté au cœur de Songolo (en face de El Maestro), <strong className="text-white">LE JARDIN DE BAYONNE</strong> est plus qu&apos;un simple restaurant : c&apos;est un lieu de convivialité et d&apos;authenticité gourmande.
            </p>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Nous sélectionnons chaque matin les produits les plus frais auprès des pêcheurs et producteurs locaux. Nos chefs subliment les recettes traditionnelles – mabokés étouffés en feuilles de bananier, grillades au feu de bois, sanglier sauté et accompagnements authentiques (manioc, foufou, bananes vapeurs).
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-jardin-surface border border-jardin-border flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-jardin-orange shrink-0" />
                <span className="text-xs font-semibold text-white">Produits frais & locaux</span>
              </div>
              <div className="p-3.5 rounded-xl bg-jardin-surface border border-jardin-border flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-jardin-orange shrink-0" />
                <span className="text-xs font-semibold text-white">Cuisine généreuse</span>
              </div>
              <div className="p-3.5 rounded-xl bg-jardin-surface border border-jardin-border flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-jardin-orange shrink-0" />
                <span className="text-xs font-semibold text-white">Service rapide à table & livraison</span>
              </div>
              <div className="p-3.5 rounded-xl bg-jardin-surface border border-jardin-border flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-jardin-orange shrink-0" />
                <span className="text-xs font-semibold text-white">Cadre chaleureux & convivial</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLATS POPULAIRES / NOS SPÉCIALITÉS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-jardin-orange uppercase tracking-wider mb-2">
              <Star className="w-4 h-4" />
              <span>Incontournables du Menu</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Nos Plats les plus Demandés
            </h2>
          </div>
          <Link
            href="/menu"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-jardin-orange hover:text-amber-400 transition"
          >
            <span>Voir tout le menu digital</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularDishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      </section>

      {/* CATEGORIES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="p-8 rounded-3xl bg-gradient-to-br from-jardin-surface to-jardin-dark border border-jardin-border relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Découvrez Toutes nos Catégories
              </h2>
              <p className="text-sm text-gray-300">
                Du petit amuse-bouche au banquet traiteur complet, retrouvez tous vos plats favoris.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { name: "AMUSE-BOUCHE", count: "Tapas & Meli Melo" },
                { name: "ENTRÉES", count: "Salades & Avocats" },
                { name: "GRILLADES", count: "Poissons & Brochettes" },
                { name: "COMPLÉMENTS", count: "Manioc, Riz, Bananes" },
                { name: "MABOKES", count: "Capitaine, Sanglier..." },
                { name: "PLATS CUISINIERS", count: "Saka-Saka, Sibissi..." },
              ].map((cat, idx) => (
                <Link
                  key={idx}
                  href="/menu"
                  className="p-4 rounded-2xl bg-jardin-card/80 hover:bg-jardin-orange/20 border border-jardin-border hover:border-jardin-orange transition text-center group"
                >
                  <span className="block text-xs font-bold text-white group-hover:text-jardin-orange transition">
                    {cat.name}
                  </span>
                  <span className="block text-[10px] text-gray-400 mt-1">
                    {cat.count}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE TRAITEUR BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-jardin-border bg-gradient-to-r from-jardin-surface via-jardin-dark to-jardin-surface p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-4">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-500/40">
                Service Traiteur & Événements
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                Organisez vos plus grands Événements avec Le Jardin de Bayonne
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Mariage, anniversaire, repas d&apos;entreprise ou réception privée à Pointe-Noire : notre équipe traiteur prend en charge votre buffet avec des plats d&apos;exception.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/traiteur"
                  className="px-6 py-3 rounded-xl bg-jardin-orange hover:bg-jardin-orange-hover text-white font-bold text-sm shadow-lg shadow-jardin-orange/20 transition"
                >
                  Demander un devis personnalisé
                </Link>
              </div>
            </div>

            <div className="relative h-56 rounded-2xl overflow-hidden border border-jardin-border shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1555244162-803834f70033?w=600&auto=format&fit=crop&q=80"
                alt="Buffet traiteur Le Jardin de Bayonne"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES CLIENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-jardin-orange uppercase tracking-wider">
            Avis & Témoignages
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ce que disent nos Clients à Pointe-Noire
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Christian M.",
              role: "Client régulier à Songolo",
              text: "Le meilleur Maboké de capitaine de tout Pointe-Noire ! La cuisson dans la feuille de bananier est parfaite et le poisson est ultra frais.",
              rating: 5,
            },
            {
              name: "Nathalie B.",
              role: "Événement Anniversaire",
              text: "Le service traiteur a assuré pour mes 30 ans. Tous mes invités ont adoré les brochettes mixtes et le Saka-saka.",
              rating: 5,
            },
            {
              name: "Patrice K.",
              role: "Commande en livraison",
              text: "Commande très simple sur la plateforme web. Reçu rapide par WhatsApp et livraison chaude à domicile !",
              rating: 5,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-jardin-surface border border-jardin-border space-y-4"
            >
              <div className="flex text-amber-400 gap-1">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-gray-300 text-xs sm:text-sm italic leading-relaxed">
                &ldquo;{item.text}&rdquo;
              </p>
              <div className="pt-2 border-t border-jardin-border/40">
                <p className="font-bold text-white text-sm">{item.name}</p>
                <p className="text-xs text-jardin-orange">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* QUICK CONTACT & LOCALISATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-jardin-surface border border-jardin-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Nous Trouver & Contacter</h3>
              <p className="text-xs text-gray-300">
                Pointe-Noire, Songolo, en face de El Maestro.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-gray-400 uppercase font-semibold">Téléphones direct</p>
              <p className="text-base font-bold text-white">+242 05 524 53 86</p>
              <p className="text-base font-bold text-white">+242 05 577 43 58</p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-3 justify-center">
              <a
                href="https://wa.me/242055245386"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                Discuter sur WhatsApp
              </a>

              <Link
                href="/contact"
                className="py-3 px-4 rounded-xl bg-jardin-card hover:bg-jardin-border text-white font-bold text-xs flex items-center justify-center gap-2 border border-jardin-border transition"
              >
                <MapPin className="w-4 h-4 text-jardin-orange" />
                Voir la carte Google Maps
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
