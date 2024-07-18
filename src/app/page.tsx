import { Herosection } from "@/components/client/home/Herosection";
import LatestNews from "@/components/client/home/LatestNews";
import Layanan from "@/components/client/home/Layanan";
import Others from "@/components/client/home/Others";
import Profile from "@/components/client/home/Profile";
import Quotes from "@/components/client/home/Quotes";
import prisma from "@/lib/db";

export default async function page() {
  const berita = await prisma.berita.findMany({
    orderBy: {
      id: "desc",
    },
    take: 6,
  });
  return (
    <main className="space-y-12">
      <Herosection />
      <LatestNews berita={berita} />
      <Quotes />
      <Profile />
      <Others />
      <Layanan />
    </main>
  );
}
