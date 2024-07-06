"use client";
import { buttonVariants } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const slider = [
  {
    id: 1,
    title: "Himpunan Mahasiswa Aceh Besar",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus velit labore doloremque voluptas similique beatae est esse earum enim, ipsam autem ad odit omnis? A debitis praesentium quae veniam laboriosam illum modi aliquam beatae ut error eius molestiae quia, harum, neque perferendis similique temporibus sapiente architecto officia enim aperiam id?",
    cta: "",
    img: { src: "/img/orang.jpg", alt: "anggota himab" },
  },
  {
    id: 2,
    title: "Sekret Himpunan Mahasiswa Aceh Besar",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus velit labore doloremque voluptas similique beatae est esse earum enim, ipsam autem ad odit omnis? A debitis praesentium quae veniam laboriosam illum modi aliquam beatae ut error eius molestiae quia, harum, neque perferendis similique temporibus sapiente architecto officia enim aperiam id?",
    cta: "",
    img: { src: "/img/sekret.jpg", alt: "sekret himab" },
  },
];

export function Herosection() {
  return (
    <section className="px-12 pt-8 max-lg:px-4 space-y-4">
      <h1 className="text-5xl font-bold ">Himpunan Mahasiswa Aceh Besar</h1>
      <Carousel opts={{ loop: true }} plugins={[Fade(), Autoplay()]}>
        <CarouselContent>
          {slider.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="w-full h-[75vh] relative bg-foregroundAbsolute/50  rounded-3xl">
                <div className="pl-20 max-lg:px-4 py-12 lg:w-2/3 h-full flex flex-col justify-between">
                  <div className="space-y-4 h-fit">
                    <h2 className="text-5xl font-bold text-backgroundAbsolute">
                      {slide.title}
                    </h2>
                    <p className="text-backgroundAbsolute max-lg:line-clamp-3">
                      {slide.desc}
                    </p>
                    <Link
                      className={buttonVariants({
                        className: "w-fit",
                      })}
                      href={slide.cta}
                    >
                      Selengkapnya!
                    </Link>
                  </div>
                  <Navigation />
                </div>
                <Image
                  alt={slide.img.alt}
                  src={slide.img.src}
                  height={1920}
                  width={1080}
                  className="w-full h-full object-cover absolute top-0 left-0 -z-10 rounded-3xl"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}

const Navigation = () => {
  const { scrollNext, scrollPrev } = useCarousel();
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={scrollPrev}
        className="rounded-full border-[3px] border-backgroundAbsolute bg-backgroundAbsolute/10 hover:bg-backgroundAbsolute hover:text-foregroundAbsolute text-backgroundAbsolute duration-200"
      >
        <ChevronLeft size={48} />
      </button>
      <button
        type="button"
        onClick={scrollNext}
        className="rounded-full border-[3px] border-backgroundAbsolute bg-backgroundAbsolute/10 hover:bg-backgroundAbsolute hover:text-foregroundAbsolute text-backgroundAbsolute duration-200"
      >
        <ChevronRight size={48} />
      </button>
    </div>
  );
};
