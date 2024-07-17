import prisma from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

export default async function page() {
  const sejarah = await prisma.sejarah.findFirst();
  const tentang = await prisma.tentang.findFirst();
  const visiMisi = await prisma.visiMisi.findFirst();
  const asrama = await prisma.asrama.findFirst();
  const strukturOrganisasi = await prisma.strukturOrganisasi.findFirst();

  if (sejarah && tentang && visiMisi && asrama && strukturOrganisasi) {
    return (
      <main className="space-y-4 px-12 max-lg:px-4">
        <div className="flex lg:items-end lg:gap-4 max-lg:flex-col">
          <h1 className="font-bold text-5xl">Profil HIMAB</h1>
          <p className="text-foreground/70 text-2xl">
            Halaman profil Himpunan Mahasiswa Aceh Besar
          </p>
        </div>
        <div className="grid grid-cols-4 max-lg:grid-cols-2 gap-4 min-h-screen">
          <Link
            className="rounded-xl col-span-3 max-lg:col-span-2 group relative"
            href={`/profil/tentang-himab`}
          >
            <div className="relative size-full rounded-xl overflow-hidden">
              <Image
                alt={tentang.title}
                src={tentang.image}
                width={1080}
                height={1080}
                className="size-full object-cover absolute top-0 left-0 rounded-xl group-hover:scale-105 duration-200"
              />
            </div>
            <div className="bg-foregroundAbsolute/70 text-backgroundAbsolute px-4 py-4 max-lg:py-2 absolute bottom-0 w-full rounded-b-xl">
              <h1 className="font-semibold lg:text-lg">{tentang.title}</h1>
            </div>
          </Link>
          <Link
            className="rounded-xl group relative"
            href={`/profil/visi-misi`}
          >
            <div className="relative size-full rounded-xl overflow-hidden">
              <Image
                alt={visiMisi.title}
                src={visiMisi.image}
                width={1080}
                height={1080}
                className="size-full object-cover absolute top-0 left-0 rounded-xl group-hover:scale-105 duration-200"
              />
            </div>
            <div className="bg-foregroundAbsolute/70 text-backgroundAbsolute px-4 py-4 max-lg:py-2 absolute bottom-0 w-full rounded-b-xl">
              <h1 className="font-semibold lg:text-lg">{visiMisi.title}</h1>
            </div>
          </Link>
          <Link
            className="rounded-xl group relative"
            href={`/profil/struktur-organisasi`}
          >
            <div className="relative size-full rounded-xl overflow-hidden">
              {/* <Image
                alt={strukturOrganisasi.title}
                src={strukturOrganisasi.image}
                width={1080}
                height={1080}
                className="size-full object-cover absolute top-0 left-0 rounded-xl group-hover:scale-105 duration-200"
              /> */}
            </div>
            <div className="bg-foregroundAbsolute/70 text-backgroundAbsolute px-4 py-4 max-lg:py-2 absolute bottom-0 w-full rounded-b-xl">
              <h1 className="font-semibold lg:text-lg">
                {"strukturOrganisasi.title"}
              </h1>
            </div>
          </Link>
          <Link
            className="rounded-xl lg:col-span-2 group relative"
            href={`/profil/sejarah`}
          >
            <div className="relative size-full rounded-xl overflow-hidden">
              <Image
                alt={sejarah.title}
                src={sejarah.image}
                width={1080}
                height={1080}
                className="size-full object-cover absolute top-0 left-0 rounded-xl group-hover:scale-105 duration-200"
              />
            </div>
            <div className="bg-foregroundAbsolute/70 text-backgroundAbsolute px-4 py-4 max-lg:py-2 absolute bottom-0 w-full rounded-b-xl">
              <h1 className="font-semibold lg:text-lg">{sejarah.title}</h1>
            </div>
          </Link>
          <Link
            className="rounded-xl group relative"
            href={`/profil/asrama-mahasiswa`}
          >
            <div className="relative size-full rounded-xl overflow-hidden">
              {/* <Image
                alt={asrama.title}
                src={asrama.image}
                width={1080}
                height={1080}
                className="size-full object-cover absolute top-0 left-0 rounded-xl group-hover:scale-105 duration-200"
              /> */}
            </div>
            <div className="bg-foregroundAbsolute/70 text-backgroundAbsolute px-4 py-4 max-lg:py-2 absolute bottom-0 w-full rounded-b-xl">
              <h1 className="font-semibold lg:text-lg">{"asrama.title"}</h1>
            </div>
          </Link>
        </div>
      </main>
    );
  }
}
