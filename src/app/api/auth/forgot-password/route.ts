import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { email } = await req.json();

  const admin = await prisma.admin.findUnique({ where: { email } });

  // kalau tidak ada admin dengan email itu, tetap balas sukses
  if (!admin) {
    return NextResponse.json({ message: "Jika email terdaftar, link reset sudah dikirim." });
  }

  // generate token
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 jam

  // simpan token ke DB
  await prisma.adminResetToken.create({
    data: {
      token,
      adminId: admin.id,
      expiresAt,
    },
  });

  // kirim email reset password
  const transporter = nodemailer.createTransport({
    service: "gmail", // bisa ganti ke SMTP lain
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Reset Password Admin",
    html: `<p>Klik link berikut untuk reset password:</p>
           <a href="${resetLink}">${resetLink}</a>`,
  });

  return NextResponse.json({ message: "Jika email terdaftar, link reset sudah dikirim." });
}
