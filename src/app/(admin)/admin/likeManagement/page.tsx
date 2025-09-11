"use client";

import { useEffect, useState } from "react";
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

// ---------------------------------------
// PAGE
// ---------------------------------------
interface TypeData {
  id: string;
  nama: string;
  createdAt: string;
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [dataLike, setDataLike] = useState<TypeData[]>([]);
  const [dataTotalLike, setDataTotalLike] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<TypeData | null>(null);
  const [editableName, setEditableName] = useState("");

  const openModal = (row: TypeData) => {
    setEditableName(row.nama);
    setSelectedData(row);
    setIsModalOpen(true);
  };
  // AMBIL DATA
  const fetchData = async () => {
    try {
      const response = await fetch("/api/like");
      if (!response.ok) {
        throw new Error(`Failed to fetch likes: ${response.status} ${response.statusText}`);
      }

      const data: { InfoLikes: TypeData[]; totalLikes: number } = await response.json();
      setDataLike(data.InfoLikes);
      setDataTotalLike(data.totalLikes);
    } catch (error: unknown) {
      console.error("Error fetching likes:", error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (id: string, nama: string) => {
    if (!selectedData) return;
    await fetch("/api/like", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, nama }),
    });
    fetchData();
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/like", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchData();
    setIsModalOpen(false);
  };
  return (
    <div>
      <span className="text-[26px] italic">Like Management</span>
      {loading ? (
        <div>Loading ...</div>
      ) : (
        <div className="bg-white p-6 w-fit">
          <Table className="px-3 text-xs sm:text-sm lg:text-base  w-fit ">
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
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataLike.map((infoLike, index) => (
                <TableRow key={infoLike.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{infoLike.id}</TableCell>
                  <TableCell>{infoLike.nama}</TableCell>
                  <TableCell>{infoLike.createdAt}</TableCell>
                  <TableCell>
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                      onClick={() => openModal(infoLike)}
                    >
                      Action
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow className="font-bold text-xl">
                <TableCell colSpan={3}>Total likes</TableCell>
                <TableCell className="text-right">{dataTotalLike}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>

          {isModalOpen && selectedData && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded shadow-lg w-80">
                <h2 className="text-xl font-bold mb-4">Edit Like</h2>
                <input
                  type="text"
                  value={editableName}
                  onChange={(e) => setEditableName(e.target.value)}
                  className="border px-2 py-1 rounded w-full mb-4"
                />
                <div className="flex justify-end gap-2">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    onClick={() => handleSave(selectedData.id, editableName)}
                  >
                    Save
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(selectedData.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
