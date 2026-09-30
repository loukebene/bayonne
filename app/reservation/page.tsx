"use client";

import React, { useState } from "react";
import { Calendar as CalendarIcon, Clock, Users, Phone, User, MessageSquare, CheckCircle2, MessageCircle, UtensilsCrossed } from "lucide-react";

export default function ReservationPage() {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("+242 ");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("19:30");
  const [guestCount, setGuestCount] = useState(2);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [createdReservation, setCreatedReservation] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setError("Veuillez remplir votre nom complet.");
      return;
    }
    if (!customerPhone.trim() || customerPhone.trim() === "+242") {
      setError("Veuillez saisir un numéro de téléphone valide à Pointe-Noire.");
      return;
    }
    if (!date) {
      setError("Veuillez sélectionner la date de votre réservation.");
      return;
    }

    setError("");
    setCreatedReservation({
      resNumber: `RES-${Date.now().toString().slice(-6)}`,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      date,
      timeSlot,
      guestCount,
      comment: comment.trim(),
    });
  };

  const getWhatsAppUrl = () => {
    if (!createdReservation) return "#";
    const msg = `*RÉSERVATION DE TABLE LE JARDIN DE BAYONNE* 🍷
*Réf:* #${createdReservation.resNumber}
*Nom:* ${createdReservation.customerName}
*Tél:* ${createdReservation.customerPhone}
*Date:* ${createdReservation.date} à ${createdReservation.timeSlot}
*Nombre de personnes:* ${createdReservation.guestCount} convives
${createdReservation.comment ? `*Commentaire:* ${createdReservation.comment}` : ""}

_Merci de confirmer notre table !_`;

    return `https://wa.me/242055245386?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-jardin-orange/20 text-jardin-orange text-xs font-bold border border-jardin-orange/40">
          Réservation en Ligne
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Réserver une Table
        </h1>
        <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Assurez-vous d&apos;avoir la meilleure table au Jardin de Bayonne (Songolo, Pointe-Noire) pour un repas convivial en famille, entre amis ou d&apos;affaires.
        </p>
      </div>

      {createdReservation ? (
        <div className="bg-jardin-surface border border-jardin-border p-8 rounded-3xl text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">
              Votre demande est prête
            </h2>
            <p className="text-sm text-gray-300">
                Référence : <span className="font-mono font-bold text-jardin-orange">#{createdReservation.resNumber}</span> · Confirmez sur WhatsApp.
            </p>
          </div>

          <div className="bg-jardin-dark p-6 rounded-2xl border border-jardin-border text-left max-w-md mx-auto space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between border-b border-jardin-border/40 pb-2">
              <span className="text-gray-400">Nom du client</span>
              <span className="font-bold text-white">{createdReservation.customerName}</span>
            </div>
            <div className="flex justify-between border-b border-jardin-border/40 pb-2">
              <span className="text-gray-400">Date & Heure</span>
              <span className="font-bold text-white">
                {createdReservation.date} à {createdReservation.timeSlot}
              </span>
            </div>
            <div className="flex justify-between border-b border-jardin-border/40 pb-2">
              <span className="text-gray-400">Nombre de personnes</span>
              <span className="font-bold text-jardin-orange">
                {createdReservation.guestCount} personnes
              </span>
            </div>
            {createdReservation.comment && (
              <div className="flex justify-between pt-1">
                <span className="text-gray-400">Remarque</span>
                <span className="text-gray-300 italic">{createdReservation.comment}</span>
              </div>
            )}
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Confirmer sur WhatsApp (+242 05 524 53 86)</span>
            </a>

            <button
              onClick={() => setCreatedReservation(null)}
              className="py-3.5 px-6 rounded-xl bg-jardin-card hover:bg-jardin-border text-gray-300 hover:text-white font-semibold text-xs border border-jardin-border transition"
            >
              Faire une autre réservation
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-jardin-surface border border-jardin-border p-6 sm:p-10 rounded-3xl shadow-2xl space-y-6"
        >
          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Nom complet *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="Ex: Alain Ngoulou"
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
                Date de réservation *
              </label>
              <div className="relative">
                <CalendarIcon className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-jardin-dark border border-jardin-border text-white text-sm focus:outline-none focus:border-jardin-orange transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Heure d&apos;arrivée *
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-jardin-dark border border-jardin-border text-white text-sm focus:outline-none focus:border-jardin-orange transition"
                >
                  <option value="12:00">12:00 (Déjeuner)</option>
                  <option value="12:30">12:30</option>
                  <option value="13:00">13:00</option>
                  <option value="13:30">13:30</option>
                  <option value="19:00">19:00 (Dîner)</option>
                  <option value="19:30">19:30</option>
                  <option value="20:00">20:00</option>
                  <option value="20:30">20:30</option>
                  <option value="21:00">21:00</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Nombre de personnes *
              </label>
              <div className="relative">
                <Users className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-jardin-dark border border-jardin-border text-white text-sm focus:outline-none focus:border-jardin-orange transition"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map((num) => (
                    <option key={num} value={num}>
                      {num} {num > 1 ? "personnes" : "personne"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Commentaire / Emplacement désiré
              </label>
              <div className="relative">
                <MessageSquare className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Ex: Terrasse, calme, anniversaire..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-jardin-dark border border-jardin-border text-white text-sm focus:outline-none focus:border-jardin-orange transition"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-jardin-orange to-amber-600 hover:from-jardin-orange-hover hover:to-amber-500 text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-xl shadow-jardin-orange/30 transition disabled:opacity-50"
          >
            Préparer la demande de réservation
          </button>
        </form>
      )}
    </div>
  );
}
