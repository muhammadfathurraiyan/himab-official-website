"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCreative, Pagination } from "swiper/modules";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import { CSSProperties } from "react";

export default function HeroSection() {
  return (
    <div className="w-screen h-screen">
      <Swiper
        speed={1000}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{ clickable: true }}
        grabCursor={true}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ["-20%", 0, -1],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        modules={[EffectCreative, Autoplay, Pagination]}
        className="mySwiper3"
        style={
          {
            "--swiper-pagination-color": "hsl(var(--primary))",
          } as CSSProperties
        }
      >
        <SwiperSlide>
          <Image
            src="/img/sekret.jpg"
            alt="sekret"
            className="size-full absolute top-0 object-cover -z-10"
            width={1920}
            height={1080}
          />
          <div className="size-full flex flex-col px-4 lg:px-12 justify-center">
            <h1 className="font-bold text-3xl lg:text-5xl text-[hsl(210_40%_98%)]">
              Himpunan Mahasiswa Aceh Besar
            </h1>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/img/sekret.jpg"
            alt="sekret"
            className="size-full absolute top-0 object-cover -z-10"
            width={1920}
            height={1080}
          />
          <div className="size-full flex flex-col px-4 lg:px-12 justify-center">
            <h1 className="font-bold text-3xl lg:text-5xl text-[hsl(210_40%_98%)]">
              Himpunan Mahasiswa Aceh Besar
            </h1>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
