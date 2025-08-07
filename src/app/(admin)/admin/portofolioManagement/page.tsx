"use client";
import PrimaryButton from "@/app/components/primaryButton";
import React, { useEffect, useState } from "react";

type categoryPorto = {
  id: number;
  name: string;
};
export default function Dashboard() {
  const [modalAddPortofolio, setModalPortofolio] = useState(false);
  const [modalAddCategoryPortofolio, setModalAddCategoryPortofolio] = useState(false);
  // useEffect
  const handleOpenModal = () => setModalPortofolio(true);
  const handleCloseModal = () => setModalPortofolio(false);
  const handleOpenModalPortCate = () => setModalAddCategoryPortofolio(true);
  const handleCloseModalPortCate = () => setModalAddCategoryPortofolio(false);

  const [portoCategory, setPortoCategory] = useState<categoryPorto[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch("/api/portofoliosCategory/getNamePortofolioCategory");
        const data = await response.json();
        console.log("✅ API Response:", data); // <<-- tes di console

        setPortoCategory(data);
      } catch (erorr) {
        console.log("⚠️ Eror", erorr);
      }
    };
    fetchCategory();
  }, []);
  const handleChangeSelectPortoCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const allOptions = ["Laravel", "MySQL", "Tailwind", "React JS", "Bootstrap"];
  const [selectedStack, setSelectedStack] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value && !selectedStack.includes(value)) {
      setSelectedStack([...selectedStack, value]);
    }
    // Reset select ke default
    e.target.value = "";
  };

  const handleRemove = (value: string) => {
    setSelectedStack(selectedStack.filter((item) => item !== value));
  };

  const availableOptions = allOptions.filter((opt) => !selectedStack.includes(opt));

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
      <div className="fixed inset-0 bg-gray-100/50  flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg w-[800px] border border-gray-400 flex flex-col gap-4">
          <h2 className="text-xl font-bold mb-1">Tambah Portofolio</h2>
          <p className="italic">Isi form dibawah</p>
          <form action="" className=" rounded-lg flex flex-col gap-4">
            <div className="rounded-lg flex flex-col gap-4">
              <div>
                <span>Portofolio Title</span>
                <input type="text" className="border border-gray-400 p-2 rounded-lg w-full" />
              </div>

              <div>
                <span>Summary</span>
                <input type="text" className="border border-gray-400 p-2 rounded-lg w-full" />
              </div>

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

              <div>
                <div>
                  <span className="block mb-1 font-semibold">Stack</span>
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
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                            <path
                              fill="#EF4444"
                              d="M7.5 1h9v3H22v2h-2.029l-.5 17H4.529l-.5-17H2V4h5.5zm2 3h5V3h-5zM6.03 6l.441 15h11.058l.441-15zm3.142 3.257L12 12.086l2.828-2.829l1.415 1.415l-2.829 2.828l2.829 2.828l-1.415 1.415L12 14.914l-2.828 2.829l-1.415-1.415l2.829-2.828l-2.829-2.828z"
                            />
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-between">
              <PrimaryButton buttonText="Tutup" onClick={handleCloseModal} />
              <PrimaryButton buttonText="Add Portfolio" />
            </div>
          </form>
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
