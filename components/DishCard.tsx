"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Minus, Star, Info, ShoppingBag, MessageCircle } from "lucide-react";
import { DishModal } from "./DishModal";
import { buildWhatsAppOrderLink } from "@/lib/whatsapp";

export interface Dish {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  isVariablePrice?: boolean;
  priceNote?: string | null;
  imageUrl: string;
  isAvailable: boolean;
  isPopular: boolean;
  category?: { name: string; slug?: string };
}

interface DishCardProps {
  dish: Dish;
}

export const DishCard: React.FC<DishCardProps> = ({ dish }) => {
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOrderViaWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const link = buildWhatsAppOrderLink([
      {
        name: dish.name,
        quantity,
        price: dish.price,
        note: dish.priceNote,
      },
    ]);
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="group relative bg-jardin-surface rounded-2xl border border-jardin-border/70 overflow-hidden card-hover-glow cursor-pointer flex flex-col justify-between"
      >
        {/* Image Container */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-jardin-card">
          <Image
            src={dish.imageUrl}
            alt={dish.name}
            fill
            className="object-cover group-hover:scale-110 transition duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-jardin-surface via-transparent to-transparent opacity-80" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {dish.isPopular && (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500 text-slate-950 flex items-center gap-1 shadow-md">
                <Star className="w-3 h-3 fill-slate-950" />
                Populaire
              </span>
            )}
            {dish.isVariablePrice && (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-jardin-orange text-white shadow-md">
                Prix selon arrivage
              </span>
            )}
          </div>

          {!dish.isAvailable && (
            <div className="absolute inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center">
              <span className="px-3 py-1.5 rounded-lg bg-red-600/90 text-white text-xs font-bold uppercase tracking-wider">
                Momentanément indisponible
              </span>
            </div>
          )}
        </div>

        {/* Info Content */}
        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
          <div>
            <h3 className="text-base font-bold text-white group-hover:text-jardin-orange transition line-clamp-1">
              {dish.name}
            </h3>
            <p className="text-xs text-gray-300 mt-1 line-clamp-2 leading-relaxed">
              {dish.description ?? "Aucune description disponible."}
            </p>
          </div>

          {/* Price & Actions */}
          <div className="pt-2 border-t border-jardin-border/40 flex items-center justify-between">
            <div>
              <span className="text-base sm:text-lg font-bold text-jardin-orange">
                {dish.price.toLocaleString("fr-FR")} FCFA
              </span>
              {dish.priceNote && (
                <p className="text-[10px] text-amber-400 font-medium leading-none mt-0.5">
                  {dish.priceNote}
                </p>
              )}
            </div>

            {/* Quantity + Add Button */}
            {dish.isAvailable && (
              <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <div className="hidden sm:flex items-center bg-jardin-dark rounded-lg border border-jardin-border px-1.5 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-gray-400 hover:text-white p-0.5"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold text-white w-4 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-gray-400 hover:text-white p-0.5"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <button
                  onClick={handleOrderViaWhatsApp}
                  className="px-3 py-2 rounded-xl bg-jardin-orange hover:bg-jardin-orange-hover text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-jardin-orange/20 transition"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Commander</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {isModalOpen && (
        <DishModal dish={dish} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};
