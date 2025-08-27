"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

type aboutCardProps = {
  title: string;
  content: string;
};

export default function AboutCard({ title, content }: aboutCardProps) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="border rounded p-4 mt-4 cursor-pointer h-fit" onClick={() => setVisible(!visible)}>
      <div className="flex justify-between items-center">
        <h2 className="font-semibold ">{title}</h2>
        <FaChevronDown className={`transition-transform duration-300 ${visible ? "ro  tate-180" : "rotate-0"}`} />
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 
        ${visible ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"}`}
      >
        <p className="">{content}</p>
      </div>
    </div>
  );
}
