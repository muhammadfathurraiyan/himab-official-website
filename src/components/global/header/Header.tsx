"use client";
import { Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Whatsapp from "../../icon/Whatsapp";
import { ThemeToggle } from "../ThemeToggle";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  return (
    <header
      className={`${
        pathname.startsWith("/dashboard") && "hidden"
      } py-4 px-12 max-lg:px-4 flex items-center justify-between`}
    >
      <Link href={"/"} className="flex items-center gap-2">
        <Image
          src="/img/logo.png"
          alt="logo himab"
          width={1080}
          height={1080}
          className="size-14"
        />
        <h1 className="font-bold uppercase leading-none">
          Himpunan Mahasiswa <br /> Aceh Besar
        </h1>
      </Link>
      <nav></nav>
      <div className="flex items-center gap-4">
        <Link href={"/"} className="hover:text-primary transition-colors">
          <Whatsapp />
        </Link>
        <Link href={"/"} className="hover:text-primary transition-colors">
          <Instagram />
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
