import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(_req: Request, context: { params: Promise<{ id: string }> }){
  try {
    const { id } = await context.params; // 👈 HARUS di-await

    await prisma.certificates.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Delete Success" }, { status: 200 });
  } catch (error) {
    console.error("❌ Error api found: ", error);
    return NextResponse.json({ error: "Failed to delete certificate" }, { status: 500 });
  }
}
