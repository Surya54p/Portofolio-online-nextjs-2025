import { Prisma, PrismaClient } from "@prisma/client";
import viewersSeed from "../dataSeed/viewers.json";

const prisma = new PrismaClient();

export async function seedViewers() {
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
