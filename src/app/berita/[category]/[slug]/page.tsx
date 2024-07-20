import Viewer from "@/components/global/adminLayout/editor/Viewer";
import prisma from "@/lib/db";
import Image from "next/image";

export default async function page({ params }: { params: { slug: string } }) {
  const berita = await prisma.berita.findFirst({
    where: { slug: params.slug },
  });
  return (
    <main className="px-12 max-lg:px-4">
      <article className="space-y-4">
        <h1 className="font-bold text-5xl">{berita?.title}</h1>
        <div className="aspect-video">
          <Image
            alt={berita!.title}
            src={berita!.image}
            width={1080}
            height={1080}
            className="size-full object-cover rounded-3xl"
          />
        </div>
        <div className="editor">
          <Viewer content={berita!.content} />
        </div>
      </article>
    </main>
  );
}
