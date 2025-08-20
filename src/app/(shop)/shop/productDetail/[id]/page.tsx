"use client";
import PrimaryButton from "@/app/components/primaryButton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/componentsShadcn/ui/carousel";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import SecondaryButton from "@/app/components/secondaryButton";
interface ProductDetail {
  id: string;
  name: string;
  description?: string;
  price?: number;
  image?: string;
}

export default function ProductDetail() {
  const { id } = useParams(); // ambil id dari URL
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/product/${id}`);
        if (!res.ok) throw new Error("Produk tidak ditemukan");
        const data: ProductDetail = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  return (
    <main className="flex-grow w-[70%] mx-auto p-7 rounded box-shadow-paper-effect-3d hover:shadow-none">
      <span className="text-2xl text-[48px]">Product Detail</span>

      {loading ? (
        <p className="text-center py-10">Loading...</p>
      ) : !product ? (
        <p className="text-center py-10">Produk tidak ditemukan</p>
      ) : (
        <div className="flex justify-between flex-wrap gap-6 py-6">
          <div className="bg-gray-50 rounded-lg p-6 grid grid-cols-2 shadow-lg w-full h-fit border border-gray-300">
            {/* Kiri: Info Produk */}
            <div className="flex flex-col pr-3 gap-6">
              <div className="w-full flex flex-col gap-4">
                <div className="flex justify-between items-center flex-row">
                  <h2 className="text-3xl font-bold mb-2 truncate">{product.name}</h2>
                  <div className="text-sm px-2 h-fit py-1 rounded-md shadow flex items-center gap-2 relative bg-green-600 text-white">
                    New
                  </div>
                </div>
                <div className="text-2xl text-start italic">
                  <span>Rp {product.price?.toLocaleString("id-ID")}</span>
                </div>
                <p className="text-gray-700 text-lg lg:mt-0 mt-5">{product.description}</p>
              </div>

              <div className="flex flex-col gap-2 text-lg mt-2 lg:mt-0">
                <div className="grid grid-cols-2 gap-6">
                  <SecondaryButton buttonText="Contact" className="rounded-md " />
                  <PrimaryButton buttonText="Buy" className="rounded-md" />
                </div>
              </div>
            </div>

            {/* Kanan: Carousel */}
            <div className="flex items-center justify-center border rounded-xl">
              <Carousel className="w-full max-w-xs">
                <CarouselContent>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <img
                          src={product.image || "/img/still-under-construction.png"}
                          alt={product.name}
                          className="object-contain w-80 h-80 rounded-lg"
                        />
                        <span className="text-4xl font-semibold">{index + 1}</span>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
