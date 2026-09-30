import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const dish = await prisma.dish.update({
      where: { id: params.id },
      data: {
        name: body.name,
        description: body.description,
        price: Number(body.price),
        isVariablePrice: Boolean(body.isVariablePrice),
        priceNote: body.priceNote,
        imageUrl: body.imageUrl,
        isAvailable: Boolean(body.isAvailable),
        isPopular: Boolean(body.isPopular),
        categoryId: body.categoryId,
      },
    });
    return NextResponse.json(dish);
  } catch (error) {
    return NextResponse.json(
      { error: "Impossible de mettre à jour le plat." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.dish.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Impossible de supprimer le plat." },
      { status: 500 }
    );
  }
}
