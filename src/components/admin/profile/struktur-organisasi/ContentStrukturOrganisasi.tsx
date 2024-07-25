"use client";
import CardInfo from "@/components/global/adminLayout/card/CardInfo";
import {
  jabatanColumn,
  strukturOrganisasiColumns,
} from "@/components/global/adminLayout/table/Columns";
import { DataTable } from "@/components/global/adminLayout/table/Datatable";
import { Card, CardHeader } from "@/components/ui/card";
import { Database, Jabatan } from "@prisma/client";
import { createContext, useState } from "react";
import { CreateStrukturOrganisasi } from "./CrudStrukturOrganisasi";
import { Button } from "@/components/ui/button";
import { CreateJabatan } from "./CrudJabatan";

export const JabatanContext = createContext<Jabatan[]>([{ id: "", title: "" }]);

export default function ContentStrukturOrganisasi({
  strukturOrganisasi,
  jabatan,
}: {
  strukturOrganisasi: Database[];
  jabatan: Jabatan[];
}) {
  const [isCreate, setIsCreate] = useState(false);
  const [jabatanForEdit, setJabatanForEdit] = useState<Jabatan[]>();
  const [isCreateJabatan, setIsCreateJabatan] = useState(false);
  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <div className="flex flex-col gap-4 mt-4 lg:col-span-2">
        <CardInfo
          description="Jika anda ingin melakukan penambahan anggota organisasi, klik tombol di bawah untuk melakukan penambahan tentang anggota organisasi."
          title="Struktur Organisasi"
          button={{ title: "Tambah", onClick: () => setIsCreate(!isCreate) }}
        />
        <Card>
          <CardHeader>
            <JabatanContext.Provider value={jabatan}>
              <DataTable
                includes={{
                  viewOptions: true,
                  header: {
                    isVisible: true,
                    title: "Tabel data anggota organisasi",
                  },
                }}
                columns={strukturOrganisasiColumns}
                data={strukturOrganisasi}
              />
            </JabatanContext.Provider>
          </CardHeader>
        </Card>
        <CreateStrukturOrganisasi
          isCreate={isCreate}
          setIsCreate={setIsCreate}
          jabatan={jabatan}
        />
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <Card>
          <CardHeader>
            <Button
              type="button"
              onClick={() => setIsCreateJabatan(!isCreateJabatan)}
            >
              Tambah Jabatan
            </Button>
            <DataTable columns={jabatanColumn} data={jabatan} />
          </CardHeader>
        </Card>
        <CreateJabatan
          isCreate={isCreateJabatan}
          setIsCreate={setIsCreateJabatan}
        />
      </div>
    </div>
  );
}
