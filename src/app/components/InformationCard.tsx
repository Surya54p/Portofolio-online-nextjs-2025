// components/InformationCard.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

export type Info = {
  src: string;
  title: string;
  summary: string; // 🔥 ini bukan "summary"
  stack: string[];
};

type CardProps = {
  info: Info;
};

export default function InformationCard({ info }: CardProps) {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => setExpanded(!expanded);

  const shouldTruncate = info.summary.length > 100;
  const displayedText = expanded || !shouldTruncate ? info.summary : info.summary.slice(0, 100) + "...";

  return (
    <div className="w-[300px] h-fit rounded-xl overflow-hidden border shadow bg-white">
      <div className="relative h-[200px] w-full">
        <Image src={info.src} alt={info.title} fill className="object-cover" />
      </div>

      <div className="p-4">
        <h2 className="text-xl font-semibold">{info.title}</h2>
        <h3 className="text-[13px] text-gray-600">{info.stack.join(" | ")}</h3>
        <p className="text-sm text-gray-600 mt-2">{displayedText}</p>

        {shouldTruncate && (
          <button className="mt-2 text-blue-500 hover:underline text-sm" onClick={toggleExpand}>
            {expanded ? "Sembunyikan" : "Baca selengkapnya"}
          </button>
        )}
      </div>
    </div>
  );
}
