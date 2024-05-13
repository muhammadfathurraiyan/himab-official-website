"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons";
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

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Berita Terbaru",
    href: "/berita/berita-terbaru",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, aut.",
  },
  {
    title: "Politik",
    href: "/berita/politik",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, aut.",
  },
  {
    title: "Agama",
    href: "/berita/agama",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, aut.",
  },
  {
    title: "Lingkungan",
    href: "/beriata/lingkungan",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, aut.",
  },
  {
    title: "Budaya",
    href: "/berita/budaya",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, aut.",
  },
  {
    title: "Sosial",
    href: "/berita/sosial",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, aut.",
  },
];

const components2: { title: string; href: string; description: string }[] = [
  {
    title: "Pencapaian",
    href: "/pencapaian",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, aut.",
  },
  {
    title: "Kontak",
    href: "/kontak",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, aut.",
  },
  {
    title: "FAQ",
    href: "/faq",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, aut.",
  },
];

// capaian, faq

export function Navigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle({
                className:
                  "bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent hover:text-primary focus:text-primary data-[active]:text-primary data-[state=open]:text-primary",
              })}
            >
              Beranda
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent hover:text-primary focus:text-primary data-[active]:text-primary data-[state=open]:text-primary">
            Profile
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/profile/himab"
                  >
                    <Image
                      src="/img/logo.png"
                      alt="logo himab"
                      width={1080}
                      height={1080}
                      className="size-full"
                    />
                    <div className="mb-2 mt-4 text-lg font-medium">Tentang Himab</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Lorem ipsum dolor sit amet dolor sit ametdolor
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/profile/sejarah" title="Sejarah">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur, quibusdam!
              </ListItem>
              <ListItem href="/profile/visi-misi" title="Visi dan Misi">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem
                href="/docs/primitives/typography"
                title="Struktur Organisasi"
              >
                How to install dependencies and structure your app.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent hover:text-primary focus:text-primary data-[active]:text-primary data-[state=open]:text-primary">
            Berita
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
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
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent hover:text-primary focus:text-primary data-[active]:text-primary data-[state=open]:text-primary">
            Lainya
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[500px] ">
              {components2.map((component) => (
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
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle({
                className:
                  "bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent hover:text-primary focus:text-primary data-[active]:text-primary data-[state=open]:text-primary",
              })}
            >
              Kontak
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  className,
  title,
  children,
  href,
}: {
  className?: string;
  title: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          href={href}
        >
          <h2 className="text-sm font-medium leading-none">{title}</h2>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
