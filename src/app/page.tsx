import HeroSection from "@/components/global/beranda/HeroSection";
import Himab from "@/components/global/beranda/Himab";

export default function Home() {
  return (
    <main className="grid w-full">
      {/* <h1 className="text-5xl font-bold leading-tight">
        Situs Web Resmi <br /> Himpunan Mahasiswa Aceh Besar
      </h1> */}
      <HeroSection />
      <section className="px-12 max-lg:px-4 py-4">
        <Himab />
      </section>
    </main>
  );
}
