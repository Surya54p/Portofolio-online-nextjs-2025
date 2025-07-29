"use client";

import InformationCard from "../components/InformationCard";
export default function Portofolio() {
  // const image = [
  //   { src: "/foto-gaya-2.webp", alt: "Foto 1" },
  //   { src: "/foto-santai-1.webp", alt: "Foto 2" },
  //   { src: "/foto-santai-1.webp", alt: "Logo" },
  // ];
  // const image2 = [
  //   { src: "/foto-santai-1.webp", alt: "Foto 1" },
  //   { src: "/foto-santai-1.webp", alt: "Foto 2" },
  //   { src: "/foto-santai-1.webp", alt: "Logo" },
  // ];

  const cardData = [
    {
      image: "/foto-santai-1.webp",
      title: "Title 1",
      content:
        "Excepteur irure quis proident excepteur sunt elit laboris sint ex aliqua reprehenderit non minim. Exercitation sint proident et adipisicing culpa incididunt Lorem irure aliquip. Veniam do nostrud eu cillum amet sint reprehenderit duis adipisicing adipisicing. Laborum elit ex nulla deserunt nulla adipisicing duis commodo dolore sit amet Lorem.",
    },
  ];
  const cardData2 = [
    {
      image: "/foto-santai-1.webp",
      title: "Title 2",
      content:
        "Excepteur irure quis proident excepteur sunt elit laboris sint ex aliqua reprehenderit non minim. Exercitation sint proident et adipisicingorem.",
    },
  ];
  const cardData3 = [
    {
      image: "/foto-santai-1.webp",
      title: "Title 3",
      content:
        "Excepteur irure quis proident excepteur sunt elit laboris sint ex aliqua reprehenderit non minim. Exercitation sint proident et adipisicing culpa incididunt Lorem irure aliquip. Veniam do nostrud eu cillum amet sint reprehenderit duis t amet Lorem.",
    },
  ];

  return (
    <div className="mx-auto ">
      <div className="text-center text-2xl font-semibold mb-4">My Portfolio</div>
      <div className="text-center text-gray-500 mb-6">Websites</div>
      {/* <div className="flex items-center ">
        <div className="grid grid-cols-4 gap-4 w-full">
          <SwiperCard images={image} ukuran={1000} />
          <SwiperCard images={image2} ukuran={1000} />
          <SwiperCard images={image} ukuran={1000} />
          <SwiperCard images={image} ukuran={1000} />
        </div>
      </div> */}
      <div className="flex flex-wrap gap-10 justify-between">
        <InformationCard information={cardData} />
        <InformationCard information={cardData2} />
        <InformationCard information={cardData3} />
        <InformationCard information={cardData} />
        <InformationCard information={cardData2} />
        <InformationCard information={cardData3} />
      </div>{" "}
    </div>
  );
}
