import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
// import { promises } from "dns";
const prisma = new PrismaClient();

export async function GET() {
  const categories = await prisma.portofolioCategory.findMany({
    select: { id: true, name: true }, // ambil ID & nama aja
  });

  const result = await Promise.all(
    categories.map(async (cat) => {
      const portos = await prisma.portofolios.findMany({
        where: { categoryId: cat.id },
        include: { category: true },
        orderBy: { createdAt: "desc" },
        take: 6,
      });
      return portos;
    })
  );
  const finalData = result.flat();
  return NextResponse.json(finalData);
}
