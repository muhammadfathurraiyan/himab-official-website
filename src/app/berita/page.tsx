import Category from "@/components/client/berita/Category";
import LatestNews from "@/components/client/home/LatestNews";
import prisma from "@/lib/db";
// import { getData } from "@/lib/utils";
import { Berita } from "@prisma/client";

export default async function page() {
  const categories = await prisma.kategori.findMany();
  const berita = await prisma.berita.findMany({
    orderBy: {
      id: "desc",
    },
    take: 6,
  });

  const obj: { title: string; berita: Berita[] }[] = [];

  for (const c of categories) {
    const berita = await prisma.berita.findMany({
      where: { category: c.title },
      take: 4,
    });

    if (berita.length > 0) {
      obj.push({ title: c.title, berita });
    }
  }

  return (
    <main className="space-y-12">
      <LatestNews berita={berita} />
      {obj.map((b, i) => (
        <Category key={i} berita={b.berita} title={b.title} />
      ))}
    </main>
  );
}
