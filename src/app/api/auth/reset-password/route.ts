import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { token, password } = await req.json();

  // 1. Cari token
  const resetToken = await prisma.adminResetToken.findUnique({
    where: { token },
    include: { admin: true },
  });

  if (!resetToken || resetToken.expiresAt < new Date()) {
    return NextResponse.json(
      { message: "Token tidak valid atau sudah expired" },
      { status: 400 }
    );
  }

  // 2. Hash password baru
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Update password admin
  await prisma.admin.update({
    where: { id: resetToken.adminId },
    data: { password: hashedPassword },
  });

  // 4. Hapus token biar nggak bisa dipakai ulang
  await prisma.adminResetToken.delete({
    where: { id: resetToken.id },
  });

  return NextResponse.json({ message: "Password berhasil direset" });
}
