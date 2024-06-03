"use client";
import CardInfo from "@/components/global/adminLayout/card/CardInfo";
import { kontakColumns } from "@/components/global/adminLayout/table/Columns";
import { DataTable } from "@/components/global/adminLayout/table/Datatable";
import { Card, CardHeader } from "@/components/ui/card";
import { Berita, Kategori, Kontak } from "@prisma/client";
import { useState } from "react";
import { CreateBerita } from "./CrudBerita";

export default function ContentBerita({
  userId,
  berita,
  kategori,
}: {
  userId?: string;
  berita: Berita[];
  kategori: Kategori[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mt-4">
      <div
        className={`${isOpen ? "hidden" : "flex"} flex-col mt-4 gap-4 w-full`}
      >
        <div>
          <CardInfo
            description="Jika anda ingin melakukan pengeditan halaman berita, klik tombol di bawah untuk melakukan pengeditan tentang berita."
            title="Berita"
            button={{
              title: "Tambah Berita",
              onClick: () => setIsOpen(!isOpen),
            }}
          />
        </div>
        <div>
          <Card>
            <CardHeader>
              <DataTable
                includes={{
                  viewOptions: true,
                  header: {
                    isVisible: true,
                    title: "Tabel data kontak",
                  },
                }}
                columns={kontakColumns}
                data={berita}
              />
            </CardHeader>
          </Card>
        </div>
      </div>
      <div
        className={`${
          isOpen ? "visible opacity-100" : "hidden invisible opacity-0"
        } transition-all`}
      >
        <CreateBerita kategori={kategori} isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
}
