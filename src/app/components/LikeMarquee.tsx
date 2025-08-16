"use client";
import { useEffect, useState } from "react";

interface Like {
  id: string;
  nama: string;
}

export default function LikeMarquee() {
  const [likes, setLikes] = useState<Like[]>([]);
  const [positions, setPositions] = useState<number[]>([]);

  useEffect(() => {
    async function fetchLikes() {
      try {
        const res = await fetch("/api/like");
        const data = await res.json();
        const arr: Like[] = data.likes || [];
        setLikes(arr);

        // bikin random posisi top (0–80%) biar tidak terlalu mepet atas/bawah
        setPositions(arr.map(() => Math.floor(Math.random() * 80)));
      } catch (error) {
        console.error("Gagal ambil data likes:", error);
      }
    }
    fetchLikes();
  }, []);

  return (
    <div className="flex flex-col border border-gray-300 rounded-xl justify-between items-center mb-8 py-2 x-10">
      <span className="text-2xl font-bold  text-center block">Gracias yang sudah support!🔥</span>

      <div className="relative h-64 overflow-hidden   w-full ">
        {likes.map((like, index) => (
          <span
            key={like.id ?? index}
            className="absolute px-4 py-2  bg-white rounded shadow animate-marquee-horizontal whitespace-nowrap"
            style={{
              top: `${positions[index]}%`,
              animationDelay: `${index * 1}s`, // muncul bergiliran
            }}
          >
            {like.nama}
          </span>
        ))}
      </div>
    </div>
  );
}
