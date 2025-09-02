"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import PrimaryButton from "./primaryButton";

interface Product {
  id: string;
  name: string;
  description?: string;
  image?: string;
  price?: number;
}

export default function ProductCard({ item }: { item: Product }) {
  const router = useRouter();

  // inject script Snap Midtrans ke frontend
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!);
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  function detailProduct(idProduct: string) {
    router.push(`/shop/productDetail/${idProduct}`);
  }

  async function handleBuy(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation(); // biar gak ikut klik card

    try {
      const res = await fetch("/api/product/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: item.id,
          quantity: 1,
          customer: {
            first_name: "Test User",
            email: "test@example.com",
            phone: "081234567890",
          },
        }),
      });

      const data = await res.json();
      if (data.token) {
        // @ts-ignore karena snap gak ada type
        window.snap.pay(data.token, {
          onSuccess: function (result: any) {
            console.log("Success:", result);
          },
          onPending: function (result: any) {
            console.log("Pending:", result);
          },
          onError: function (result: any) {
            console.error("Error:", result);
          },
          onClose: function () {
            console.warn("Customer closed the popup without finishing payment");
          },
        });
      } else {
        console.error("Checkout gagal:", data);
      }
    } catch (err) {
      console.error("HandleBuy error:", err);
    }
  }

  return (
    <div
      className="bg-gray-50 rounded-lg p-6 lg:grid lg:grid-cols-2 hover:shadow-xl w-[555px] h-fit border border-gray-300 cursor-pointer shadow-xl lg:shadow-none"
      onClick={() => detailProduct(item.id)}
    >
      {/* Kiri: Info Produk */}
      <div className="flex flex-col justify-between pr-3">
        <div>
          <h2 className="text-2xl font-light mb-2 line-clamp-2">{item.name}</h2>

          {/* Gambar Mobile */}
          {item.image ? (
            <div className="lg:hidden rounded-lg overflow-hidden">
              <img src={item.image} alt={item.name} className="object-contain w-full h-40" />
            </div>
          ) : (
            <div className="lg:hidden rounded-lg overflow-hidden">
              <img src="/img/still-under-construction.png" alt="default image" className="object-contain w-full h-40" />
            </div>
          )}

          <p className="text-gray-700 text-sm line-clamp-5 mt-3">{item.description}</p>
        </div>

        <div className="flex flex-col gap-2 text-lg mt-2">
          <span>Rp {item.price?.toLocaleString("id-ID")}</span>
          <PrimaryButton buttonText="Buy" className="rounded-md" onClick={handleBuy} />
        </div>
      </div>

      {/* Gambar Desktop */}
      <div className="hidden lg:flex items-center justify-center rounded-lg overflow-hidden">
        <img
          src={item.image ?? "/img/still-under-construction.png"}
          alt={item.name}
          className="object-contain w-64 h-64"
        />
      </div>
    </div>
  );
}
