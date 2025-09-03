// src/app/api/midtrans/notification/route.ts
import { NextResponse } from "next/server";
import midtransClient from "midtrans-client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // inisialisasi midtrans core API
    const core = new midtransClient.CoreApi({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY!,
      clientKey: process.env.MIDTRANS_CLIENT_KEY!,
    });

    // ambil status transaksi langsung ke Midtrans (buat validasi)
    const statusResponse = await core.transaction.status(body.order_id);

    // update status order di database
    await prisma.order.update({
      where: { id: body.order_id },
      data: {
        status: statusResponse.transaction_status, // "capture", "settlement", "pending", "deny"
        paymentType: statusResponse.payment_type,
        transactionId: statusResponse.transaction_id,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Midtrans notif error:", err);
    return NextResponse.json({ error: "Failed to process notification" }, { status: 500 });
  }
}
