import React from "react";
import { AdminHeader } from "@/components/AdminHeader";
import { prisma } from "@/lib/prisma";
import { DollarSign, ShoppingBag, Calendar, Award, TrendingUp, Star, Truck, Store, Utensils, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter(
    (o) => o.status === "NOUVELLE" || o.status === "EN_PREPARATION"
  ).length;

  const totalReservations = await prisma.reservation.count();
  const totalCateringQuotes = await prisma.cateringQuote.count();

  // Dishes ranking
  const dishSales: Record<string, { name: string; count: number; revenue: number }> = {};
  orders.forEach((order) => {
    order.items.forEach((item) => {
      if (!dishSales[item.dishName]) {
        dishSales[item.dishName] = { name: item.dishName, count: 0, revenue: 0 };
      }
      dishSales[item.dishName].count += item.quantity;
      dishSales[item.dishName].revenue += item.totalPrice;
    });
  });

  const popularDishes = Object.values(dishSales)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const deliveryTypeCounts = {
    SUR_PLACE: orders.filter((o) => o.deliveryType === "SUR_PLACE").length,
    EMPORTER: orders.filter((o) => o.deliveryType === "EMPORTER").length,
    LIVRAISON: orders.filter((o) => o.deliveryType === "LIVRAISON").length,
  };

  return (
    <div className="pb-16 min-h-screen">
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-5 rounded-2xl bg-jardin-surface border border-jardin-border space-y-2">
            <div className="flex items-center justify-between text-gray-400">
              <span className="text-xs font-semibold uppercase">Chiffre d&apos;affaires</span>
              <DollarSign className="w-5 h-5 text-jardin-orange" />
            </div>
            <p className="text-xl sm:text-2xl font-extrabold text-white">
              {totalRevenue.toLocaleString("fr-FR")} FCFA
            </p>
            <span className="text-[11px] text-emerald-400 font-medium">Ventes cumulées</span>
          </div>

          <div className="p-5 rounded-2xl bg-jardin-surface border border-jardin-border space-y-2">
            <div className="flex items-center justify-between text-gray-400">
              <span className="text-xs font-semibold uppercase">Commandes Totales</span>
              <ShoppingBag className="w-5 h-5 text-jardin-orange" />
            </div>
            <p className="text-2xl font-extrabold text-white">{totalOrdersCount}</p>
            <span className="text-[11px] text-gray-400 font-medium">Toutes périodes</span>
          </div>

          <div className="p-5 rounded-2xl bg-jardin-surface border border-jardin-border space-y-2">
            <div className="flex items-center justify-between text-gray-400">
              <span className="text-xs font-semibold uppercase">En préparation</span>
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-2xl font-extrabold text-amber-400">{pendingOrdersCount}</p>
            <span className="text-[11px] text-amber-300 font-medium">À traiter d&apos;urgence</span>
          </div>

          <div className="p-5 rounded-2xl bg-jardin-surface border border-jardin-border space-y-2">
            <div className="flex items-center justify-between text-gray-400">
              <span className="text-xs font-semibold uppercase">Réservations</span>
              <Calendar className="w-5 h-5 text-jardin-orange" />
            </div>
            <p className="text-2xl font-extrabold text-white">{totalReservations}</p>
            <span className="text-[11px] text-gray-400 font-medium">Tables réservées</span>
          </div>

          <div className="p-5 rounded-2xl bg-jardin-surface border border-jardin-border space-y-2">
            <div className="flex items-center justify-between text-gray-400">
              <span className="text-xs font-semibold uppercase">Devis Traiteur</span>
              <Award className="w-5 h-5 text-jardin-orange" />
            </div>
            <p className="text-2xl font-extrabold text-white">{totalCateringQuotes}</p>
            <span className="text-[11px] text-gray-400 font-medium">Demandes réceptions</span>
          </div>
        </div>

        {/* Charts & Breakdown Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue Evolution Chart */}
          <div className="lg:col-span-2 bg-jardin-surface border border-jardin-border p-6 rounded-3xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-jardin-orange" />
                  Évolution des Ventes Hebdomadaires (FCFA)
                </h3>
                <p className="text-xs text-gray-400">Aperçu du chiffre d&apos;affaires généré par jour</p>
              </div>
            </div>

            {/* Custom Bar Chart Visualizer */}
            <div className="h-56 flex items-end justify-between gap-3 pt-8 pb-2 px-4 border-b border-jardin-border/40">
              {[
                { day: "Lun", amount: 140000, height: "40%" },
                { day: "Mar", amount: 185000, height: "55%" },
                { day: "Mer", amount: 160000, height: "48%" },
                { day: "Jeu", amount: 220000, height: "65%" },
                { day: "Ven", amount: 380000, height: "90%" },
                { day: "Sam", amount: 450000, height: "100%" },
                { day: "Dim", amount: 390000, height: "92%" },
              ].map((item, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition font-mono">
                    {(item.amount / 1000).toFixed(0)}k
                  </span>
                  <div
                    style={{ height: item.height }}
                    className="w-full rounded-t-lg bg-gradient-to-t from-jardin-orange to-amber-500 group-hover:brightness-125 transition"
                  />
                  <span className="text-xs font-bold text-gray-300">{item.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Breakdown by Delivery Type */}
          <div className="bg-jardin-surface border border-jardin-border p-6 rounded-3xl space-y-6">
            <h3 className="text-lg font-bold text-white">Répartition par Type</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-jardin-dark border border-jardin-border/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-jardin-orange/20 text-jardin-orange flex items-center justify-center">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Livraison</p>
                    <p className="text-xs text-gray-400">À domicile Pointe-Noire</p>
                  </div>
                </div>
                <span className="text-lg font-extrabold text-jardin-orange">
                  {deliveryTypeCounts.LIVRAISON}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-jardin-dark border border-jardin-border/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-jardin-orange/20 text-jardin-orange flex items-center justify-center">
                    <Store className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">À emporter</p>
                    <p className="text-xs text-gray-400">Retrait au restaurant</p>
                  </div>
                </div>
                <span className="text-lg font-extrabold text-jardin-orange">
                  {deliveryTypeCounts.EMPORTER}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-jardin-dark border border-jardin-border/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-jardin-orange/20 text-jardin-orange flex items-center justify-center">
                    <Utensils className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Sur place</p>
                    <p className="text-xs text-gray-400">Service en salle</p>
                  </div>
                </div>
                <span className="text-lg font-extrabold text-jardin-orange">
                  {deliveryTypeCounts.SUR_PLACE}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Selling Dishes Table & Recent Orders Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Dishes */}
          <div className="bg-jardin-surface border border-jardin-border p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400" />
                Top 5 des Plats les plus Vendus
              </h3>
              <Link href="/admin/menu" className="text-xs text-jardin-orange font-semibold hover:underline">
                Gérer le menu
              </Link>
            </div>

            <div className="space-y-2">
              {popularDishes.map((dish, index) => (
                <div
                  key={index}
                  className="p-3.5 rounded-xl bg-jardin-dark border border-jardin-border/50 flex items-center justify-between text-xs sm:text-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-jardin-orange/20 text-jardin-orange text-xs font-bold flex items-center justify-center">
                      #{index + 1}
                    </span>
                    <span className="font-semibold text-white">{dish.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="block font-bold text-jardin-orange">
                      {dish.count} commandés
                    </span>
                    <span className="block text-[10px] text-gray-400">
                      {dish.revenue.toLocaleString("fr-FR")} FCFA
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders Quick Feed */}
          <div className="bg-jardin-surface border border-jardin-border p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-jardin-orange" />
                Dernières Commandes
              </h3>
              <Link href="/admin/orders" className="text-xs text-jardin-orange font-semibold hover:underline flex items-center gap-1">
                <span>Voir toutes les commandes</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-2.5">
              {orders.slice(0, 4).map((order) => (
                <div
                  key={order.id}
                  className="p-3.5 rounded-xl bg-jardin-dark border border-jardin-border/50 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-mono font-bold text-jardin-orange">
                      #{order.orderNumber}
                    </span>
                    <span className="text-white font-semibold ml-2">
                      {order.customerName}
                    </span>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      {order.deliveryType} • {order.items.length} articles
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="block font-extrabold text-white">
                      {order.total.toLocaleString("fr-FR")} FCFA
                    </span>
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold mt-0.5 ${
                        order.status === "NOUVELLE"
                          ? "bg-amber-500/20 text-amber-400"
                          : "bg-emerald-500/20 text-emerald-400"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
