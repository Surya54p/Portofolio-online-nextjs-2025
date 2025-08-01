import { PrismaClient } from "@prisma/client";
import likeSeed from "../dataSeed/likes.json";

const prisma = new PrismaClient();

export async function seedLike() {
  for (const like of likeSeed) {
    await prisma.like.upsert({
      where: { id: like.id },
      update: {},
      create: {
        id: like.id,
        nama: like.nama,
        createdAt: new Date(like.createdAt),
      },
    });
  }

  console.log("✅ Like seed selesai");
}
