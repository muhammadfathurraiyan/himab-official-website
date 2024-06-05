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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { createDatabase, deleteDatabase, editDatabase } from "@/lib/actions";
import { DatabaseSchema } from "@/lib/types";
import { Dispatch, SetStateAction, useState } from "react";
import { Database } from "@prisma/client";

type CrudForm = z.infer<typeof DatabaseSchema>;

export function CreateDatabaseDialog() {
  const [open, setOpen] = useState(false);
  const form = useForm<CrudForm>({
    resolver: zodResolver(DatabaseSchema),
    defaultValues: {
      name: "",
      jabatan: "",
      tahunMulai: "",
      tahunSelesai: "",
      image: "",
    },
  });

  async function create(data: CrudForm) {
    const newDatabase = {
      name: data.name,
      jabatan: data.jabatan,
      tahunMulai: data.tahunMulai,
      tahunSelesai: data.tahunSelesai,
      image: data.image,
    };

    const result = await createDatabase(newDatabase);

    if (result?.error) {
      toast({
        title: "Error!",
        description: `Terdapat kesalahan silahkan refresh halaman dan coba lagi.\n ${result.error}`,
        variant: "destructive",
      });
    } else {
      setOpen(false);
      toast({
        title: "Berhasil di input",
        description:
          "Data berhasil di tambah, silahkan cek pada tabel data database.",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Tambah</Button>
      </DialogTrigger>
      <DialogContent className="lg:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Tambah Akun</DialogTitle>
          <DialogDescription>
            Form untuk melakukan penambahan akun.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(create)}>
            <div className="grid grid-cols-2 gap-4 mb-4">
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
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gambar</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://picsum.photos/400"
                          {...field}
                        />
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
                            <SelectValue placeholder="Pilih Jabatan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Ketua">Ketua</SelectItem>
                          <SelectItem value="Sekretaris">Sekretaris</SelectItem>
                          <SelectItem value="Anggota">Anggota</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="tahunMulai"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tahun mulai</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tahunSelesai"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tahun selesai</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-4">
              <DialogClose className={buttonVariants({ variant: "outline" })}>
                Batal
              </DialogClose>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export function DeleteDatabaseDialog({
  id,
  setIsDeleteDialogOpen,
}: {
  id: string;
  setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;
}) {
  async function deleteAction(data: FormData) {
    const id = data.get("id") as string;

    if (id) {
      await deleteDatabase(id);
      setIsDeleteDialogOpen(false);
      toast({
        title: "Berhasil di hapus",
        description:
          "Database berhasil di hapus, silahkan cek pada tabel data database.",
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
    <>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hapus Data</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Tindakan ini tidak bisa dibatalkan. Tindakan ini akan menghapus data
          secara permanen dari server.
        </DialogDescription>
        <DialogFooter>
          <DialogClose>
            <Button variant={"outline"}>Batal</Button>
          </DialogClose>
          <form action={deleteAction}>
            <input type="hidden" value={id} name="id" />
            <Button type="submit" variant={"destructive"}>
              Hapus
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </>
  );
}

export function EditDatabaseDialog({
  database,
  setIsEditDialogOpen,
}: {
  database: Database;
  setIsEditDialogOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const form = useForm<CrudForm>({
    resolver: zodResolver(DatabaseSchema),
    defaultValues: {
      name: database.name,
      image: database.image,
      jabatan: database.jabatan,
      tahunMulai: database.tahunMulai,
      tahunSelesai: database.tahunSelesai,
    },
  });

  async function edit(data: CrudForm) {
    const newUpdateDatabase = {
      name: data.name,
      image: data.image,
      tahunMulai: data.tahunMulai,
      tahunSelesai: data.tahunSelesai,
      jabatan: data.jabatan,
    };

    const result = await editDatabase(newUpdateDatabase, database.id);

    if (result?.error) {
      toast({
        title: "Error!",
        description: `Terdapat kesalahan silahkan refresh halaman dan coba lagi.\n ${result.error}`,
        variant: "destructive",
      });
    } else {
      setIsEditDialogOpen(false);
      toast({
        title: "Berhasil di input",
        description:
          "Data berhasil di edit, silahkan cek pada tabel data database.",
      });
    }
  }

  return (
    <DialogContent className="lg:max-w-3xl">
      <DialogHeader>
        <DialogTitle>Edit Database</DialogTitle>
        <DialogDescription>
          Form untuk melakukan pengeditan database.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(edit)}>
          <div className="grid grid-cols-2 gap-4 mb-4">
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
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gambar</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://picsum.photos/400"
                        {...field}
                      />
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
                          <SelectValue placeholder="Pilih Jabatan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Ketua">Ketua</SelectItem>
                        <SelectItem value="Sekretaris">Sekretaris</SelectItem>
                        <SelectItem value="Anggota">Anggota</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="tahunMulai"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tahun mulai</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tahunSelesai"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tahun selesai</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-4">
            <DialogClose className={buttonVariants({ variant: "outline" })}>
              Batal
            </DialogClose>
            <Button type="submit">Update</Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}
