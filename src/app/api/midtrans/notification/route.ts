import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { order_id, transaction_status, payment_type, transaction_id, gross_amount, status_code, signature_key } =
      body;

    // Validasi signature biar aman
    const serverKey = process.env.MIDTRANS_SERVER_KEY!;
    const validSignature = crypto
      .createHash("sha512")
      .update(order_id + status_code + gross_amount + serverKey)
      .digest("hex");

    if (signature_key !== validSignature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
    }

    // Ambil order dari DB
    const order = await prisma.order.findUnique({
      where: { id: order_id },
      include: { items: { include: { product: true } } }, // pastikan ada relasi product di OrderItem
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // === SETUP NODEMAILER ===
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    let newStatus = "pending"; // default sesuai DB
    let emailSubject = "";
    let emailHtml = "";

    // Tentukan status baru + isi email
    if (transaction_status === "capture" || transaction_status === "settlement") {
      newStatus = "success";
      emailSubject = "✅ Pesananmu berhasil dibayar!";
      emailHtml = `
        <h2>Halo ${order.username},</h2>
        <p>Pesananmu dengan ID <b>${order.id}</b> sudah <b>BERHASIL</b> dibayar.</p>
        <p><b>Total:</b> Rp ${order.amount.toLocaleString()}</p>
        <h3>Detail Produk:</h3>
        <ul>
          ${order.items
            .map(
              (item) =>
                `<li>${item.product.name} x ${item.quantity} — Rp ${(item.price * item.quantity).toLocaleString()}</li>`
            )
            .join("")}
        </ul>
      `;
    } else if (transaction_status === "deny" || transaction_status === "expire" || transaction_status === "cancel") {
      newStatus = "failed";
      emailSubject = "❌ Pesananmu gagal / dibatalkan";
      emailHtml = `
        <h2>Halo ${order.username},</h2>
        <p>Pesananmu dengan ID <b>${order.id}</b> statusnya <b>GAGAL</b> atau dibatalkan.</p>
        <p>Silakan coba lagi atau hubungi admin jika ada masalah.</p>
      `;
    } else if (transaction_status === "pending") {
      newStatus = "pending";
      emailSubject = "⏳ Pesananmu masih menunggu pembayaran";
      emailHtml = `
        <h2>Halo ${order.username},</h2>
        <p>Pesananmu dengan ID <b>${order.id}</b> masih <b>MENUNGGU PEMBAYARAN</b>.</p>
        <p>Total: Rp ${order.amount.toLocaleString()}</p>
      `;
    }
    console.log("📦 Order ID:", order.id);
    console.log("💳 Transaction Status:", transaction_status);
    console.log("👤 Email:", order.email);

    // Update order di DB
    await prisma.order.update({
      where: { id: order.id },
      data: {
        status: newStatus,
        paymentType: payment_type,
        transactionId: transaction_id,
      },
    });

    // Kirim email notifikasi kalau ada subject & html
    if (emailSubject && emailHtml) {
      await transporter.sendMail({
        from: `"Toko Surya" <${process.env.GMAIL_USER}>`,
        to: order.email,
        subject: emailSubject,
        html: emailHtml,
      });
    }

    return NextResponse.json({ message: "Notification processed", status: newStatus });
  } catch (error) {
    console.error("Error: ", error);
    const message = error instanceof Error ? error.message : "Unexpected error";
    return NextResponse.json({ error: "Notification failed", detail: message }, { status: 500 });
  }
}
