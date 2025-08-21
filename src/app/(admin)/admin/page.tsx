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

interface allDataPortofolio {
  id: string;
  src?: string;
  title: string;
  stack: string[];
  summary: string;
  createdAt: Date;

  category?: PortofolioCategory | null;
  categoryId?: number | null;
}

interface PortofolioCategory {
  id: number;
  name: string;
  description?: string;
}

export default function Dashboard() {
  // Get like
  const [loading, setLoading] = useState(true);
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalViewers, setTotalViewers] = useState(0);
  const [totalPortofolios, setTotalPortofolios] = useState(0);
  const [infoLikes, setInfoLikes] = useState<likeInfo[]>([]);
  const [allDataPortofolios, setAllDataPortofolios] = useState<allDataPortofolio[]>([]);

  useEffect(() => {
    const fetchLikes = async () => {
      const response = await fetch("/api/like");
      const data = await response.json();
      setTotalLikes(data.totalLikes);
      setInfoLikes(data.InfoLikes);
      setLoading(false);
    };

    const fetchViewers = async () => {
      const response = await fetch("/api/viewers");
      const dataViewers = await response.json();
      setTotalViewers(dataViewers.totalViewersAPI);
      setLoading(false);
    };
    const fetchPortofolios = async () => {
      const response = await fetch("/api/portofolios/count");
      const dataPortofolios = await response.json();
      setTotalPortofolios(dataPortofolios);
      setLoading(false);
    };
    const fetchAllDataTable = async () => {
      const respone = await fetch("/api/portofolios/allData");
      const data = await respone.json();
      setAllDataPortofolios(data);
      setLoading(false);
    };
    fetchAllDataTable();
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
          <StatsCardList title="Likes" amount={loading ? "Loading..." : totalLikes} loading={loading} />
          <StatsCardList title="Portofolios" amount={loading ? "Loading..." : totalPortofolios} loading={loading} />
          <StatsCardList title="Viewers" amount={loading ? "Loading..." : totalViewers} loading={loading} />
        </div>
        {/* card */}

        {/* main content */}
        {/* table likes */}
        <div className="grid lg:grid-cols-2   gap-1 ">
          <div className="   p-4 bg-white rounded-md border border-gray-200 h-fit">
            {loading ? (
              <div>Loading ...</div>
            ) : (
              <Table className="px-3 ">
                <TableCaption className="text-start text-black border-b mb-1 caption-top text-2xl ">
                  List of Likes from your viewer
                </TableCaption>
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
                  <TableRow className="font-bold text-xl">
                    <TableCell colSpan={3}>Total likes</TableCell>
                    <TableCell className="text-right">{totalLikes}</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            )}
          </div>
          {/* table portofolios */}
          <div className="  h-fit p-4 bg-white  rounded-md border border-gray-200">
            {loading ? (
              <div>Loading ...</div>
            ) : (
              <Table className="px-3">
                <TableCaption className="text-start text-black border-b mb-1 caption-top text-2xl ">
                  List of Portofolios
                </TableCaption>
                <TableCaption>A list of your portofolios.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-fit">No</TableHead>
                    <TableHead>Id</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Stack</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Created At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allDataPortofolios.map((portofolio, index) => (
                    <TableRow key={portofolio.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">{portofolio.id}</TableCell>
                      <TableCell>{portofolio.title}</TableCell>
                      <TableCell>{portofolio.stack.join(", ")}</TableCell>
                      <TableCell>{portofolio.category?.name ?? "-"}</TableCell>
                      <TableCell>{new Date(portofolio.createdAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow className="font-bold text-xl">
                    <TableCell colSpan={5}>Total Portofolios</TableCell>
                    <TableCell className="text-right">{allDataPortofolios.length}</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            )}
          </div>
        </div>
      </div>
      {/* main content */}
    </div>
  );
}
