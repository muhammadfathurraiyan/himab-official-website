import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Layanan() {
  return (
    <section className="h-[50vh] mx-12 max-lg:mx-4 relative">
      <Image
        alt="bg"
        src={"/img/sekret.jpg"}
        width={1920}
        height={1080}
        className="size-full object-cover rounded-3xl absolute top-0 left-0 -z-10"
      />
      <div className="bg-foregroundAbsolute/40 size-full px-12 max-lg:px-4 flex items-center justify-end rounded-3xl">
        <div className="w-3/4 space-y-4">
          <h1 className="font-bold text-5xl text-backgroundAbsolute">
            Untuk informasi layanan pengaduan, silahkan klik tombol dibawah.
          </h1>
          <Link
            className={buttonVariants({
              className: "w-fit",
            })}
            href="/profil/sejarah"
          >
            Selengkapnya!
          </Link>
        </div>
      </div>
    </section>
  );
}
