import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { nama } = await req.json();
  console.log("Data nama yang diterima:", nama);
  console.log("DATABASE_URL =", process.env.DATABASE_URL);

  if (!nama) {
    return new Response(
      JSON.stringify({ status: false, error: "Nama wajib diisi!" }),
      { status: 400 }
    );
  }

  try {
    const existingLike = await prisma.like.findFirst({
      where: { nama },
    });

    if (existingLike) {
      return new Response(
        JSON.stringify({
          status: true,
          nameAlreadyLiked: true,
          messageAlreadyLiked: "Nama anda tercatat sudah like!",
        }),
        { status: 200 }
      );
    }
    await prisma.like.create({ data: { nama } });
    return new Response(
      JSON.stringify({
        nameAlreadyLiked: false,
        status: true,
        messageLike: "Terimakasih sudah like!",
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Gagal memproses:", error);
    console.error("Error details:", error.message, error.stack);
    return new Response(
      JSON.stringify({
        status: false,
        error: "Gagal menyimpan atau memeriksa nama",
        details: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function GET() {
  const totalLikes = await prisma.like.count({
    where: {
      nama: { not: '' }, // Hanya yang ada nama
    },
  });

  return new Response(JSON.stringify({ totalLikes }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
