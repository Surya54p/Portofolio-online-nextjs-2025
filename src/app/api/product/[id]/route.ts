import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  // ambil id dari URL
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop(); // ambil segment terakhir

  if (!id) return NextResponse.json({ error: "ID tidak ditemukan" }, { status: 400 });

  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) return NextResponse.json({ error: "Produk tidak ditemukan" }, { status: 404 });

  return NextResponse.json(product);
}
