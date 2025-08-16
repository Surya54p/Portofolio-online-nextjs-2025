import { PrismaClient } from "@prisma/client";
// import { error } from "console";
// import { ST } from "next/dist/shared/lib/utils";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const data = await prisma.portofolios.findMany({});
  return NextResponse.json(data);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await prisma.portofolios.delete({ where: { id: String(id) } });
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
