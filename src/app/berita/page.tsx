import Category from "@/components/client/berita/Category";
import LatestNews from "@/components/client/home/LatestNews";
import prisma from "@/lib/db";
// import { getData } from "@/lib/utils";
import { Berita } from "@prisma/client";

export default async function page() {
  const category = await prisma.kategori.findMany();

  const categoryToFind: { category: string }[] = [];

  category.forEach((c, i) => {
    categoryToFind.push({
      category: c.title,
    });
  });

  const berita = await prisma.berita.findMany({
    where: {
      OR: categoryToFind,
    },
    take: category.length * 4,
  });

  const obj: {
    [key: string]: Berita[];
  } = {};
  berita.forEach((b, i) => {
    if (obj && obj[b.category][0].category !== category[i].title) {
      obj[category[i].title].push(b);
    } else {
      obj[category[i].title] = [b];
    }
  });

  console.log(obj);

  return (
    <main className="space-y-12">
      <LatestNews />
      {berita.map((b) => (
        <Category berita={berita} title={c.title} />
      ))}
    </main>
  );
}
