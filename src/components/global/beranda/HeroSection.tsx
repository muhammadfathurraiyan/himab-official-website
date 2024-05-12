"use client"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export function HeroSection() {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
        duration: 60
      }}
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
    >
      <CarouselContent>
        <CarouselItem className="flex items-center justify-center -z-20">
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
              officia nemo at.
            </p>
          </div>
        </CarouselItem>
        <CarouselItem className="flex items-center justify-center -z-20">
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
              officia nemo at.
            </p>
          </div>
        </CarouselItem>
        <CarouselItem className="flex items-center justify-center -z-20">
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
              officia nemo at.
            </p>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className="left-12" />
      <CarouselNext className="right-12" />
    </Carousel>
  );
}
