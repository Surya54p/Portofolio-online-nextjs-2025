"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/app/components/productCard";

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

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/product");
      const data: ProductType[] = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <main className="flex-grow w-[95%] lg:w-[70%] mx-auto p-7 rounded box-shadow-paper-effect-3d hover:shadow-none">
      <h1 className="text-[48px]">Product</h1>

      {/* Container Product */}
      <div className="flex justify-between flex-wrap gap-6 py-6">
        {products.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}
