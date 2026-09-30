import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const quotes = await prisma.cateringQuote.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(quotes);
  } catch (error) {
    return NextResponse.json(
      { error: "Impossible de récupérer les devis traiteur." },
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
      eventType,
      eventDate,
      guestCount,
      estimatedBudget,
      message,
    } = body;

    const randomNum = Math.floor(100 + Math.random() * 900);
    const quoteNumber = `DEV-${randomNum}`;

    const quote = await prisma.cateringQuote.create({
      data: {
        quoteNumber,
        customerName,
        customerPhone,
        eventType,
        eventDate,
        guestCount: Number(guestCount),
        estimatedBudget: Number(estimatedBudget || 0),
        message,
        status: "NOUVEAU",
      },
    });

    return NextResponse.json(quote);
  } catch (error) {
    return NextResponse.json(
      { error: "Impossible de soumettre la demande de devis." },
      { status: 500 }
    );
  }
}
