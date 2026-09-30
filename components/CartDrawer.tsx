"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Store, Utensils, MessageCircle, Phone } from "lucide-react";
import { useCart, DeliveryType } from "@/store/cartContext";
import { CheckoutModal } from "./CheckoutModal";
import { buildWhatsAppOrderLink } from "@/lib/whatsapp";

export const CartDrawer: React.FC = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    deliveryType,
    setDeliveryType,
    deliveryFee,
    total,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Panel */}
      <aside className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-jardin-dark border-l border-jardin-border z-50 flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-jardin-surface border-b border-jardin-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-jardin-orange/20 text-jardin-orange flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Votre Panier</h2>
              <p className="text-xs text-gray-400">
                {items.length} {items.length > 1 ? "articles ajoutés" : "article ajouté"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-jardin-card transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-jardin-surface flex items-center justify-center text-gray-500 mb-4 border border-jardin-border">
              <ShoppingBag className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Votre panier est vide</h3>
            <p className="text-sm text-gray-400 mb-6 max-w-xs">
              Découvrez nos délicieux mabokés, poissons braisés et spécialités africaines.
            </p>
            <button
              onClick={() => setIsCartOpen(false)}
              className="px-6 py-2.5 rounded-xl bg-jardin-orange hover:bg-jardin-orange-hover text-white font-medium text-sm transition shadow-lg"
            >
              Parcourir le menu
            </button>
          </div>
        ) : (
          <>
            {/* Delivery Type Selector */}
            <div className="p-4 bg-jardin-card/60 border-b border-jardin-border/50">
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Type de Commande
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setDeliveryType("SUR_PLACE")}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl text-xs font-medium border transition ${
                    deliveryType === "SUR_PLACE"
                      ? "bg-jardin-orange text-white border-jardin-orange shadow"
                      : "bg-jardin-surface text-gray-300 border-jardin-border hover:border-gray-500"
                  }`}
                >
                  <Utensils className="w-4 h-4 mb-1" />
                  Sur place
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryType("EMPORTER")}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl text-xs font-medium border transition ${
                    deliveryType === "EMPORTER"
                      ? "bg-jardin-orange text-white border-jardin-orange shadow"
                      : "bg-jardin-surface text-gray-300 border-jardin-border hover:border-gray-500"
                  }`}
                >
                  <Store className="w-4 h-4 mb-1" />
                  À emporter
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryType("LIVRAISON")}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl text-xs font-medium border transition ${
                    deliveryType === "LIVRAISON"
                      ? "bg-jardin-orange text-white border-jardin-orange shadow"
                      : "bg-jardin-surface text-gray-300 border-jardin-border hover:border-gray-500"
                  }`}
                >
                  <Truck className="w-4 h-4 mb-1" />
                  Livraison
                </button>
              </div>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-jardin-surface border border-jardin-border/60 hover:border-jardin-border transition"
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-jardin-card">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-white truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs text-jardin-orange font-bold mt-0.5">
                      {item.price.toLocaleString("fr-FR")} FCFA
                    </p>
                    {item.priceNote && (
                      <p className="text-[10px] text-amber-400 font-medium">
                        {item.priceNote}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-400 transition"
                      aria-label="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-1.5 bg-jardin-dark px-2 py-1 rounded-lg border border-jardin-border">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-gray-300 hover:text-white"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold w-5 text-center text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-gray-300 hover:text-white"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Calculation & Checkout button */}
            <div className="p-4 bg-jardin-surface border-t border-jardin-border space-y-3">
              <div className="space-y-1.5 text-xs text-gray-300">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span className="font-semibold text-white">
                    {subtotal.toLocaleString("fr-FR")} FCFA
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>
                    Frais de livraison ({deliveryType === "LIVRAISON" ? "Pointe-Noire" : "Gratuit"})
                  </span>
                  <span className="font-semibold text-white">
                    {deliveryFee > 0
                      ? `${deliveryFee.toLocaleString("fr-FR")} FCFA`
                      : "0 FCFA"}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-jardin-border/50">
                  <span>Total</span>
                  <span className="text-jardin-orange">
                    {total.toLocaleString("fr-FR")} FCFA
                  </span>
                </div>
              </div>

              <a
                href={buildWhatsAppOrderLink(
                  items.map((item) => ({
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    note: item.priceNote,
                  })),
                  { deliveryType }
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-jardin-orange to-amber-600 hover:from-jardin-orange-hover hover:to-amber-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-jardin-orange/25 transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Commander sur WhatsApp</span>
              </a>

              <a
                href="tel:+242055245386"
                className="w-full py-2.5 rounded-xl bg-jardin-surface hover:bg-jardin-card text-white font-medium text-sm flex items-center justify-center gap-2 border border-jardin-border transition"
              >
                <Phone className="w-4 h-4 text-jardin-orange" />
                <span>Appeler le restaurant</span>
              </a>

              <button
                onClick={clearCart}
                className="w-full py-1.5 text-xs text-gray-400 hover:text-red-400 transition text-center"
              >
                Vider le panier
              </button>
            </div>
          </>
        )}
      </aside>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <CheckoutModal onClose={() => setIsCheckoutOpen(false)} />
      )}
    </>
  );
};
