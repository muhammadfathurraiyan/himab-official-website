import React from "react";

export default function Profile() {
  return (
    <section className="px-12 max-lg:px-4 space-y-4">
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-5xl text-center">Profil Pimpinan</h1>
        <p className="text-foreground/70 text-2xl text-center">
          Profil pimpinan Himpunan Mahasiswa Aceh Besar Periode 2024
        </p>
      </div>
      <div className="grid grid-cols-4 max-lg:grid-cols-2 gap-4">
        <div className="bg-purple-500 h-[70vh] rounded-3xl">1</div>
        <div className="bg-green-500 h-[70vh] rounded-3xl">2</div>
        <div className="bg-yellow-500 h-[70vh] rounded-3xl">3</div>
        <div className="bg-sky-500 h-[70vh] rounded-3xl">3</div>
      </div>
    </section>
  );
}
