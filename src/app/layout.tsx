// src/app/layout.tsx

import Head from "next/head";
import { ReactNode } from "react";
import Navbar from "./components/Navbar"; // Sesuaikan dengan path komponen Navbar
import Footer from "./components/Footer"; // Sesuaikan dengan path komponen Footer
import { Lora, Noto_Sans, Quicksand } from "next/font/google";
import "./globals.css";

const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });
const notoSans = Noto_Sans({ subsets: ["latin"], variable: "--font-noto" });
const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout = ({ children, title = "defaultTitle" }: LayoutProps) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <link rel="stylesheet" href="/css/basic.css" />
        <title>{title}</title>

        {/* <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script> */}
      </head>

      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default Layout;
