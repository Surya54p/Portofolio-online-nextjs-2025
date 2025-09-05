"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

type cardSwiperProps = {
  images: {
    img: string;
    alt: string;
  }[];
  ukuran?: number;
};

export default function SwiperCard({ images, ukuran = 200 }: cardSwiperProps) {
  return (
    <div>
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        modules={[Autoplay]}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <Image src={img.img} width={ukuran} height={ukuran} alt={img.alt} className="rounded-lg object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
