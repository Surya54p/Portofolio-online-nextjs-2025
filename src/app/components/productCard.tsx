"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PrimaryButton from "./primaryButton";

interface Product {
  id: string;
  name: string;
  description?: string;
  image?: string;
  price?: number;
}

interface ModalProps {
  open: boolean;
  onCloSe: () => void;
  onSubmit: (data: { name: string; email: string; noTelp: string }) => void;
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
      const res = await fetch("/api/product/checkout", {
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
      // function untuk ke halaman detail product
      // onClick={() => detailProduct(item.id)}
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
          <PrimaryButton buttonText="Buy" className="rounded-md" onClick={HandleOpenModal} />
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
