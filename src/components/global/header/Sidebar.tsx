import Whatsapp from "@/components/icon/Whatsapp";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignRight, Instagram, Menu, SeparatorVertical } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "../ThemeToggle";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export function Sidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size={"icon"}>
          <AlignRight />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="pb-4">
          <SheetTitle className="text-left uppercase leading-none">
            <Link href={"/"} className="flex items-center gap-2">
              <Image
                src="/img/logo.png"
                alt="logo himab"
                width={1080}
                height={1080}
                className="size-12"
              />
              <span className="mt-1">
                Himpunan Mahasiswa <br /> Aceh Besar
              </span>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <nav className="grid gap-4 py-4">
          <Link
            href={"/"}
            className="font-medium text-sm hover:text-primary transition-colors"
          >
            Beranda
          </Link>
          <Link
            href={"/profil"}
            className="font-medium text-sm hover:text-primary transition-colors"
          >
            Profil
          </Link>
          <Link
            href={"/berita"}
            className="font-medium text-sm hover:text-primary transition-colors"
          >
            Berita
          </Link>
          <Link
            href={"/lainya"}
            className="font-medium text-sm hover:text-primary transition-colors"
          >
            Lainya
          </Link>
          <Link
            href={"/kontak"}
            className="font-medium text-sm hover:text-primary transition-colors"
          >
            Kontak
          </Link>
        </nav>
        <SheetFooter className="pt-4">
          <div className="flex items-center gap-1">
            <Link
              href={"/"}
              className={buttonVariants({ variant: "ghost", size: "icon" })}
            >
              <Whatsapp />
            </Link>
            <Link
              href={"/"}
              className={buttonVariants({ variant: "ghost", size: "icon" })}
            >
              <Instagram />
            </Link>
            <ThemeToggle
              className={buttonVariants({ variant: "ghost", size: "icon" })}
            />
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
