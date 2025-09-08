import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// definisikan context biar gak pakai any
interface DeleteContext {
  params: {
    id: string;
  };
}

export async function DELETE(_req: Request, { params }: DeleteContext) {
  try {
    const { id } = params;

    await prisma.certificates.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Delete Success" }, { status: 200 });
  } catch (error) {
    console.error("❌ Error api found: ", error);
    return NextResponse.json({ error: "Failed to delete certificate" }, { status: 500 });
  }
}
