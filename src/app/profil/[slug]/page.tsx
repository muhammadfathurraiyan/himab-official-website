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
    const data = await prisma.sejarah.findMany();
    return (
      <div className="editor">
        <Viewer content={data[0].content} />
      </div>
    );
  }
}
