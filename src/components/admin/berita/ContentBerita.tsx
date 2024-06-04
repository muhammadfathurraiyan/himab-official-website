"use client";
import CardInfo from "@/components/global/adminLayout/card/CardInfo";
import { beritaColumns } from "@/components/global/adminLayout/table/Columns";
import { DataTable } from "@/components/global/adminLayout/table/Datatable";
import { Card, CardHeader } from "@/components/ui/card";
import { Berita, Kategori } from "@prisma/client";
import { Dispatch, SetStateAction, createContext, useState } from "react";
import { CreateBerita } from "./CrudBerita";

type TBeritaContext = {
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  berita: Berita;
};
export const UserIdContext = createContext<TBeritaContext>(null);

export default function ContentBerita({
  userId,
  berita,
  kategori,
}: {
  userId?: string;
  berita: Berita[];
  kategori: Kategori[];
}) {
  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div className="mt-4">
      <div
        className={`${
          isCreate || isEdit ? "hidden" : "flex"
        } flex-col mt-4 gap-4 w-full`}
      >
        <div>
          <CardInfo
            description="Jika anda ingin melakukan pengeditan halaman berita, klik tombol di bawah untuk melakukan pengeditan tentang berita."
            title="Berita"
            button={{
              title: "Tambah Berita",
              onClick: () => setIsCreate(!isCreate),
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
                    title: "Tabel data berita",
                  },
                }}
                columns={beritaColumns}
                data={berita}
              />
            </CardHeader>
          </Card>
        </div>
      </div>
      <div
        className={`${
          isCreate || isEdit
            ? "visible opacity-100"
            : "hidden invisible opacity-0"
        } transition-all`}
      >
        <CreateBerita
          kategori={kategori}
          isCreate={isCreate}
          setIsCreate={setIsCreate}
          userId={userId}
        />
      </div>
    </div>
  );
}
