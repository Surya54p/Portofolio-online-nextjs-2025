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
    <div className="flex flex-col md:flex-row border md:items-center border-gray-300 rounded-xl justify-between  mb-3 py-8 px-10 sm:mb-8 sm:px-6 sm:py-4 ">

      <div className=" mb-4 block">
        <span className="text-2xl font-bold ">Gracias </span> <br />
        Terimakasih buat kamu yang sudah support!🔥
      </div>

      <div className="flex flex-row">
        <div className="marqueVertical-container h-32 overflow-hidden relative">
          <div className="marqueVertical animate-marqueeVertical text-center">
            {likes.concat(likes).map((like, index) => (
              <span key={index} className="mx-10 text-lg font-medium text-gray-700">
                {like.nama}
              </span>
            ))}
          </div>
        </div>
        <div className="marqueVertical-container h-32 overflow-hidden relative">
          <div className="marqueVertical animate-marqueeVertical2 text-center">
            {likes.concat(likes).map((like, index) => (
              <span key={index} className="mx-10 text-lg font-medium text-gray-700">
                {like.nama}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
