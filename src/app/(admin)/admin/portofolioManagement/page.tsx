"use client";
import PrimaryButton from "@/app/components/primaryButton";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [modalAddPortofolio, setModalPortofolio] = useState(false);
  // useEffect
  const handleOpenModal = () => setModalPortofolio(true);
  const handleCloseModal = () => setModalPortofolio(false);
  return (
    <div>
      <span className="text-[26px] italic">Portofolio Management</span>
      <div className="flex space-x-4 my-4">
        <PrimaryButton buttonText="Add Portfolio" onClick={handleOpenModal} />
        <PrimaryButton buttonText="Add Portfolio Category" onClick={handleOpenModal}/>
      </div>
      {renderModal()} {/* panggil function modal */}
    </div>
  );

  function renderModal() {
    if (!modalAddPortofolio) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg w-[400px]">
          <h2 className="text-xl font-bold mb-4">Tambah Portofolio</h2>
          <p>Konten modal ditulis di sini.</p>
          <button onClick={handleCloseModal} className="mt-4 text-blue-600 hover:underline">
            Tutup
          </button>
        </div>
      </div>
    );
  }
}
