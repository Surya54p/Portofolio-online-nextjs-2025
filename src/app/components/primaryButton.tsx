"use client";

import React from "react";
import Link from "next/link";

interface PrimaryButtonProps {
  buttonText: string;
  href?: string; // kalau ada → jadi link
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

export default function PrimaryButton({
  buttonText,
  href,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: PrimaryButtonProps) {
  const baseClass = `px-6 py-3 rounded-full text-base font-medium border bg-blue-500 text-white border-gray-200 
    hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`;

  if (href) {
    // kalau ada href → jadikan Link
    return (
      <Link href={href} className={baseClass}>
        {buttonText}
      </Link>
    );
  }

  // default tetap button
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={baseClass}>
      {buttonText}
    </button>
  );
}
