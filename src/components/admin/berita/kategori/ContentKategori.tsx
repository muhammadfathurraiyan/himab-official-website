"use client";
import CardInfo from "@/components/global/adminLayout/card/CardInfo";
import {
  kategoriColumns,
  kontakColumns,
} from "@/components/global/adminLayout/table/Columns";
import { DataTable } from "@/components/global/adminLayout/table/Datatable";
import { Card, CardHeader } from "@/components/ui/card";
import { Kategori, Kontak } from "@prisma/client";
import { createContext, useState } from "react";
import { CreateKategoriDialog } from "./CrudKategoriDialog";

export const UserIdContext = createContext("");

export default function ContentKategori({
  userId,
  kategori,
}: {
  userId?: string;
  kategori: Kategori[];
}) {
  if (!kategori) return <></>;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-4">
      <div className={`flex max-lg:flex-col mt-4 gap-4 w-full`}>
        <div className="lg:w-1/2">
          <CardInfo
            description="Jika anda ingin melakukan penambahan kategori, klik tombol di bawah untuk melakukan penambahan kategori."
            title="Kategori"
            button={{
              title: "Tambah Kategori",
              onClick: () => setIsOpen(!isOpen),
            }}
          />
        </div>
        <div className="lg:w-1/2">
          <Card>
            <CardHeader>
              <UserIdContext.Provider value={userId!}>
                <DataTable
                  includes={{
                    viewOptions: true,
                    header: {
                      isVisible: true,
                      title: "Tabel data kontak",
                    },
                  }}
                  columns={kategoriColumns}
                  data={kategori}
                />
              </UserIdContext.Provider>
            </CardHeader>
          </Card>
        </div>
      </div>
      <CreateKategoriDialog open={isOpen} setOpen={setIsOpen} userId={userId} />
    </div>
  );
}
