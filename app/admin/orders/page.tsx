import React from "react";
import { AdminHeader } from "@/components/AdminHeader";
import { prisma } from "@/lib/prisma";
import { AdminOrdersClient } from "./AdminOrdersClient";

export const revalidate = 0;

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="pb-16 min-h-screen">
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Suivi des Commandes</h2>
          <p className="text-xs text-gray-400">
            Gérez le flux de préparation (Nouvelle ➔ Confirmée ➔ En préparation ➔ Prête ➔ Livrée).
          </p>
        </div>

        <AdminOrdersClient initialOrders={JSON.parse(JSON.stringify(orders))} />
      </div>
    </div>
  );
}
