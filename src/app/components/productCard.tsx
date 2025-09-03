"use client";
// import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PrimaryButton from "./primaryButton";

interface Product {
  id: string;
  name: string;
  description?: string;
  image?: string;
  price?: number;
}

export default function ProductCard({ item }: { item: Product }) {
  // const router = useRouter();

  const [openModal, setOpenModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [noTelpUser, setNoTelpUser] = useState("");
  const [quantityProduct, setQuantityProduct] = useState(0);

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

  // function untuk ke halaman detail product
  // function detailProduct(idProduct: string) {
  //   router.push(`/shop/productDetail/${idProduct}`);
  // }

  const HandleModalClose = () => setOpenModal(false);
  const HandleOpenModal = () => setOpenModal(true);

  async function HandleBuy(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/midtrans/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: item.id,
          quantity: quantityProduct,
          customer: {
            first_name: userName,
            email: emailUser,
            phone: noTelpUser,
          },
        }),
      });

      const data = await res.json();
      if (data.token) {
        // @ts-expect-error: snap object tidak punya type definition
        window.snap.pay(data.token, {
          onSuccess: function (result: unknown) {
            console.log("Success:", result);
            window.location.href = "https://portofolio-online-nextjs-2025.vercel.app/";
          },
          onPending: function (result: unknown) {
            console.log("Pending:", result);
            window.location.href = "https://portofolio-online-nextjs-2025.vercel.app/";
          },
          onError: function (result: unknown) {
            console.error("Error:", result);
            window.location.href = "https://portofolio-online-nextjs-2025.vercel.app/";
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
    <div className="bg-gray-50 border border-gray-300 rounded-lg h-fit">
      <div className=" flex flex-col ">
        <div className="rounded-lg  w-full h-64">
          <img
            src={item.image ?? "/img/still-under-construction.png"}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="mx-4 my-4 flex flex-col gap-2 ">
          <h2 className="text-2xl line-clamp-2">{item.name}</h2>
          <span className="text-xl ">Rp {item.price?.toLocaleString("id-ID")}</span>
          <p className="text-gray-700  line-clamp-5 text-md">{item.description}</p>
          <PrimaryButton buttonText="Buy" className="rounded-md w-full text-lg" onClick={HandleOpenModal} />
        </div>
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-gray-100/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[800px] border border-gray-400 flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="mb-3">
              <div className="flex justify-between items-center">
                <h2 className="text-[32px] font-bold">Isi Data Pembeli</h2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  onClick={HandleModalClose}
                  className="cursor-pointer"
                >
                  <path
                    fill="none"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18 6L6 18M6 6l12 12"
                  />
                </svg>
              </div>
              <p className="italic">Lengkapi data sebelum melanjutkan pembayaran</p>
            </div>

            {/* Form */}
            <form onSubmit={HandleBuy} className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto pb-3">
              <div className="flex flex-col gap-2">
                <label>Nama Lengkap</label>
                <input
                  type="text"
                  className="border p-2 rounded"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Jumlah Pesanan</label>
                <input
                  type="number"
                  className="border p-2 rounded"
                  value={quantityProduct}
                  onChange={(e) => setQuantityProduct(Number(e.target.value))}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Email</label>
                <input
                  type="email"
                  className="border p-2 rounded"
                  value={emailUser}
                  onChange={(e) => setEmailUser(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>No. Telepon</label>
                <input
                  type="tel"
                  className="border p-2 rounded"
                  value={noTelpUser}
                  onChange={(e) => setNoTelpUser(e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={HandleModalClose} className="px-4 py-2 border rounded">
                  Batal
                </button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
                  Lanjut Bayar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
