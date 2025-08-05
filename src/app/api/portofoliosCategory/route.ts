import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const dataPortofolioCategory = await prisma.portofolioCategory.findMany({
  });
      // console.log("🧠 Data dari database:", dataPortofolioCategory);

  return NextResponse.json(dataPortofolioCategory);
}
