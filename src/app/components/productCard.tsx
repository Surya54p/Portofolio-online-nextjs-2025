"use client";
import { useRouter } from "next/navigation";
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

  function detailProduct(idProduct: string) {
    router.push(`/shop/productDetail/${idProduct}`);
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
          <PrimaryButton buttonText="Buy" className="rounded-md" />
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
