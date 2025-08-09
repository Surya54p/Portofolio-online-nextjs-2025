import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { writeFile } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const data = await req.formData();

  const file = data.get("file") as File | null;
  const title = data.get("title") as string;
  const summary = data.get("summary") as string;
  const categoryId = data.get("categoryId") as string;
  const stack = JSON.parse(data.get("stack") as string);
  let src = data.get("src") as string;

  if (!Array.isArray(stack)) {
    return NextResponse.json({ error: "Invalid stack format" }, { status: 400 });
  }

  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    // const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(process.cwd(), "public/img/portofolioImages", src);

    await writeFile(filePath, buffer);
    src = `portofolioImages/${src}`;
  }

  const result = await prisma.portofolios.create({
    data: {
      title,
      summary,
      stack,
      src,
      categoryId: Number(categoryId),
    },
  });
  return NextResponse.json(result);
}
