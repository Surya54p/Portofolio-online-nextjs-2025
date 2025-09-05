"use client";

import Image from "next/image";

interface ToolCardProps {
  name: string;
  description: string;
  img: string;
  link: string;
  techStack: string[];
}

export function HorizontalCardWithImage({ name, description, img, link, techStack }: ToolCardProps) {
  return (
    <div className="border border-gray-300 rounded-lg p-4 hover:shadow-md transition flex flex-col gap-3 cursor-pointer">
      <div className="w-full aspect-[4/3] relative">
        <Image src={img} alt={name} fill className="object-cover rounded-md" />
      </div>
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-gray-600 text-sm line-clamp-3">{techStack.join(" | ")}</p>
      <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 py-2 px-4 text-sm border border-gray-300 rounded-md hover:bg-gray-100 text-center"
      >
        Lihat Tools
      </a>
    </div>
  );
}
