import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { nama } = await req.json();
  console.log("Data nama yang diterima:", nama);  // Atau debugger;

  if (!nama) {
    return new Response(
      JSON.stringify({ status: false, error: "Nama wajib diisi!" }),
      { status: 400 }
    );
  }

  try {
    // Cek apakah nama sudah ada dalam database menggunakan findFirst
    const existingLike = await prisma.like.findFirst({
      where: { nama },
    });

    if (existingLike) {
      // Jika nama sudah ada, tampilkan pesan bahwa sudah "like"
      return new Response(
        JSON.stringify({
          status: true, // Operasi berhasil
          nameAlreadyLiked: true, // Nama sudah ada di database
          messageAlreadyLiked: "Nama anda tercatat sudah like!",
        }),
        { status: 200 }
      );
    } else {
      // Jika nama belum ada, simpan ke database sebagai "Like"
      const like = await prisma.like.create({ data: { nama } });
      return new Response(
        JSON.stringify({
          nameAlreadyLiked: false, // Nama belum ada di database
          status: true, // Operasi berhasil
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
