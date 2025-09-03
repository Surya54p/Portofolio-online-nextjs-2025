import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

interface MidtransNotification {
  order_id: string;
  transaction_status: "capture" | "settlement" | "pending" | "deny" | "expire" | "cancel";
  payment_type: string;
  transaction_id: string;
  gross_amount: string;
  status_code: string;
  signature_key: string;
}

export async function POST(req: Request) {
  try {
    const body: MidtransNotification = await req.json();

    const {
      order_id,
      transaction_status,
      payment_type,
      transaction_id,
      gross_amount,
      status_code,
      signature_key,
    } = body;

    // === VALIDASI SIGNATURE ===
    const serverKey = process.env.MIDTRANS_SERVER_KEY!;
    const validSignature = crypto
      .createHash("sha512")
      .update(order_id + status_code + gross_amount + serverKey)
      .digest("hex");

    if (signature_key !== validSignature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
    }

    // === MAPPING STATUS ===
    const newStatus =
      transaction_status === "capture" || transaction_status === "settlement"
        ? "SUCCESS"
        : transaction_status === "deny" ||
          transaction_status === "expire" ||
          transaction_status === "cancel"
        ? "FAILED"
        : "PENDING";

    // === UPDATE DATABASE ===
    await prisma.order.update({
      where: { id: order_id },
      data: {
        status: newStatus,
        paymentType: payment_type,
        transactionId: transaction_id,
      },
    });

    return NextResponse.json({
      message: "Notification processed",
      status: newStatus,
    });
  } catch (error) {
    console.error("Midtrans Notification Error:", error);
    return NextResponse.json(
      { error: "Notification failed" },
      { status: 500 }
    );
  }
}
