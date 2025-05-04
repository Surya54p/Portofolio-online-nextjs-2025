// pages/api/like.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const randomNum = Math.floor(Math.random() * 10000);  // Generate angka acak 4 digit
  const nama = `Anonymous${randomNum.toString().padStart(4, '0')}`;  // Nama anonim

  try {
    const data = await prisma.user.create({
      data: {
        nama,  // Nama anonim
        like: 1,  // Status like adalah 1 (terklik)
      },
    });

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Terjadi kesalahan saat mengupdate like" }),
      { status: 500 }
    );
  }
}
