// /api/laporkanMasalah/[id]/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const updated = await prisma.ticketLaporanMasalah.update({
      where: { id: Number(params.id) },
      data: {
        username: body.username,
        email: body.email,
        noTelp: body.noTelp,
        title: body.title,
        status: body.status,
        type: body.type,
        message: body.message,
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("❌ error update:", err);
    return NextResponse.json({ error: "Gagal update" }, { status: 500 });
  }
}
