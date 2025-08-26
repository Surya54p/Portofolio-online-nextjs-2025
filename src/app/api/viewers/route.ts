export const runtime = "nodejs";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const totalViewersAPI = await prisma.viewers.count();
  const allViewers = await prisma.viewers.findMany({
    orderBy: { createdAt: "asc" },
  });
  return new Response(JSON.stringify({ totalViewersAPI, viewersData: allViewers  }), {
    headers: { "Content-Type": "application/json" },
  });
}
