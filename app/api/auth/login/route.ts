import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const admin = await prisma.adminUser.findUnique({
      where: { email },
    });

    if (!admin) {
      return NextResponse.json(
        { error: "Identifiants d'administration incorrects." },
        { status: 401 }
      );
    }

    if (admin.passwordHash !== password) {
      return NextResponse.json(
        { error: "Mot de passe incorrect." },
        { status: 401 }
      );
    }

    // Set simple session cookie
    const response = NextResponse.json({
      success: true,
      user: { email: admin.email, name: admin.name, role: admin.role },
    });

    response.cookies.set({
      name: "jardin_admin_token",
      value: "authenticated_admin_session",
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la connexion." },
      { status: 500 }
    );
  }
}
