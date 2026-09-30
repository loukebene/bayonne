"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Award, Calendar, Users, Phone, User, MessageSquare, CheckCircle2, MessageCircle, DollarSign, Heart, PartyPopper, Briefcase } from "lucide-react";

export default function TraiteurPage() {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("+242 ");
  const [eventType, setEventType] = useState("Mariage");
  const [eventDate, setEventDate] = useState("");
  const [guestCount, setGuestCount] = useState(50);
  const [estimatedBudget, setEstimatedBudget] = useState("500000");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [createdQuote, setCreatedQuote] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setError("Veuillez remplir votre nom complet.");
      return;
    }
    if (!customerPhone.trim() || customerPhone.trim() === "+242") {
      setError("Veuillez saisir un numéro de téléphone valide.");
      return;
    }
    if (!eventDate) {
      setError("Veuillez indiquer la date de l'événement.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/catering", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerPhone,
          eventType,
          eventDate,
          guestCount,
          estimatedBudget,
          message,
        }),
      });

      if (!res.ok) {
        throw new Error("Erreur lors de la soumission de la demande de devis.");
      }

      const data = await res.json();
      setCreatedQuote(data);
    } catch (err: any) {
      setError(err.message || "Erreur lors de la demande de devis.");
    } finally {
      setLoading(false);
    }
  };

  const getWhatsAppUrl = () => {
    if (!createdQuote) return "#";
    const msg = `*DEMANDE DE DEVIS SERVICE TRAITEUR* 🎉
*Réf:* #${createdQuote.quoteNumber}
*Client:* ${createdQuote.customerName}
*Tél:* ${createdQuote.customerPhone}
*Événement:* ${createdQuote.eventType}
*Date:* ${createdQuote.eventDate}
*Nombre d'invités:* ${createdQuote.guestCount} personnes
*Budget estimé:* ${Number(createdQuote.estimatedBudget).toLocaleString("fr-FR")} FCFA
${createdQuote.message ? `*Détails:* ${createdQuote.message}` : ""}

_Merci de me contacter pour établir la proposition complète !_`;

    return `https://wa.me/242055245386?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-jardin-orange/20 text-jardin-orange text-xs font-bold border border-jardin-orange/40">
          Gastronomie & Réceptions Premium
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Service Traiteur & Événements Sur-Mesure
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          Le Jardin de Bayonne vous accompagne pour sublimer tous vos événements professionnels et privés à Pointe-Noire avec une cuisine africaine d&apos;exception.
        </p>
      </div>

      {/* Event Types Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { title: "Mariage", icon: Heart, desc: "Buffet gastronomique et dîner assis inoubliable." },
          { title: "Anniversaire", icon: PartyPopper, desc: "Ambiance festive, tapas et spécialités africaines." },
          { title: "Repas d'entreprise", icon: Briefcase, desc: "Cocktails professionnels, pauses déjeuner et galas." },
          { title: "Réception", icon: Award, desc: "Service d'exception pour vos invités d'honneur." },
          { title: "Événements privés", icon: Users, desc: "Fêtes de famille, diplômes et réceptions sur mesure." },
        ].map((item, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-jardin-surface border border-jardin-border hover:border-jardin-orange transition text-center space-y-3 group"
          >
            <div className="w-12 h-12 rounded-xl bg-jardin-dark text-jardin-orange flex items-center justify-center mx-auto border border-jardin-border group-hover:scale-110 transition">
              <item.icon className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-jardin-orange transition">
              {item.title}
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Form Container */}
      <div className="max-w-4xl mx-auto">
        {createdQuote ? (
          <div className="bg-jardin-surface border border-jardin-border p-8 rounded-3xl text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">
                Demande de Devis Transmise !
              </h2>
              <p className="text-sm text-gray-300">
                Numéro de dossier : <span className="font-mono font-bold text-jardin-orange">#{createdQuote.quoteNumber}</span>
              </p>
            </div>

            <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
              Notre chef traiteur étudie votre demande pour l&apos;événement <strong className="text-white">{createdQuote.eventType}</strong> du <strong className="text-white">{createdQuote.eventDate}</strong>.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Finaliser la demande sur WhatsApp (+242 05 524 53 86)</span>
              </a>

              <button
                onClick={() => setCreatedQuote(null)}
                className="py-3.5 px-6 rounded-xl bg-jardin-card hover:bg-jardin-border text-gray-300 hover:text-white font-semibold text-xs border border-jardin-border transition"
              >
                Nouvelle demande de devis
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-jardin-surface border border-jardin-border p-6 sm:p-10 rounded-3xl shadow-2xl space-y-6"
          >
            <div className="border-b border-jardin-border/40 pb-4">
              <h2 className="text-xl font-bold text-white">Formulaire de Devis Traiteur</h2>
              <p className="text-xs text-gray-400">
                Obtenez une proposition détaillée sous 24 heures pour votre événement.
              </p>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Nom complet / Société *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="Ex: TotalEnergies ou Marie Kouka"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-jardin-dark border border-jardin-border text-white text-sm focus:outline-none focus:border-jardin-orange transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Téléphone (Pointe-Noire) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    required
                    placeholder="+242 05 524 53 86"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-jardin-dark border border-jardin-border text-white text-sm focus:outline-none focus:border-jardin-orange transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Type d&apos;événement *
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-jardin-dark border border-jardin-border text-white text-sm focus:outline-none focus:border-jardin-orange transition"
                >
                  <option value="Mariage">Mariage</option>
                  <option value="Anniversaire">Anniversaire</option>
                  <option value="Repas d'entreprise">Repas d&apos;entreprise</option>
                  <option value="Réception">Réception officielle</option>
                  <option value="Événement privé">Événement privé</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Date prévisionnelle *
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-jardin-dark border border-jardin-border text-white text-sm focus:outline-none focus:border-jardin-orange transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Nombre d&apos;invités estimé *
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="number"
                    min="10"
                    max="1000"
                    required
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-jardin-dark border border-jardin-border text-white text-sm focus:outline-none focus:border-jardin-orange transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Budget estimatif (FCFA)
                </label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="number"
                    step="50000"
                    placeholder="Ex: 500000"
                    value={estimatedBudget}
                    onChange={(e) => setEstimatedBudget(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-jardin-dark border border-jardin-border text-white text-sm focus:outline-none focus:border-jardin-orange transition"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Détails / Souhaits particuliers
              </label>
              <textarea
                rows={4}
                placeholder="Précisez le type de plats souhaités (Mabokés, poissons braisés, sanglier, buffet chaud), boissons, lieu de la réception..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-4 rounded-xl bg-jardin-dark border border-jardin-border text-white text-sm focus:outline-none focus:border-jardin-orange transition resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-jardin-orange to-amber-600 hover:from-jardin-orange-hover hover:to-amber-500 text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-xl shadow-jardin-orange/30 transition disabled:opacity-50"
            >
              {loading ? "Traitement de votre demande..." : "Envoyer la demande de devis traiteur"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
