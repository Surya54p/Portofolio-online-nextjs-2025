// src/app/layout.tsx

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../globals.css";

// src/app/about/layout.tsx

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-grow w-full sm:w-[90%] md:max-w-[80%] lg:max-w-[70%] mx-auto p-7 rounded box-shadow-paper-effect-3d hover:shadow-none">
      {children}
    </main>
  );
}
