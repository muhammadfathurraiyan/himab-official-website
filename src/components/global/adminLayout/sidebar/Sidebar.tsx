"use client";
import Link from "next/link";
import {
  Home,
  Newspaper,
  BookOpenCheck,
  CalendarPlus,
  Headset,
  HandHelping,
  Database,
  UserPlus,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";

const superAdminPages = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: <Home size={16} />,
  },
  {
    name: "Profile",
    url: "/dashboard/profile",
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
    icon: <UserPlus size={20} />,
  },
  // {
  //   name: "Event",
  //   url: "/dashboard/event",
  //   icon: <CalendarPlus size={20} />,
  // },
];

export function Sidebar() {
  const [links, setLinks] = useState<{ key: string; value: string }[]>();
  const pathname = usePathname();

  return (
    <aside className="hidden border-r bg-muted/40 lg:block">
      <div className="flex h-full max-h-screen flex-col gap-4">
        <div className="flex items-center border-b h-[60px] px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image
              src="/img/logo.png"
              alt="logo himab"
              width={1080}
              height={1080}
              className="size-10"
            />
            <h1 className="mt-1 font-bold leading-none">
              Himpunan Mahasiswa <br /> Aceh Besar
            </h1>
          </Link>
        </div>
        <nav className="grid items-start text-sm font-medium px-4">
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
            className={`text-muted-foreground/30 flex items-center gap-3 rounded-lg px-3 py-2 transition-all`}
          >
            <CalendarPlus />
            Event
            <Badge className="hover:bg-primary ml-auto">Segera Hadir</Badge>
          </button>
        </nav>
      </div>
    </aside>
  );
}
