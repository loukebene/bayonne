import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get("category");
    const query = searchParams.get("query");

    const where: any = {};
    if (categorySlug && categorySlug !== "all") {
      where.category = { slug: categorySlug };
    }
    if (query) {
      where.OR = [
        { name: { contains: query } },
        { description: { contains: query } },
      ];
    }

    const dishes = await prisma.dish.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(dishes);
  } catch (error) {
    return NextResponse.json(
      { error: "Impossible de récupérer les plats." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      slug,
      description,
      price,
      isVariablePrice,
      priceNote,
      imageUrl,
      isAvailable,
      isPopular,
      categoryId,
    } = body;

    const dish = await prisma.dish.create({
      data: {
        name,
        slug: slug || name.toLowerCase().replace(/[^a-z0-0]/g, "-"),
        description,
        price: Number(price),
        isVariablePrice: Boolean(isVariablePrice),
        priceNote,
        imageUrl: imageUrl || "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80",
        isAvailable: isAvailable !== undefined ? Boolean(isAvailable) : true,
        isPopular: Boolean(isPopular),
        categoryId,
      },
    });

    return NextResponse.json(dish);
  } catch (error) {
    return NextResponse.json(
      { error: "Impossible de créer le plat." },
      { status: 500 }
    );
  }
}
