"use client";
import { ButtonHTMLAttributes } from "react";

interface BasicButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function BasicButton({ children, className = "", ...props }: BasicButton) {
  return (
    <button className={`px-6 py-3 bg-[#f9f9f9]  rounded-full shadow-[0px_0.5px_10px_rgba(0,0.5,0,0.25)] ${className}`}
      {...props}>
      {children}
    </button>
  );
}
