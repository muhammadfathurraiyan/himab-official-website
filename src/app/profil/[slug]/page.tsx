import Viewer from "@/components/global/adminLayout/editor/Viewer";
import prisma from "@/lib/db";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function page({ params }: { params: { slug: string } }) {
  const parameter = [
    "sejarah",
    "visi-misi",
    "tentang-himab",
    "struktur-organisasi",
    "asrama-mahasiswa",
  ];

  if (!parameter.includes(params.slug)) {
    return notFound();
  }

  if (params.slug === "sejarah") {
    const data = await prisma.sejarah.findFirst();
    if (!data) return <></>;
    return (
      <main className="px-12 max-lg:px-4">
        <article className="space-y-4">
          <h1 className="font-bold text-5xl">{data.title}</h1>
          <div className="aspect-video">
            <Image
              alt={data.title}
              src={data.image}
              width={1080}
              height={1080}
              className="size-full object-cover rounded-3xl"
            />
          </div>
          <div className="editor">
            <Viewer content={data.content} />
          </div>
        </article>
      </main>
    );
  } else if (params.slug === "visi-misi") {
    const data = await prisma.visiMisi.findFirst();
    if (!data) return <></>;
    return (
      <main className="px-12 max-lg:px-4">
        <article className="space-y-4">
          <h1 className="font-bold text-5xl">{data.title}</h1>
          <div className="aspect-video">
            <Image
              alt={data.title}
              src={data.image}
              width={1080}
              height={1080}
              className="size-full object-cover rounded-3xl"
            />
          </div>
          <div className="editor">
            <Viewer content={data.content} />
          </div>
        </article>
      </main>
    );
  } else if (params.slug === "tentang-himab") {
    const data = await prisma.tentang.findFirst();
    if (!data) return <></>;
    return (
      <main className="px-12 max-lg:px-4">
        <article className="space-y-4">
          <h1 className="font-bold text-5xl">{data.title}</h1>
          <div className="aspect-video">
            <Image
              alt={data.title}
              src={data.image}
              width={1080}
              height={1080}
              className="size-full object-cover rounded-3xl"
            />
          </div>
          <div className="editor">
            <Viewer content={data.content} />
          </div>
        </article>
      </main>
    );
  } else if (params.slug === "tentang-himab") {
    const data = await prisma.tentang.findFirst();
    if (!data) return <></>;
    return (
      <main className="px-12 max-lg:px-4">
        <article className="space-y-4">
          <h1 className="font-bold text-5xl">{data.title}</h1>
          <div className="aspect-video">
            <Image
              alt={data.title}
              src={data.image}
              width={1080}
              height={1080}
              className="size-full object-cover rounded-3xl"
            />
          </div>
          <div className="editor">
            <Viewer content={data.content} />
          </div>
        </article>
      </main>
    );
  }
}
