"use client";

import Image from "next/image";

interface ToolCardProps {
  name: string;
  desc: string;
  img: string;
  link: string;
  techStack: string[];
}

export function HorizontalCardWithImage({ name, desc, img, link, techStack }: ToolCardProps) {
  return (
    <div className="border border-gray-300 rounded-lg p-6 hover:shadow-md transition flex flex-col justify-between gap-4 cursor-pointer">
      {/* Content Row */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">{name}</h3>
          <p className="text-gray-600 text-sm line-clamp-3">{techStack.join(" | ")}</p>
          <p className="text-gray-600 text-sm line-clamp-3">{desc}</p>
        </div>
        <div className="w-20 h-20 relative">
          <Image src={img} alt={name} fill className="object-cover rounded-md" />
        </div>
      </div>

      {/* Action Button */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full mt-2 py-2 px-4 text-sm border border-gray-300 rounded-md hover:bg-gray-100 transition text-center"
      >
        Lihat Tools
      </a>
    </div>
  );
}
