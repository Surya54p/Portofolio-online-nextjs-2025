import { PrismaClient } from "@prisma/client";
// import { error } from "console";
// import { ST } from "next/dist/shared/lib/utils";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
const prisma = new PrismaClient();

export async function GET() {
  const data = await prisma.portofolios.findMany({});
  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest, context: any) { 
  const { params } = context;
  const id: string = params.id; // primitive type string

  try {
    await prisma.portofolios.delete({ where: { id: String(id) } });
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
