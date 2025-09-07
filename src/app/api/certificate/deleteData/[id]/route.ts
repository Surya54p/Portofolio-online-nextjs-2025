import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    await prisma.certificates.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Delete Success" }, { status: 200 });
  } catch (error: unknown) {
    console.log("❌ Error api found: ", error);
    return NextResponse.json({ error: "Failed to delete certificate" }, { status: 500 });
  }
}
