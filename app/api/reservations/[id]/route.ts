import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json();
    const reservation = await prisma.reservation.update({
      where: { id: params.id },
      data: { status },
    });
    return NextResponse.json(reservation);
  } catch (error) {
    return NextResponse.json(
      { error: "Impossible de mettre à jour la réservation." },
      { status: 500 }
    );
  }
}
