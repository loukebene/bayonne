"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Utensils, MessageCircle, PhoneCall, Award } from "lucide-react";

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();

  // Hide on admin routes
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const links = [
    { name: "Accueil", href: "/", icon: Home },
    { name: "Menu", href: "/menu", icon: Utensils },
    {
      name: "WhatsApp",
      href: "https://wa.me/242055245386?text=Bonjour%20Le%20Jardin%20de%20Bayonne,%20je%20souhaite%20commander",
      icon: MessageCircle,
      external: true,
    },
    { name: "Traiteur", href: "/traiteur", icon: Award },
    { name: "Appel", href: "tel:+242055245386", icon: PhoneCall, external: true },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-jardin-dark/95 backdrop-blur-md border-t border-jardin-border px-2 py-1.5 shadow-2xl">
      <div className="flex items-center justify-around">
        {links.map((link) => {
          const isActive = !link.external && pathname === link.href;

          if (link.external) {
            return (
              <a
                key={link.name}
                href={link.href!}
                target={link.href?.startsWith("http") ? "_blank" : undefined}
                rel={link.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex flex-col items-center justify-center w-14 py-1 text-xs text-gray-400 hover:text-gray-200 transition"
              >
                <link.icon className="w-5 h-5 text-gray-400" />
                <span className="mt-1 text-[11px]">{link.name}</span>
              </a>
            );
          }

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
