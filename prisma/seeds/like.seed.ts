import { PrismaClient } from "@prisma/client";
// import likeSeed from "../dataSeed/likes.json";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export async function seedLike() {
  const filePath = path.resolve(__dirname, "../dataSeed/likes.json");

  if (!fs.existsSync(filePath)) {
    console.warn("⚠️ likes.json not found. Skipping admin seed.");
    return;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const likeSeed = JSON.parse(fileContent);

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
