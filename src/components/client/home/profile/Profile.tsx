import React from "react";
import Card from "./Card";

export default function Profile() {
  return (
    <section className="px-12 max-lg:px-4 space-y-4">
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-5xl max-lg:text-4xl text-center">
          Profil Pimpinan
        </h1>
        <p className="text-foreground/70 text-2xl max-lg:text-xl text-center">
          Profil pimpinan Himpunan Mahasiswa Aceh Besar Periode 2024
        </p>
      </div>
      <div className="grid grid-cols-4 max-lg:grid-cols-2 gap-4">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </section>
  );
}
