import ContentAsramaMahasiswa from "@/components/admin/profile/asrama-mahasiswa/ContentAsramaMahasiswa";
import ContentSejarah from "@/components/admin/profile/sejarah/ContentSejarah";
import ContentStrukturOrganisasi from "@/components/admin/profile/struktur-organisasi/ContentStrukturOrganisasi";
import ContentTentangHimab from "@/components/admin/profile/tentang-himab/ContentTentangHimab";
import ContentVisiMisi from "@/components/admin/profile/visi-misi/ContentVisiMisi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth/auth";
import prisma from "@/lib/db";

export default async function page() {
  const session = await auth();
  const sejarah = await prisma.sejarah.findFirst();
  const visiMisi = await prisma.visiMisi.findFirst();
  const tentang = await prisma.tentang.findFirst();
  const strukturOrganisasi = await prisma.database.findMany();
  const jabatan = await prisma.jabatan.findMany();
  const asrama = await prisma.asrama.findFirst();

  // await prisma.asrama.create({
  //   data: {
  //     title: "Asrama Mahasiswa",
  //     image: "https://placehold.co/800x400",
  //     description: "Ini adalah deskripsi",
  //     data: [
  //       {
  //         ruang: "Kamar",
  //         image: "https://placehold.co/800x400",
  //         description: "Ini adalah deskripsi",
  //       },
  //     ],
  //   },
  // });

  return (
    <>
      <h1 className="font-bold text-3xl">Profil</h1>
      <p className="text-muted-foreground text-sm">
        Halaman untuk melakukan manajemen profil
      </p>
      <Tabs defaultValue="sejarah" className="mt-4">
        <div className="relative overflow-x-auto">
          <TabsList>
            <TabsTrigger value="sejarah">Sejarah</TabsTrigger>
            <TabsTrigger value="visi-misi">Visi-misi</TabsTrigger>
            <TabsTrigger value="tentang-himab">Tentang HIMAB</TabsTrigger>
            <TabsTrigger value="struktur-organisasi">
              Struktur organisasi
            </TabsTrigger>
            <TabsTrigger value="asrama-mahasiswa">Asrama mahasiswa</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="sejarah">
          <ContentSejarah sejarah={sejarah} />
        </TabsContent>
        <TabsContent value="visi-misi">
          <ContentVisiMisi visiMisi={visiMisi} />
        </TabsContent>
        <TabsContent value="tentang-himab">
          <ContentTentangHimab tentang={tentang} />
        </TabsContent>
        <TabsContent value="struktur-organisasi">
          <ContentStrukturOrganisasi strukturOrganisasi={strukturOrganisasi} jabatan={jabatan} />
        </TabsContent>
        <TabsContent value="asrama-mahasiswa">
          <ContentAsramaMahasiswa asrama={asrama} />
        </TabsContent>
      </Tabs>
    </>
  );
}
