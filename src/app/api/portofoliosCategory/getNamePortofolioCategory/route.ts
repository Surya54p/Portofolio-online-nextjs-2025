import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    const getDataName = await prisma.portofolioCategory.findMany();
    // console.log(getDataName);
  return NextResponse.json(getDataName);
}
