import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export async function seedProduct() {
  const filePath = path.resolve(__dirname, "../dataSeed/product.json");

  if (!fs.existsSync(filePath)) {
    console.warn("⚠️ product.json not found. Skipping product seed.");
    return;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const products = JSON.parse(fileContent);

  for (const product of products) {
    await prisma.product.upsert({
      where: { name: product.name }, // cek kalau sudah ada produk dengan nama yang sama
      update: {}, // kalau ada, tidak diupdate
      create: {
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
      },
    });
  }

  console.log("✅ Product seed selesai");
}
