import React from "react";
import { categories, dishes } from "@/lib/menu";
import { MenuClient } from "./MenuClient";

export default function MenuPage() {
  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-jardin-orange/20 text-jardin-orange text-xs font-bold border border-jardin-orange/40">
          Menu Gourmand Digital
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Notre Menu & Spécialités Africaines
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          Explorez nos 6 catégories gourmandes : amuse-bouches, entrées fraîches, grillades au feu de bois, compléments, mabokés étouffés et plats cuisiniers traditionnels.
        </p>
      </div>

      <MenuClient categories={categories} initialDishes={dishes} />
    </div>
  );
}
