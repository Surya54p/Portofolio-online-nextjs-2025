"use client";
import InformationCard from "@/app/components/InformationCard";
import InformationCardSkeleton from "@/app/components/skeleton/informationCardSkeleton";
import { useEffect, useState } from "react";

interface Info {
  id: number;
  img: string;
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

  const [selectedPortfolio, setSelectedPortfolio] = useState<Info | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resPortfolios = await fetch("/api/portofolios");
        const dataPortfolios = await resPortfolios.json();

        const resCategories = await fetch("/api/portofoliosCategory");
        const dataCategories = await resCategories.json();

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
    <div className="mx-auto">
      <div className="text-center font-semibold text-[48px]">My Portofolio</div>

      {loading ? (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 items-start justify-items-center">
          {Array.from({ length: 6 }).map((_, i) => (
            <InformationCardSkeleton key={i} />
          ))}
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
              onClick={(portfolio) => setSelectedPortfolio(portfolio)}
            />
          );
        })
      )}

      {/* Modal */}
      {selectedPortfolio && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setSelectedPortfolio(null)}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-[90%] overflow-hidden shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gambar */}
            <div className="relative bg-black flex items-center justify-center">
              <img
                src={selectedPortfolio.img ?? "https://via.placeholder.com/600x300"}
                alt={selectedPortfolio.title}
                className="w-full max-h-80 object-contain"
              />
              <button
                onClick={() => setSelectedPortfolio(null)}
                className="absolute top-3 right-3 bg-gray-200 hover:bg-gray-300 rounded-full p-2"
              >
                ✕
              </button>
            </div>

            {/* Konten */}
            <div className="p-4 space-y-3">
              <h2 className="text-xl font-semibold">{selectedPortfolio.title}</h2>
              <div className="flex gap-2 flex-wrap">
                {selectedPortfolio.stack.map((tech, idx) => (
                  <span key={idx} className="px-2 py-1 bg-gray-200 rounded text-xs">
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-gray-700 whitespace-pre-line">{selectedPortfolio.summary}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Section({
  title,
  description,
  data,
  onClick,
}: {
  title: string;
  description: string;
  data: Info[];
  onClick: (portfolio: Info) => void;
}) {
  return (
    <>
      <div className="mb-10 mt-10">
        <fieldset className="border rounded-xl p-4">
          <legend className="text-[28px] font-semibold">{title}</legend>
          {description}
        </fieldset>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 items-start justify-items-center line-clamp-3">
        {data.map((info) => (
          <div key={info.id} onClick={() => onClick(info)} className="cursor-pointer w-full">
            <InformationCard
              info={{
                img: info.img,
                title: info.title,
                summary: info.summary,
                stack: info.stack,
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
}
