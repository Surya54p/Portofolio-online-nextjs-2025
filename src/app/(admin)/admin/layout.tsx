// import ".../globals.css";
import AdminNavbar from "@/app/components/AdminNavbar";
export const metadata = {
  title: "Admin Panel",
  description: "Admin layout",
};

// src/app/(admin)/layout.tsx
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <AdminNavbar/>
        <nav>Navbar Admin</nav>
        {children}
      </body>
    </html>
  );
}

