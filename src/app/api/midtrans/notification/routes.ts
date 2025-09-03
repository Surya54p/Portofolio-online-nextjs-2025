import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      order_id,
      transaction_status,
      payment_type,
      transaction_id,
      gross_amount,
      status_code,
      signature_key,
    } = body;

    // Validasi signature biar aman
    const serverKey = process.env.MIDTRANS_SERVER_KEY!;
    const validSignature = crypto
      .createHash("sha512")
      .update(order_id + status_code + gross_amount + serverKey)
      .digest("hex");

    if (signature_key !== validSignature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
    }

    // Tentukan status baru
    let newStatus = "PENDING";
    if (transaction_status === "capture" || transaction_status === "settlement") {
      newStatus = "SUCCESS";
    } else if (transaction_status === "deny" || transaction_status === "expire" || transaction_status === "cancel") {
      newStatus = "FAILED";
    }

    // Update order di DB
    await prisma.order.update({
      where: { id: order_id },
      data: {
        status: newStatus,
        paymentType: payment_type,
        transactionId: transaction_id,
      },
    });

    return NextResponse.json({ message: "Notification processed", status: newStatus });
  } catch (err: any) {
    console.error("Notif error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
