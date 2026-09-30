"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Plus, Minus, ShoppingBag, Star, Sparkles, Check, MessageCircle } from "lucide-react";
import { Dish } from "./DishCard";
import { buildWhatsAppOrderLink } from "@/lib/whatsapp";

interface DishModalProps {
  dish: Dish;
  onClose: () => void;
}

export const DishModal: React.FC<DishModalProps> = ({ dish, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    const link = buildWhatsAppOrderLink([
      {
        name: dish.name,
        quantity,
        price: dish.price,
        note: dish.priceNote,
      },
    ]);
    setAdded(true);
    window.open(link, "_blank", "noopener,noreferrer");
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-jardin-dark border border-jardin-border rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl my-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-jardin-orange transition flex items-center justify-center backdrop-blur-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Large Image Header */}
        <div className="relative h-64 sm:h-72 w-full bg-jardin-card">
          <Image
            src={dish.imageUrl}
            alt={dish.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-jardin-dark via-jardin-dark/40 to-transparent" />

          {dish.isPopular && (
            <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950 flex items-center gap-1 shadow-lg">
              <Star className="w-3.5 h-3.5 fill-slate-950" />
              Spécialité coup de cœur
            </span>
          )}
        </div>

        {/* Details Content */}
        <div className="p-6 sm:p-8 space-y-6 -mt-8 relative z-10">
          <div>
            <span className="text-xs font-bold text-jardin-orange uppercase tracking-widest">
              {dish.category?.name || "Le Jardin de Bayonne"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {dish.name}
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mt-3">
              {dish.description ?? "Aucune description disponible."}
            </p>
          </div>

          {/* Pricing Box */}
          <div className="bg-jardin-surface p-4 rounded-2xl border border-jardin-border flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 font-medium">Prix unitaire</p>
              <p className="text-2xl font-extrabold text-jardin-orange">
                {dish.price.toLocaleString("fr-FR")} FCFA
              </p>
              {dish.priceNote && (
                <p className="text-xs text-amber-400 font-medium mt-0.5">
                  {dish.priceNote}
                </p>
              )}
            </div>

            {/* Quantity Controls */}
            {dish.isAvailable && (
              <div className="flex items-center gap-3 bg-jardin-dark px-3 py-2 rounded-xl border border-jardin-border">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-jardin-card hover:bg-jardin-surface text-white font-bold flex items-center justify-center transition"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-base font-extrabold text-white w-6 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-jardin-card hover:bg-jardin-surface text-white font-bold flex items-center justify-center transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Action Button */}
          {dish.isAvailable ? (
            <button
              onClick={handleAdd}
              disabled={added}
              className={`w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-xl transition ${
                added
                  ? "bg-emerald-600 text-white"
                  : "bg-gradient-to-r from-jardin-orange to-amber-600 hover:from-jardin-orange-hover hover:to-amber-500 text-white shadow-jardin-orange/30"
              }`}
            >
              {added ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Commande envoyée !</span>
                </>
              ) : (
                <>
                  <MessageCircle className="w-5 h-5" />
                  <span>
                    Commander par WhatsApp ({(dish.price * quantity).toLocaleString("fr-FR")} FCFA)
                  </span>
                </>
              )}
            </button>
          ) : (
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-center font-bold text-sm">
              Ce plat est momentanément indisponible
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
