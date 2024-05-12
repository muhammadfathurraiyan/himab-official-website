"use client";
import Link from "next/link";
import { ThemeToggle } from "../theme/ThemeToggle";
import { usePathname } from "next/navigation";
import { Instagram } from "lucide-react";
import Whatsapp from "@/components/icon/Whatsapp";
import { Navigation } from "./Navigation";
import { buttonVariants } from "@/components/ui/button";
import { Sidebar } from "./Sidebar";

export default function Header() {
  return (
    <header className="fixed top-0 z-50 flex justify-between items-center px-12 max-lg:px-4 py-4 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Link href={"/"}>
        <h1 className="font-bold leading-none uppercase">
          Himpunan Mahasiswa <br /> Aceh besar
        </h1>
      </Link>
      <div className="max-lg:hidden">
        <Navigation />
      </div>
      <div className="flex items-center gap-1 max-lg:hidden">
        <Link
          href={"/"}
          className={buttonVariants({
            variant: "ghost",
            size: "icon",
            className:
              "bg-transparent hover:bg-background data-[active]:bg-background data-[state=open]:bg-background",
          })}
        >
          <Whatsapp />
        </Link>
        <Link
          href={"/"}
          className={buttonVariants({
            variant: "ghost",
            size: "icon",
            className:
              "bg-transparent hover:bg-background data-[active]:bg-background data-[state=open]:bg-background",
          })}
        >
          <Instagram />
        </Link>
        <ThemeToggle className="bg-transparent hover:bg-background focus:bg-transparent data-[active]:bg-background data-[state=open]:bg-background" />
      </div>
      <div className="lg:hidden">
        <Sidebar />
      </div>
    </header>
  );
}
