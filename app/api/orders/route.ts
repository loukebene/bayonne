import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const where: any = {};
    if (status && status !== "ALL") {
      where.status = status;
    }

    const orders = await prisma.order.findMany({
      where,
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: "Impossible de récupérer les commandes." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerPhone,
      deliveryType,
      address,
      notes,
      subtotal,
      deliveryFee,
      total,
      items,
    } = body;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `JB-${randomSuffix}`;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName,
        customerPhone,
        deliveryType,
        address,
        notes,
        subtotal: Number(subtotal),
        deliveryFee: Number(deliveryFee),
        total: Number(total),
        status: "NOUVELLE",
        items: {
          create: items.map((item: any) => ({
            dishId: item.dishId,
            dishName: item.dishName,
            unitPrice: Number(item.unitPrice),
            quantity: Number(item.quantity),
            totalPrice: Number(item.totalPrice),
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Order creation error", error);
    return NextResponse.json(
      { error: "Impossible de créer la commande." },
      { status: 500 }
    );
  }
}
