import CardInfo from "@/components/global/adminLayout/card/CardInfo";
import React from "react";

export default function ContentVisiMisi() {
  return (
    <div className="grid lg:grid-cols-3 mt-4">
      <CardInfo
        description="Jika anda ingin melakukan pengeditan halaman visi-misi, klik tombol di bawah untuk melakukan pengeditan tentang visi-misi."
        title="Visi-misi"
        button={{ title: "Edit visi-misi" }}
      />
      <div className="lg:col-span-2"></div>
    </div>
  );
}
