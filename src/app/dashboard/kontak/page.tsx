import ContentKontak from "@/components/admin/kontak/ContentKontak";
import { auth } from "@/lib/auth/auth";
import prisma from "@/lib/db";

export default async function page() {
  const session = await auth();
  const kontak = await prisma.kontak.findFirst();
  // await prisma.kontak.create({
  //   data: {
  //     title: "Kontak",
  //     image: "https://placehold.co/800x400",
  //     excerpt:
  //       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet, ex.",
  //     content:
  //       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet, ex.",
  //     userId: session?.user.id!,
  //   },
  // });
  return (
    <>
      <h1 className="font-bold text-3xl">Kontak</h1>
      <p className="text-muted-foreground text-sm">
        Halaman untuk melakukan manajemen kontak
      </p>
      <div className="mt-4">
        <ContentKontak kontak={kontak} />
      </div>
    </>
  );
}
