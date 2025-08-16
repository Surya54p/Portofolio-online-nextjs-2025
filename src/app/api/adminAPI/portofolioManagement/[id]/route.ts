import { PrismaClient } from "@prisma/client";
// import { error } from "console";
// import { ST } from "next/dist/shared/lib/utils";
import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";
const prisma = new PrismaClient();

export async function GET() {
  const data = await prisma.portofolios.findMany({});
  return NextResponse.json(data);
}


export async function DELETE(req: Request, context: unknown) {
  // tipekan manual di dalam
  const { id } = (context as { params: { id: string } }).params;

  try {
    await prisma.portofolios.delete({ where: { id } });
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}

