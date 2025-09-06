// /api/laporkanMasalah/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const oneData = await prisma.ticketLaporanMasalah.findUnique({
        where: { id: Number(id) },
      });
      return NextResponse.json(oneData);
    }

    const allData = await prisma.ticketLaporanMasalah.findMany();
    return NextResponse.json(allData);
  } catch (err) {
    console.error("❌ error fetch data:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
