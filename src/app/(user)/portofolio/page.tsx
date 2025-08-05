"use client";
import InformationCard from "@/app/components/InformationCard";
import InformationCardSkeleton from "@/app/components/skeleton/informationCardSkeleton";
import { setuid } from "process";
import { useEffect, useState } from "react";
import { FaLeaf } from "react-icons/fa";

type Info = {
  id: number;
  src: string;
  title: string;
  summary: string; // 🔥 ini bukan "content"
  category: string;
  stack: string[];
  createdAt: string;
};

export default function Portofolio() {
  const [webData, setWebData] = useState([]);
  const [uiuxData, setUiuxData] = useState([]);
  const [machineLearningData, setMachineLearningData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("api/portofolios");
        const data = await res.json();

        // const formattedData = data.map((item: any) => ({
        //   ...item,
        // }));

        const websites = data.filter((item: any) => item.category === "Web Development");
        const uiux = data.filter((item: any) => item.category === "UI/UX");
        const machineLearning = data.filter((item: any) => item.category === "Machine Learning");

        setWebData(websites);
        setUiuxData(uiux);
        setMachineLearningData(machineLearning);
        // console.log("✅succes fetching data");
      } catch (eror) {
        console.log("⚠️eror fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mx-auto ">
      <div className="text-center font-semibold  text-[48px]">My Portofolio</div>
      {/* Website Section */}
      {loading ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 items-start justify-items-center">
            <InformationCardSkeleton />
            <InformationCardSkeleton />
            <InformationCardSkeleton />
          </div>
        </>
      ) : (
        <Section
          title="Websites"
          description="Dolor proident proident deserunt proident occaecat quis veniam ea. Pariatur ad ullamco ea ullamco ad incididunt eu. Ex nulla consectetur proident occaecat eu Lorem deserunt dolor sint magna laborum deserunt. Dolor eu eu ullamco sit dolor ea id nulla minim."
          data={webData}
        />
      )}
      {/* UI/UX Section */}
      <Section
        title="UI/UX Design"
        description="Dolor proident elit sit ut reprehenderit incididunt. Occaecat mollit sit mollit laborum ipsum id eu ut voluptate sint reprehenderit enim incididunt culpa. Magna magna eiusmod qui magna quis. Eu enim dolor et sunt aliquip anim minim ipsum sint consectetur culpa exercitation Lorem proident. Minim aliquip minim dolore nostrud cupidatat laboris ex non irure."
        data={uiuxData}
      />
      {/* Machine Learning Section */}
      <Section
        title="Machine Learning"
        description="Id adipisicing sit consequat laborum sit ea esse elit eu. Magna labore minim aliqua enim cillum velit. Fugiat ullamco Lorem irure elit aute sunt duis.."
        data={machineLearningData}
      />
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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 items-start justify-items-center">
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
