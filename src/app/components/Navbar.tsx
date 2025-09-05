"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  // Tutup menu ketika klik di luar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinkClass = (href: string) =>
    clsx(
      "px-5 py-2 navBar  rounded-lg w-full block w-full  ",
      pathname === href ? " border-none bg-black text-white" : "text-black "
    );

  return (
    <nav className="bg-white shadow-md px-6 py-4  sticky top-0 z-50">
      {/* Mobile Top Bar */}
      <div ref={menuRef} className="flex  flex-col lg:hidden ">
        <div className="flex justify-between ">
          <div className="flex items-start flex-col w-[90%]">
            <div className="text-[20px]">Surya Ario Pratama</div>
            <div className="text-[15px] text-gray-600">Website | Machine Learning | UI/UX</div>
          </div>
          <div className="  flex justify-center items-center   w-[10%]">
            <button onClick={() => setOpen(!open)} className="text-black focus:outline-none ">
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
          </div>
        </div>
        {/* Mobile Menu */}
        {open && (
          <ul className="lg:hidden absolute top-full left-0 right-0 w-full bg-white shadow-md flex flex-col gap-2 px-4 pb-5 text-black font-medium z-50">
            <li>
              <Link href="/" className={`${navLinkClass("/")}`} onClick={() => setOpen(false)}>
                Home
              </Link>
            </li>
            {/* <li>
              <Link href="/portofolio" className={`${navLinkClass("/portofolio")}`} onClick={() => setOpen(false)}>
                Portofolio
              </Link>
            </li>
            <li>
              <Link href="/sertifikat" className={`${navLinkClass("/sertifikat")}`} onClick={() => setOpen(false)}>
                Sertifikat
              </Link>
            </li> */}
            <li>
              <Menu as="div" className="relative inline-block">
                <MenuButton className="inline-flex w-full  gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-300 hover:bg-gray-50">
                  My Credentials
                  <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    <MenuItem>
                      <a
                        href="/portofolio"
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                      >
                        Portofolios
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="/sertifikat"
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                      >
                        Certificates
                      </a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
            </li>
            {/* <li>
              <Link href="/about" className={`${navLinkClass("/about")}`} onClick={() => setOpen(false)}>
                About
              </Link>
            </li> */}
            <li>
              <Menu as="div" className="relative inline-block">
                <MenuButton className="inline-flex w-full  gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-300 hover:bg-gray-50">
                  Shop
                  <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
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
            {/* <li>
              <Link href="/contact" className={`${navLinkClass("/contact")}`} onClick={() => setOpen(false)}>
                Contact
              </Link> */}

            <li>
              <Menu as="div" className="relative inline-block">
                <MenuButton className="inline-flex w-full  gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-300 hover:bg-gray-50">
                  Else
                  <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    <MenuItem>
                      <a
                        href="/contact"
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                      >
                        Contact
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="/someTools"
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                      >
                        Tools
                      </a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
            </li>
            {/* </li> */}
          </ul>
        )}
      </div>

      {/* 
      
      Desktop Menu 
      
      */}
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
              <Menu as="div" className="relative inline-block">
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-300 hover:bg-gray-50">
                  My Credentials
                  <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    <MenuItem>
                      <a
                        href="/portofolio"
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                      >
                        Portofolios
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="/sertifikat"
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                      >
                        Certificates
                      </a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
            </li>
            {/* <li>
              <Link href="/about" className={navLinkClass("/about")}>
                About
              </Link>
            </li> */}
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
              <Menu as="div" className="relative inline-block">
                <MenuButton className="inline-flex w-full  gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-300 hover:bg-gray-50">
                  Else
                  <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    <MenuItem>
                      <a
                        href="/contact"
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                      >
                        Contact
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="/someTools"
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                      >
                        Tools
                      </a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
