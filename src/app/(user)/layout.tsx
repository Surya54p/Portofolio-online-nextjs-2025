// app/layout.tsx
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import "@/app/globals.css";
// import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {/* <Toaster position="top-center" reverseOrder={false} /> */}
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
 