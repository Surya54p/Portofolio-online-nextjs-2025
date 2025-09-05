import {  PrismaClient } from "@prisma/client";

import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export async function SeedSomeTools() {
  const filePath = path.resolve(__dirname, "../dataSeed/someTools.json");

  if (!fs.existsSync(filePath)) {
    console.warn("⚠️ someTools.json not found. Skipping some tools seed.");
    return;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const someToolsSeed = JSON.parse(fileContent);

  for (const tools of someToolsSeed) {
    await prisma.someTools.upsert({
      where: { id: tools.id },
      update: {
        img: tools.img,
        name: tools.name,
        techStack: tools.techStack,
        description: tools.description,
        link: tools.link,
      },
      create: {
        img: tools.img,
        name: tools.name,
        techStack: tools.techStack,
        description: tools.description,
        link: tools.link,
      },
    });
  }

  console.log("✅ Some tools seed selesai");
}
