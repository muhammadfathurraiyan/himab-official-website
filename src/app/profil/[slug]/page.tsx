import Viewer from "@/components/global/adminLayout/editor/Viewer";
import prisma from "@/lib/db";
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
      <div className="editor">
        <Viewer content={data.content} />
      </div>
    );
  } else if (params.slug === "visi-misi") {
    const data = await prisma.visiMisi.findFirst();
    if (!data) return <></>;
    return (
      <div className="editor">
        <Viewer content={data.content} />
      </div>
    );
  } else if (params.slug === "tentang-himab") {
    const data = await prisma.tentang.findFirst();
    if (!data) return <></>;
    return (
      <div className="editor">
        <Viewer content={data.content} />
      </div>
    );
  } else if (params.slug === "tentang-himab") {
    const data = await prisma.tentang.findFirst();
    if (!data) return <></>;
    return (
      <div className="editor">
        <Viewer content={data.content} />
      </div>
    );
  }
}
