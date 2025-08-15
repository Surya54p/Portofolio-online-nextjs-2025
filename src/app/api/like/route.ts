export const runtime = "nodejs";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ambil data total likes
// export async function GET() {
//   try {
//     const total_likes = await prisma.likes.count();
//   }
// }
function generateId() {
  const now = new Date();
  return (
    "LK" +
    now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0") +
    String(now.getHours()).padStart(2, "0") +
    String(now.getMinutes()).padStart(2, "0") +
    String(now.getSeconds()).padStart(2, "0")
  );
}

export async function GET() {
  const totalLikes = await prisma.like.count({
    where: {
      nama: { not: "" }, // Hanya yang ada nama
    },
  });

  return new Response(JSON.stringify({ totalLikes }), {
    headers: { "Content-Type": "application/json" },
  });
}

// simpan data
export async function POST(req: Request) {
  const { nama } = await req.json();
  console.log("✅ Data nama yang diterima:", nama);
  // console.log("DATABASE_URL =", process.env.DATABASE_URL);

  if (nama == null || nama == "") {
    return new Response(
      JSON.stringify({
        status: false,
        nameEmpty: true,
        message: "Nama jangan lupa diisi dong 😁",
      }),
      {
        status: 400,
      }
    );
  }

  try {
    const existingLike = await prisma.like.findFirst({
      where: { nama },
    });

    if (existingLike) {
      return new Response(
        JSON.stringify({
          status: false,
          nameAlreadyLiked: true,
          message: "Nama anda tercatat sudah like! 🔥",
        }),
        { status: 200 }
      );
    }
    await prisma.like.create({ data: { id: generateId(), nama } });
    return new Response(
      JSON.stringify({
        nameAlreadyLiked: false,
        status: true,
        message: "Terimakasih sudah like!",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Gagal memproses:", error);
    return new Response(
      JSON.stringify({
        status: false,
        message: "Gagal menyimpan atau memeriksa nama",
      }),
      { status: 500 }
    );
  }
}
