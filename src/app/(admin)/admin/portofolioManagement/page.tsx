"use client";
import PrimaryButton from "@/app/components/primaryButton";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [modalAddPortofolio, setModalPortofolio] = useState(false);
  const [modalAddCategoryPortofolio, setModalAddCategoryPortofolio] = useState(false);
  // useEffect
  const handleOpenModal = () => setModalPortofolio(true);
  const handleCloseModal = () => setModalPortofolio(false);
  const handleOpenModalPortCate = () => setModalAddCategoryPortofolio(true);
  const handleCloseModalPortCate = () => setModalAddCategoryPortofolio(false);
  return (
    <div>
      <span className="text-[26px] italic">Portofolio Management</span>
      <div className="flex space-x-4 my-4">
        <PrimaryButton buttonText="Add Portfolio" onClick={handleOpenModal} />
        <PrimaryButton buttonText="Add Portfolio Category" onClick={handleOpenModalPortCate} />
      </div>
      {RenderModalAddPortofolios()}
      {renderModalAddPortofoliosCategory()}
    </div>
  );

  function RenderModalAddPortofolios() {
    if (!modalAddPortofolio) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-100 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg w-[400px]">
          <h2 className="text-xl font-bold mb-4">Tambah Portofolio</h2>
          <p>Masukkan data dsibawah</p>
          <div className="flex justify-around">
            <PrimaryButton buttonText="Tutup" onClick={handleCloseModal} />
            <PrimaryButton buttonText="Add Portfolio"  />
          </div>
        </div>
      </div>
    );
  }

  function renderModalAddPortofoliosCategory() {
    if (!modalAddCategoryPortofolio) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg w-[400px]">
          <h2 className="text-xl font-bold mb-4">Tambah Portofolio Category</h2>
          <p>Konten modal ditulis di sini.</p>
          <button onClick={handleCloseModalPortCate} className="mt-4 text-blue-600 hover:underline">
            Tutup
          </button>
        </div>
      </div>
    );
  }
}
