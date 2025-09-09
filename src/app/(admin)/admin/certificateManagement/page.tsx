"use client";
import React, { useEffect, useState } from "react";
import PrimaryButton from "@/app/components/primaryButton";
import Swal from "sweetalert2";
import BasicModal from "@/app/components/modal/basicModal";
import ConfirmationModal from "@/app/components/modal/confirmationModal";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/componentsShadcn/ui/table";

interface CertificateDataType {
  id: string;
  title: string;
  src: string | null;
  summary: string;
  createdAt: Date | string;
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  // State: Modal
  const [dataViewCertificate, setDataViewCertificate] = useState<CertificateDataType[]>([]);
  const [selectedData, setSelectedData] = useState<CertificateDataType | null>(null);

  // Handler: addModal
  const [addModal, setAddModal] = useState(false);
  const handleOpenModal = () => setAddModal(true);
  const handleCloseModal = () => setAddModal(false);

  // --------------------------------------
  // AMBIL DATA
  // --------------------------------------

  useEffect(() => {
    const fetchDataCertificate = async () => {
      setLoading(true);
      try {
        const fetchData = await fetch("/api/adminAPI/certificateManagement/view");
        const response = await fetchData.json();
        console.log(response);
        setDataViewCertificate(response);
      } catch (error) {
        console.log("❌ Terdapat eror: ", error);
      } finally {
        setLoading(false); // ✅ selesai loading, baik success/failed
      }
    };
    fetchDataCertificate();
  }, []);

  // --------------------------------------
  // SUBMIT DATA HANDLER
  // --------------------------------------

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const submitCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // ✅ taruh di awal

    const formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("category", category);
    if (image) {
      formData.append("image", image);
    }

    try {
      const postData = await fetch("/api/adminAPI/certificateManagement/post", {
        method: "POST",
        body: formData,
      });
      if (!postData.ok) {
        const erorrPostData = await postData.json().catch(() => ({}));
        console.error("❌ Server error detail:", erorrPostData);
        throw new Error(`❌ Gagal submit data portofolio: ${erorrPostData.error || "Unknown error"}`);
      }
      // ✅ Tutup modal
      handleCloseModal();
      // ✅ Reset form
      setTitle("");
      setSummary("");
      setCategory("");
      setImage(null);

      // ✅ Tampilkan SweetAlert sukses
      Swal.fire({
        icon: "success",
        title: "Sukses!",
        text: "Portofolio berhasil ditambahkan.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("❌ Submit error:", error);

      // ❌ SweetAlert gagal
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Terjadi kesalahan saat submit.",
      });
      setLoading(false);
    }
  };

  // --------------------------------------
  // DELETE DATA
  // --------------------------------------
  // Handler: actionModal
  const [openModalAction, setOpenModalAction] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);

  // buka action modal
  const openActionModal = (data: CertificateDataType) => {
    setSelectedData(data);
    setOpenModalAction(true);
  };

  // tutup action modal
  const closeActionModal = () => {
    setSelectedData(null);
    setOpenModalAction(false);
  };

  // buka confirmation modal
  const openConfirmationModal = () => {
    setConfirmationModal(true);
  };

  // tutup confirmation modal
  const closeConfirmationModal = () => {
    setConfirmationModal(false);
  };
  const deleteData = async (id?: string) => {
    if (!id) return;
    try {
      setLoading(true);
      const res = await fetch(`/api/certificate/deleteData/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("❌ Failed to delete");
      const result = await res.json();
      console.log("Data Deleted: ", result);
      alert("✅ Berhasil delete data!");

      // tutup kedua modal setelah sukses
      closeActionModal();
      closeConfirmationModal();
      setDataViewCertificate((prev) => prev.filter((d) => d.id !== id));
    } catch (error) {
      if (error instanceof Error) {
        console.error("❌ Error found:", error.message);
      } else {
        console.error("❌ Unknown error:", error);
      }
      alert("Gagal delete data!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <span className="text-[26px] italic">Certificate Management</span>
      <div className="flex space-x-4 my-4">
        <PrimaryButton buttonText="Add Certificate" onClick={handleOpenModal} />
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
              {/* <TableHead className="w-[20%]">Src</TableHead>
              <TableHead className="w-[25%]">Summary</TableHead> */}
              {/* <TableHead className="w-[10%]">Created At</TableHead> */}
              <TableHead className="w-[10%]">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-6">
                  Loading data...
                </TableCell>
              </TableRow>
            ) : dataViewCertificate.length > 0 ? (
              dataViewCertificate.map((item, index) => (
                <TableRow key={item.id} className="align-top ">
                  <TableCell className="px-2 py-2">{index + 1}</TableCell>
                  <TableCell className="px-2 py-2 break-words  truncate ">{item.title}</TableCell>
                  <TableCell className="px-2 py-2">
                    <div className="flex flex-row gap-2">
                      <button
                        onClick={() => openActionModal(item)}
                        className="bg-blue-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Detail
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-6 text-gray-500">
                  Tidak ada data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {/* <RenderModalEditPortofolios /> */}
        {AddCertifModal()}
        {/* 
        ACTION MODAL
        */}
        <BasicModal
          description="Incididunt deserunt eu Lorem eiusmod in labore consequat esse laborum.Excepteur occaecat culpa enim anim aliquip in in ad voluptate duis nulla et id."
          ModalTitle="Edit Data "
          isOpen={openModalAction}
          onClose={closeActionModal}
          selectedData={selectedData}
          actions={
            <div className="flex justify-between w-full">
              <button
                // onClick={() => deleteData(selectedData?.id)}
                onClick={() => openConfirmationModal()}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                {loading ? "loading" : "Delete"}
              </button>
              <button type="button" className="bg-gray-300 px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          }
        />
        {/*         
        CONFIRMATION MODAL
        */}
        <ConfirmationModal
          ModalTitle="Confirm your action"
          description={`Write `}
          isOpen={confirmationModal}
          onClose={closeConfirmationModal}
          selectedData={selectedData}
          onSubmit={({ id }) => {
            if (id) deleteData(id); // ✅ langsung panggil fungsi hapus di sini
          }}
          actions={
            <div className="flex justify-between w-full">
              <button type="button" className="bg-gray-300 px-4 py-2 rounded">
                Cancel
              </button>
              <button
                // onClick={() => deleteData(selectedData?.id)}
                onClick={() => deleteData(selectedData?.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                {loading ? "loading" : "Delete"}
              </button>
            </div>
          }
        />
      </div>
    </div>
  );

  // --------------------------------------
  // MODALS SUBMIT CERTIFICATE
  // --------------------------------------

  function AddCertifModal() {
    {
      if (!addModal) return null;
      return (
        <div className="fixed inset-0 bg-gray-100/50  flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[800px] border border-gray-400 flex flex-col max-h-[90vh]">
            <div className="mb-3">
              <div className="flex justify-between items-center">
                <h2 className="text-[32px] font-bold ">Tambah Portofolio</h2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  onClick={handleCloseModal}
                >
                  <path
                    fill="none"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18 6L6 18M6 6l12 12"
                  />
                </svg>
              </div>
              <p className="italic">Isi form dibawah</p>
            </div>
            {/*
          -------------------------
          FORM INPUT
          -------------------------
          */}
            <form
              onSubmit={submitCertificate}
              className=" rounded-lg flex flex-col gap-4 max-h-[90vh] overflow-y-auto pb-3"
            >
              <div className="rounded-lg flex flex-col gap-4">
                <div>
                  {/* title */}
                  <span>Portofolio Title</span>
                  <input
                    name="title"
                    value={title}
                    type="text"
                    className="border border-gray-400 p-2 rounded-lg w-full"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <span>Summary</span>
                  <input
                    name="summary"
                    value={summary}
                    type="text"
                    className="border border-gray-400 p-2 rounded-lg w-full"
                    onChange={(e) => setSummary(e.target.value)}
                  />
                </div>
                <div>
                  <span>Category</span>
                  <input
                    name="category"
                    value={category}
                    type="text"
                    className="border border-gray-400 p-2 rounded-lg w-full"
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>

                <div>
                  <span>Upload Gambar</span>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="border border-gray-400 p-2 rounded-lg w-full"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                  />
                  <small className="text-gray-500 text-xs">
                    Maksimal ukuran file: <b>1 MB</b>
                  </small>
                </div>
              </div>
              <div className="flex justify-between">
                <PrimaryButton buttonText="Close" onClick={handleCloseModal} />
                <PrimaryButton buttonText="Submit" type="submit" />
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
}
