import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json();
    const quote = await prisma.cateringQuote.update({
      where: { id: params.id },
      data: { status },
    });
    return NextResponse.json(quote);
  } catch (error) {
    return NextResponse.json(
      { error: "Impossible de mettre à jour le devis traiteur." },
      { status: 500 }
    );
  }
}
