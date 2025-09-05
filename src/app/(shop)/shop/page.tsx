"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/app/components/productCard";
import InformationCardSkeleton from "@/app/components/skeleton/informationCardSkeleton";

interface ProductType {
  id: string;
  name: string;
  description?: string;
  price?: number;
  image?: string;
  createdAt: string;
}

export default function ShopPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/product");
      const data: ProductType[] = await res.json();
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <main className="flex-grow w-[95%] lg:w-[70%] mx-auto p-7 rounded box-shadow-paper-effect-3d hover:shadow-none">
      <h1 className="text-[48px] text-center">Product</h1>
      <h3 className="mb-3">
        Hello World!👋 Welcome to my shop, take a look for some of the product that maybe you interested😁
      </h3>

      {/* Container Product */}
      {loading ? (
        <div className="flex justify-center flex-wrap gap-6 py-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <InformationCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-10 py-6">
          {products.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </main>
  );
}
