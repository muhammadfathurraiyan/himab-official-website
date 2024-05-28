"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Sejarah, User } from "@prisma/client";
import { DataTableColumnHeader } from "./DatatableColumnHeader";
import {
  DeleteDialog,
  EditDialog,
} from "@/components/admin/manajemen-admin/CrudDialog";
import { useState } from "react";
import { Dialog } from "@radix-ui/react-dialog";
import Link from "next/link";

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
    id: "actions",
    cell: () => {
      return (
        <Link
          href={"/profile/sejarah"}
          className={buttonVariants({ variant: "ghost", size: "icon" })}
        >
          <Eye className="size-4" />
        </Link>
      );
    },
  },
];
