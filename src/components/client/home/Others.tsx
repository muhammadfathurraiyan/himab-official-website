import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Others() {
  return (
    <section className="px-12 max-lg:px-4">
      <div className="space-y-12">
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-4">
            <div className="h-1 w-24 bg-foreground"></div>
            <p className="font-semibold text-5xl">01</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-green-500 rounded-3xl h-[60vh]">1</div>
            <div className="flex flex-col justify-between gap-4">
              <div className="flex flex-col items-center gap-4  max-lg:gap-2">
                <h2 className="text-5xl font-bold">
                  Database Himpunan Mahasiswa Aceh Besar
                </h2>
                <p className="text-foreground/70 text-lg line-clamp-3">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Nostrum labore quam voluptate, at suscipit deleniti aperiam!
                  Dolores esse delectus asperiores iusto autem quibusdam non
                  porro, voluptatibus animi quae sunt eum beatae, suscipit modi
                  obcaecati natus nihil! Quaerat cum nemo ipsum, dolorem iure
                  sapiente soluta quisquam, molestiae beatae voluptate non modi!
                </p>
              </div>
              <Link
                className={buttonVariants({
                  className: "w-fit",
                })}
                href="/profil/sejarah"
              >
                Selengkapnya!
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-4">
          <div className="float-right flex items-center gap-4">
            <p className="font-semibold text-5xl">02</p>
            <div className="h-1 w-24 bg-foreground"></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="flex flex-col justify-between gap-4">
              <div className="flex flex-col items-center gap-4 max-lg:gap-2">
                <h2 className="text-5xl font-bold">
                  Asrama Mahasiswa Himpunan Mahasiswa Aceh Besar
                </h2>
                <p className="text-foreground/70 text-lg line-clamp-3">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Nostrum labore quam voluptate, at suscipit deleniti aperiam!
                  Dolores esse delectus asperiores iusto autem quibusdam non
                  porro, voluptatibus animi quae sunt eum beatae, suscipit modi
                  obcaecati natus nihil! Quaerat cum nemo ipsum, dolorem iure
                  sapiente soluta quisquam, molestiae beatae voluptate non modi!
                </p>
              </div>
              <Link
                className={buttonVariants({
                  className: "w-fit",
                })}
                href="/profil/sejarah"
              >
                Selengkapnya!
              </Link>
            </div>
            <div className="bg-red-500 rounded-3xl h-[60vh] max-lg:-order-1">1</div>
          </div>
        </div>
      </div>
    </section>
  );
}
