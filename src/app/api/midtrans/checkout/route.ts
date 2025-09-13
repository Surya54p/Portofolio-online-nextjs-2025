import { NextResponse } from "next/server";
import midtransClient from "midtrans-client";
import { PrismaClient } from "@prisma/client";
// import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, quantity, customer } = body;

    // Ambil data produk dari database
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Hitung total harga
    const grossAmount = (product.price ?? 0) * quantity;

    // Simpan order dulu ke database
    const order = await prisma.order.create({
      data: {
        status: "PENDING",
        amount: grossAmount,
        username: customer.first_name,
        email: customer.email,
        phone_number: customer.phone,
        items: {
          create: [
            {
              productId: product.id,
              quantity,
              price: product.price ?? 0,
            },
          ],
        },
      },
    });

    const snap = new midtransClient.Snap({
      isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true", 
      serverKey: process.env.MIDTRANS_SERVER_KEY as string,
      clientKey: process.env.MIDTRANS_CLIENT_KEY as string,
    });

    // Buat transaction
    const parameter = {
      transaction_details: {
        order_id: order.id,
        gross_amount: grossAmount,
      },
      item_details: [
        {
          id: product.id,
          price: product.price ?? 0,
          quantity: quantity,
          name: product.name,
        },
      ],
      customer_details: {
        first_name: customer.first_name,
        email: customer.email,
        phone: customer.phone,
      },
      finish_redirect_url: `https://portofolio-online-nextjs-2025.vercel.app/shop/transaksiBerhasil?order_id=${order.id}`,
    };

    const transaction = await snap.createTransaction(parameter);

    return NextResponse.json({
      token: transaction.token,
      redirect_url: transaction.redirect_url,
      orderId: order.id,
    });
  } catch (error) {
    console.error("Checkout API Error:", error);
    const message = error instanceof Error ? error.message : "Unexpected error";
    return NextResponse.json({ error: "Checkout failed", detail: message }, { status: 500 });
  }
}
