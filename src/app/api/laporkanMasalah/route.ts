// /api/laporkanMasalah/route.ts
import { NextResponse } from "next/server";
import { TicketType } from "@prisma/client";
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

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!["bug", "product"].includes(data.type)) {
      return NextResponse.json(
        {
          success: false,
          error: "Type harus 'bug' atau 'product'",
        },
        { status: 400 }
      );
    }
    const simpanData = await prisma.ticketLaporanMasalah.create({
      data: {
        username: data.username,
        title: data.title,
        email: data.email,
        noTelp: data.noTelp,
        status: "pending",
        type: data.type as TicketType,
        message: data.message,
      },
    });
    return NextResponse.json({ success: true, data: simpanData });
  } catch (err) {
    console.log("❌ error submit data ke database: ", err);
  }
}
