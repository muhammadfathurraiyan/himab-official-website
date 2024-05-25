import CardInfo from "@/components/global/adminLayout/card/CardInfo";

export default function ContentTentangHimab() {
  return (
    <div className="grid lg:grid-cols-3 mt-4">
      <CardInfo
        description="Jika anda ingin melakukan pengeditan halaman tentang HIMAB, klik tombol di bawah untuk melakukan pengeditan tentang tentang HIMAB."
        title="Tentang HIMAB"
        button={{ title: "Edit tentang HIMAB" }}
      />
      <div className="lg:col-span-2"></div>
    </div>
  );
}
