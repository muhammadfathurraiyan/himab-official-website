"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Instagram, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLink } from "@/lib/staticData";
import Whatsapp from "@/components/icon/Whatsapp";
import { ThemeToggle } from "../../ThemeToggle";

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
        <div className="flex flex-col h-full justify-between">
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
          <div className="grid gap-4">
            <div className="flex items-center gap-4">
              <Link href={"/"} className="hover:text-primary transition-colors">
                <Whatsapp />
              </Link>
              <Link href={"/"} className="hover:text-primary transition-colors">
                <Instagram />
              </Link>
              <ThemeToggle />
            </div>
            <p className="text-xs">
              &copy; 2024 Himpunan Mahasiswa Aceh Besar. <br /> Site design with
              💙 by:{" "}
              <Link
                href={"https://muhammadfathurraiyan.vercel.app"}
                target="_blank"
                className="hover:text-primary duration-200 underline"
              >
                Raiyan.
              </Link>
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
