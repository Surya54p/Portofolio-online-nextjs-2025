"use client";
import { useEffect, useState } from "react";

interface Like {
  id: string;
  nama: string;
}

export default function LikeMarquee() {
  const [likes, setLikes] = useState<Like[]>([]);

  useEffect(() => {
    async function fetchLikes() {
      try {
        const res = await fetch("/api/like");
        const data = await res.json();
        setLikes(data.likes || []);
      } catch (error) {
        console.error("Gagal ambil data likes:", error);
      }
    }
    fetchLikes();
  }, []);

  return (
    <div className="">
      <span>Gracias yang sudah support!🔥</span>
      <div className="overflow-hidden whitespace-nowrap border-y my-5  border-gray-300 bg-white flex flex-row ">
        <div className="inline-block animate-marquee py-2 ">
          {likes.concat(likes).map((like, index) => (
            <span key={index} className="mx-10 text-lg font-medium text-gray-700">
              {like.nama}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
