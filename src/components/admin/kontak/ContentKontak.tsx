"use client";
import CardInfo from "@/components/global/adminLayout/card/CardInfo";
import CustomEditor from "@/components/global/adminLayout/editor/CustomEditor";
import { kontakColumns } from "@/components/global/adminLayout/table/Columns";
import { DataTable } from "@/components/global/adminLayout/table/Datatable";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
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
import { editKontak } from "@/lib/actions";
import { BlogSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Kontak } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type KontakForm = z.infer<typeof BlogSchema>;

export default function ContentKontak({
  userId,
  kontak,
}: {
  userId?: string;
  kontak: Kontak | null;
}) {
  if (!kontak) return <></>;
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(kontak.content);

  const form = useForm<KontakForm>({
    resolver: zodResolver(BlogSchema),
    defaultValues: {
      title: kontak.title,
      image: kontak.image,
      content: kontak.content ?? "",
      excerpt: kontak.excerpt ?? "",
      userId: userId,
    },
  });

  const save = async (data: KontakForm) => {
    const dataKontak = {
      title: data.title,
      image: data.image,
      excerpt: content?.slice(0, 50).replace(/(<([^>]+)>)/gi, ""),
      content: content,
      userId: data.userId,
    };

    const result = await editKontak(dataKontak, kontak.id);

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
          "Kontak berhasil di update, silahkan cek pada tabel data kontak.",
      });
    }
  };

  return (
    <div className="mt-4">
      <div
        className={`${isOpen ? "hidden" : "flex"} flex-col mt-4 gap-4 w-full`}
      >
        <div>
          <CardInfo
            description="Jika anda ingin melakukan pengeditan halaman kontak, klik tombol di bawah untuk melakukan pengeditan tentang kontak."
            title="Kontak"
            button={{
              title: "Edit Kontak",
              onClick: () => setIsOpen(!isOpen),
            }}
          />
        </div>
        <div>
          <Card>
            <CardHeader>
              <DataTable
                includes={{
                  viewOptions: true,
                  header: {
                    isVisible: true,
                    title: "Tabel data kontak",
                  },
                }}
                columns={kontakColumns}
                data={[kontak]}
              />
            </CardHeader>
          </Card>
        </div>
      </div>
      <div
        className={`${
          isOpen ? "visible opacity-100" : "hidden invisible opacity-0"
        } transition-all`}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(save)}
            className="border p-4 rounded-lg space-y-4"
          >
            <div>
              <h2 className="font-bold text-xl">Form Kontak</h2>
              <p className="text-sm text-muted-foreground">
                Silahkan mengubah form dibawah untuk mengedit kontak
              </p>
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Judul</FormLabel>
                    <FormControl>
                      <Input
                        className="lg:w-[400px]"
                        placeholder="Kontak"
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
                        className="lg:w-[400px]"
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
                onClick={() => setIsOpen(false)}
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
