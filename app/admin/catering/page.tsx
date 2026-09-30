import React from "react";
import { AdminHeader } from "@/components/AdminHeader";
import { prisma } from "@/lib/prisma";
import { AdminCateringClient } from "./AdminCateringClient";

export const revalidate = 0;

export default async function AdminCateringPage() {
  const quotes = await prisma.cateringQuote.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="pb-16 min-h-screen">
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Demandes de Devis Traiteur</h2>
          <p className="text-xs text-gray-400">
            Suivez les demandes de réceptions, mariages et événements d&apos;entreprise.
          </p>
        </div>

        <AdminCateringClient initialQuotes={JSON.parse(JSON.stringify(quotes))} />
      </div>
    </div>
  );
}
