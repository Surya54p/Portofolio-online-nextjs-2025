import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export async function seedPortfolioCategory() {
  const filePath = path.resolve(__dirname, "../dataSeed/portofoliosChategory.json");

  if (!fs.existsSync(filePath)) {
    console.warn("⚠️ portofoliosChategory.json not found. Skipping portofolio category seed.");
    return;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const categorySeed = JSON.parse(fileContent);

  for (const item of categorySeed) {
    await prisma.portofolioCategory.upsert({
      where: { id: item.id },
      update: {
        name: item.name,
        description: item.description,
        order: item.order,
      },
      create: {
        id: item.id,
        name: item.name,
        description: item.description,
        order: item.order,
      },
    });
  }

  console.log("✅ Portofolio categories seeded successfully!");
}
