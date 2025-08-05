// src/app/(admin)/layout.tsx
import "@/app/globals.css";
import SidebarNav from "@/app/components/AdminNavbar";
import LoadingModal from "@/app/components/loading/loadingModal";
export const metadata = {
  title: "Admin Panel",
  description: "Admin layout",
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-black">
        <div className="flex min-h-screen">
          <SidebarNav />
          <LoadingModal /> {/* 👈 Tempatkan di sini, di atas konten */}
          <main className="flex-1 p-10 ">{children}</main>
        </div>
      </body>
    </html>
  );
}
