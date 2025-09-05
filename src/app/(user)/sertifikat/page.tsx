"use client";
import InformationCard from "@/app/components/InformationCard";
import InformationCardSkeleton from "@/app/components/skeleton/informationCardSkeleton";
// import { Certificate } from "crypto";
import { useEffect, useState } from "react";

interface Info {
  id: string;
  img: string;
  title: string;
  summary: string;
  category: string;
}

export default function Sertifikat() {
  const [certificate, setCertificate] = useState<Info[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch poprtofolio
        const resCertificate = await fetch("/api/certificate/userCertificate");
        const dataCertif = await resCertificate.json();

        setCertificate(dataCertif);
      } catch (error) {
        console.error("⚠️ Error fetching data certificate:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mx-auto ">
      <div className="text-center font-semibold  text-[48px]">My Certificate</div>
      {/* section */}
      {loading ? (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 justify-items-center">
          {Array.from({ length: 6 }).map((_, i) => (
            <InformationCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 justify-items-center">
          {certificate.map((c) => (
            <Section
              key={c.id}
              title={c.title}
              category={c.category}
              img={c.img}
              summary={c.summary || "Tidak ada deskripsi kategori"}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Section({ title, summary, img, category }: { title: string; summary: string; img: string; category: string }) {
  return (
    <>
      <InformationCard
        info={{
          img,
          title,
          summary,
          stack: [category], // category dijadikan array biar match prop `stack`
        }}
      />
    </>
  );
}
