"use client";

import Image from "next/image";
import { useState } from "react";

type Info = {
  src: string;
  title: string;
  content: string;
  stack: string;
};

type CardProps = {
  information: Info[];
};

export default function InformationCard({ information }: CardProps) {
  return (
    <div className="w-[300px] h-fit rounded-xl overflow-hidden border shadow bg-white">
      {information.map((info, index) => (
        <CardItem key={index} info={info} />
      ))}
    </div>
  );
}

function CardItem({ info }: { info: Info }) {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => setExpanded(!expanded);

  const shouldTruncate = info.content.length > 100;
  const displayedText = expanded || !shouldTruncate ? info.content : info.content.slice(0, 100) + "...";

  return (
    <>
      <div className="relative h-[200px] w-full">
        <Image src={`/img/${info.src}`} alt={info.title} fill className="object-cover" />
      </div>

      <div className="p-4">
        <h2 className="text-xl font-semibold">{info.title}</h2>
        <h2 className="text-[13px] text-gray-600">{info.stack}</h2>
        <p className="text-sm text-gray-600 mt-2">{displayedText}</p>

        {shouldTruncate && (
          <button className="mt-2 text-blue-500 hover:underline text-sm" onClick={toggleExpand}>
            {expanded ? "Sembunyikan" : "Baca selengkapnya"}
          </button>
        )}
      </div>
    </>
  );
}
