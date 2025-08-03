import { Prisma, PrismaClient } from "@prisma/client";
// import viewersSeed from "../dataSeed/viewers.json";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export async function seedViewers() {
  const filePath = path.resolve(__dirname, "../../dataSeed/viewers.json");

  if (!fs.existsSync(filePath)) {
    console.warn("⚠️ portofolios.json not found. Skipping admin seed.");
    return;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const viewersSeed = JSON.parse(fileContent);

  for (const view of viewersSeed) {
    await prisma.viewers.upsert({
      where: { id: view.id },
      update: {},
      create: {
        id: view.id,
        device: view.device,
        createdAt: new Date(view.createdAt),
      },
    });
  }
  console.log("✅ Views seed selesai");
}
