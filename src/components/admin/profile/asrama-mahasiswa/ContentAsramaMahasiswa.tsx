"use client";
import CardInfo from "@/components/global/adminLayout/card/CardInfo";
import { asramaColumns } from "@/components/global/adminLayout/table/Columns";
import { DataTable } from "@/components/global/adminLayout/table/Datatable";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { editAsramaMahasiswa } from "@/lib/actions";
import { AsramaMahasiswaSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Asrama } from "@prisma/client";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

type AsramaMahasiswaForm = z.infer<typeof AsramaMahasiswaSchema>;
type TData =
  | (
      | {
          image?: string | undefined;
          description?: string | undefined;
          ruang?: string | undefined;
        }
      | undefined
    )[]
  | undefined;

export default function ContentAsramaMahasiswa({
  asrama,
}: {
  asrama: Asrama | null;
}) {
  if (!asrama) return <></>;
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<AsramaMahasiswaForm>({
    resolver: zodResolver(AsramaMahasiswaSchema),
    defaultValues: {
      title: asrama.title,
      image: asrama.image,
      description: asrama.description,
      data: asrama.data as TData,
    },
  });

  const control = form.control;
  const formField = useFieldArray({
    name: "data",
    control,
  });

  const save = async (data: AsramaMahasiswaForm) => {
    const dataAsrama = {
      title: data.title,
      image: data.image,
      description: data.description,
      data: data.data,
    };

    const result = await editAsramaMahasiswa(dataAsrama, asrama.id);

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
          "Asrama mahasiswa berhasil di update, silahkan cek pada tabel data asrama mahasiswa.",
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
            description="Jika anda ingin melakukan pengeditan halaman asrama mahasiswa, klik tombol di bawah untuk melakukan pengeditan tentang asrama mahasiswa."
            title="Asrama Mahasiswa"
            button={{
              title: "Edit Asrama Mahaswiswa",
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
                    title: "Tabel data asrama mahasiswa",
                  },
                }}
                columns={asramaColumns}
                data={[asrama]}
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
              <h2 className="font-bold text-xl">Form Asrama Mahasiswa</h2>
              <p className="text-sm text-muted-foreground">
                Silahkan mengubah form dibawah untuk mengedit Asrama Mahasiswa
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Judul</FormLabel>
                    <FormControl>
                      <Input
                        className="lg:w-[400px]"
                        placeholder="Asrama Mahasiswa"
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Deskripsi"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Card className="mt-2">
                <CardHeader>
                  <CardTitle>Ruang</CardTitle>
                  <CardDescription>
                    Silahkan mengubah form dibawah untuk mengedit/membuat konten
                    ruangan
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formField.fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="border rounded-lg p-4 flex flex-col gap-2"
                    >
                      <h3 className="text-lg font-semibold">
                        Ruang {index + 1}
                      </h3>
                      <FormField
                        control={form.control}
                        name={`data.${index}.ruang`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nama Ruang</FormLabel>
                            <FormControl>
                              <Input
                                className=""
                                placeholder="Kamar"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`data.${index}.image`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Link gambar ruang</FormLabel>
                            <FormControl>
                              <Input
                                className=""
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
                        name={`data.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Deskripsi</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Deskripsi ruang"
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant={"destructive"}
                        className="mt-2 w-fit"
                        onClick={() => {
                          formField.remove(index);
                        }}
                      >
                        Hapus
                      </Button>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button
                    type="button"
                    variant={"outline"}
                    onClick={() => {
                      formField.append({
                        ruang: "",
                        description: "",
                        image: "",
                      });
                    }}
                  >
                    Tambah ruang
                  </Button>
                </CardFooter>
              </Card>
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
