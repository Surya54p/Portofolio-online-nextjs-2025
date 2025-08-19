"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function ShopSidebar() {
  const pathname = usePathname();

  const navLinkClass = (href: string) =>
    clsx(
      "px-4 py-2 rounded transition",
      pathname === href ? "bg-blue-500 text-white" : "text-gray-800 hover:bg-gray-200"
    );

  return (
    <div className="flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col bg-white shadow-lg p-4 sticky top-[75px] h-screen z-40">
        <div className="flex items-center gap-3 mb-8">
          <div>
            <div className="text-lg font-semibold">Welcome to the shop!</div>
            <div className="text-sm text-gray-600">Have a good day</div>
          </div>
        </div>
        <nav className="flex-1 flex flex-col gap-2">
          <Link href="/shop" className={navLinkClass("/shop")}>
            Product
          </Link>
          <Link href="/contact" className={navLinkClass("/contact")}>
            Contact
          </Link>
          <Link href="/laporkanPage" className={navLinkClass("/laporkanPage")}>
            Laporkan kesalahan
          </Link>
        </nav>
      </aside>

      {/* Navbar - Mobile */}
      <nav className="lg:hidden w-full h-fit  bg-white shadow-md flex justify-around py-3 z-50 sticky top-0">
        <Link
          href="/shop"
          className={clsx("text-sm font-medium", pathname === "/shop" ? "text-blue-500" : "text-gray-700")}
        >
          Product
        </Link>
        <Link
          href="/contact"
          className={clsx("text-sm font-medium", pathname === "/contact" ? "text-blue-500" : "text-gray-700")}
        >
          Contact
        </Link>
        <Link
          href="/laporkanPage"
          className={clsx("text-sm font-medium", pathname === "/contact" ? "text-blue-500" : "text-gray-700")}
        >
          Laporkan kesalahan
        </Link>
      </nav>
    </div>
  );
}
