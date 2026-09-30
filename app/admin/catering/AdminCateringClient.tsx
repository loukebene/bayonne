"use client";

import React, { useState } from "react";
import { Award, Calendar, Users, DollarSign, Phone, MessageCircle, MessageSquare } from "lucide-react";

interface CateringQuote {
  id: string;
  quoteNumber: string;
  customerName: string;
  customerPhone: string;
  eventType: string;
  eventDate: string;
  guestCount: number;
  estimatedBudget: number;
  message?: string | null;
  status: string;
  createdAt: string;
}

interface AdminCateringClientProps {
  initialQuotes: CateringQuote[];
}

export const AdminCateringClient: React.FC<AdminCateringClientProps> = ({ initialQuotes }) => {
  const [quotes, setQuotes] = useState<CateringQuote[]>(initialQuotes);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setQuotes((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q))
    );

    await fetch(`/api/catering/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
  };

  const getWhatsAppContactUrl = (q: CateringQuote) => {
    const text = `Bonjour ${q.customerName}, nous avons bien reçu votre demande de devis traiteur *#${q.quoteNumber}* pour votre événement *${q.eventType}* du *${q.eventDate}* (${q.guestCount} invités). Je me permets de vous contacter pour établir votre proposition personnalisée.`;
    return `https://wa.me/${q.customerPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="space-y-4">
      {quotes.length === 0 ? (
        <div className="p-12 bg-jardin-surface rounded-3xl border border-jardin-border text-center space-y-2">
          <Award className="w-10 h-10 text-gray-500 mx-auto" />
          <p className="text-white font-bold">Aucune demande de devis traiteur</p>
        </div>
      ) : (
        quotes.map((q) => (
          <div
            key={q.id}
            className="bg-jardin-surface border border-jardin-border p-6 rounded-3xl space-y-4 shadow-xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-jardin-border/40 pb-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-xl bg-jardin-dark text-jardin-orange font-mono font-bold text-sm border border-jardin-border">
                  #{q.quoteNumber}
                </span>
                <div>
                  <h3 className="text-base font-bold text-white">{q.customerName}</h3>
                  <p className="text-xs text-gray-400">
                    Tél : <span className="text-jardin-orange font-semibold">{q.customerPhone}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={q.status}
                  onChange={(e) => handleStatusChange(q.id, e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-jardin-dark border border-jardin-border text-white text-xs font-bold focus:outline-none focus:border-jardin-orange transition"
                >
                  <option value="NOUVEAU">Nouveau</option>
                  <option value="CONTACTE">Contacté</option>
                  <option value="DEVIS_ENVOYE">Devis envoyé</option>
                  <option value="VALIDE">Validé</option>
                </select>

                <a
                  href={getWhatsAppContactUrl(q)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">Contacter WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs text-gray-300">
              <div>
                <span className="text-gray-400 block">Type d&apos;événement</span>
                <strong className="text-white text-sm">{q.eventType}</strong>
              </div>

              <div>
                <span className="text-gray-400 block">Date de la réception</span>
                <strong className="text-white">{q.eventDate}</strong>
              </div>

              <div>
                <span className="text-gray-400 block">Nombre de convives</span>
                <strong className="text-jardin-orange">{q.guestCount} personnes</strong>
              </div>

              <div>
                <span className="text-gray-400 block">Budget estimatif</span>
                <strong className="text-emerald-400">
                  {q.estimatedBudget ? `${q.estimatedBudget.toLocaleString("fr-FR")} FCFA` : "Non précisé"}
                </strong>
              </div>
            </div>

            {q.message && (
              <div className="p-3 bg-jardin-dark/80 rounded-xl border border-jardin-border/40 text-xs text-gray-300">
                <span className="font-bold text-white block mb-1">Détails de la demande :</span>
                <p className="italic leading-relaxed">{q.message}</p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};
