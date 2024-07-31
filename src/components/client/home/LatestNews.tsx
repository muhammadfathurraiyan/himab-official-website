import prisma from "@/lib/db";
import { Berita } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default async function LatestNews({
  title="Berita Terbaru",
  desc = "Berita terbaru tentang Himpunan Mahasiswa Aceh Besar",
  berita,
}: {
  title?: string;
  desc?: string
  berita: Berita[]
}) {

  return (
    <section className="px-12 max-lg:px-4 space-y-4">
      <div className="flex lg:items-end lg:gap-4 max-lg:flex-col">
        <h1 className="font-bold text-5xl max-lg:text-4xl">{title}</h1>
        <p className="text-foreground/70 text-2xl max-lg:text-xl">{desc}</p>
      </div>
      <div className="grid grid-cols-6 gap-4">
        <Link
          href={`/berita/${berita[0].category}/${berita[0].slug}`}
          className="rounded-xl lg:row-span-2 col-span-3 max-lg:col-span-6 max-lg:h-[28vh] group relative"
        >
          <div className="relative size-full rounded-xl overflow-hidden">
            <Image
              alt={berita[0].title}
              src={berita[0].image}
              width={1080}
              height={1080}
              className="size-full object-cover absolute top-0 left-0 rounded-xl group-hover:scale-105 duration-200"
            />
          </div>
          <div className="bg-foregroundAbsolute/70 text-backgroundAbsolute px-4 py-4 max-lg:py-2 absolute bottom-0 w-full rounded-b-xl">
            <h1 className="font-semibold lg:text-lg">{berita[0].title}</h1>
          </div>
        </Link>
        <Link
          href={`/berita/${berita[1].category}/${berita[1].slug}`}
          className="h-[28vh] rounded-xl col-span-3 relative group"
        >
          <div className="relative size-full rounded-xl overflow-hidden">
            <Image
              alt={berita[1].title}
              src={berita[1].image}
              width={1080}
              height={1080}
              className="size-full object-cover absolute top-0 left-0 rounded-xl group-hover:scale-105 duration-200"
            />
          </div>
          <div className="bg-foregroundAbsolute/70 text-backgroundAbsolute px-4 py-4 max-lg:py-2 absolute bottom-0 w-full rounded-b-xl">
            <h1 className="font-semibold lg:text-lg">{berita[1].title}</h1>
          </div>
        </Link>
        <Link
          href={`/berita/${berita[2].category}/${berita[2].slug}`}
          className="h-[28vh] rounded-xl col-span-3 relative group"
        >
          <div className="relative size-full rounded-xl overflow-hidden">
            <Image
              alt={berita[2].title}
              src={berita[2].image}
              width={1080}
              height={1080}
              className="size-full object-cover absolute top-0 left-0 rounded-xl group-hover:scale-105 duration-200"
            />
          </div>
          <div className="bg-foregroundAbsolute/70 text-backgroundAbsolute px-4 py-4 max-lg:py-2 absolute bottom-0 w-full rounded-b-xl">
            <h1 className="font-semibold lg:text-lg">{berita[2].title}</h1>
          </div>
        </Link>
        <Link
          href={`/berita/${berita[3].category}/${berita[3].slug}`}
          className="h-[28vh] rounded-xl col-span-2 max-lg:col-span-3 relative group"
        >
          <div className="relative size-full rounded-xl overflow-hidden">
            <Image
              alt={berita[3].title}
              src={berita[3].image}
              width={1080}
              height={1080}
              className="size-full object-cover absolute top-0 left-0 rounded-xl group-hover:scale-105 duration-200"
            />
          </div>
          <div className="bg-foregroundAbsolute/70 text-backgroundAbsolute px-4 py-4 max-lg:py-2 absolute bottom-0 w-full rounded-b-xl">
            <h1 className="font-semibold lg:text-lg">{berita[3].title}</h1>
          </div>
        </Link>
        <Link
          href={`/berita/${berita[4].category}/${berita[4].slug}`}
          className="h-[28vh] rounded-xl col-span-2 max-lg:col-span-3 relative group"
        >
          <div className="relative size-full rounded-xl overflow-hidden">
            <Image
              alt={berita[4].title}
              src={berita[4].image}
              width={1080}
              height={1080}
              className="size-full object-cover absolute top-0 left-0 rounded-xl group-hover:scale-105 duration-200"
            />
          </div>
          <div className="bg-foregroundAbsolute/70 text-backgroundAbsolute px-4 py-4 max-lg:py-2 absolute bottom-0 w-full rounded-b-xl">
            <h1 className="font-semibold lg:text-lg">{berita[4].title}</h1>
          </div>
        </Link>
        <Link
          href={`/berita/${berita[5].category}/${berita[5].slug}`}
          className="h-[28vh]  rounded-xl col-span-2 max-lg:col-span-6 group relative"
        >
          <div className="relative size-full rounded-xl overflow-hidden">
            <Image
              alt={berita[5].title}
              src={berita[5].image}
              width={1080}
              height={1080}
              className="size-full object-cover absolute top-0 left-0 rounded-xl group-hover:scale-105 duration-200"
            />
          </div>
          <div className="bg-foregroundAbsolute/70 text-backgroundAbsolute px-4 py-4 max-lg:py-2 absolute bottom-0 w-full rounded-b-xl">
            <h1 className="font-semibold lg:text-lg">{berita[5].title}</h1>
          </div>
        </Link>
      </div>
    </section>
  );
}
