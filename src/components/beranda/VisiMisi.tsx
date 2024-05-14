"use client";
import { buttonVariants } from "@/components/ui/button";
import { useVisibility } from "@/lib/hook";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TextGenerateEffect } from "../ui/text-generate-effect";

export default function VisiMisi() {
  return (
    <div className="grid lg:grid-cols-2">
      <div className="flex flex-col justify-between max-lg:gap-4 p-8 bg-secondary lg:rounded-l-xl max-lg:rounded-b-xl">
        <div className="space-y-1">
          <h1 className="font-bold text-3xl">
            Visi dan Misi Himpunan Mahasiswa Aceh Besar
          </h1>
          <TextGenerateEffect words="Visi: HIMAB sebagai pusat menyelenggarakan Tri Darma Perguruan Tinggi guna menghasilkan lulusan yang bermoral, berwawasan, berintegritas serta berkemampuan Ilmu Pengetahuan dan Teknologi (IPTEK). Misi: HIMAB sebagai wadah pemersatu Mahasiswa Aceh Besar serta Efektif dan Efisien dalam manajemen pembelajaran, penelitian dan pengabdian pada masyarakat agar terciptanya Mahasiswa Aceh Besar menjadi tenaga ahli yang berkualitas tinggi." />
        </div>
        <Link
          href={"/"}
          className={buttonVariants({ className: "group gap-2" })}
        >
          <span className="text-base">Baca selengkapnya</span>
          <MoveRight className="group-hover:translate-x-2 transition-all" />
        </Link>
      </div>
      <div className="h-[60vh] w-full lg:rounded-r-xl max-lg:rounded-t-xl max-lg:-order-1">
        <Image
          src="/img/sekret.jpg"
          alt="logo"
          width={1920}
          height={1080}
          className="object-cover h-[60vh] w-full lg:rounded-r-xl max-lg:rounded-t-xl"
        />
      </div>
    </div>
  );
}
