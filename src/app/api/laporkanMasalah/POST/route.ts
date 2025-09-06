import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { TicketType } from "@prisma/client";
const prisma = new PrismaClient();

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
