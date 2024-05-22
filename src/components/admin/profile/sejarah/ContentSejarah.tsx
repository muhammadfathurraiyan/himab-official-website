import CardInfo from "@/components/global/adminLayout/card/CardInfo";
import React from "react";

export default function ContentSejarah() {
  return (
    <div className="grid lg:grid-cols-3 mt-4">
      <CardInfo
        description="Jika anda ingin melakukan pengeditan halaman sejarah, klik tombol di bawah untuk melakukan pengeditan tentang sejarah."
        title="Sejarah"
        button={{ title: "Edit Sejarah" }}
      />
      <div className="lg:col-span-2"></div>
    </div>
  );
}
