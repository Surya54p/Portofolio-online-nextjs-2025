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
      "block px-4 py-2 rounded transition",
      pathname === href
        ? "bg-blue-500 text-white" // warna latar biru + teks putih saat aktif
        : "text-gray-800 hover:bg-gray-200" // warna normal
    );

  return (
    <div className="flex min-h-screen w-fit ">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col  bg-white shadow-lg p-4 sticky top-0 h-screen z-40">
        <div className="flex items-center gap-3 mb-8">
          <Image src="/img/logoS.webp" alt="Logo" width={45} height={45} className="bg-[#212121] p-2 rounded-full" />
          <div>
            <div className="text-lg font-semibold">Welcome Back sir!</div>
            <div className="text-sm text-gray-600">Have a good day</div>
          </div>
        </div>
        <nav className="flex-1 flex flex-col gap-2">
          <Link href="/admin" className={navLinkClass("/admin")}>
            Dashboard
          </Link>
          <Link href="/admin/portofolioManagement" className={navLinkClass("/admin/portofolioManagement")}>
            Portofolio Management
          </Link>
          <Link href="/admin/certificateManagement" className={navLinkClass("/admin/certificateManagement")}>
            Certificate Management
          </Link>
          <Link href="/admin/likeManagement" className={navLinkClass("/admin/likeManagement")}>
            Like Management
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
      <div className="lg:hidden fixed top-4 left-4 z-50 ">
        <button onClick={() => setOpen(!open)} className="text-black p-1 border rounded-2xl  bg-white">
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
      {/* Overlay */}
      {open && <div className="fixed inset-0 bg-gray-500 opacity-50 z-30" onClick={() => setOpen(false)} />}

      {/* Sidebar */}
      <div
        className={clsx(
          "lg:hidden fixed top-0 left-0 h-full w-64 bg-white shadow-md z-40 flex flex-col justify-between",
          open ? "translate-x-0" : "-translate-x-full",
          "transition-transform duration-300"
        )}
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-2 px-4 pt-6 pb-4 border-b">
          <Image src="/img/logoS.webp" alt="Logo" width={40} height={40} className="bg-[#212121] p-2 rounded-full" />
          <div className="text-center">
            <div className="text-lg font-semibold">Welcome Back sir!</div>
            <div className="text-sm text-gray-600">Have a good day</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col px-4 mt-4 gap-2">
          <Link href="/admin" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Dashboard
          </Link>
          <Link href="/admin/portofolioManagement" className="px-4 py-2 hover:bg-gray-100 rounded">
            Portofolio Management
          </Link>{" "}
          <Link href="/admin/certificateManagement" className="px-4 py-2 hover:bg-gray-100 rounded">
            Certificate Management
          </Link>
          <Link href="/admin/likeManagement" className="px-4 py-2 hover:bg-gray-100 rounded">
            Like Management
          </Link>
        </nav>

        {/* Logout */}
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="mx-4 mb-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
