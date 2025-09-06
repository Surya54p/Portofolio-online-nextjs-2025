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
} from "@/componentsShadcn/ui/table";

interface Ticket {
  id: number;
  username: string;
  email: string;
  noTelp: string;
  title: string;
  status: "pending" | "proceed" | "declined" | "complete";
  type: "bug" | "product";
  message: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminLaporanMasalah() {
  const [laporanData, setLaporanData] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Ticket | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/laporkanMasalah/", { cache: "no-store", method: "GET" });
        const respon = await res.json();
        setLaporanData(respon);
      } catch (error) {
        console.error("❌ error fetch:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  async function updateLaporan(ticket: Ticket) {
    try {
      setLoading(true);
      const res = await fetch(`/api/laporkanMasalah/${ticket.id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ticket),
      });

      if (!res.ok) throw new Error("Gagal update laporan");

      const updated = await res.json();
      setLoading(false);
      return updated;
    } catch (err) {
      console.error("❌ error update:", err);
      throw err;
    }
  }

  return (
    <div className="p-6">
      <span className="text-[26px] italic block mb-4">Laporan Masalah</span>

      {loading ? (
        <p>Loading...</p>
      ) : laporanData.length === 0 ? (
        <p>Tidak ada laporan.</p>
      ) : (
        <div className="bg-white  rounded-xl p-6">
          <Table>
            <TableCaption>Daftar laporan masalah terbaru</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">No</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {laporanData.map((item, idx) => (
                <TableRow key={item.id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell
                    className={`font-semibold ${
                      item.status === "pending"
                        ? "text-yellow-600"
                        : item.status === "proceed"
                        ? "text-blue-600"
                        : item.status === "declined"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {item.status}
                  </TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => setSelected(item)}
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Detail
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Modal Detail */}
      {selected && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 ">
          <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Detail Laporan</h2>
            <div className="mb-4">Untuk edit kamu cukup lakukan interaksi pada data yang ada lalu tekan simpan 😁</div>
            <form className="space-y-3">
              <div>
                <label className="block text-sm font-medium">Title</label>
                <input
                  type="text"
                  value={selected.title}
                  onChange={(e) => setSelected({ ...selected, title: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={selected.email}
                  onChange={(e) => setSelected({ ...selected, email: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">No. Telp</label>
                <input
                  type="text"
                  value={selected.noTelp}
                  onChange={(e) => setSelected({ ...selected, noTelp: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Message</label>
                <textarea
                  value={selected.message}
                  onChange={(e) => setSelected({ ...selected, message: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Status</label>
                <select
                  value={selected.status}
                  onChange={(e) => setSelected({ ...selected, status: e.target.value as Ticket["status"] })}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="pending">Pending</option>
                  <option value="proceed">Proceed</option>
                  <option value="declined">Declined</option>
                  <option value="complete">Complete</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">Type</label>
                <select
                  value={selected.type}
                  onChange={(e) => setSelected({ ...selected, type: e.target.value as Ticket["type"] })}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="bug">Bug</option>
                  <option value="product">Product</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Tutup
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  onClick={async () => {
                    if (!selected) return;

                    try {
                      const updated = await updateLaporan(selected);

                      // update tabel biar realtime
                      setLaporanData((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));

                      alert("✅ Data berhasil diperbarui!");
                      setSelected(null);
                    } catch (err) {
                      console.error(err);
                      alert("❌ Gagal update data");
                    }
                  }}
                >
                  {loading ? "Loading..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
