"use client";
import InformationCard from "@/app/components/InformationCard";
import InformationCardSkeleton from "@/app/components/skeleton/informationCardSkeleton";
import { useEffect, useState } from "react";

interface Info {
  id: number;
  src: string;
  title: string;
  summary: string;
  stack: string[];
  categoryId: number;
}

interface Category {
  id: number;
  name: string;
  description: string;
  order: number;
}

export default function Portofolio() {
  const [portfolios, setPortfolios] = useState<Info[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch poprtofolio
        const resPortfolios = await fetch("/api/portofolios");
        const dataPortfolios = await resPortfolios.json();

        // fetch kategori
        const resCategories = await fetch("/api/portofoliosCategory");
        const dataCategories = await resCategories.json();

        // console.log(dataPortfolios);
        setPortfolios(dataPortfolios);
        setCategories(dataCategories);
      } catch (error) {
        console.error("⚠️ Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mx-auto ">
      <div className="text-center font-semibold  text-[48px]">My Portofolio</div>
      {/* section */}
      {loading ? (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 items-start justify-items-center">
          <InformationCardSkeleton />
          <InformationCardSkeleton />
          <InformationCardSkeleton />
          <InformationCardSkeleton />
          <InformationCardSkeleton />
          <InformationCardSkeleton />
        </div>
      ) : (
        categories.map((category) => {
          const dataPerKategori = portfolios.filter((item) => item.categoryId === category.id);
          return (
            <Section
              key={category.id}
              title={category.name}
              description={category.description || "Tidak ada deskripsi kategori"}
              data={dataPerKategori}
            />
          );
        })
      )}
    </div>
  );
}

function Section({ title, description, data }: { title: string; description: string; data: Info[] }) {
  return (
    <>
      <div className="mb-10 mt-10">
        <fieldset className="border rounded-xl p-4">
          <legend className="text-[28px] font-semibold">{title}</legend>
          {description}
        </fieldset>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 items-start justify-items-center">
        {data.map((info, index: number) => (
          <InformationCard
            key={index}
            info={{
              src: info.src,
              title: info.title,
              summary: info.summary,
              stack: info.stack,
            }}
          />
        ))}
      </div>
    </>
  );
}
