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
  UserRoundPlus,
  Menu,
  CircleUser,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { ThemeToggle } from "../../ThemeToggle";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { signOut } from "@/lib/auth/auth";
import { logoutAction } from "@/lib/actions";

const superAdminPages = [
  {
    name: "Dashboard",
    url: "/dashboard",
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
  // {
  //   name: "Event",
  //   url: "/dashboard/event",
  //   icon: <CalendarPlus size={20} />,
  // },
];

export default function Header() {
  const pathname = usePathname();
  const [links, setLinks] = useState<string[]>();

  useEffect(() => {
    const newLink = pathname.split("/").slice(1);
    setLinks(newLink);
  }, [pathname]);

  return (
    <header className="flex items-center justify-between border-b bg-muted/40 px-4 h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 lg:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu navigasi</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
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
      <Breadcrumb>
        <BreadcrumbList>
          {links?.map((link, index) => (
            <Fragment key={index}>
              {index === links.length - 1 ? (
                <BreadcrumbItem>
                  <BreadcrumbPage className="capitalize">
                    {link.replace("-", " ")}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              ) : (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink className="capitalize" asChild>
                      <Link href={`/${link}`}>{link.replace("-", " ")}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </>
              )}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="hover:text-primary transition-colors outline-none">
              <CircleUser />
              <span className="sr-only">Toggle menu user</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Akun</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => logoutAction()}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
