"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Utensils, ShoppingBag, PhoneCall, Award } from "lucide-react";
import { useCart } from "@/store/cartContext";

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();
  const { itemCount, setIsCartOpen } = useCart();

  // Hide on admin routes
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const links = [
    { name: "Accueil", href: "/", icon: Home },
    { name: "Menu", href: "/menu", icon: Utensils },
    {
      name: "Panier",
      isCart: true,
      icon: ShoppingBag,
      badge: itemCount,
    },
    { name: "Traiteur", href: "/traiteur", icon: Award },
    { name: "Contact", href: "/contact", icon: PhoneCall },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-jardin-dark/95 backdrop-blur-md border-t border-jardin-border px-2 py-1.5 shadow-2xl">
      <div className="flex items-center justify-around">
        {links.map((link) => {
          if (link.isCart) {
            return (
              <button
                key="cart-btn"
                onClick={() => setIsCartOpen(true)}
                className="relative flex flex-col items-center justify-center w-14 py-1 text-xs text-gray-300 hover:text-jardin-orange transition"
              >
                <div className="relative">
                  <link.icon className="w-5 h-5 text-jardin-orange" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-jardin-orange text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </div>
                <span className="mt-1 text-[11px] font-medium text-jardin-orange">
                  Panier
                </span>
              </button>
            );
          }

          const isActive = pathname === link.href;

          return (
            <Link
              key={link.name}
              href={link.href!}
              className={`flex flex-col items-center justify-center w-14 py-1 text-xs transition ${
                isActive
                  ? "text-jardin-orange font-bold scale-105"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <link.icon
                className={`w-5 h-5 ${
                  isActive ? "text-jardin-orange" : "text-gray-400"
                }`}
              />
              <span className="mt-1 text-[11px]">{link.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
