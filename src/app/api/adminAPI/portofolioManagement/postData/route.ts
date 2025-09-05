import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";
// import { error } from "console";

const prisma = new PrismaClient();

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const file = data.get("file") as File | null;
    const title = data.get("title") as string;
    const summary = data.get("summary") as string;
    const categoryId = data.get("categoryId") as string;
    const stack = JSON.parse(data.get("stack") as string);

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (!Array.isArray(stack)) {
      return NextResponse.json({ error: "Invalid stack format" }, { status: 400 });
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const fileData = await file.arrayBuffer();

    const { error: uploadError } = await supabase.storage
      .from("bucket-images")
      .upload(fileName, new Uint8Array(fileData), { cacheControl: "3600", upsert: false });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: publicUrlData } = supabase.storage.from("bucket-images").getPublicUrl(fileName);
    const imageUrl = publicUrlData.publicUrl;

    // Simpan data ke Neon (PostgreSQL)
    const result = await prisma.portofolios.create({
      data: {
        title,
        summary,
        stack,
        img: imageUrl,
        categoryId: Number(categoryId),
      },
    });

    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
