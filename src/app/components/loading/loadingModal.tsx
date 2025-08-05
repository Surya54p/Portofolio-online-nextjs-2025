"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function LoadingModal() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    // Trigger setelah semua elemen UI dirender (simulasi finish load)
    const afterPaint = requestAnimationFrame(() => {
      setLoading(false);
    });

    return () => {
      cancelAnimationFrame(afterPaint); // Bersih-bersih kalau unmount
    };
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-md shadow-lg">
        <div className="animate-spin h-8 w-8 border-4 border-black border-t-transparent rounded-full mx-auto" />
        <p className="text-center mt-2">Loading...</p>
      </div>
    </div>
  );
}
