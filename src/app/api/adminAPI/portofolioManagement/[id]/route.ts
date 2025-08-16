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
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "ID is required!" }, { status: 400 });
    }
    const deleteData = await prisma.portofolios.delete({
      where: { id: String(id) },
    });
    return NextResponse.json({ message: "Data berhasil dihapus!", deleteData });
  } catch (error: unknown) {
    let erorMessage = "server eror";

    if (error instanceof Error) {
      erorMessage = error.message;
    }

    return NextResponse.json({ eror: erorMessage }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
