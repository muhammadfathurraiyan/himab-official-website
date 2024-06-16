"use client";
import { BeritaContext } from "@/components/admin/berita/ContentBerita";
import { DeleteBeritaDialog } from "@/components/admin/berita/CrudBerita";
import {
  DeleteKategoriDialog,
  EditKategoriDialog,
} from "@/components/admin/berita/kategori/CrudKategoriDialog";
import {
  DeleteDatabaseDialog,
  EditDatabaseDialog,
} from "@/components/admin/database/CrudDatabaseDialog";
import {
  DeleteDialog,
  EditDialog,
} from "@/components/admin/manajemen-admin/CrudDialog";
import {
  DeleteStrukturOrganisasi,
  EditStrukturOrganisasi,
} from "@/components/admin/profile/struktur-organisasi/CrudStrukturOrganisasi";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Asrama,
  Berita,
  Database,
  Kategori,
  Kontak,
  Sejarah,
  StrukturOrganisasi,
  Tentang,
  User,
  VisiMisi,
} from "@prisma/client";
import { Dialog } from "@radix-ui/react-dialog";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useContext, useState } from "react";
import { DataTableColumnHeader } from "./DatatableColumnHeader";

export const userColumns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
  },
  {
    accessorKey: "job",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Job" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
      return (
        <>
          <Dialog
            open={isEditDialogOpen || isDeleteDialogOpen}
            onOpenChange={
              isEditDialogOpen ? setIsEditDialogOpen : setIsDeleteDialogOpen
            }
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
                  <Trash2 className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                  Hapus
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                  <Pencil className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                  Edit
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {isEditDialogOpen ? (
              <EditDialog
                user={user}
                setIsEditDialogOpen={setIsEditDialogOpen}
              />
            ) : (
              <DeleteDialog
                id={user.id}
                setIsDeleteDialogOpen={setIsDeleteDialogOpen}
              />
            )}
          </Dialog>
        </>
      );
    },
  },
];

export const sejarahColumns: ColumnDef<Sejarah>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="mt-1"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Judul" />
    ),
  },
  {
    accessorKey: "excerpt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kutipan" />
    ),
  },
  {
    accessorKey: "image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gambar" />
    ),
  },
  {
    accessorKey: "view",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="View" />
    ),
  },
  {
    id: "actions",
    cell: () => {
      return (
        <Link
          href={"/profil/sejarah"}
          className={buttonVariants({ variant: "ghost", size: "icon" })}
        >
          <Eye className="size-5" />
        </Link>
      );
    },
  },
];

export const visiMisiColumns: ColumnDef<VisiMisi>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="mt-1"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Judul" />
    ),
  },
  {
    accessorKey: "excerpt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kutipan" />
    ),
  },
  {
    accessorKey: "image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gambar" />
    ),
  },
  {
    accessorKey: "view",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="View" />
    ),
  },
  {
    id: "actions",
    cell: () => {
      return (
        <Link
          href={"/profil/visi-misi"}
          className={buttonVariants({ variant: "ghost", size: "icon" })}
        >
          <Eye className="size-5" />
        </Link>
      );
    },
  },
];

export const tentangHimabColumns: ColumnDef<Tentang>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="mt-1"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Judul" />
    ),
  },
  {
    accessorKey: "excerpt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kutipan" />
    ),
  },
  {
    accessorKey: "image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gambar" />
    ),
  },
  {
    accessorKey: "view",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="View" />
    ),
  },
  {
    id: "actions",
    cell: () => {
      return (
        <Link
          href={"/profil/tentang-himab"}
          className={buttonVariants({ variant: "ghost", size: "icon" })}
        >
          <Eye className="size-5" />
        </Link>
      );
    },
  },
];

export const kontakColumns: ColumnDef<Kontak>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="mt-1"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Judul" />
    ),
  },
  {
    accessorKey: "excerpt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kutipan" />
    ),
  },
  {
    accessorKey: "image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gambar" />
    ),
  },
  {
    accessorKey: "view",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="View" />
    ),
  },
  {
    id: "actions",
    cell: () => {
      return (
        <Link
          href={"/kontak"}
          className={buttonVariants({ variant: "ghost", size: "icon" })}
        >
          <Eye className="size-5" />
        </Link>
      );
    },
  },
];

export const kategoriColumns: ColumnDef<Kategori>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kategori" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const kategori = row.original;
      const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
      return (
        <>
          <Dialog
            open={isEditDialogOpen || isDeleteDialogOpen}
            onOpenChange={
              isEditDialogOpen ? setIsEditDialogOpen : setIsDeleteDialogOpen
            }
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
                  <Trash2 className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                  Hapus
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                  <Pencil className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                  Edit
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {isEditDialogOpen ? (
              <EditKategoriDialog
                kategori={kategori}
                setIsEditDialogOpen={setIsEditDialogOpen}
              />
            ) : (
              <DeleteKategoriDialog
                id={kategori.id}
                setIsDeleteDialogOpen={setIsDeleteDialogOpen}
              />
            )}
          </Dialog>
        </>
      );
    },
  },
];

export const beritaColumns: ColumnDef<Berita>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Judul" />
    ),
  },
  {
    accessorKey: "excerpt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kutipan" />
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kategori" />
    ),
  },
  {
    accessorKey: "view",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="View" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const berita = row.original;
      const context = useContext(BeritaContext);
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
      return (
        <>
          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DialogTrigger asChild>
                  <DropdownMenuItem>
                    <Trash2 className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                    Hapus
                  </DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuItem
                  onClick={() => {
                    context?.setIsEdit(true);
                    context?.setEditBerita(berita);
                  }}
                >
                  <Pencil className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                  Edit
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DeleteBeritaDialog
              id={berita.id}
              setIsDeleteDialogOpen={setIsDeleteDialogOpen}
            />
          </Dialog>
        </>
      );
    },
  },
];

export const databaseColumns: ColumnDef<Database>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama" />
    ),
  },
  {
    accessorKey: "jabatan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jabatan" />
    ),
  },
  {
    accessorKey: "tahunMulai",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tahun mulai" />
    ),
  },
  {
    accessorKey: "tahunSelesai",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tahun selesai" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const database = row.original;
      const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
      return (
        <>
          <Dialog
            open={isEditDialogOpen || isDeleteDialogOpen}
            onOpenChange={
              isEditDialogOpen ? setIsEditDialogOpen : setIsDeleteDialogOpen
            }
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
                  <Trash2 className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                  Hapus
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                  <Pencil className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                  Edit
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {isEditDialogOpen ? (
              <EditDatabaseDialog
                database={database}
                setIsEditDialogOpen={setIsEditDialogOpen}
              />
            ) : (
              <DeleteDatabaseDialog
                id={database.id}
                setIsDeleteDialogOpen={setIsDeleteDialogOpen}
              />
            )}
          </Dialog>
        </>
      );
    },
  },
];

export const strukturOrganisasiColumns: ColumnDef<StrukturOrganisasi>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama" />
    ),
  },
  {
    accessorKey: "jabatan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jabatan" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const strukturOrganisasi = row.original;
      const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
      return (
        <>
          <Dialog
            open={isEditDialogOpen || isDeleteDialogOpen}
            onOpenChange={
              isEditDialogOpen ? setIsEditDialogOpen : setIsDeleteDialogOpen
            }
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
                  <Trash2 className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                  Hapus
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                  <Pencil className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                  Edit
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {isEditDialogOpen ? (
              <EditStrukturOrganisasi
                strukturOrganisasi={strukturOrganisasi}
                setIsEdit={setIsEditDialogOpen}
              />
            ) : (
              <DeleteStrukturOrganisasi
                id={strukturOrganisasi.id}
                setIsDelete={setIsDeleteDialogOpen}
              />
            )}
          </Dialog>
        </>
      );
    },
  },
];

export const asramaColumns: ColumnDef<Asrama>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="mt-1"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Judul" />
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Deskripsi" />
    ),
  },
  {
    accessorKey: "image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gambar" />
    ),
  },
  {
    accessorKey: "view",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="View" />
    ),
  },
  {
    id: "actions",
    cell: () => {
      return (
        <Link
          href={"/asrama-mahasiswa"}
          className={buttonVariants({ variant: "ghost", size: "icon" })}
        >
          <Eye className="size-5" />
        </Link>
      );
    },
  },
];