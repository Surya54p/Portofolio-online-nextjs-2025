export const runtime = "nodejs";

import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
const prisma = new PrismaClient();

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
  const InfoLikes = await prisma.like.findMany({
    select: { id: true, nama: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });

  // console.log(likes);
  return new Response(JSON.stringify({ totalLikes: InfoLikes.length, InfoLikes }), {
    headers: { "Content-Type": "application/json" },
  });
}

// simpan data
export async function POST(req: Request) {
  const { nama } = await req.json();
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

    // === SETUP NODEMAILER ===
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // kirim email
    await transporter.sendMail({
      from: `"Notifikasi Like" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: "Like Baru dari Website Portofolio🚀",
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px; background: #f9f9f9;">
      
      <h2 style="text-align: center; color: #333; margin-bottom: 20px;">📢 Notifikasi Like Baru</h2>

      <div style="padding: 15px; background: #fff; border: 1px solid #ddd; border-radius: 6px; text-align: center;">
        <span style="display: inline-block; background: #4caf50; color: #fff; padding: 8px 16px; border-radius: 20px; font-weight: bold; margin-bottom: 10px;">
          LIKE
        </span>
        <p style="font-size: 16px; color: #333;">
          <strong>${nama}</strong> baru saja memberikan like! 🔥
        </p>
      </div>

      <p style="font-size: 12px; color: #777; text-align: center; margin-top: 30px;">
        Email ini otomatis dikirim oleh sistem Next.js Nodemailer kamu.<br/>
        Jangan dibalas ya 😁
      </p>
    </div>
  `,
    });
    // tampilkan dan simpand data
    console.log("✅ Data nama yang diterima:", nama);
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
