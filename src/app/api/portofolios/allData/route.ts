export const runtime = "nodejs";

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const semuaDataTabel = await prisma.portofolios.findMany();
  // console.log(semuaDataTabel);
  return NextResponse.json(semuaDataTabel);
}
