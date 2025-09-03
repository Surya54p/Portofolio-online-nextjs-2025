import { NextResponse } from "next/server";
import midtransClient from "midtrans-client";
import prisma from "@/lib/prisma"; // asumsi lo punya prisma client

const core = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.MIDTRANS_CLIENT_KEY!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ambil orderId dari notif Midtrans
    const orderId = body.order_id;
    const statusResponse = await core.transaction.status(orderId);

    // update database sesuai status Midtrans
    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: statusResponse.transaction_status, // ex: 'settlement', 'pending', 'expire'
        paymentType: statusResponse.payment_type,
        transactionId: statusResponse.transaction_id,
      },
    });

    return NextResponse.json({ message: "Notification handled", status: statusResponse.transaction_status });
  } catch (err) {
    console.error("Midtrans notif error:", err);
    return NextResponse.json({ error: "Notification failed" }, { status: 500 });
  }
}
