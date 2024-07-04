import Image from "next/image";
import React from "react";

export default async function page() {
  return (
    <main>
      <section className="px-12 max-lg:px-4 h-screen flex flex-col gap-4">
        <h1 className="text-5xl font-bold">Himpunan Mahasiswa Aceh Besar</h1>
        <div className="size-full overflow-hidden">
          <Image
            src={"/img/sekret.jpg"}
            alt="sekret himab"
            width={1920}
            height={1080}
            className="size-full object-cover rounded-3xl"
          />
        </div>
      </section>
    </main>
  );
}
