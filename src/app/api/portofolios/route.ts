export const runtime = "nodejs";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const totalPortofoliosAPI = await prisma.portofolios.count();

  return new Response(JSON.stringify({ totalPortofoliosAPI }), {
    headers: { "Content-Type": "application/json" },
  });
}
