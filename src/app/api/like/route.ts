import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { nama } = await req.json();
  console.log("Data nama yang diterima:", nama);  

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
    } else {
      const like = await prisma.like.create({ data: { nama } });
      return new Response(
        JSON.stringify({
          nameAlreadyLiked: false, 
          status: true,
          messageLike: "Terimakasih sudah like!",
        }),
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Gagal memproses:", error);
    return new Response(
      JSON.stringify({
        status: false,
        error: "Gagal menyimpan atau memeriksa nama",
      }),
      { status: 500 }
    );
  }
}
