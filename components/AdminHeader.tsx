"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Utensils, ShoppingBag, Calendar, Award, LogOut } from "lucide-react";

export const AdminHeader: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Tableau de Bord", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Gestion du Menu", href: "/admin/menu", icon: Utensils },
    { name: "Suivi Commandes", href: "/admin/orders", icon: ShoppingBag },
    { name: "Réservations", href: "/admin/reservations", icon: Calendar },
    { name: "Devis Traiteur", href: "/admin/catering", icon: Award },
  ];

  return (
    <div className="bg-jardin-surface border-b border-jardin-border mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-jardin-orange uppercase tracking-wider">
            Espace Gérant & Administration
          </span>
          <h1 className="text-xl font-extrabold text-white">
            LE JARDIN DE BAYONNE
          </h1>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center overflow-x-auto gap-1 bg-jardin-dark p-1 rounded-xl border border-jardin-border">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  isActive
                    ? "bg-jardin-orange text-white shadow-md shadow-jardin-orange/20"
                    : "text-gray-300 hover:text-white hover:bg-jardin-card"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Logout */}
        <Link
          href="/"
          className="text-xs text-gray-400 hover:text-red-400 transition flex items-center gap-1 font-medium"
        >
          <LogOut className="w-4 h-4" />
          <span>Déconnexion</span>
        </Link>
      </div>
    </div>
  );
};
