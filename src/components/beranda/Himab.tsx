import { buttonVariants } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Himab() {
  return (
    <div className="space-y-2" data-aos="fade-up">
      <h1 className="text-6xl font-bold text-primary dark:text-foreground">
        Himpunan Mahasiswa <br /> Aceh Besar
      </h1>
      <p className="text-lg leading-relaxed lg:w-1/2 dark:text-muted-foreground">
        Bersama HIMAB, kita melangkah lebih jauh, mencapai lebih tinggi, dan
        menginspirasi lebih banyak.
      </p>
      <Link
        href={"/"}
        className={buttonVariants({ className: "group gap-2", size: "lg" })}
      >
        <span className="text-lg">Kenali lebih jauh</span>{" "}
        <MoveRight className="group-hover:translate-x-2 transition-all" />
      </Link>
    </div>
  );
}
