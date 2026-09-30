"use client";

import React, { useState, useMemo } from "react";
import { Search, Utensils, Sparkles, Filter, X } from "lucide-react";
import { DishCard, Dish } from "@/components/DishCard";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface MenuClientProps {
  categories: Category[];
  initialDishes: Dish[];
}

export const MenuClient: React.FC<MenuClientProps> = ({ categories, initialDishes }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredDishes = useMemo(() => {
    return initialDishes.filter((dish) => {
      // Category filter
      const matchesCategory =
        selectedCategory === "all" || dish.category?.slug === selectedCategory;

      // Search query filter
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        dish.name.toLowerCase().includes(q) ||
        (dish.description ?? "").toLowerCase().includes(q);

      return matchesCategory && matchesQuery;
    });
  }, [initialDishes, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Category Tabs & Search Container */}
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Rechercher un plat (ex: Maboké, Saka-Saka, Brochette, Capitaine...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-jardin-surface border border-jardin-border text-white text-sm focus:outline-none focus:border-jardin-orange transition shadow-xl"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-3.5 text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Categories Bar */}
        <div className="flex items-center justify-start md:justify-center overflow-x-auto gap-2 pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition border ${
              selectedCategory === "all"
                ? "bg-jardin-orange text-white border-jardin-orange shadow-lg shadow-jardin-orange/20"
                : "bg-jardin-surface text-gray-300 border-jardin-border hover:border-gray-500"
            }`}
          >
            Tous les plats ({initialDishes.length})
          </button>

          {categories.map((cat) => {
            const count = initialDishes.filter(
              (d) => d.category?.slug === cat.slug
            ).length;
            const isActive = selectedCategory === cat.slug;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition border ${
                  isActive
                    ? "bg-jardin-orange text-white border-jardin-orange shadow-lg shadow-jardin-orange/20"
                    : "bg-jardin-surface text-gray-300 border-jardin-border hover:border-gray-500"
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between border-b border-jardin-border/40 pb-4">
        <p className="text-sm font-semibold text-gray-300">
          Affichage de{" "}
          <span className="text-jardin-orange font-bold">
            {filteredDishes.length}
          </span>{" "}
          {filteredDishes.length > 1 ? "plats" : "plat"}
        </p>

        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="text-xs text-jardin-orange hover:underline font-medium"
          >
            Réinitialiser la recherche
          </button>
        )}
      </div>

      {/* Dishes Grid */}
      {filteredDishes.length === 0 ? (
        <div className="p-12 text-center bg-jardin-surface rounded-3xl border border-jardin-border max-w-md mx-auto space-y-4">
          <Utensils className="w-12 h-12 text-gray-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">Aucun plat ne correspond</h3>
          <p className="text-xs text-gray-400">
            Essayez de modifier votre mot-clé ou de sélectionner une autre catégorie.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="px-4 py-2 rounded-xl bg-jardin-orange text-white text-xs font-bold"
          >
            Voir tous les plats
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      )}
    </div>
  );
};
