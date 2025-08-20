import PrimaryButton from "@/app/components/primaryButton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/componentsShadcn/ui/carousel";
// import { Sparkles } from "lucide-react";

export default function ProductDetail() {
  return (
    <main className="flex-grow w-[70%]  mx-auto p-7 rounded box-shadow-paper-effect-3d hover:shadow-none ">
      <span className="text-2xl  text-[48px]">Product Detail</span>

      {/*
       CONTAINER PRODUCT
       */}
      <div className="flex justify-between flex-wrap gap-6   py-6">
        {/* 
        card
         */}

        <div className="bg-gray-50 rounded-lg p-6 grid grid-cols-2 shadow-lg w-full h-fit border border-gray-300">
          {/* Kiri: Info Produk */}
          <div className="flex flex-col pr-3 gap-6">
            {/* Judul + Deskripsi */}
            <div className="w-full flex flex-col gap-4 ">
              <div className="flex justify-between items-center flex-row ">
                <h2 className="text-3xl font-ligt mb-2 truncate font-bold">Product Title</h2>

                <div className=" text-sm  px-2  h-fit py-1 rounded-md shadow  flex items-center  gap-2 relative bg-green-600 text-white   ">
                  {/* <Sparkles className="absolute -top-2 left-0 text-yellow-600" size={17} /> */}
                  New
                </div>
              </div>
              <div className="text-2xl  text-start italic">
                <span>Rp 2.000.000</span>
              </div>
              <p className="text-gray-700 text-lg  lg:mt-0 mt-5">
                Id cupidatat tempor dolor est pariatur id do nulla aliquip labore officia excepteur do. Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Esse dicta accusamus omnis. Occaecat occaecat non est
                cupidatat duis quis. Commodo aliqua nisi ut fugiat id sint aliquip ullamco deserunt excepteur irure.
                Commodo culpa veniam nostrud in cupidatat cupidatat sint in sint. Laborum consequat eu ad ipsum
                incididunt. Culpa sunt ipsum id sit sunt ad ut reprehenderit. Deserunt consequat est labore eu
                consectetur cupidatat elit labore nisi officia mollit id. Laborum quis tempor incididunt sunt pariatur
                occaecat mollit duis ex exercitation occaecat adipisicing.
              </p>
            </div>

            {/* harga dan Tombol Buy */}
            <div className="flex flex-col gap-2 text-lg mt-2 lg:mt-0">
              <div className="grid grid-cols-2 gap-6">
                <PrimaryButton buttonText="Hubungi owner" className="rounded-md bg-gray-200 text-gray-800 " />
                <PrimaryButton buttonText="Buy" className="rounded-md" />
              </div>
            </div>
          </div>

          {/* Kanan: Gambar Produk */}
          <div className="flex items-center justify-center border rounded-xl  ">
            <Carousel className="w-full max-w-xs">
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <img
                        src="/img/still-under-construction.png"
                        alt="Product Image"
                        className="object-contain w-80 h-80 rounded-lg"
                      />
                      <span className="text-4xl font-semibold">{index + 1}</span>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    </main>
  );
}
