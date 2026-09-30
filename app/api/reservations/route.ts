import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const reservations = await prisma.reservation.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(reservations);
  } catch (error) {
    return NextResponse.json(
      { error: "Impossible de récupérer les réservations." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, customerPhone, date, timeSlot, guestCount, comment } = body;

    const randomNum = Math.floor(100 + Math.random() * 900);
    const resNumber = `RES-${randomNum}`;

    const reservation = await prisma.reservation.create({
      data: {
        resNumber,
        customerName,
        customerPhone,
        date,
        timeSlot,
        guestCount: Number(guestCount),
        comment,
        status: "EN_ATTENTE",
      },
    });

    return NextResponse.json(reservation);
  } catch (error) {
    return NextResponse.json(
      { error: "Impossible de créer la réservation." },
      { status: 500 }
    );
  }
}
