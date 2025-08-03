export const runtime = "nodejs";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const totalViewersAPI = await prisma.viewers.count();

  return new Response(JSON.stringify({ totalViewersAPI }), {
    headers: { "Content-Type": "application/json" },
  });
}
