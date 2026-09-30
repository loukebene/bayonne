import React from "react";
import { AdminHeader } from "@/components/AdminHeader";
import { prisma } from "@/lib/prisma";
import { AdminReservationsClient } from "./AdminReservationsClient";

export const revalidate = 0;

export default async function AdminReservationsPage() {
  const reservations = await prisma.reservation.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="pb-16 min-h-screen">
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Gestion des Réservations</h2>
          <p className="text-xs text-gray-400">
            Consultez les demandes de tables et envoyez une confirmation instantanée.
          </p>
        </div>

        <AdminReservationsClient
          initialReservations={JSON.parse(JSON.stringify(reservations))}
        />
      </div>
    </div>
  );
}
