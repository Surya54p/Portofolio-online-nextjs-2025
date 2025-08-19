"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navLinkClass = (href: string) =>
    clsx("rounded-full px-5 py-2 navBar", pathname === href ? "bg-black text-white" : "text-black");

  return (
    <nav className="bg-white shadow-md px-6 py-4  sticky top-0 z-50">
      {/* Mobile Top Bar */}
      <div className="flex items-center justify-between lg:hidden">
        <div className="flex items-start flex-col ">
          <div className="text-[20px]">Surya Ario Pratama</div>
          <div className="text-[15px] text-gray-600">Website | Machine Learning | UI/UX</div>
        </div>
        <button onClick={() => setOpen(!open)} className="text-black focus:outline-none">
          {/* Hamburger & Close */}
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
        {/* Mobile Menu */}
        {open && (
          <ul className="lg:hidden absolute top-full left-0 right-0 w-full bg-white shadow-md flex flex-col gap-4 px-6 py-4 text-black font-medium z-50">
            <li>
              <Link href="/" className={navLinkClass("/")} onClick={() => setOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/portofolio" className={navLinkClass("/portofolio")} onClick={() => setOpen(false)}>
                Portofolio
              </Link>
            </li>
            <li>
              <Link href="/about" className={navLinkClass("/about")} onClick={() => setOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link href="/shop" className={navLinkClass("/shop")} onClick={() => setOpen(false)}>
                shop
              </Link>
            </li>
            <li>
              <Link href="/contact" className={navLinkClass("/contact")} onClick={() => setOpen(false)}>
                Contact
              </Link>
            </li>
          </ul>
        )}
      </div>

      {/* Desktop Menu */}
      <div className="flex justify-between items-center ">
        {/* Logo dan Nama - hanya muncul di desktop */}
        <div className="hidden lg:flex w-fit my-auto items-center gap-3">
          <Image src="/img/logoS.webp" alt="Logo" width={45} height={45} className="bg-[#212121] p-2 rounded-full" />
          <div className="flex items-start flex-col">
            <div className="text-[20px]">Surya Ario Pratama</div>
            <div className="text-[15px] text-gray-600">Website | Machine Learning | UI/UX</div>
          </div>
        </div>
        <div className=" w-fit">
          <ul className="hidden  lg:flex gap-5 items-center justify-end my-3 text-black font-medium">
            <li>
              <Link href="/" className={navLinkClass("/")}>
                Home
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
            <li>
              <Menu as="div" className="relative inline-block">
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-300 hover:bg-gray-50">
                  Shop
                  <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    <MenuItem>
                      <a
                        href="/shop"
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                      >
                        Product
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                      >
                        Laporkan masalah
                      </a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
            </li>
            <li>
              <Link href="/contact" className={navLinkClass("/contact")} onClick={() => setOpen(false)}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
