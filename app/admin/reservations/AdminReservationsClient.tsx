"use client";

import React, { useState } from "react";
import { Calendar, Users, Phone, MessageSquare, CheckCircle2, MessageCircle } from "lucide-react";

interface Reservation {
  id: string;
  resNumber: string;
  customerName: string;
  customerPhone: string;
  date: string;
  timeSlot: string;
  guestCount: number;
  comment?: string | null;
  status: string;
  createdAt: string;
}

interface AdminReservationsClientProps {
  initialReservations: Reservation[];
}

export const AdminReservationsClient: React.FC<AdminReservationsClientProps> = ({
  initialReservations,
}) => {
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );

    await fetch(`/api/reservations/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
  };

  const getWhatsAppConfirmUrl = (res: Reservation) => {
    const text = `Bonjour ${res.customerName}, nous vous confirmons votre réservation de table *#${res.resNumber}* pour *${res.guestCount} convives* le *${res.date}* à *${res.timeSlot}* au Jardin de Bayonne (Songolo). À très bientôt !`;
    return `https://wa.me/${res.customerPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="space-y-4">
      {reservations.length === 0 ? (
        <div className="p-12 bg-jardin-surface rounded-3xl border border-jardin-border text-center space-y-2">
          <Calendar className="w-10 h-10 text-gray-500 mx-auto" />
          <p className="text-white font-bold">Aucune réservation pour le moment</p>
        </div>
      ) : (
        reservations.map((res) => (
          <div
            key={res.id}
            className="bg-jardin-surface border border-jardin-border p-6 rounded-3xl space-y-4 shadow-xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-jardin-border/40 pb-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-xl bg-jardin-dark text-jardin-orange font-mono font-bold text-sm border border-jardin-border">
                  #{res.resNumber}
                </span>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {res.customerName}
                  </h3>
                  <p className="text-xs text-gray-400">
                    Tél : <span className="text-jardin-orange font-semibold">{res.customerPhone}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={res.status}
                  onChange={(e) => handleStatusChange(res.id, e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-jardin-dark border border-jardin-border text-white text-xs font-bold focus:outline-none focus:border-jardin-orange transition"
                >
                  <option value="EN_ATTENTE">En attente</option>
                  <option value="CONFIRMEE">Confirmée</option>
                  <option value="ANNULEE">Annulée</option>
                </select>

                <a
                  href={getWhatsAppConfirmUrl(res)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">Confirmer WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-jardin-orange shrink-0" />
                <span>
                  Date : <strong className="text-white">{res.date}</strong> à{" "}
                  <strong className="text-white">{res.timeSlot}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-jardin-orange shrink-0" />
                <span>
                  Convives : <strong className="text-jardin-orange">{res.guestCount} personnes</strong>
                </span>
              </div>

              {res.comment && (
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="italic">{res.comment}</span>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};
