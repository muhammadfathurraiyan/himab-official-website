"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import {
  createStrukturOrganisasi,
  deleteStrukturOrganisasi,
  editStriktukrOrganisasi,
} from "@/lib/actions";
import { DatabaseSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Database, Jabatan } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

type CrudForm = z.infer<typeof DatabaseSchema>;
type TSosmed =
  | (
      | {
          jenis?: string | undefined;
          url?: string | undefined;
        }
      | undefined
    )[]
  | undefined;

export function CreateStrukturOrganisasi({
  isCreate,
  setIsCreate,
  jabatan,
}: {
  isCreate: boolean;
  setIsCreate: Dispatch<SetStateAction<boolean>>;
  jabatan: Jabatan[];
}) {
  if (!isCreate) return <></>;
  const form = useForm<CrudForm>({
    resolver: zodResolver(DatabaseSchema),
    defaultValues: {
      name: "",
      jabatan: "",
      image: "",
      status: "",
      tahunMulai: "",
      tahunSelesai: "",
      sosmed: [
        {
          jenis: "",
          url: "",
        },
      ],
    },
  });

  const control = form.control;
  const formField = useFieldArray({
    name: "sosmed",
    control,
  });

  const create = async (data: CrudForm) => {
    const newAnggota = {
      name: data.name,
      jabatan: data.jabatan,
      image: data.image,
      status: data.status,
      tahunMulai: data.tahunMulai,
      tahunSelesai: data.tahunSelesai,
      sosmed: data.sosmed,
    };

    const result = await createStrukturOrganisasi(newAnggota);

    if (result?.error) {
      toast({
        title: "Error!",
        description: `Terdapat kesalahan silahkan refresh halaman dan coba lagi.\n ${result.error}`,
        variant: "destructive",
      });
    } else {
      setIsCreate(false);
      toast({
        title: "Berhasil di input",
        description:
          "Anggota berhasil di tambah, silahkan cek pada tabel data struktur anggota organisasi.",
      });
    }
  };

  return (
    <div
      className={`${
        isCreate ? "visible opacity-100" : "hidden invisible opacity-0"
      } transition-all`}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(create)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama</FormLabel>
                    <FormControl>
                      <Input placeholder="Sabirin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jabatan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jabatan</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Kategori" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {jabatan.map((j) => (
                          <SelectItem key={j.id} value={j.title}>
                            {j.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link gambar profil</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://placehold.co/150x150"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jabatan</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Kategori" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="menjabat">menjabat</SelectItem>
                        <SelectItem value="alumni">alumni</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2 justify-between">
                <FormField
                  control={form.control}
                  name="tahunMulai"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Tahun mulai</FormLabel>
                      <FormControl>
                        <Input placeholder="2020" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tahunSelesai"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Tahun selesai</FormLabel>
                      <FormControl>
                        <Input placeholder="2022" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Sosial Media</CardTitle>
              <CardDescription>
                Silahkan mengisi form dibawah untuk menambahkan sosmed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {formField.fields.map((field, index) => (
                <div
                  key={field.id}
                  className="border rounded-lg p-4 flex flex-col gap-2"
                >
                  <h3 className="text-lg font-semibold">Ruang {index + 1}</h3>
                  <FormField
                    control={form.control}
                    name={`sosmed.${index}.jenis`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama sosmed</FormLabel>
                        <FormControl>
                          <Input
                            className=""
                            placeholder="Instagram"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`sosmed.${index}.url`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Link sosmed</FormLabel>
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
                    jenis: "",
                    url: "",
                  });
                }}
              >
                Tambah sosmed
              </Button>
            </CardFooter>
          </Card>
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant={"outline"}
              onClick={() => setIsCreate(false)}
            >
              Batal
            </Button>
            <Button className="max-lg:w-full" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export function EditStrukturOrganisasi({
  setIsEdit,
  isEdit,
  strukturOrganisasi,
  jabatan,
}: {
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  isEdit: boolean;
  strukturOrganisasi?: Database;
  jabatan: Jabatan[];
}) {
  if (!strukturOrganisasi) return <></>;
  const form = useForm<CrudForm>({
    resolver: zodResolver(DatabaseSchema),
    defaultValues: {
      name: strukturOrganisasi.name,
      jabatan: strukturOrganisasi.jabatan,
      image: strukturOrganisasi.image,
      status: strukturOrganisasi.status,
      tahunMulai: strukturOrganisasi.tahunMulai,
      tahunSelesai: strukturOrganisasi.tahunSelesai,
      sosmed: strukturOrganisasi.sosmed as TSosmed,
    },
  });

  const control = form.control;
  const formField = useFieldArray({
    name: "sosmed",
    control,
  });

  const edit = async (data: CrudForm) => {
    const updatedData = {
      name: data.name,
      jabatan: data.jabatan,
      image: data.image,
      status: data.status,
      tahunMulai: data.tahunMulai,
      tahunSelesai: data.tahunSelesai,
      sosmed: data.sosmed,
    };

    const result = await editStriktukrOrganisasi(
      updatedData,
      strukturOrganisasi.id
    );

    if (result?.error) {
      toast({
        title: "Error!",
        description: `Terdapat kesalahan silahkan refresh halaman dan coba lagi.\n ${result.error}`,
        variant: "destructive",
      });
    } else {
      setIsEdit(false);
      toast({
        title: "Berhasil di input",
        description:
          "Anggota berhasil di edit, silahkan cek pada tabel struktur anggota organisasi.",
      });
    }
  };

  return (
    <div
      className={`${
        isEdit ? "visible opacity-100" : "hidden invisible opacity-0"
      } transition-all`}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(edit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama</FormLabel>
                    <FormControl>
                      <Input placeholder="Sabirin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jabatan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jabatan</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Kategori" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {jabatan.map((j) => (
                          <SelectItem key={j.id} value={j.title}>
                            {j.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link gambar profil</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://placehold.co/150x150"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Kategori" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="menjabat">menjabat</SelectItem>
                        <SelectItem value="alumni">alumni</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2 justify-between">
                <FormField
                  control={form.control}
                  name="tahunMulai"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Tahun mulai</FormLabel>
                      <FormControl>
                        <Input placeholder="2020" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tahunSelesai"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Tahun selesai</FormLabel>
                      <FormControl>
                        <Input placeholder="2022" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Sosial Media</CardTitle>
              <CardDescription>
                Silahkan mengisi form dibawah untuk menambahkan sosmed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {formField.fields.map((field, index) => (
                <div
                  key={field.id}
                  className="border rounded-lg p-4 flex flex-col gap-2"
                >
                  <h3 className="text-lg font-semibold">Ruang {index + 1}</h3>
                  <FormField
                    control={form.control}
                    name={`sosmed.${index}.jenis`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama sosmed</FormLabel>
                        <FormControl>
                          <Input
                            className=""
                            placeholder="Instagram"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`sosmed.${index}.url`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Link sosmed</FormLabel>
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
                    jenis: "",
                    url: "",
                  });
                }}
              >
                Tambah sosmed
              </Button>
            </CardFooter>
          </Card>
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant={"outline"}
              onClick={() => setIsEdit(false)}
            >
              Batal
            </Button>
            <Button className="max-lg:w-full" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export function DeleteStrukturOrganisasi({
  id,
  setIsDelete,
}: {
  id: string;
  setIsDelete: Dispatch<SetStateAction<boolean>>;
}) {
  async function deleteAction(data: FormData) {
    const id = data.get("id") as string;
    if (id) {
      await deleteStrukturOrganisasi(id);
      setIsDelete(false);
      toast({
        title: "Berhasil di hapus",
        description:
          "Data berhasil di hapus, silahkan cek pada tabel data anggota.",
      });
    } else {
      toast({
        title: "Error!",
        description:
          "Terdapat kesalahan silahkan refresh halaman dan coba lagi.",
        variant: "destructive",
      });
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Hapus anggota</DialogTitle>
      </DialogHeader>
      <DialogDescription>
        Tindakan ini tidak bisa dibatalkan. Tindakan ini akan menghapus anggota
        secara permanen dari server.
      </DialogDescription>
      <DialogFooter>
        <DialogClose className={buttonVariants({ variant: "outline" })}>
          Batal
        </DialogClose>
        <form action={deleteAction}>
          <input type="hidden" value={id} name="id" />
          <Button type="submit" variant={"destructive"}>
            Hapus
          </Button>
        </form>
      </DialogFooter>
    </DialogContent>
  );
}
