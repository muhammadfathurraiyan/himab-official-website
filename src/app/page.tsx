import HeroSection from "@/components/beranda/HeroSection";
import Himab from "@/components/beranda/Himab";
import VisiMisi from "@/components/beranda/VisiMisi";

export default function Home() {
  return (
    <main className="grid w-full">
      <HeroSection />
      <section className="px-12 max-lg:px-4 py-20 space-y-20">
        <Himab />
        <VisiMisi />
      </section>
    </main>
  );
}
