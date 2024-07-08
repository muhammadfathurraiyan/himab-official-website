export default function LatestNews() {
  return (
    <section className="px-12 max-lg:px-4 space-y-4">
      <div className="flex lg:items-end lg:gap-4 max-lg:flex-col">
        <h1 className="font-bold text-5xl">Berita Terbaru</h1>
        <p className="text-foreground/70 text-2xl">
          Berita terbaru tentang Himpunan Mahasiswa Aceh Besar
        </p>
      </div>
      <div className="grid grid-cols-6 gap-4">
        <div className="bg-red-500 rounded-xl lg:row-span-2 col-span-3 max-lg:col-span-6 max-lg:h-[28vh]">
          1
        </div>
        <div className="h-[28vh] bg-blue-500 rounded-xl col-span-3">2</div>
        <div className="h-[28vh] bg-green-500 rounded-xl col-span-3">3</div>
        <div className="h-[28vh] bg-red-500 rounded-xl col-span-2 max-lg:col-span-3">
          4
        </div>
        <div className="h-[28vh] bg-blue-500 rounded-xl col-span-2 max-lg:col-span-3">
          5
        </div>
        <div className="h-[28vh] bg-green-500 rounded-xl col-span-2 max-lg:col-span-6">
          6
        </div>
      </div>
    </section>
  );
}
