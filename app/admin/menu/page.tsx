import React from "react";
import { AdminHeader } from "@/components/AdminHeader";
import { prisma } from "@/lib/prisma";
import { AdminMenuClient } from "./AdminMenuClient";

export const revalidate = 0;

export default async function AdminMenuPage() {
  const categories = await prisma.category.findMany({
    orderBy: { orderIndex: "asc" },
  });

  const dishes = await prisma.dish.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="pb-16 min-h-screen">
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-white">Gestion du Menu & Prix</h2>
            <p className="text-xs text-gray-400">
              Modifiez les prix FCFA, gérez les ruptures de stock et ajoutez de nouveaux plats.
            </p>
          </div>
        </div>

        <AdminMenuClient categories={categories} initialDishes={dishes} />
      </div>
    </div>
  );
}
