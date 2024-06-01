"use client";
import CardInfo from "@/components/global/adminLayout/card/CardInfo";
import { kontakColumns } from "@/components/global/adminLayout/table/Columns";
import { DataTable } from "@/components/global/adminLayout/table/Datatable";
import { Card, CardHeader } from "@/components/ui/card";
import { Berita, Kontak } from "@prisma/client";
import { useState } from "react";

export default function ContentKontak({
  userId,
  berita,
}: {
  userId?: string;
  berita: Berita[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mt-4">
      <div
        className={`${isOpen ? "hidden" : "flex"} flex-col mt-4 gap-4 w-full`}
      >
        <div>
          <CardInfo
            description="Jika anda ingin melakukan pengeditan halaman kontak, klik tombol di bawah untuk melakukan pengeditan tentang kontak."
            title="Kontak"
            button={{
              title: "Edit Kontak",
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
                data={[berita]}
              />
            </CardHeader>
          </Card>
        </div>
      </div>
      <div
        className={`${
          isOpen ? "visible opacity-100" : "hidden invisible opacity-0"
        } transition-all`}
      ></div>
    </div>
  );
}
