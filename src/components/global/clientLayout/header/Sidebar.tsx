"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLink } from "@/lib/staticData";

export function Sidebar() {
  const [links, setLinks] = useState<{ key: string; value: string }[]>();
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu navigasi</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col">
        <SheetHeader>
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image
              src="/img/logo.png"
              alt="logo himab"
              width={1080}
              height={1080}
              className="size-10"
            />
            <h1 className="font-bold leading-none text-start uppercase">
              Himpunan Mahasiswa <br /> Aceh Besar
            </h1>
          </Link>
        </SheetHeader>
        <nav className="grid items-start gap-2 text-sm">
          {navLink.map((data) => (
            <Link
              key={data.name}
              href={data.url}
              className={`transition-all hover:text-primary`}
            >
              {data.name}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
