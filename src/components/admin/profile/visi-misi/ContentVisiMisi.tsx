"use client";
import CardInfo from "@/components/global/adminLayout/card/CardInfo";
import CustomEditor from "@/components/global/adminLayout/editor/CustomEditor";
import { visiMisiColumns } from "@/components/global/adminLayout/table/Columns";
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
import { editVisiMisi } from "@/lib/actions";
import { BlogSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { VisiMisi } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type VisiMisiForm = z.infer<typeof BlogSchema>;

export default function ContentVisiMisi({
  userId,
  visiMisi,
}: {
  userId?: string;
  visiMisi: VisiMisi | null;
}) {
  if (!visiMisi) return <></>;
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(visiMisi.content);

  const form = useForm<VisiMisiForm>({
    resolver: zodResolver(BlogSchema),
    defaultValues: {
      title: visiMisi.title,
      image: visiMisi.image,
      content: visiMisi.content ?? "",
      excerpt: visiMisi.excerpt ?? "",
      userId: userId,
    },
  });

  const save = async (data: VisiMisiForm) => {
    const dataVisiMisi = {
      title: data.title,
      image: data.image,
      excerpt: content?.slice(0, 50).replace(/(<([^>]+)>)/gi, ""),
      content: content,
      userId: data.userId,
    };

    const result = await editVisiMisi(dataVisiMisi, visiMisi.id);

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
          "Visi-misi berhasil di update, silahkan cek pada tabel data visi-misi.",
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
            description="Jika anda ingin melakukan pengeditan halaman visi-misi, klik tombol di bawah untuk melakukan pengeditan tentang visi-misi."
            title="Visi-Misi"
            button={{
              title: "Edit Visi-misi",
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
                    title: "Tabel data visi-misi",
                  },
                }}
                columns={visiMisiColumns}
                data={[visiMisi]}
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
              <h2 className="font-bold text-xl">Form Visi-Misi</h2>
              <p className="text-sm text-muted-foreground">
                Silahkan mengubah form dibawah untuk mengedit visi-misi
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
                        placeholder="Visi-misi"
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
