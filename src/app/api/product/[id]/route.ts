import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();
  if (!id) return NextResponse.json({ error: "ID tidak ditemukan" }, { status: 400 });
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return NextResponse.json({ error: "Produk tidak ditemukan" }, { status: 404 });
  return NextResponse.json(product);
}
