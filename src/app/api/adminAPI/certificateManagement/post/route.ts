import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";

const prisma = new PrismaClient();
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export async function POST(req: Request) {
  try {
    // ambil data form yang dikirim dari frontend
    const dataForm = await req.formData();
    //   pecah pervariabel
    const title = dataForm.get("title") as string;
    const summary = dataForm.get("summary") as string;
    const category = dataForm.get("category") as string;
    const gambar = dataForm.get("image") as File | null;

    //   gambar eror handler
    if (!gambar) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    //   gambar preprocessing sebellum ke bucket
    const extensiGambar = gambar.name.split(".").pop();
    const namaGambar = `${Date.now()}-${Math.random().toString(36).substring(2)}.${extensiGambar}`;

    // 🔧 Convert file ke Buffer
    const fileData = await gambar.arrayBuffer();

    const { error: uploadError } = await supabase.storage
      .from("bucket-images")
      .upload(namaGambar, new Uint8Array(fileData), { cacheControl: "3600", upsert: false });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }
    // simpan data
    const { data: publicUrlData } = supabase.storage.from("bucket-images").getPublicUrl(namaGambar);
    const imageUrl = publicUrlData.publicUrl;

    const result = await prisma.certificates.create({
      data: {
        title,
        summary,
        category,
        img: imageUrl,
      },
    });
    //   kembalikan response kalau berhasil
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Server eror?";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
