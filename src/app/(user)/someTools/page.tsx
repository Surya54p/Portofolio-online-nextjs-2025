"use client";
import { HorizontalCardWithImage } from "@/app/components/card/HorizontalCardWithImage";
// import { error } from "console";
import { useEffect, useState } from "react";

interface ToolCardProps {
  id: string;
  name: string;
  description: string;
  img: string;
  link: string;
  techStack: string[];
}

export default function SomeTools() {
  const [tools, setTools] = useState<ToolCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  // ambil data di database dengan api
  useEffect(() => {
    const fetchTools = async () => {
      try {
        const res = await fetch("/api/someTools");
        if (!res.ok) throw new Error("❌ Fetch failed");
        const data: ToolCardProps[] = await res.json();
        setTools(data);
        setLoading(false);
      } catch (error) {
        console.log("❌ Erro fetching data: ", error);
      }
    };
    fetchTools();
  }, []);

  return (
    <main className="flex-grow w-full sm:w-[80%] md:max-w-[70%] lg:max-w-[50%] mx-auto p-7 rounded box-shadow-paper-effect-3d hover:shadow-none ">
      {/* Hero Card */}
      <div className="flex flex-col gap-6">
        <div className="w-full max-w-5xl bg-white border border-gray-300 rounded-lg p-8 flex flex-col md:flex-row items-center gap-6 shadow-md">
          {/* Left Content */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">Some tools I made</h1>
            <p className="text-gray-600 mb-4">
              Deskripsi singkat mengenai tools yang sudah dibuat, fungsinya apa dan manfaat utamanya.
            </p>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Get Started
            </button>
          </div>

          {/* Right Image */}
          <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Image</span>
          </div>
        </div>
        {/* button act */}

        {/* Tools Buttons Section */}
        <div className="flex justify-center  items-center">
          <div className=" grid grid-cols-2  gap-6 w-full max-w-3xl">
            {loading ? (
              <p>Loading...</p>
            ) : tools.length > 0 ? (
              tools.map((tool) => (
                <HorizontalCardWithImage
                  key={tool.id}
                  name={tool.name}
                  description={tool.description ?? "Tidak ada deskripsi"}
                  techStack={tool.techStack}
                  img={tool.img ?? "/img/placeholder.png"}
                  link={tool.link ?? "#"}
                />
              ))
            ) : (
              "data tidak ada"
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
