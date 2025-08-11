"use client";

import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function Page() {
  const [status, setStatus] = useState("⏳ Menghubungkan ke Supabase...");

  useEffect(() => {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

    (async () => {
      const { data, error } = await supabase.storage.from("bucket-images").list();

      if (error) {
        console.error("❌ Gagal konek:", error.message);
        setStatus(`❌ Gagal konek: ${error.message}`);
      } else {
        console.log("✅ Koneksi berhasil. Bucket:", data);
        setStatus(`✅ Koneksi berhasil! Jumlah file di bucket: ${data.length}`);
      }
    })();
  }, []);

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1 style={{ marginBottom: "1rem" }}>Testing Supabase Bucket List</h1>
      <div style={{ fontSize: "18px" }}>{status}</div>
    </main>
  );
}
