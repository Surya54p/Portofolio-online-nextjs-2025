import { Prisma, PrismaClient } from "@prisma/client";
import portofolioSeed from "../dataSeed/portofolios.json";

const prisma = new PrismaClient();

export async function seedPortofolios() {
  for (const item of portofolioSeed) {
    await prisma.portofolios.upsert({
      where: { id: item.id },
      update: {},
      create: {
        id: item.id,
        title: item.title,
        summary: item.summary,
        category: item.category,
        createdAt: new Date(item.createdAt),
      },
    });
  }
  console.log("✅ Portofolios seed selesai");
}
