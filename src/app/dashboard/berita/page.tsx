import ContentBerita from "@/components/admin/berita/ContentBerita";
import ContentKategori from "@/components/admin/berita/kategori/ContentKategori";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth/auth";
import prisma from "@/lib/db";

export default async function page() {
  const session = await auth();
  const kategori = await prisma.kategori.findMany();
  const berita = await prisma.berita.findMany();
  return (
    <>
      <h1 className="font-bold text-3xl">Berita</h1>
      <p className="text-muted-foreground text-sm">
        Halaman untuk melakukan manajemen berita
      </p>
      <Tabs defaultValue="berita" className="mt-4">
        <div className="relative overflow-x-auto">
          <TabsList>
            <TabsTrigger value="berita">Berita</TabsTrigger>
            <TabsTrigger value="kategori">Kategori</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="berita">
          <ContentBerita
            berita={berita}
            kategori={kategori}
            userId={session?.user.id}
          />
        </TabsContent>
        <TabsContent value="kategori">
          <ContentKategori kategori={kategori} />
        </TabsContent>
      </Tabs>
    </>
  );
}
