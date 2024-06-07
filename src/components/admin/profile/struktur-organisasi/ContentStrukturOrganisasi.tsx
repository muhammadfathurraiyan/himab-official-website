"use client";
import CardInfo from "@/components/global/adminLayout/card/CardInfo";
import { strukturOrganisasiColumns } from "@/components/global/adminLayout/table/Columns";
import { DataTable } from "@/components/global/adminLayout/table/Datatable";
import { Card, CardHeader } from "@/components/ui/card";
import { StrukturOrganisasi } from "@prisma/client";
import { useState } from "react";
import { CreateStrukturOrganisasi } from "./CrudStrukturOrganisasi";

export default function ContentStrukturOrganisasi({   
  strukturOrganisasi,
}: {
  strukturOrganisasi: StrukturOrganisasi[];
}) {
  const [isCreate, setIsCreate] = useState(false);
  return (
    <div className="flex flex-col gap-4 mt-4">
      <CardInfo
        description="Jika anda ingin melakukan penambahan anggota organisasi, klik tombol di bawah untuk melakukan penambahan tentang anggota organisasi."
        title="Struktur Organisasi"
        button={{ title: "Tambah", onClick: () => setIsCreate(!isCreate) }}
      />
      <Card>
        <CardHeader>
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
        </CardHeader>
      </Card>
      <CreateStrukturOrganisasi isCreate={isCreate} setIsCreate={setIsCreate} />
    </div>
  );
}
