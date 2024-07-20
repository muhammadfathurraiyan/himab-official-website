"use client";

import * as React from "react";
import Link from "next/link";

import { cn, slugify } from "@/lib/utils";
2;
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { Kategori } from "@prisma/client";
import { Newspaper } from "lucide-react";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Asrama Mahasiswa",
    href: "/profil/asrama-mahasiswa",
    description: "Profile asrama mahasiswa Himpunan Mahasiswa Aceh Besar",
  },
  {
    title: "Database",
    href: "/database",
    description: "Halaman database Himpunan Mahasiswa Aceh Besar",
  },
  {
    title: "Layanan",
    href: "/layanan",
    description: "Halaman layanan Himpunan Mahasiswa Aceh Besar",
  },
];

export function Navbar({ categories }: { categories: Kategori[] }) {
  return (
    <NavigationMenu className="max-lg:hidden">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Profil</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[550px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-fit select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/profil/tentang-himab"
                  >
                    <Image
                      src="/img/logo.png"
                      alt="logo himab"
                      width={1080}
                      height={1080}
                      className="size-28"
                    />
                    <h1 className="mb-2 mt-4 text-lg font-medium">HIMAB</h1>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Profil Himpunan Mahasiswa Aceh Besar
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/profil/sejarah" title="Sejarah HIMAB">
                Sejarah Awal Himpunan Mahasiswa Aceh Besar
              </ListItem>
              <ListItem href="/profil/visi-misi" title="Visi-Misi">
                Visi-Misi dari Himpunan Mahasiswa Aceh Besar
              </ListItem>
              <ListItem
                href="/profil/struktur-organisasi"
                title="Struktur Organisasi"
              >
                Struktur Organisasi Himpunan Mahasiswa Aceh Besar
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Berita</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 grid-cols-2 lg:w-[550px] ">
              <li className="col-span-2">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex items-center gap-4 h-full w-full rounded-md bg-gradient-to-b from-muted/50 to-muted p-3 focus:shadow-md"
                    href="/berita"
                  >
                    <Newspaper size={64} />
                    <div className="">
                      <h1 className="text-lg font-medium">Berita</h1>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Lihat semua berita yang terbaru atau sudah pernah diupload.
                      </p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              {categories.map((component) => (
                <ListItem
                  key={component.id}
                  title={component.title}
                  href={`/berita/${component.title}`}
                >
                  {"Kumpulan informasi terbaru tentang kategori " +
                    component.title}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/kontak" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Kontak
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Lainya</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[550px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

type ListProps = {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
};
const ListItem = ({
  className,
  title,
  children,
  href,
  ...props
}: ListProps) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};
