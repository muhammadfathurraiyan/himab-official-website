"use client";

import { Button, buttonVariants } from "@/components/ui/button";
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
import { useForm } from "react-hook-form";
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
  jabatan
}: {
  isCreate: boolean;
  setIsCreate: Dispatch<SetStateAction<boolean>>;
  jabatan: Jabatan[]
}) {
  if (!isCreate) return <></>;
  const form = useForm<CrudForm>({
    resolver: zodResolver(DatabaseSchema),
    defaultValues: {
      name: "",
      jabatan: "",
      image: "",
      divisi: "",
      status: false,
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

  const create = async (data: CrudForm) => {
    const newAnggota = {
      name: data.name,
      jabatan: data.jabatan,
      image: data.image,
      divisi: data.divisi,
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
    <Dialog open={isCreate} onOpenChange={setIsCreate}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah anggota</DialogTitle>
          <DialogDescription>
            Form untuk melakukan penambahan anggota organisasi.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(create)} className="space-y-4">
            <div className="space-y-2">
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
            <div className="flex items-center gap-4">
              <DialogClose className={buttonVariants({ variant: "outline" })}>
                Batal
              </DialogClose>
              <Button className="max-lg:w-full" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export function EditStrukturOrganisasi({
  setIsEdit,
  strukturOrganisasi,
  jabatan
}: {
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  strukturOrganisasi: Database;
  jabatan: Jabatan[]
}) {
  const form = useForm<CrudForm>({
    resolver: zodResolver(DatabaseSchema),
    defaultValues: {
      name: strukturOrganisasi.name,
      jabatan: strukturOrganisasi.jabatan,
      image: strukturOrganisasi.image,
      divisi: strukturOrganisasi.divisi,
      status: strukturOrganisasi.status,
      tahunMulai: strukturOrganisasi.tahunMulai,
      tahunSelesai: strukturOrganisasi.tahunSelesai,
      sosmed: strukturOrganisasi.sosmed as TSosmed,
    },
  });

  const edit = async (data: CrudForm) => {
    const updatedData = {
      name: data.name,
      jabatan: data.jabatan,
      image: data.image,
      divisi: data.divisi,
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
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit anggota</DialogTitle>
        <DialogDescription>
          Form untuk melakukan edit data anggota organisasi.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(edit)} className="space-y-4">
          <div className="space-y-2">
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
          <div className="flex items-center gap-4">
            <DialogClose className={buttonVariants({ variant: "outline" })}>
              Batal
            </DialogClose>
            <Button className="max-lg:w-full" type="submit">
              Update
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
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
