import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req: Request, context: { params: { id: string } }) {
  try {
    const { id } = context.params; 

    await prisma.certificates.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Delete Success" }, { status: 200 });
  } catch (error) {
    console.error("❌ Error api found: ", error);
    return NextResponse.json(
      { error: "Failed to delete certificate" },
      { status: 500 }
    );
  }
}
