"use client";
import Whatsapp from "@/components/icon/Whatsapp";
import { Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ThemeToggle } from "../../ThemeToggle";
import { navLink } from "@/lib/staticData";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  return (
    <footer
      className={`${
        pathname.startsWith("/dashboard") || pathname === "/auth"
          ? "hidden"
          : ""
      } mt-12 text-backgroundAbsolute bg-foregroundAbsolute px-12 max-lg:px-4 py-12 space-y-8`}
    >
      <div className="flex flex-col gap-4">
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
        <nav className="space-x-4 text-sm">
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
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs">
          &copy; 2024 Himpunan Mahasiswa Aceh Besar. <br /> Site design with 💙
          by:{" "}
          <Link
            href={"https://muhammadfathurraiyan.vercel.app"}
            target="_blank"
            className="hover:text-primary duration-200 underline"
          >
            Raiyan.
          </Link>
        </p>
        <div className="flex items-center gap-4">
          <Link href={"/"} className="hover:text-primary transition-colors">
            <Whatsapp />
          </Link>
          <Link href={"/"} className="hover:text-primary transition-colors">
            <Instagram />
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
