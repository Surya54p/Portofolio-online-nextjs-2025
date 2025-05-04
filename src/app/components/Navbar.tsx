"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navLinkClass = (href: string) =>
    clsx(
      "rounded-full px-5 py-2 navBar",
      pathname === href ? "bg-black text-white" : "text-black"
    );

  return (
    <nav className="bg-white shadow-md px-6 py-4 mb-5 sticky top-0 z-50">
      {/* Mobile Top Bar */}
      <div className="flex items-center justify-between lg:hidden">
        <div className="text-xl font-bold text-black">My Portofolio</div>
        <button
          onClick={() => setOpen(!open)}
          className="text-black focus:outline-none"
        >
          {/* Hamburger & Close */}
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <ul className="absolute top-full left-0 right-0 w-full bg-white shadow-md flex flex-col gap-4 px-6 py-4 lg:hidden text-black font-medium z-50">
          <li>
            <Link href="/" className={navLinkClass("/")}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/like" className={navLinkClass("/like")}>
              Like
            </Link>
          </li>
          <li>
            <Link href="/portofolio" className={navLinkClass("/portofolio")}>
              Portofolio
            </Link>
          </li>
          <li>
            <Link href="/about" className={navLinkClass("/about")}>
              About
            </Link>
          </li>
        </ul>
      )}

      {/* Desktop Menu */}
      <ul className="hidden lg:flex gap-5 items-center justify-end mt-4 text-black font-medium">
        <li>
          <Link href="/" className={navLinkClass("/")}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/like" className={navLinkClass("/like")}>
            Like
          </Link>
        </li>
        <li>
          <Link href="/portofolio" className={navLinkClass("/portofolio")}>
            Portofolio
          </Link>
        </li>
        <li>
          <Link href="/about" className={navLinkClass("/about")}>
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}
