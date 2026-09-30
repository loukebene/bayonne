import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: { items: true },
    });

    const totalOrdersCount = orders.length;
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

    const pendingOrdersCount = orders.filter(
      (o) => o.status === "NOUVELLE" || o.status === "EN_PREPARATION"
    ).length;

    const reservationsCount = await prisma.reservation.count();
    const cateringQuotesCount = await prisma.cateringQuote.count();

    // Dish popularity breakdown
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

    // Orders by Delivery Type
    const ordersByType = {
      SUR_PLACE: orders.filter((o) => o.deliveryType === "SUR_PLACE").length,
      EMPORTER: orders.filter((o) => o.deliveryType === "EMPORTER").length,
      LIVRAISON: orders.filter((o) => o.deliveryType === "LIVRAISON").length,
    };

    // Revenue Trend mock / actual data grouped by date
    const revenueData = [
      { day: "Lun", total: 120000 },
      { day: "Mar", total: 185000 },
      { day: "Mer", total: 140000 },
      { day: "Jeu", total: 210000 },
      { day: "Ven", total: 340000 },
      { day: "Sam", total: 490000 },
      { day: "Dim", total: 410000 },
    ];

    return NextResponse.json({
      totalRevenue,
      totalOrdersCount,
      pendingOrdersCount,
      reservationsCount,
      cateringQuotesCount,
      popularDishes,
      ordersByType,
      revenueData,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Impossible de générer les statistiques." },
      { status: 500 }
    );
  }
}
