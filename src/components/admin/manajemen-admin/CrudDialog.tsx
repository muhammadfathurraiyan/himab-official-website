"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, buttonVariants } from "@/components/ui/button";
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
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multi-select";

import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { CreateUserSchema, EditUserSchema } from "@/lib/types";
import { createAccount, deleteAccount, editAccount } from "@/lib/actions";
import { Dispatch, SetStateAction, useState } from "react";
import { User } from "@prisma/client";

type CreateForm = z.infer<typeof CreateUserSchema>;
type EditForm = z.infer<typeof EditUserSchema>;

const job = ["akun", "berita", "database", "event"];

export function CreateDialog() {
  const [open, setOpen] = useState(false);
  const form = useForm<CreateForm>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      job: [],
    },
  });

  async function onSubmit(data: CreateForm) {
    const newUser = {
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      role: data.role,
      job: data.job,
    };

    const result = await createAccount(newUser);

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
          "Akun berhasil di tambah, silahkan cek pada tabel data akun.",
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
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="sabirin@mail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="super-admin">
                            super-admin
                          </SelectItem>
                          <SelectItem value="manager">manager</SelectItem>
                          <SelectItem value="sub-admin">sub-admin</SelectItem>
                          <SelectItem value="admin">admin</SelectItem>
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
                  name="job"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pilih Job</FormLabel>
                      <MultiSelector
                        onValuesChange={field.onChange}
                        values={field.value}
                        className="space-y-0"
                      >
                        <MultiSelectorTrigger>
                          <MultiSelectorInput placeholder="Pilih Job" />
                        </MultiSelectorTrigger>
                        <MultiSelectorContent>
                          <MultiSelectorList>
                            {job.map((job) => (
                              <MultiSelectorItem key={job} value={job}>
                                {job}
                              </MultiSelectorItem>
                            ))}
                          </MultiSelectorList>
                        </MultiSelectorContent>
                      </MultiSelector>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password Konfirmasi</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
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

export function DeleteDialog({
  id,
  setIsDeleteDialogOpen,
}: {
  id: string;
  setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;
}) {
  async function deleteAction(data: FormData) {
    const id = data.get("id") as string;

    if (id) {
      await deleteAccount(id);
      setIsDeleteDialogOpen(false);
      toast({
        title: "Berhasil di hapus",
        description:
          "Akun berhasil di hapus, silahkan cek pada tabel data akun.",
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
          <DialogTitle>Hapus Akun</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Tindakan ini tidak bisa dibatalkan. Tindakan ini akan menghapus akun
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

export function EditDialog({
  user,
  setIsEditDialogOpen,
}: {
  user: User;
  setIsEditDialogOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const form = useForm<EditForm>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      role: user.role,
      job: user.job,
      resetPassword: "",
    },
  });

  async function onSubmit(data: EditForm) {
    console.log("submit"); // this should trigger innit?
    const newUpdateUser = {
      name: data.name,
      email: data.email,
      resetPassword: data.resetPassword,
      role: data.role,
      job: data.job,
    };

    const result = await editAccount(newUpdateUser, user.id);

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
          "Akun berhasil di edit, silahkan cek pada tabel data akun.",
      });
    }
  }

  return (
    <DialogContent className="lg:max-w-3xl">
      <DialogHeader>
        <DialogTitle>Edit Akun</DialogTitle>
        <DialogDescription>
          Form untuk melakukan pengeditan akun.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-2 mb-4">
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="sabirin@mail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="super-admin">super-admin</SelectItem>
                        <SelectItem value="manager">manager</SelectItem>
                        <SelectItem value="sub-admin">sub-admin</SelectItem>
                        <SelectItem value="admin">admin</SelectItem>
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
                name="job"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pilih Job</FormLabel>
                    <MultiSelector
                      onValuesChange={field.onChange}
                      values={field.value}
                      className="space-y-0"
                    >
                      <MultiSelectorTrigger>
                        <MultiSelectorInput placeholder="Pilih Job" />
                      </MultiSelectorTrigger>
                      <MultiSelectorContent>
                        <MultiSelectorList>
                          {job.map((job) => (
                            <MultiSelectorItem key={job} value={job}>
                              {job}
                            </MultiSelectorItem>
                          ))}
                        </MultiSelectorList>
                      </MultiSelectorContent>
                    </MultiSelector>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="resetPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reset Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
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
  );
}
