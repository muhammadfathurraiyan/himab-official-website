import ContentSejarah from "@/components/admin/profile/sejarah/ContentSejarah";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function page() {
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
          <ContentSejarah />
        </TabsContent>
        <TabsContent value="visi-misi">Visi-misi</TabsContent>
        <TabsContent value="tentang-himab">Tentang HIMAB</TabsContent>
        <TabsContent value="struktur-organisasi">
          Struktur organisasi
        </TabsContent>
        <TabsContent value="asrama-mahasiswa">Asrama mahasiswa</TabsContent>
      </Tabs>
    </>
  );
}
