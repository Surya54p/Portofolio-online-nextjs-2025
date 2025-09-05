// components/InformationCard.tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRef } from "react";
export type Info = {
  img: string;
  title: string;
  summary: string; // 🔥 ini bukan "summary"
  stack: string[];
};

type CardProps = {
  info: Info;
};

export default function InformationCard({ info }: CardProps) {
  const [expanded, setExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  const toggleExpand = () => setExpanded(!expanded);
  useEffect(() => {
    if (textRef.current) {
      const el = textRef.current;
      setIsClamped(el.scrollHeight > el.clientHeight);
    }
  }, [info.summary]);
  return (
    <div className="w-[270px] h-fit rounded-xl overflow-hidden border shadow bg-white">
      <div className="relative h-[200px] w-full">
        <Image src={info.img} alt={info.title} fill className="object-cover" />
      </div>

      <div className="p-4">
        <h2 className="text-xl font-semibold">{info.title}</h2>
        <h3 className="text-[13px] text-gray-600">{info.stack.join(" | ")}</h3>

        <p
          ref={textRef}
          className={`text-sm text-gray-600 mt-2  
          ${expanded ? "" : "line-clamp-3"}`}
        >
          {info.summary}
        </p>
        {isClamped && (
          <button className="mt-2 text-blue-500 hover:underline text-sm" onClick={toggleExpand}>
            {expanded ? "Sembunyikan" : "Baca selengkapnya"}
          </button>
        )}
      </div>
    </div>
  );
}
