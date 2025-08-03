"use client";
// import Image from "next/image";
import { useEffect, useState } from "react";
import StatsCardList from "@/app/components/DashboardStatisticCard";
export default function Dashboard() {
  // Get like
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalViewers, setTotalViewers] = useState(0);
  const [totalPortofolios, setTotalPortofolios] = useState(0);

  useEffect(() => {
    const fetchLikes = async () => {
      const response = await fetch("/api/like");
      const data = await response.json();
      setTotalLikes(data.totalLikes);
    };

    const fetchViewers = async () => {
      const response = await fetch("/api/viewers");
      const dataViewers = await response.json();
      setTotalViewers(dataViewers.totalViewersAPI);
    };
    const fetchPortofolios = async () => {
      const response = await fetch("/api/portofolios");
      const dataPortofolios = await response.json();
      setTotalPortofolios(dataPortofolios.totalPortofoliosAPI);
    };
    fetchPortofolios();
    fetchViewers();
    fetchLikes();
  }, []);

  const statData = [
    { title: "Likes", amount: totalLikes },
    { title: "Viewers", amount: totalViewers },
    { title: "Portofolios", amount: totalPortofolios },
  ];
  return (
    <div>
      <h1 className="text-[26px] italic  ">Welcome back, admin! 🔥</h1>
      <div className="flex items-center">
        <StatsCardList items={statData} />
      </div>
    </div>
  );
}
