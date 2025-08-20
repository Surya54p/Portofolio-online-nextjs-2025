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
      className={`px-6 py-3 rounded-full text-base font-medium border bg-white border-blue-500 text-blue
          hover:text-black hover:bg-gray-200
        transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {buttonText}
    </button>
  );
}
