import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
// import { desc } from "drizzle-orm";

const prisma = new PrismaClient();

export async function GET() {
  const data = await prisma.portofolios.findMany({
    orderBy: { createdAt: "desc" },
  })
  return NextResponse.json(data);
}
