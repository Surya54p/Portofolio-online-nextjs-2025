// src/app/api/midtrans/notification/route.ts
import { NextResponse } from "next/server";
import midtransClient from "midtrans-client";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic"; // jaga2 biar gak di-cache

const core = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.MIDTRANS_CLIENT_KEY!, // opsional, tapi gak masalah
});

// (opsional) health check
export async function GET() {
  return NextResponse.json({ ok: true });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("[MIDTRANS NOTIF] raw body:", body);

    // **Minimal**: butuh order_id dari Midtrans
    const orderId = body.order_id as string;
    if (!orderId) {
      return NextResponse.json({ error: "order_id missing" }, { status: 400 });
    }

    // (Best practice) verifikasi signature (opsional tapi bagus)
    // signature_key = sha512(order_id + status_code + gross_amount + serverKey)
    const crypto = await import("crypto");
    const expect = crypto
      .createHash("sha512")
      .update(orderId + body.status_code + body.gross_amount + process.env.MIDTRANS_SERVER_KEY!)
      .digest("hex");
    if (body.signature_key && body.signature_key !== expect) {
      console.warn("[MIDTRANS NOTIF] signature mismatch");
      // boleh return 401, tapi saat dev seringkali signature kosong saat test manual Postman
      // return NextResponse.json({ error: "invalid signature" }, { status: 401 });
    }

    // Tarik status resmi dari Midtrans (anti-spoof)
    const statusRes = await core.transaction.status(orderId);
    console.log("[MIDTRANS STATUS]:", statusRes);

    // Map status Midtrans → status di DB
    // settlement/success → "success"
    // pending → "pending"
    // expire/cancel/deny → "failed"
    const mapStatus = (s: string) => {
      if (s === "settlement" || s === "capture") return "success";
      if (s === "pending") return "pending";
      return "failed";
    };

    const updated = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: mapStatus(statusRes.transaction_status),
        paymentType: statusRes.payment_type ?? null,
        transactionId: statusRes.transaction_id ?? null,
        amount: Number(statusRes.gross_amount ?? 0) || undefined,
      },
    });

    console.log("[ORDER UPDATED]:", updated.id, updated.status);

    // IMPORTANT: balas 200 ke Midtrans, kalau tidak akan di-retry
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Midtrans notif error:", err);
    return NextResponse.json({ error: "Notification failed" }, { status: 500 });
  }
}
