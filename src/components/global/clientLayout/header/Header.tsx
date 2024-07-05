"use client";
import { Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Whatsapp from "../../../icon/Whatsapp";
import { ThemeToggle } from "../../ThemeToggle";
import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Kategori } from "@prisma/client";
import { Sidebar } from "./Sidebar";

export default function Header({ categories }: { categories: Kategori[] }) {
  const pathname = usePathname();
  return (
    <header
      className={`${
        pathname.startsWith("/dashboard") || pathname === "/auth"
          ? "hidden"
          : ""
      } py-4 px-12 max-lg:px-4 flex items-center justify-between sticky top-0 inset-x-0 z-10 bg-background`}
    >
      <Link href={"/"} className="flex items-center gap-2">
        <Image
          src="/img/logo.png"
          alt="logo himab"
          width={1080}
          height={1080}
          className="size-10"
        />
        <h1 className="font-bold uppercase leading-none">
          Himpunan Mahasiswa <br /> Aceh Besar
        </h1>
      </Link>
      <Navbar categories={categories} />
      <div className="flex items-center gap-4 max-lg:hidden">
        <Link href={"/"} className="hover:text-primary transition-colors">
          <Whatsapp />
        </Link>
        <Link href={"/"} className="hover:text-primary transition-colors">
          <Instagram />
        </Link>
        <ThemeToggle />
      </div>
      <Sidebar />
    </header>
  );
}
