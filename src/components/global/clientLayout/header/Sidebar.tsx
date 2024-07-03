"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  BookOpenCheck,
  CalendarPlus,
  Database,
  HandHelping,
  Headset,
  Home,
  Menu,
  Newspaper,
  UserRoundPlus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const superAdminPages = [
  {
    name: "Beranda",
    url: "/",
    icon: <Home size={20} />,
  },
  {
    name: "Profile",
    url: "/dashboard/profil",
    icon: <BookOpenCheck size={20} />,
  },
  {
    name: "Berita",
    url: "/dashboard/berita",
    icon: <Newspaper size={20} />,
  },
  {
    name: "Database",
    url: "/dashboard/database",
    icon: <Database size={20} />,
  },
  {
    name: "Layanan",
    url: "/dashboard/layanan",
    icon: <HandHelping size={20} />,
  },
  {
    name: "Kontak",
    url: "/dashboard/kontak",
    icon: <Headset size={20} />,
  },
  {
    name: "Manajemen Admin",
    url: "/dashboard/manajemen-admin",
    icon: <UserRoundPlus size={20} />,
  },
];

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
        <nav className="grid items-start text-sm font-medium">
          {superAdminPages.map((data) => (
            <Link
              key={data.name}
              href={data.url}
              className={`${
                pathname === data.url
                  ? "bg-muted text-primary"
                  : "text-muted-foreground"
              } flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary`}
            >
              {data.icon}
              {data.name}
            </Link>
          ))}
          <button
            disabled
            className={`text-muted flex items-center gap-3 rounded-lg px-3 py-2 transition-all`}
          >
            <CalendarPlus />
            Event
            <Badge className="hover:bg-primary ml-auto">Segera Hadir</Badge>
          </button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
