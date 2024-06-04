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
  createBerita,
  createKategori,
  deleteKategori,
  editKategori,
} from "@/lib/actions";
import { CreateUserSchema, BeritaSchema } from "@/lib/types";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Kategori } from "@prisma/client";
import CustomEditor from "@/components/global/adminLayout/editor/CustomEditor";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { slugify } from "@/lib/utils";
// import { UserIdContext } from "./ContentKategori";

type CrudForm = z.infer<typeof BeritaSchema>;

export function CreateBerita({
  userId,
  isCreate,
  setIsCreate,
  kategori,
}: {
  userId?: string;
  isCreate: boolean;
  setIsCreate: Dispatch<SetStateAction<boolean>>;
  kategori: Kategori[];
}) {
  if (!isCreate) return <></>;
  const [content, setContent] = useState("");
  const form = useForm<CrudForm>({
    resolver: zodResolver(BeritaSchema),
    defaultValues: {
      title: "",
      slug: "",
      category: "",
      image: "",
      content: "<p><p>",
      excerpt: "",
      userId: userId,
    },
  });

  const create = async (data: CrudForm) => {
    const newBerita = {
      title: data.title,
      slug: data.title,
      category: data.category,
      image: data.image,
      content: content,
      excerpt: content?.slice(0, 50).replace(/(<([^>]+)>)/gi, ""),
      userId: data.userId,
    };

    const result = await createBerita(newBerita);

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
          "Berita berhasil di tambah, silahkan cek pada tabel data berita.",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(create)}
        className="border p-4 rounded-lg space-y-4"
      >
        <div>
          <h2 className="font-bold text-xl">Form Berita</h2>
          <p className="text-sm text-muted-foreground">
            Silahkan mengisi form dibawah untuk menambah berita
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
                    placeholder="Judul berita"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      form.setValue("slug", slugify(e.target.value), {
                        shouldValidate: true,
                      });
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input
                    className="lg:w-[400px]"
                    placeholder="judul-berita"
                    readOnly
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="lg:w-[400px]">
                <FormLabel>Kategori</FormLabel>
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
                    {kategori.map((kategori) => (
                      <SelectItem key={kategori.title} value={kategori.title}>
                        {kategori.title}
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
            onClick={() => setIsCreate(false)}
            variant={"outline"}
            className="max-lg:w-full"
            type="button"
          >
            Batal
          </Button>
          <Button className="max-lg:w-full" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}

// export function DeleteKategoriDialog({
//   id,
//   setIsDeleteDialogOpen,
// }: {
//   id: string;
//   setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;
// }) {
//   async function deleteAction(data: FormData) {
//     const id = data.get("id") as string;
//     if (id) {
//       await deleteKategori(id);
//       setIsDeleteDialogOpen(false);
//       toast({
//         title: "Berhasil di hapus",
//         description:
//           "Kategori berhasil di hapus, silahkan cek pada tabel data kategori.",
//       });
//     } else {
//       toast({
//         title: "Error!",
//         description:
//           "Terdapat kesalahan silahkan refresh halaman dan coba lagi.",
//         variant: "destructive",
//       });
//     }
//   }

//   return (
//     <DialogContent>
//       <DialogHeader>
//         <DialogTitle>Hapus Kategori</DialogTitle>
//       </DialogHeader>
//       <DialogDescription>
//         Tindakan ini tidak bisa dibatalkan. Tindakan ini akan menghapus kategori
//         secara permanen dari server.
//       </DialogDescription>
//       <DialogFooter>
//         <DialogClose className={buttonVariants({ variant: "outline" })}>
//           Batal
//         </DialogClose>
//         <form action={deleteAction}>
//           <input type="hidden" value={id} name="id" />
//           <Button type="submit" variant={"destructive"}>
//             Hapus
//           </Button>
//         </form>
//       </DialogFooter>
//     </DialogContent>
//   );
// }

// export function EditKategoriDialog({
//   kategori,
//   setIsEditDialogOpen,
// }: {
//   kategori: Kategori;
//   setIsEditDialogOpen: Dispatch<SetStateAction<boolean>>;
// }) {
//   const userId = useContext(UserIdContext);

//   const form = useForm<CrudForm>({
//     resolver: zodResolver(BeritaSchema),
//     defaultValues: {
//       title: kategori.title,
//       userId: userId,
//     },
//   });

//   const edit = async (data: CrudForm) => {
//     const newKategori = {
//       title: data.title,
//       userId: data.userId,
//     };

//     const result = await editKategori(newKategori, kategori.id);

//     if (result?.error) {
//       toast({
//         title: "Error!",
//         description: `Terdapat kesalahan silahkan refresh halaman dan coba lagi.\n ${result.error}`,
//         variant: "destructive",
//       });
//     } else {
//       setIsEditDialogOpen(false);
//       toast({
//         title: "Berhasil di edit",
//         description:
//           "Kategori berhasil di edit, silahkan cek pada tabel data kategori.",
//       });
//     }
//   };

//   return (
//     <DialogContent>
//       <DialogHeader>
//         <DialogTitle>Edit Kategori</DialogTitle>
//         <DialogDescription>
//           Form untuk melakukan pengeditan kategori.
//         </DialogDescription>
//       </DialogHeader>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(edit)}>
//           <div className="">
//             <FormField
//               control={form.control}
//               name="title"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Judul</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Berita" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <div className="flex items-center justify-end gap-4 mt-4">
//             <DialogClose className={buttonVariants({ variant: "outline" })}>
//               Batal
//             </DialogClose>
//             <Button type="submit">Submit</Button>
//           </div>
//         </form>
//       </Form>
//     </DialogContent>
//   );
// }
