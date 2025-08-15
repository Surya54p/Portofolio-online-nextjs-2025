"use client";
// import { POST } from "@/app/api/like/route";
import PrimaryButton from "@/app/components/primaryButton";
import { PortofolioCategory, Portofolios } from "@prisma/client";
// import { error } from "console";
// import { isResolvedLazyResult } from "next/dist/server/lib/lazy-result";
// import { title } from "process";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

type categoryPorto = {
  id: number;
  name: string;
};

export default function Dashboard() {
  // State: Modal
  const [modalAddPortofolio, setModalPortofolio] = useState(false);
  const [modalAddCategoryPortofolio, setModalAddCategoryPortofolio] = useState(false);

  // State: Kategori Portofolio
  const [portoCategory, setPortoCategory] = useState<categoryPorto[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // State: Form Utama
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");

  // State: Stack Teknologi
  const allOptions = ["Laravel", "MySQL", "Tailwind", "React JS", "Bootstrap"];
  const [selectedStack, setSelectedStack] = useState<string[]>([]);

  // State: Upload Gambar
  const [preview, setPreview] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Handler: Modal
  const handleOpenModal = () => setModalPortofolio(true);
  const handleCloseModal = () => setModalPortofolio(false);
  const handleOpenModalPortCate = () => setModalAddCategoryPortofolio(true);
  const handleCloseModalPortCate = () => setModalAddCategoryPortofolio(false);

  const [portofolioCategoryManagementTable, setPortofolioCategoryManagementTable] = useState<Portofolios[]>([]);

  // Handler: Stack Pilihan
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value && !selectedStack.includes(value)) {
      setSelectedStack([...selectedStack, value]);
    }
    e.target.value = "";
  };

  const handleRemove = (value: string) => {
    setSelectedStack(selectedStack.filter((item) => item !== value));
  };

  const availableOptions = allOptions.filter((opt) => !selectedStack.includes(opt));

  // Handler: Kategori Pilihan
  const handleChangeSelectPortoCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  // Fetch: Data Kategori Portofolio
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        // Fetch api
        const response = await fetch("/api/portofoliosCategory/getNamePortofolioCategory");
        const responsePortofolioCategoryManagement = await fetch("/api/adminAPI/portofolioCategoryManagement");
        // Decode json
        const data = await response.json();
        const dataPortofolioCategoryManagement = await responsePortofolioCategoryManagement.json();
        setPortofolioCategoryManagementTable(dataPortofolioCategoryManagement);
        // console.log("✅ API Response:", data);
        setPortoCategory(data);
      } catch (erorr) {
        console.log("⚠️ Eror", erorr);
      }
    };
    fetchCategory();
  }, []);

  // Handler: Drag and Drop Gambar
  const handleFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const imgUrl = URL.createObjectURL(file);
      setPreview(imgUrl);
      setSelectedFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // Handler: Submit Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    if (selectedFile) {
      // const ext = selectedFile.name.split(".").pop(); // ambil ekstensi
      // const uniqueName = crypto.randomUUID() + "." + ext; // bikin nama unik
      // formData.append("src", uniqueName); // kirim nama file unik
      formData.append("file", selectedFile); // file asli
    }

    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("categoryId", selectedCategory); // Make sure backend expects "categoryId"
    formData.append("stack", JSON.stringify(selectedStack));

    try {
      const response = await fetch("/api/POST/portofolios", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Server error detail:", errorData);
        throw new Error(`Gagal submit data portofolio: ${errorData.error || "Unknown error"}`);
      }

      // const result = await response.json();
      // console.log("✅ Submit sukses:", result);

      // ✅ Tutup modal
      handleCloseModal();

      // ✅ Reset form
      setTitle("");
      setSummary("");
      setSelectedStack([]);
      setSelectedFile(null);
      setPreview("");
      setSelectedCategory("");

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
    }
  };

  // --------------------------------------
  // PAGE VIEW
  // --------------------------------------

  return (
    <div>
      <span className="text-[26px] italic">Portofolio Management</span>
      <div className="flex space-x-4 my-4">
        <PrimaryButton buttonText="Add Portfolio" onClick={handleOpenModal} />
        <PrimaryButton buttonText="Add Portfolio Category" onClick={handleOpenModalPortCate} />
      </div>
      {RenderModalAddPortofolios()}
      {renderModalAddPortofoliosCategory()}
      {/* 
      TABEL AKSI
      */}
      <div className="shadow-xl overflow-x-auto rounded-2xl border-t border-l border-r ">
        <table className=" border-collapse table-fixed w-full ">
          <colgroup>
            <col className="w-[15%]" /> {/* title */}
            <col className="w-[25%]" /> {/* src */}
            <col className="w-[15%]" /> {/* stack */}
            <col className="w-[25%]" /> {/* summary */}
            <col className="w-[10%]" /> {/* createdAt */}
            <col className="w-[10%]" /> {/* action */}
          </colgroup>

          <thead>
            <tr className="border-b ">
              <th className=" px-2 py-3">title</th>
              <th className=" px-2 py-1">src</th>
              <th className=" px-2 py-1">stack</th>
              <th className=" px-2 py-1">summary</th>
              <th className=" px-2 py-1">createdAt</th>
              <th className=" px-2 py-1">action</th>
            </tr>
          </thead>

          <tbody>
            {portofolioCategoryManagementTable.map((item) => (
              <tr key={item.id}>
                <td className="border-b border-gray-900 px-2 py-10 break-words">{item.title}</td>
                <td className="border-b border-gray-900 px-2 py-1 break-words max-w-[250px]">{item.src}</td>
                <td className="border-b border-gray-900 px-2 py-1 break-words">
                  {Array.isArray(item.stack) ? item.stack.join(", ") : item.stack}
                </td>
                <td className="border-b border-gray-900 px-2 py-1 break-words">{item.summary}</td>
                <td className="border-b border-gray-900 px-2 py-1">{new Date(item.createdAt).toLocaleDateString()}</td>
                <td className="border-b border-gray-900 px-2 py-1">
                  <div className="flex flex-row gap-2">
                    <button className="bg-blue-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-sm">
                      Edit
                    </button>
                    <button className="bg-red-500 hover:bg-red-500 text-white px-3 py-1 rounded text-sm">Hapus</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // --------------------------------------
  // MODALS PORTOFOLIO
  // --------------------------------------

  function RenderModalAddPortofolios() {
    if (!modalAddPortofolio) return null;

    return (
      <div className="fixed inset-0 bg-gray-100/50  flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg w-[800px] border border-gray-400 flex flex-col max-h-[90vh]">
          <div className="mb-3">
            <div
              className="flex justify-between items-center 
          "
            >
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
            action="POST"
            onSubmit={handleSubmit}
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
              {/* summary */}
              <div>
                <span>Summary</span>
                <textarea
                  name="summary"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="border border-gray-400 p-2 rounded-lg w-full h-[150px]"
                />
              </div>
              {/* porto category */}
              <div>
                <span>Portofolio Category</span>
                <select
                  className="border border-gray-400 p-2 rounded-lg w-full"
                  value={selectedCategory}
                  onChange={handleChangeSelectPortoCategory}
                >
                  <option value="" disabled>
                    Select option
                  </option>
                  {portoCategory.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* STACK */}
              <div>
                <div>
                  <span className=" mb-1 ">Stack</span>
                  <select
                    className="border border-gray-400 p-2 rounded-lg w-full"
                    onChange={handleChange}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Pilih stack...
                    </option>
                    {availableOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                {selectedStack.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedStack.map((item) => (
                      <span
                        key={item}
                        className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full flex items-center space-x-2"
                      >
                        <span>{item}</span>
                        <button
                          onClick={() => handleRemove(item)}
                          className="text-red-500 hover:text-red-700 font-bold ml-2"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24">
                            <path
                              fill="none"
                              stroke="#EF4444"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M18 6L6 18M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              {/* gambar */}
              <div>
                <p>Gambar</p>
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`p-4 border-2 border-dashed rounded-lg text-center cursor-pointer transition ${
                    isDragging ? "bg-blue-100 border-blue-400" : "bg-white border-gray-400"
                  }`}
                >
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="fileInput" />
                  <label htmlFor="fileInput" className="block text-gray-600">
                    Drag gambar ke sini atau klik untuk pilih
                  </label>

                  {preview && (
                    <div className="mt-4">
                      <img src={preview} alt="Preview" className="w-40 rounded mx-auto" />
                    </div>
                  )}
                </div>
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

  // --------------------------------------
  // MODALS PORTOFOLIO CATEGORY
  // --------------------------------------

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
