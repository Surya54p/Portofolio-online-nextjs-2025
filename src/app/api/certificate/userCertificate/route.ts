import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const dataCertificate = await prisma.certificates.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return NextResponse.json(dataCertificate);
}
