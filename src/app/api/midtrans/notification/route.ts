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
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px; background: #f9f9f9;">
    
    <h2 style="text-align: center; color: #333; margin-bottom: 20px;">✅ Notifikasi Status Pembayaran</h2>

    <div style="padding: 20px; background: #fff; border: 1px solid #ddd; border-radius: 6px;">
      <p style="font-size: 16px; color: #333; margin-top: 0;">
        Hai <strong>${order.username}</strong>!
      </p>
      <p style="font-size: 16px; color: #333;">
        Pesanan yang kamu lakukan di toko <strong>Surya (Unit54p)</strong> dengan ID <strong>#${
          order.id
        }</strong> telah <strong>BERHASIL</strong> dibayar.
      </p>

      <div style="margin: 20px 0; padding: 15px; background: #f0f8ff; border-left: 4px solid #4caf50; color: #333;">
        <h3 style="margin-top: 0; margin-bottom: 10px; font-size: 17px;">Detail Pesanan:</h3>
        <ul style="padding-left: 20px; margin: 0; list-style-type: disc;">
          ${order.items
            .map(
              (item) =>
                `<li style="margin-bottom: 5px;">${item.product.name} x ${item.quantity} — <strong>Rp ${(
                  item.price * item.quantity
                ).toLocaleString("id-ID")}</strong></li>`
            )
            .join("")}
        </ul>
        <p style="font-size: 16px; font-weight: bold; margin-top: 15px; margin-bottom: 0; border-top: 1px solid #ddd; padding-top: 10px;">
          Total Pembayaran: Rp ${order.amount.toLocaleString("id-ID")}
        </p>
      </div>

      <p style="font-size: 14px; color: #555;">
        Jika terdapat kesalahan, silahkan hubungi melalui:
      </p>
      <ul style="padding-left: 20px; margin-top: 5px; list-style: none;">
        <li>📧 Email: <a href="mailto:suryaario54p@gmail.com" style="color: #007bff; text-decoration: none;">suryaario54p@gmail.com</a></li>
        <li>📱 WhatsApp: <a href="https://wa.me/62895634076200" style="color: #007bff; text-decoration: none;">+62 895-6340-76200</a></li>
      </ul>
    </div>

    <p style="font-size: 12px; color: #777; text-align: center; margin-top: 30px;">
      Ini merupakan pesan otomatis dari sistem. Mohon untuk tidak membalas email ini ya! 🙏
    </p>
  </div>
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
