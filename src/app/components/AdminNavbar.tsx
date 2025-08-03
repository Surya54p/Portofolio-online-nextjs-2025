"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import { signOut } from "next-auth/react";

export default function SidebarNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navLinkClass = (href: string) =>
    clsx(
      "block px-4 py-2 rounded hover:bg-gray-200 transition",
      pathname === href ? "bg-black text-white" : "text-gray-800"
    );

  return (
    <div className="flex min-h-screen w-fit ">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col  bg-white shadow-lg p-4 sticky top-0 h-screen z-40">
        <div className="flex items-center gap-3 mb-8">
          <Image
            src="/img/logoS.webp"
            alt="Logo"
            width={45}
            height={45}
            className="bg-[#212121] p-2 rounded-full"
          />
          <div>
            <div className="text-lg font-semibold">Welcome Back sir!</div>
            <div className="text-sm text-gray-600">Have a good day</div>
          </div>
        </div>
        <nav className="flex-1">
          <Link href="/admin/dashboard" className={navLinkClass("/")}>
            Dashboard
          </Link>
          <Link href="/portofolio" className={navLinkClass("/portofolio")}>
            Portofolio
          </Link>
          <Link href="/about" className={navLinkClass("/about")}>
            About
          </Link>
        </nav>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      </aside>

      {/* Mobile - Hamburger */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button onClick={() => setOpen(!open)} className="text-black">
          {open ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Sidebar Drawer */}
      <div
        className={clsx(
          "lg:hidden fixed top-0 left-0 h-full w-64 bg-white shadow-md z-40 transform transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center gap-3 p-4 border-b">
          <Image
            src="/img/logoS.webp"
            alt="Logo"
            width={40}
            height={40}
            className="bg-[#212121] p-2 rounded-full"
          />
          <div>
            <div className="text-lg font-semibold">Welcome Admin</div>
            <div className="text-sm text-gray-600">Have a good day sir!</div>
          </div>
        </div>
        <nav className="p-4">
          <Link href="/" className={navLinkClass("/")}>
            Home
          </Link>
          <Link href="/portofolio" className={navLinkClass("/portofolio")}>
            Portofolio
          </Link>
          <Link href="/about" className={navLinkClass("/about")}>
            About
          </Link>
        </nav>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="mx-4 my-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
    </div>
  );
}
