"use client";

import React from "react";

interface PrimaryButtonProps {
  buttonText: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

export default function PrimaryButton({
  buttonText,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-full text-base font-medium border bg-blue-500 text-white border-gray-200 
         shadow-[0_4px_4px_rgba(0,0,0,0.1)] hover:bg-white hover:text-black
        transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {buttonText}
    </button>
  );
}
