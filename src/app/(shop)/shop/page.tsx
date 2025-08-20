"use client";
import PrimaryButton from "@/app/components/primaryButton";
import { useEffect } from "react";
import { useState } from "react";
// type untuk menghindari any
interface Product {
  id: string;
  name: string;
  description?: string;
  price?: number;
  image?: string;
  createdAt: string; // dari Prisma DateTime → jadi string waktu di-JSON
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/product");
      const data: Product[] = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Gagal fetch product:", err);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <main className="flex-grow w-[70%]  mx-auto p-7 rounded box-shadow-paper-effect-3d hover:shadow-none ">
      <span className="text-2xl  text-[48px]">Product</span>

      {/*
       CONTAINER PRODUCT
       */}
      <div className="flex justify-between flex-wrap gap-6   py-6">
        {/* 
        card
         */}
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-gray-50 rounded-lg p-6 lg:grid lg:grid-cols-2  shadow-lg w-[555px] h-fit border border-gray-300"
          >
            {/* Kiri: Info Produk */}
            <div className="flex flex-col justify-between pr-3">
              {/* Judul + Deskripsi */}
              <div className="w-full">
                <h2 className="text-2xl font-ligt mb-2 truncate">{item.name}</h2>
                <div className=" items-center justify-center rounded-lg overflow-hidden  lg:hidden">
                  <img
                    src="img/still-under-construction.png"
                    alt="Product Image"
                    className="object-contain w-full h-full"
                  />
                </div>
                <p className="text-gray-700 text-sm line-clamp-5 lg:mt-0 mt-5">{item.description}</p>
              </div>

              {/* harga dan Tombol Buy */}
              <div className="flex flex-col gap-2 text-lg mt-2 lg:mt-0">
                <span>Rp {item.price}</span>
                <PrimaryButton buttonText="Buy" className="rounded-md" />
              </div>
            </div>

            {/* Kanan: Gambar Produk */}
            <div className=" items-center justify-center rounded-lg overflow-hidden hidden lg:flex">
              <img src="img/still-under-construction.png" alt="Product Image" className="object-contain w-64 h-64" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
