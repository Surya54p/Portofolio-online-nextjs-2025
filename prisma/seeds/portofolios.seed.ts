import { Prisma, PrismaClient } from "@prisma/client";
// import portofolioSeed from "../dataSeed/portofolios.json";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export async function seedPortofolios() {
  
  const filePath = path.resolve(__dirname, "../dataSeed/portofolios.json");
  
    if (!fs.existsSync(filePath)) {
      console.warn("⚠️ portofolios.json not found. Skipping portofolios seed.");
      return;
    }
  
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const portofolioSeed = JSON.parse(fileContent);
  
  for (const item of portofolioSeed) {
  await prisma.portofolios.upsert({
    where: { id: item.id },
    update: {
      src: item.src,
      title: item.title,
      stack: item.stack,
      summary: item.summary,
      categoryId: item.categoryId, // ✅ ini yang benar
      // createdAt: new Date(item.createdAt),
    },
    create: {
      src: item.src,
      id: item.id,
      title: item.title,
      stack: item.stack,
      summary: item.summary,
      categoryId: item.categoryId, // ✅ ini yang benar
      // createdAt: new Date(item.createdAt),
    },
  });
}

  console.log("✅ Portofolios seed selesai");
}