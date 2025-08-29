"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/componentsShadcn/ui/table";
import { fetchData } from "next-auth/client/_utils";

interface CertificateDataType {
  id: string;
  title: string;
  src: string | null;
  summary: string;
  createdAt: Date | string;
}

export default function Dashboard() {
  // State: Modal
  const [dataViewCertificate, setDataViewCertificate] = useState<CertificateDataType[]>([]);
  // State: Form Utama

  // Handler: Modal
  useEffect(() => {
    const fetchDataCertificate = async () => {
      try {
        const fetchData = await fetch("/api/adminAPI/certificateManagement/view");
        const response = await fetchData.json();
        console.log(response);
        setDataViewCertificate(response);
      } catch (error) {
        console.log("❌ Terdapat eror: ", error);
      }
    };
    fetchDataCertificate();
  }, []);
  // --------------------------------------
  // PAGE VIEW
  // --------------------------------------

  return (
    <div>
      <span className="text-[26px] italic">Certificate Management</span>
      <div className="flex space-x-4 my-4">
        {/* <PrimaryButton buttonText="Add Portfolio" onClick={handleOpenModal} />
        <PrimaryButton buttonText="Add Portfolio Category" onClick={handleOpenModalPortCate} /> */}
      </div>

      {/* 
      TABEL AKSI
      */}
      <div className="   p-4 bg-white shadow-lg rounded-2xl">
        <Table className="px-3 w-full align-top">
          <TableCaption>A list of your portofolios.</TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead className="w-[5%]">No</TableHead>
              <TableHead className="w-[15%]">Title</TableHead>
              <TableHead className="w-[20%]">Src</TableHead>
              <TableHead className="w-[25%]">Summary</TableHead>
              <TableHead className="w-[10%]">Created At</TableHead>
              <TableHead className="w-[10%]">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {dataViewCertificate.map((item, index) => (
              <TableRow key={item.id} className="align-top ">
                <TableCell className="px-2 py-2">{index + 1}</TableCell>

                <TableCell className="px-2 py-2 break-words  truncate ">{item.title}</TableCell>
                <TableCell className="px-2 py-2 break-words max-w-[250px] truncate ">{item.src}</TableCell>

                <TableCell className="px-2 py-2 break-words whitespace-normal max-w-[250px]">{item.summary}</TableCell>
                <TableCell className="px-2 py-2 ">{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="px-2 py-2">
                  <div className="flex flex-row gap-2">
                    <button className="bg-blue-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-sm">
                      Edit
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">Hapus</button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* <RenderModalEditPortofolios /> */}
      </div>
    </div>
  );

  // --------------------------------------
  // MODALS edit
  // --------------------------------------

  // --------------------------------------
  // MODALS Certificate
  // --------------------------------------
}
