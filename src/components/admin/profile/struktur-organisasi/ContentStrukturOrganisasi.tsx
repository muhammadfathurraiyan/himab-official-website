"use client";
import CardInfo from "@/components/global/adminLayout/card/CardInfo";
import {
  jabatanColumn,
  strukturOrganisasiColumns,
} from "@/components/global/adminLayout/table/Columns";
import { DataTable } from "@/components/global/adminLayout/table/Datatable";
import { Card, CardHeader } from "@/components/ui/card";
import { Database, Jabatan } from "@prisma/client";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import {
  CreateStrukturOrganisasi,
  EditStrukturOrganisasi,
} from "./CrudStrukturOrganisasi";
import { Button } from "@/components/ui/button";
import { CreateJabatan } from "./CrudJabatan";

type TStrukturOrganisasiContext = {
  setStruktur?: Dispatch<SetStateAction<Database | undefined>>;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
} | null;
export const JabatanContext = createContext<TStrukturOrganisasiContext>(null);

export default function ContentStrukturOrganisasi({
  strukturOrganisasi,
  jabatan,
}: {
  strukturOrganisasi: Database[];
  jabatan: Jabatan[];
}) {
  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [struktur, setStruktur] = useState<Database>();
  const [isCreateJabatan, setIsCreateJabatan] = useState(false);
  return (
    <div
      className={`grid ${
        isCreate || isEdit ? "lg:grid-cols-1" : "lg:grid-cols-3"
      } gap-4`}
    >
      <div
        className={`${
          isCreate || isEdit ? "hidden" : ""
        } flex flex-col gap-4 mt-4 lg:col-span-2`}
      >
        <CardInfo
          description="Jika anda ingin melakukan penambahan anggota organisasi, klik tombol di bawah untuk melakukan penambahan tentang anggota organisasi."
          title="Struktur Organisasi"
          button={{ title: "Tambah", onClick: () => setIsCreate(!isCreate) }}
        />
        <Card>
          <CardHeader>
            <JabatanContext.Provider
              value={{ setStruktur: setStruktur, setIsEdit: setIsEdit }}
            >
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
      </div>
      <CreateStrukturOrganisasi
        isCreate={isCreate}
        setIsCreate={setIsCreate}
        jabatan={jabatan}
      />
      <EditStrukturOrganisasi
        strukturOrganisasi={struktur!}
        setIsEdit={setIsEdit}
        isEdit={isEdit}
        jabatan={jabatan}
      />
      <div
        className={`${
          isCreate || isEdit ? "hidden" : ""
        } flex flex-col gap-4 mt-4`}
      >
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
