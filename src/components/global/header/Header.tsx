"use client";
import Link from "next/link";
import { ThemeToggle } from "../theme/ThemeToggle";
import { usePathname } from "next/navigation";
import { Instagram } from "lucide-react";
import Whatsapp from "@/components/icon/Whatsapp";
import { Navigation } from "./Navigation";
import { buttonVariants } from "@/components/ui/button";
import { Sidebar } from "./Sidebar";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Header() {
  const [isScroll, setIsScroll] = useState(false);

  const handleIsScroll = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      if (windowHeight > 1) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleIsScroll);

    return () => {
      window.removeEventListener("scroll", handleIsScroll);
    };
  }, []);
  return (
    <header
      className={`${
        isScroll
          ? // "backdrop-blur bg-background/40" : "bg-background/0"
            "backdrop-blur bg-[hsl(222.2_84%_4.9%)] bg-opacity-40"
          : "bg-[hsl(222.2_84%_4.9%)] bg-opacity-0"
      } transition-colors fixed top-0 w-full z-50 flex justify-between items-center px-12 max-lg:px-4 py-4 text-[hsl(210_40%_98%)]`}
    >
      <Link href={"/"} className="flex items-center gap-2">
        <Image
          src="/img/logo.png"
          alt="logo himab"
          width={1080}
          height={1080}
          className="size-12"
        />
        <h1 className="font-bold leading-none uppercase mt-1">
          Himpunan Mahasiswa <br /> Aceh besar
        </h1>
      </Link>
      <div className="max-lg:hidden">
        <Navigation />
      </div>
      <div className="flex items-center gap-4 max-lg:hidden">
        <Link href={"/"} className="hover:text-primary transition-colors">
          <Whatsapp />
        </Link>
        <Link href={"/"} className="hover:text-primary transition-colors">
          <Instagram />
        </Link>
        <ThemeToggle />
      </div>
      <div className="lg:hidden">
        <Sidebar />
      </div>
    </header>
  );
}
