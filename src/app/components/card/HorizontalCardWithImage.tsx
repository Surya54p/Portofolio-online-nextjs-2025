"use client";

import Image from "next/image";
import { useState } from "react";

interface ToolCardProps {
  name: string;
  description: string;
  img: string;
  link: string;
  techStack: string[];
}

export function HorizontalCardWithImage({ name, description, img, link, techStack }: ToolCardProps) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {/* Desktop Card */}
      <div className="hidden lg:flex flex-col border border-gray-300 rounded-lg p-4 hover:shadow-md transition gap-3 cursor-pointer">
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

      {/* Mobile Button */}
      <div className="lg:hidden border border-gray-300 rounded p-3 cursor-pointer" onClick={() => setOpenModal(true)}>
        {name}
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-4 max-w-md w-full relative">
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow z-[9999]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-700"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 8.586L15.95 2.636a1 1 0 111.414 1.414L11.414 10l5.95 5.95a1 1 0 11-1.414 1.414L10 11.414l-5.95 5.95a1 1 0 11-1.414-1.414L8.586 10 2.636 4.05a1 1 0 011.414-1.414L10 8.586z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="w-full aspect-[4/3] relative mb-3">
              <Image src={img} alt={name} fill className="object-cover rounded-md" />
            </div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-gray-600 text-sm ">{techStack.join(" | ")}</p>
            <p className="text-gray-600 text-sm ">{description}</p>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 py-2 px-4 text-sm border border-gray-300 rounded-md hover:bg-gray-100 text-center block"
            >
              Lihat Tools
            </a>
          </div>
        </div>
      )}
    </>
  );
}
