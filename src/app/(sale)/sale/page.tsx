import PrimaryButton from "@/app/components/primaryButton";

export default function About() {
  return (
    <main className="flex-grow w-[90%] mx-auto p-7 rounded box-shadow-paper-effect-3d hover:shadow-none ">
      <span className="text-2xl  text-[48px]">Product</span>

      {/*
       CONTAINER PRODUCT
       */}
      <div className="flex flex-wrap gap-6  py-6">
        <div className="bg-gray-50 rounded-lg p-6 lg:grid lg:grid-cols-2  shadow-lg w-[555px] h-fit border border-gray-300">
          {/* Kiri: Info Produk */}
          <div className="flex flex-col justify-between pr-3">
            {/* Judul + Deskripsi */}
            <div className="w-full">
              <h2 className="text-2xl font-ligt mb-2 truncate">Product Title</h2>
              <div className=" items-center justify-center rounded-lg overflow-hidden  lg:hidden">
                <img
                  src="img/still-under-construction.png"
                  alt="Product Image"
                  className="object-contain w-full h-full"
                />
              </div>
              <p className="text-gray-700 text-sm line-clamp-3 lg:mt-0 mt-5">
                Id cupidatat tempor dolor est pariatur id do nulla aliquip labore officia excepteur do. Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Esse dicta accusamus omnis.
              </p>
            </div>

            {/* harga dan Tombol Buy */}
            <div className="flex flex-col gap-2 text-lg mt-2 lg:mt-0">
              <span>Rp 2.000.000</span>
              <PrimaryButton buttonText="Buy" className="rounded-md" />
            </div>
          </div>

          {/* Kanan: Gambar Produk */}
          <div className=" items-center justify-center rounded-lg overflow-hidden hidden lg:flex">
            <img src="img/still-under-construction.png" alt="Product Image" className="object-contain w-full h-full" />
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 grid grid-cols-2 shadow-lg w-[555px] h-fit border border-gray-300">
          {/* Kiri: Info Produk */}
          <div className="flex flex-col justify-between pr-3">
            {/* Judul + Deskripsi */}
            <div className="w-full">
              <h2 className="text-2xl font-ligt mb-2 truncate">Product Title</h2>
              <p className="text-gray-700 text-sm line-clamp-3">
                Id cupidatat tempor dolor est pariatur id do nulla aliquip labore officia excepteur do. Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Esse dicta accusamus omnis.
              </p>
            </div>

            {/* Tombol Buy */}
            <div className="flex flex-col gap-2 text-lg mt-3">
              <span>Rp 2.000.000</span>
              <PrimaryButton buttonText="Buy" className="rounded-md" />
            </div>
          </div>

          {/* Kanan: Gambar Produk */}
          <div className="flex items-center justify-center rounded-lg overflow-hidden">
            <img src="img/still-under-construction.png" alt="Product Image" className="object-contain w-full h-full" />
          </div>
        </div>
      </div>
    </main>
  );
}
