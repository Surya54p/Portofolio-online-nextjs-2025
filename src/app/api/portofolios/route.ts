import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET() {
  const data = await prisma.portofolios.findMany({
    include: {
      category: true,
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(data);
}
