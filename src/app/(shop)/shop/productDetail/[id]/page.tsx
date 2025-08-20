"use client";
import PrimaryButton from "@/app/components/primaryButton";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import SecondaryButton from "@/app/components/secondaryButton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/componentsShadcn/ui/carousel";

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
    <main className="flex-grow lg:w-[70%] w-[95%] mx-auto p-7 rounded box-shadow-paper-effect-3d hover:shadow-none">
      <span className="text-2xl text-[48px]">Product Detail</span>

      {loading ? (
        <p className="text-center py-10">Loading...</p>
      ) : !product ? (
        <p className="text-center py-10">Produk tidak ditemukan</p>
      ) : (
        <div className="flex justify-center py-6">
          <div className="bg-gray-50 rounded-lg p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 shadow-lg w-full h-fit border border-gray-300 gap-4 md:gap-6">
            {/* Kiri: Info Produk */}
            <div className="flex flex-col pr-0 md:pr-3 gap-4 md:gap-6 lg:justify-between">
              <div className="w-full flex flex-col gap-2 md:gap-4">
                {/* 
                    judul dan badge
*/}
                <div className="flex justify-between lg:items-center items-start lg:flex-row flex-col ">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-1 truncate">{product.name}</h2>
                  <div className="text-sm px-2 h-fit py-1 rounded-md shadow flex items-center gap-2 relative bg-green-600 text-white">
                    New
                  </div>
                </div>
                <div className="text-xl sm:text-2xl text-start italic">
                  <span>Rp {product.price?.toLocaleString("id-ID")}</span>
                </div>
                <p className="text-gray-700 text-sm sm:text-lg mt-2 md:mt-5">{product.description}</p>
              </div>

              <div className="flex flex-col gap-2 text-lg mt-2 lg:mt-0">
                <div className="grid grid-cols-2 gap-3 sm:gap-6">
                  <SecondaryButton buttonText="Contact" className="rounded-md" />
                  <PrimaryButton buttonText="Buy" className="rounded-md" />
                </div>
              </div>
            </div>

            {/* Kanan: Carousel */}
            <div className="flex items-center justify-center border rounded-xl mt-4 md:mt-0">
              <Carousel className="w-full max-w-full sm:max-w-xs">
                <CarouselContent>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1 flex justify-center">
                        <img
                          src={product.image ? product.image : "img/still-under-construction.png"}
                          alt={product.name}
                          className="object-contain w-64 sm:w-80 h-64 sm:h-80 rounded-lg"
                        />
                        <span className="text-xs ">Scroll untuk gambar selanjutnya...</span>
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
