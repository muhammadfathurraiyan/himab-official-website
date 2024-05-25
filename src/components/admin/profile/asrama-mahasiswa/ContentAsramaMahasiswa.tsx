import CardInfo from "@/components/global/adminLayout/card/CardInfo";

export default function ContentAsramaMahasiswa() {
  return (
    <div className="grid lg:grid-cols-3 mt-4">
      <CardInfo
        description="Jika anda ingin melakukan pengeditan halaman asrama mahasiswa, klik tombol di bawah untuk melakukan pengeditan tentang asrama mahasiswa."
        title="Asrama Mahasiswa"
        button={{ title: "Edit asrama mahasiswa" }}
      />
      <div className="lg:col-span-2"></div>
    </div>
  );
}
