"use client";

import Image from "next/image";

type Info = {
  img: string;
  alt: string;
  title: string;
};

type MiniCardInfo = {
  information: Info[];
};

export default function MiniCard({ information }: MiniCardInfo) {
  return (
    <div className="   overflow-hidden border rounded ">
      {information.map((info, index) => (
        <CardItem key={index} info={info} />
      ))}
    </div>
  );
}

function CardItem({ info }: { info: Info }) {
  return (
    <div className="w-40 flex flex-col ">
      <Image
        className="  object-contain"
        src={info.img.startsWith("/") ? info.img : `/img/${info.img}`}
        alt={info.alt}
        width={160}
        height={160}
      />
      <div className="  py-2 text-center">
        {info.title}
      </div>
    </div>
  );
}
