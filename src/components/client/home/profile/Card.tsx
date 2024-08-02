import { Button } from "@/components/ui/button";
import { Circle, CircleEllipsis, Ellipsis } from "lucide-react";
import Image from "next/image";

export default function Card() {
  return (
    <div className="relative h-[70vh] rounded-3xl overflow-hidden group">
      <Image
        alt=""
        src="https://picsum.photos/600"
        width={1080}
        height={1080}
        className="size-full absolute top-0 object-cover rounded-3xl group-hover:scale-105 duration-200 -z-10"
      />
      <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 duration-500 absolute top-5 right-5">
        <Ellipsis size={32} />
      </div>
      <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 duration-500 absolute bottom-0 left-0 p-4 bg-foregroundAbsolute/50 w-full">
        <h1 className="text-center text-lg font-bold">Sabirin</h1>
        <p className="text-center font-medium text-sm">CEO - HIMAB</p>
      </div>
    </div>
  );
}
