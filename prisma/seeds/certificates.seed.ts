import { Prisma, PrismaClient } from "@prisma/client";
// import portofolioSeed from "../dataSeed/portofolios.json";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export async function SeedCertificates() {
  const filePath = path.resolve(__dirname, "../dataSeed/certificates.json");

  if (!fs.existsSync(filePath)) {
    console.warn("⚠️ certificates.json not found. Skipping certificates seed.");
    return;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const certificatesSeed = JSON.parse(fileContent);

  for (const item of certificatesSeed) {
    await prisma.certificates.upsert({
      where: { id: item.id },
      update: {
        src: item.src,
        title: item.title,
        summary: item.summary,
        category: item.category,
      },
      create: {
        src: item.src,
        title: item.title,
        summary: item.summary,
        category: item.category,
      },
    });
  }

  console.log("✅ Certificates seed selesai");
}
