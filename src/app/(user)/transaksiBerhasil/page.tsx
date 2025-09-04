"use client";
import React from "react";
import Link from "next/link";

export default function PaymentSuccess() {
  return (
    <div className=" flex flex-col items-center justify-center my-15">
      <img
        src="https://fcvxlaktnywouergtdwp.supabase.co/storage/v1/object/public/bucket-images/thanks.webp"
        alt=""
        className="rounded border border-gray-300"
      />
      <div className="mt-5 text-center">
        <h1 className="text-2xl font-bold mb-2">Pembayaran Berhasil!</h1>
        <p className="text-gray-600 mb-6 text-center">
          Terima kasih telah melakukan pembayaran. <br />Pesananmu sedang diproses dan akan dihubungi jika sudah siap. <br />
          Anda bisa hubungi kontak berikut untuk detail dan status pesanan anda 
        </p>
      </div>
      <div className="flex flex-col gap-2 mt-1">
        <button
          onClick={() => (window.location.href = "mailto:suryaario54p@gmail.com")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          📧 Email: suryaario54p@gmail.com
        </button>

        <button
          onClick={() => window.open("https://wa.me/62895634076200", "_blank")}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          📱 WhatsApp: +62 895-6340-76200
        </button>

        <Link
          href="/shop"
          className="px-6 py-2 text-center bg-gray-100 text-black border border-gray-300 rounded hover:bg-gray-700 hover:text-white transition"
        >
          Kembali
        </Link>
      </div>
    </div>
  );
}
