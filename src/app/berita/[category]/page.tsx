import Category from "@/components/client/berita/Category";
import LatestNews from "@/components/client/home/LatestNews";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";

export default async function page({
  params,
}: {
  params: { category: string };
}) {
  const categories = await prisma.kategori.findMany();
  const ref = categories.map((c) => c.title);
  if (!ref.includes(params.category)) {
    return notFound();
  }

  const berita = await prisma.berita.findMany({
    where: {
      category: params.category,
    },
  });
  return (
    <main className="space-y-12">
      <LatestNews
        berita={berita.slice(0, 6)}
        title={`Berita ${params.category}`}
        desc={`Berita terbaru kategori ${params.category}`}
      />
      <Category title={`Berita ${params.category} lainya`} berita={berita} />
    </main>
  );
}
