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
import { StrukturOrganisasiSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { StrukturOrganisasi } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type CrudForm = z.infer<typeof StrukturOrganisasiSchema>;
const jabatanStrukturOrganisasi = ["Ketua", "Sektaris", "Anggota"];

export function CreateStrukturOrganisasi({
  isCreate,
  setIsCreate,
}: {
  isCreate: boolean;
  setIsCreate: Dispatch<SetStateAction<boolean>>;
}) {
  if (!isCreate) return <></>;
  const form = useForm<CrudForm>({
    resolver: zodResolver(StrukturOrganisasiSchema),
    defaultValues: {
      name: "",
      image: "",
      jabatan: "",
    },
  });

  const create = async (data: CrudForm) => {
    const newAnggota = {
      name: data.name,
      jabatan: data.jabatan,
      image: data.image,
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
                        {jabatanStrukturOrganisasi.map((jabatan) => (
                          <SelectItem key={jabatan} value={jabatan}>
                            {jabatan}
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
}: {
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  strukturOrganisasi: StrukturOrganisasi;
}) {
  const form = useForm<CrudForm>({
    resolver: zodResolver(StrukturOrganisasiSchema),
    defaultValues: {
      name: strukturOrganisasi.name,
      jabatan: strukturOrganisasi.jabatan,
      image: strukturOrganisasi.image,
    },
  });

  const edit = async (data: CrudForm) => {
    const updatedData = {
      name: data.name,
      jabatan: data.jabatan,
      image: data.image,
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
                      {jabatanStrukturOrganisasi.map((jabatan) => (
                        <SelectItem key={jabatan} value={jabatan}>
                          {jabatan}
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
          "Berita berhasil di hapus, silahkan cek pada tabel data berita.",
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
