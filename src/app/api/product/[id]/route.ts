import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
type RouteContext = { params: { id: string } };

export async function GET(request: Request, context: RouteContext) {
  const { id } = context.params;

  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    return NextResponse.json({ error: "Produk tidak ditemukan" }, { status: 404 });
  }

  // fallback image
  const productSafe = { ...product, image: product.image ?? "/img/still-under-construction.png" };

  return NextResponse.json(productSafe);
}
