"use client";
import CardInfo from "@/components/global/adminLayout/card/CardInfo";
import CustomEditor from "@/components/global/adminLayout/editor/CustomEditor";
import { sejarahColumns } from "@/components/global/adminLayout/table/Columns";
import { DataTable } from "@/components/global/adminLayout/table/Datatable";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { editSejarah } from "@/lib/actions";
import { SejarahSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sejarah } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type SejarahForm = z.infer<typeof SejarahSchema>;

export default function ContentSejarah({
  userId,
  sejarah,
}: {
  userId?: string;
  sejarah: Sejarah[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(sejarah[0].content);

  const form = useForm<SejarahForm>({
    resolver: zodResolver(SejarahSchema),
    defaultValues: {
      title: sejarah[0].title,
      image: sejarah[0].image,
      content: sejarah[0].content ?? "",
      excerpt: sejarah[0].excerpt ?? "",
      userId: userId,
    },
  });

  const save = async (data: SejarahForm) => {
    const dataSejarah = {
      title: data.title,
      image: data.image,
      excerpt: content?.slice(0, 50).replace(/(<([^>]+)>)/gi, ""),
      content: content,
      userId: data.userId,
    };

    const result = await editSejarah(dataSejarah, sejarah[0].id);

    if (result?.error) {
      toast({
        title: "Error!",
        description: `Terdapat kesalahan silahkan refresh halaman dan coba lagi.\n ${result.error}`,
        variant: "destructive",
      });
    } else {
      setIsOpen(false);
      toast({
        title: "Berhasil di input",
        description:
          "Sejarah berhasil di update, silahkan cek pada tabel data sejarah.",
      });
    }
  };

  return (
    <div className="mt-4">
      <div
        className={`${
          !isOpen ? "" : "hidden"
        } lg:grid lg:items-start lg:grid-cols-3 mt-4 lg:gap-4 max-lg:space-y-4 w-full`}
      >
        <div className="size-full">
          <CardInfo
            description="Jika anda ingin melakukan pengeditan halaman sejarah, klik tombol di bawah untuk melakukan pengeditan tentang sejarah."
            title="Sejarah"
            button={{
              title: "Edit Sejarah",
              onClick: () => setIsOpen(!isOpen),
            }}
          />
        </div>
        <div className="lg:col-span-2 size-full">
          <Card className="size-full">
            <CardHeader>
              <DataTable
                includes={{ viewOptions: true }}
                columns={sejarahColumns}
                data={sejarah}
              />
            </CardHeader>
          </Card>
        </div>
      </div>
      <div
        className={`${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        } transition-all`}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(save)}>
            <div className="space-y-2 mb-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Judul</FormLabel>
                    <FormControl>
                      <Input
                        className="w-[400px]"
                        placeholder="Sejarah"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link gambar sampul</FormLabel>
                    <FormControl>
                      <Input
                        className="w-[400px]"
                        placeholder="https://placehold.co/150x150"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Konten</FormLabel>
                    <FormControl>
                      <CustomEditor content={content} onChange={setContent} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant={"outline"}
                className="max-lg:w-full"
                type="button"
              >
                Batal
              </Button>
              <Button className="max-lg:w-full" type="submit">
                Update
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
