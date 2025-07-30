"use client";
// import Image from "next/image";
import InformationCard from "../components/InformationCard";
export default function Portofolio() {
  // const image = [
  //   { src: "/foto-gaya-2.webp", alt: "Foto 1" },
  //   { src: "still-under-construction.png", alt: "Foto 2" },
  //   { src: "/foto-santai-1.webp", alt: "Logo" },
  // ];
  // const image2 = [
  //   { src: "/foto-santai-1.webp", alt: "Foto 1" },
  //   { src: "/foto-santai-1.webp", alt: "Foto 2" },
  //   { src: "/foto-santai-1.webp", alt: "Logo" },
  // ];

  const cardData = [
    {
      src: "still-under-construction.png",
      title: "Title 1",
      stack: "Laravel | Tailwind | MySQL",

      content:
        "Excepteur irure quis proident excepteur sunt elit laboris sint ex aliqua reprehenderit non minim. Exercitation sint proident et adipisicing culpa incididunt Lorem irure aliquip. Veniam do nostrud eu cillum amet sint reprehenderit duis adipisicing adipisicing. Laborum elit ex nulla deserunt nulla adipisicing duis commodo dolore sit amet Lorem.",
    },
  ];
  const cardData2 = [
    {
      src: "still-under-construction.png",
      title: "Title 2",
      stack: "Laravel | Tailwind | MySQL",
      content:
        "Excepteur irure quis proident excepteur sunt elit laboris sint ex aliqua reprehenderit non minim. Exercitation sint proident et adipisicingorem.",
    },
  ];
  const cardData3 = [
    {
      src: "still-under-construction.png",
      title: "Title 3",
      content:
        "Excepteur irure quis proident excepteur sunt elit laboris sint ex aliqua reprehenderit non minim. Exercitation sint proident et adipisicing culpa incididunt Lorem irure aliquip. Veniam do nostrud eu cillum amet sint reprehenderit duis t amet Lorem.",
      stack: "Laravel | Tailwind | MySQL",
    },
  ];

  const cardDataMachine1 = [
    {
      src: "informationCard/yolo8card.webp",
      title: "Pendteksi Koin Rupiah",
      content:
        "Excepteur irure quis proident excepteur sunt elit laboris sint ex aliqua reprehenderit non minim. Exercitation sint proident et adipisicing culpa incididunt Lorem irure aliquip. Veniam do nostrud eu cillum amet sint reprehenderit duis t amet Lorem.",
      stack: "Yolo | Label Studio | Personal tools",
    },
  ];
  const cardDataMachine2 = [
    {
      src: "still-under-construction.png",
      title: "Title 3",
      content:
        "Excepteur irure quis proident excepteur sunt elit laboris sint ex aliqua reprehenderit non minim. Exercitation sint proident et adipisicing culpa incididunt Lorem irure aliquip. Veniam do nostrud eu cillum amet sint reprehenderit duis t amet Lorem.",
      stack: "Laravel | Tailwind | MySQL",
    },
  ];
  const cardDataMachine3 = [
    {
      src: "still-under-construction.png",
      title: "Title 3",
      content:
        "Excepteur irure quis proident excepteur sunt elit laboris sint ex aliqua reprehenderit non minim. Exercitation sint proident et adipisicing culpa incididunt Lorem irure aliquip. Veniam do nostrud eu cillum amet sint reprehenderit duis t amet Lorem.",
      stack: "Laravel | Tailwind | MySQL",
    },
  ];

  return (
    <div className="mx-auto ">
      <div className="text-center font-semibold  text-[48px]">My Portofolio</div>
      <div className="mb-10 mt-4">
        <fieldset className="border rounded-xl p-4">
          <legend className="text-[28px]">Websites</legend> Magna deserunt et voluptate nostrud velit ea ea officia
          excepteur duis cillum esse. Incididunt sit occaecat enim nulla. Non voluptate cillum eiusmod duis quis officia
          esse eu proident tempor aliqua et esse laboris. Officia ullamco incididunt sit commodo tempor fugiat aliquip
          labore id aute dolore esse. Culpa laboris occaecat sit dolor fugiat est eiusmod cillum in commodo amet tempor
          irure minim.
        </fieldset>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10  items-start justify-items-center">
        <InformationCard information={cardData} />
        <InformationCard information={cardData2} />
        <InformationCard information={cardData3} />
        <InformationCard information={cardData} />
        <InformationCard information={cardData2} />
        <InformationCard information={cardData3} />
      </div>
      {/* UI/UX */}
      <div className="mb-10 mt-10">
        <fieldset className="border p-4 rounded-xl">
          <legend className="text-[28px] font-semibold">UI/UX Design</legend>
          Magna deserunt et voluptate nostrud velit ea ea officia excepteur duis cillum esse. Incididunt sit occaecat
          enim nulla. Non voluptate cillum eiusmod duis quis officia esse eu proident tempor aliqua et esse laboris.
          Officia ullamco incididunt sit commodo tempor fugiat aliquip labore id aute dolore esse. Culpa laboris
          occaecat sit dolor fugiat est eiusmod cillum in commodo amet tempor irure minim.
        </fieldset>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10  items-start justify-items-start">
        <InformationCard information={cardData} />
        <InformationCard information={cardData2} />
        <InformationCard information={cardData3} />
        <InformationCard information={cardData} />
        <InformationCard information={cardData2} />
        <InformationCard information={cardData3} />
      </div>
      {/* Machine Learning */}
      <div className="mb-10 mt-10">
        <fieldset className="border rounded-xl p-4">
          <legend className="text-[28px]">Machine Learning</legend> Magna deserunt et voluptate nostrud velit ea ea
          officia excepteur duis cillum esse. Incididunt sit occaecat enim nulla. Non voluptate cillum eiusmod duis quis
          officia esse eu proident tempor aliqua et esse laboris. Officia ullamco incididunt sit commodo tempor fugiat
          aliquip labore id aute dolore esse. Culpa laboris occaecat sit dolor fugiat est eiusmod cillum in commodo amet
          tempor irure minim.
        </fieldset>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10  items-start justify-items-center">
        <InformationCard information={cardDataMachine1} />
        <InformationCard information={cardDataMachine2} />
        <InformationCard information={cardDataMachine3} />
      </div>
    </div>
  );
}
