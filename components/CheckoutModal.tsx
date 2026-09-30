"use client";

import React, { useState } from "react";
import { X, MessageCircle, Phone, MapPin, Send, AlertCircle, ShoppingBag, CheckCircle2 } from "lucide-react";
import { useCart } from "@/store/cartContext";
import { buildWhatsAppOrderLink } from "@/lib/whatsapp";

interface CheckoutModalProps {
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ onClose }) => {
  const { items, subtotal, deliveryType, deliveryFee, total, clearCart, setIsCartOpen } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("+242 ");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setError("Veuillez saisir votre nom complet.");
      return;
    }
    if (!customerPhone.trim() || customerPhone.trim() === "+242") {
      setError("Veuillez saisir un numéro de téléphone valide à Pointe-Noire.");
      return;
    }
    if (deliveryType === "LIVRAISON" && !address.trim()) {
      setError("Veuillez préciser votre adresse ou quartier de livraison à Pointe-Noire.");
      return;
    }

    setError("");
    setLoading(true);

    const link = buildWhatsAppOrderLink(
      items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        note: item.priceNote,
      })),
      {
        deliveryType,
        customerName: customerName.trim(),
        phone: customerPhone.trim(),
        address: deliveryType === "LIVRAISON" ? address.trim() : "",
        notes: notes.trim(),
      }
    );

    setSubmitted(true);
    clearCart();
    setLoading(false);
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-jardin-dark border border-jardin-border rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl my-8">
        {/* Header */}
        <div className="p-5 bg-jardin-surface border-b border-jardin-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-jardin-orange/20 text-jardin-orange flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {submitted ? "Commande prête" : "Commander par WhatsApp ou appel"}
              </h3>
              <p className="text-xs text-gray-400">
                {submitted
                  ? "Votre demande est prête à être envoyée."
                  : `${items.length} articles • Total: ${total.toLocaleString("fr-FR")} FCFA`}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              if (submitted) {
                setIsCartOpen(false);
              }
              onClose();
            }}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-jardin-card transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Confirmation View */}
        {submitted ? (
          <div className="p-6 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>

            <div className="space-y-2">
              <h4 className="text-xl font-bold text-white">
                Demande prête à être envoyée
              </h4>
              <p className="text-sm text-gray-300">
                Votre commande a été préparée pour être envoyée par WhatsApp ou via un appel téléphonique.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <a
                href={buildWhatsAppOrderLink(
                  items.map((item) => ({
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    note: item.priceNote,
                  })),
                  {
                    deliveryType,
                    customerName: customerName.trim(),
                    phone: customerPhone.trim(),
                    address: deliveryType === "LIVRAISON" ? address.trim() : "",
                    notes: notes.trim(),
                  }
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Envoyer sur WhatsApp (+242 05 524 53 86)</span>
              </a>

              <a
                href="tel:+242055245386"
                className="w-full py-3 px-4 rounded-xl bg-jardin-surface hover:bg-jardin-card text-white font-medium text-sm flex items-center justify-center gap-2 border border-jardin-border transition"
              >
                <Phone className="w-5 h-5 text-jardin-orange" />
                <span>Appeler le restaurant</span>
              </a>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onClose();
                }}
                className="w-full py-2.5 rounded-xl bg-jardin-surface hover:bg-jardin-card text-gray-300 hover:text-white font-medium text-xs transition border border-jardin-border"
              >
                Fermer et retourner au menu
              </button>
            </div>
          </div>
        ) : (
          /* Form View */
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Nom complet *
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Jean-Paul Mavoungou"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-jardin-surface border border-jardin-border text-white text-sm focus:outline-none focus:border-jardin-orange transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Téléphone (Pointe-Noire) *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="tel"
                  required
                  placeholder="+242 05 524 53 86"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-jardin-surface border border-jardin-border text-white text-sm focus:outline-none focus:border-jardin-orange transition"
                />
              </div>
            </div>

            {deliveryType === "LIVRAISON" && (
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  Adresse de livraison à Pointe-Noire *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Quartier, rue, repère (Ex: Songolo près de l'école)"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-jardin-surface border border-jardin-border text-white text-sm focus:outline-none focus:border-jardin-orange transition"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Instructions particulières (Optionnel)
              </label>
              <textarea
                rows={2}
                placeholder="Ex: Piment doux à part, bien cuit, etc."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-jardin-surface border border-jardin-border text-white text-sm focus:outline-none focus:border-jardin-orange transition resize-none"
              />
            </div>

            {/* Summary */}
            <div className="bg-jardin-surface p-3.5 rounded-xl border border-jardin-border/60 space-y-1.5 text-xs text-gray-300">
              <div className="flex justify-between">
                <span>Sous-total ({items.length} plats)</span>
                <span>{subtotal.toLocaleString("fr-FR")} FCFA</span>
              </div>
              <div className="flex justify-between">
                <span>Frais de livraison</span>
                <span>{deliveryFee > 0 ? `${deliveryFee.toLocaleString("fr-FR")} FCFA` : "Gratuit"}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white pt-1.5 border-t border-jardin-border/40">
                <span>Total à payer</span>
                <span className="text-jardin-orange">{total.toLocaleString("fr-FR")} FCFA</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-jardin-orange to-amber-600 hover:from-jardin-orange-hover hover:to-amber-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-jardin-orange/30 transition disabled:opacity-50"
            >
              {loading ? (
                <span>Enregistrement...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Confirmer & Valider la commande</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
