import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
// import { writeFile } from "fs/promises";
// import path from "path";
import { createClient } from "@supabase/supabase-js";

const prisma = new PrismaClient();

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export async function POST(req: Request) {
  const data = await req.formData();
  const bucketName = "bucket-images";

  const file = data.get("file") as File | null;
  const title = data.get("title") as string;
  const summary = data.get("summary") as string;
  const categoryId = data.get("categoryId") as string;
  const stack = JSON.parse(data.get("stack") as string);
  // let src = data.get("src") as string;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }
  // menyimpan ke supabase bucket
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

  // Upload ke Supabase Storage (bucket: "portfolio")
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from(bucketName) // ganti sesuai nama bucket
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  // Ambil public URL
  const { data: publicUrlData } = supabase.storage.from(bucketName).getPublicUrl(fileName);

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }
  if (!Array.isArray(stack)) {
    return NextResponse.json({ error: "Invalid stack format" }, { status: 400 });
  }
  const imageUrl = publicUrlData.publicUrl;

  // menyimpan lokal
  // if (file && file.size > 0) {
  //   const bytes = await file.arrayBuffer();
  //   const buffer = Buffer.from(bytes);
  //   // const fileName = `${Date.now()}-${file.name}`;
  //   const filePath = path.join(process.cwd(), "public/img/portofolioImages", src);

  //   await writeFile(filePath, buffer);
  //   src = `portofolioImages/${src}`;
  // }

  const result = await prisma.portofolios.create({
    data: {
      title,
      summary,
      stack,
      src: imageUrl,
      categoryId: Number(categoryId),
    },
  });

  return NextResponse.json(result);
}
