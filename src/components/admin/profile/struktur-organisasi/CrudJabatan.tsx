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
import { toast } from "@/components/ui/use-toast";
import {
  createJabatan,
  deleteJabatan,
  editJabatan
} from "@/lib/actions";
import { DatabaseSchema, JabatanSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Jabatan } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type CrudForm = z.infer<typeof JabatanSchema>;

export function CreateJabatan({
  isCreate,
  setIsCreate,
}: {
  isCreate: boolean;
  setIsCreate: Dispatch<SetStateAction<boolean>>;
}) {
  if (!isCreate) return <></>;
  const form = useForm<CrudForm>({
    resolver: zodResolver(JabatanSchema),
    defaultValues: {
      title: "",
    },
  });

  const create = async (data: CrudForm) => {
    const newJabatan = {
      title: data.title,
    };

    const result = await createJabatan(newJabatan);

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
          "Data berhasil di tambah, silahkan cek pada tabel data jabatan.",
      });
    }
  };

  return (
    <Dialog open={isCreate} onOpenChange={setIsCreate}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah jabatan</DialogTitle>
          <DialogDescription>
            Form untuk melakukan penambahan jabatan.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(create)} className="space-y-4">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jabatan</FormLabel>
                    <FormControl>
                      <Input placeholder="Ketua" {...field} />
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

export function EditJabatan({
  setIsEdit,
  jabatan,
}: {
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  jabatan: Jabatan;
}) {
  const form = useForm<CrudForm>({
    resolver: zodResolver(DatabaseSchema),
    defaultValues: {
      title: jabatan.title,
    },
  });

  const edit = async (data: CrudForm) => {
    const updatedData = {
      title: data.title,
    };

    const result = await editJabatan(updatedData, jabatan.id);

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
          "Jabatan berhasil di edit, silahkan cek pada tabel jabatan.",
      });
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit jabatan</DialogTitle>
        <DialogDescription>
          Form untuk melakukan edit data jabatan.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(edit)} className="space-y-4">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jabatan</FormLabel>
                  <FormControl>
                    <Input placeholder="Ketua" {...field} />
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

export function DeleteJabatan({
  id,
  setIsDelete,
}: {
  id: string;
  setIsDelete: Dispatch<SetStateAction<boolean>>;
}) {
  async function deleteAction(data: FormData) {
    const id = data.get("id") as string;
    if (id) {
      await deleteJabatan(id);
      setIsDelete(false);
      toast({
        title: "Berhasil di hapus",
        description:
          "Berita berhasil di hapus, silahkan cek pada tabel jabatan.",
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
        <DialogTitle>Hapus jabatan</DialogTitle>
      </DialogHeader>
      <DialogDescription>
        Tindakan ini tidak bisa dibatalkan. Tindakan ini akan menghapus jabatan
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
