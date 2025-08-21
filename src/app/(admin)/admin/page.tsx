"use client";
// import Image from "next/image";
import { useEffect, useState } from "react";
import StatsCardList from "@/app/components/DashboardStatisticCard";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/componentsShadcn/ui/table";

interface likeInfo {
  id: string;
  nama: string;
  createdAt: string;
}

export default function Dashboard() {
  // Get like
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalViewers, setTotalViewers] = useState(0);
  const [totalPortofolios, setTotalPortofolios] = useState(0);
  const [infoLikes, setInfoLikes] = useState<likeInfo[]>([]);

  useEffect(() => {
    const fetchLikes = async () => {
      const response = await fetch("/api/like");
      const data = await response.json();
      setTotalLikes(data.totalLikes);
      setInfoLikes(data.InfoLikes);
    };

    const fetchViewers = async () => {
      const response = await fetch("/api/viewers");
      const dataViewers = await response.json();
      setTotalViewers(dataViewers.totalViewersAPI);
    };
    const fetchPortofolios = async () => {
      const response = await fetch("/api/portofolios/count");
      const dataPortofolios = await response.json();
      setTotalPortofolios(dataPortofolios.totalPortofoliosAPI);
    };
    fetchPortofolios();
    fetchViewers();
    fetchLikes();
  }, []);

  return (
    <div className="lg:w-full ">
      {/* container utama */}
      <div className="flex flex-col gap-4">
        <h1 className="lg:text-[36px] text-[26px] italic">Welcome back, admin! 🔥</h1>
        {/* card */}
        <div className="flex flex-row justify-between gap-4 lg:justify-start  ">
          <StatsCardList title="Likes" amount={totalLikes} />
          <StatsCardList title="Portofolios" amount={totalPortofolios} />
          <StatsCardList title="Viewers" amount={totalViewers} />
        </div>
        {/* card */}

        {/* main content */}
        <div className="  ">
          {/* table likes */}
          <div className="lg:w-[60%]   p-4 bg-white rounded-2xl">
            <Table className="px-3 ">
              <TableCaption>A list of your likes from viewers.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-fit">No</TableHead>
                  <TableHead>Id</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Created at</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {infoLikes.map((infoLike, index) => (
                  <TableRow key={infoLike.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium">{infoLike.id}</TableCell>
                    <TableCell>{infoLike.nama}</TableCell>
                    <TableCell>{infoLike.createdAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2}>Total likes</TableCell>
                  <TableCell className="text-right">{totalLikes}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
            {/* table likes */}
          </div>
        </div>
        {/* main content */}
      </div>
    </div>
  );
}
