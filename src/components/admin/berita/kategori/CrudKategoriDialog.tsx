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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import {
  createAccount,
  createKategori,
  deleteKategori,
  editKategori,
} from "@/lib/actions";
import { CreateUserSchema, KategoriSchema } from "@/lib/types";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Kategori } from "@prisma/client";
import { UserIdContext } from "./ContentKategori";

type CrudForm = z.infer<typeof KategoriSchema>;

export function CreateKategoriDialog({
  userId,
  open,
  setOpen,
}: {
  userId?: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const form = useForm<CrudForm>({
    resolver: zodResolver(KategoriSchema),
    defaultValues: {
      title: "",
      userId: userId,
    },
  });

  const create = async (data: CrudForm) => {
    const newKategori = {
      title: data.title,
      userId: data.userId,
    };

    const result = await createKategori(newKategori);

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
          "Kategori berhasil di tambah, silahkan cek pada tabel data kategori.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah kategori</DialogTitle>
          <DialogDescription>
            Form untuk melakukan penambahan kategori.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(create)}>
            <div className="">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Judul</FormLabel>
                    <FormControl>
                      <Input placeholder="Berita" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center justify-end gap-4 mt-4">
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

export function DeleteKategoriDialog({
  id,
  setIsDeleteDialogOpen,
}: {
  id: string;
  setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;
}) {
  async function deleteAction(data: FormData) {
    const id = data.get("id") as string;
    if (id) {
      await deleteKategori(id);
      setIsDeleteDialogOpen(false);
      toast({
        title: "Berhasil di hapus",
        description:
          "Kategori berhasil di hapus, silahkan cek pada tabel data kategori.",
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
        <DialogTitle>Hapus Kategori</DialogTitle>
      </DialogHeader>
      <DialogDescription>
        Tindakan ini tidak bisa dibatalkan. Tindakan ini akan menghapus kategori
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

export function EditKategoriDialog({
  kategori,
  setIsEditDialogOpen,
}: {
  kategori: Kategori;
  setIsEditDialogOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const userId = useContext(UserIdContext);

  const form = useForm<CrudForm>({
    resolver: zodResolver(KategoriSchema),
    defaultValues: {
      title: kategori.title,
      userId: userId,
    },
  });

  const edit = async (data: CrudForm) => {
    const newKategori = {
      title: data.title,
      userId: data.userId,
    };

    const result = await editKategori(newKategori, kategori.id);

    if (result?.error) {
      toast({
        title: "Error!",
        description: `Terdapat kesalahan silahkan refresh halaman dan coba lagi.\n ${result.error}`,
        variant: "destructive",
      });
    } else {
      setIsEditDialogOpen(false);
      toast({
        title: "Berhasil di edit",
        description:
          "Kategori berhasil di edit, silahkan cek pada tabel data kategori.",
      });
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Kategori</DialogTitle>
        <DialogDescription>
          Form untuk melakukan pengeditan kategori.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(edit)}>
          <div className="">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Judul</FormLabel>
                  <FormControl>
                    <Input placeholder="Berita" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center justify-end gap-4 mt-4">
            <DialogClose className={buttonVariants({ variant: "outline" })}>
              Batal
            </DialogClose>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}
