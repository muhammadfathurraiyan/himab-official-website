import CardInfo from "@/components/global/adminLayout/card/CardInfo";

export default function ContentStrukturOrganisasi() {
  return (
    <div className="grid lg:grid-cols-3 mt-4">
      <CardInfo
        description="Jika anda ingin melakukan pengeditan halaman struktur organisasi, klik tombol di bawah untuk melakukan pengeditan tentang struktur organisasi."
        title="Struktur Organisasi"
        button={{ title: "Edit struktur organisasi" }}
      />
      <div className="lg:col-span-2"></div>
    </div>
  );
}
