"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa"; // Pastikan sudah install react-icons

type aboutCardProps = {
  title: string;
  content: string;
};

export default function AboutCard({ title, content }: aboutCardProps) {
  //   const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);
  return (
    // <div
    //   onClick={() => setExpanded(!expanded)}
    //   className={`cursor-pointer border rounded p-4 mt-4 transition-all duration-300 ease-in-out overflow-hidden ${
    //     expanded ? "max-h-[500px]" : "max-h-[60px]"
    //   }`}
    // >
    //   <h2 className="font-semibold mb-2">{title}</h2>
    //   <p className="text-sm text-gray-700">{content}</p>
    // </div>
    <div className="border rounded p-4 mt-4 cursor-pointer" onClick={() => setVisible(!visible)}>
      <div className="flex justify-between items-center">
        <h2 className="font-semibold ">{title}</h2>
        <FaChevronDown className={`transition-transform duration-300 ${visible ? "rootate-180" : "rotate-0"}`} />
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out
        ${visible ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"}`}
      >
        <p className="">{content}</p>
      </div>
    </div>
  );
}
