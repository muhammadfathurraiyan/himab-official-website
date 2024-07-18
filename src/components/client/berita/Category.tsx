import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Berita } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function Category({
  title,
  berita,
}: {
  title: string;
  berita: Berita[];
}) {  
  return (
    <section className="px-12 max-lg:px-4 space-y-2">
      <h2 className="font-bold text-3xl capitalize">{title}</h2>
      <div className="grid grid-cols-4 max-lg:grid-cols-2 gap-4">
        {berita.map((b) => (
          <Card key={b.id}>
            <CardHeader className="px-0 pt-0">
              <Image
                src={b.image}
                alt={b.title}
                width={1080}
                height={1080}
                className="h-[24vh] size-full object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent className="px-4">
              <h3 className="font-bold text-lg">{b.title}</h3>
              <p>{b.excerpt}</p>
            </CardContent>
            <CardFooter className="px-4">
              <Link href={`/berita/${b.slug}`} className={buttonVariants()}>
                Selengkapnya!
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
