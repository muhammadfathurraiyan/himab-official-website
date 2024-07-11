import { Herosection } from "@/components/client/home/Herosection";
import LatestNews from "@/components/client/home/LatestNews";
import Layanan from "@/components/client/home/Layanan";
import Others from "@/components/client/home/Others";
import Profile from "@/components/client/home/Profile";
import Quotes from "@/components/client/home/Quotes";

export default async function page() {
  return (
    <main className="space-y-12">
      <Herosection />
      <LatestNews />
      <Quotes />
      <Profile />
      <Others />
      <Layanan />
    </main>
  );
}
