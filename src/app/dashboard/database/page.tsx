import { CreateDatabaseDialog } from "@/components/admin/database/CrudDatabaseDialog";
import { databaseColumns } from "@/components/global/adminLayout/table/Columns";
import { DataTable } from "@/components/global/adminLayout/table/Datatable";
import prisma from "@/lib/db";

export default async function page() {
  const databases = await prisma.database.findMany();
  return (
    <>
      <h1 className="font-bold text-3xl">Database</h1>
      <p className="text-muted-foreground text-sm">
        Halaman untuk melakukan manajemen database
      </p>
      <div className="mt-4 space-y-4">
        <CreateDatabaseDialog />
        <DataTable
          columns={databaseColumns}
          data={databases}
          includes={{
            pagination: true,
            search: { column: "name", isVisible: true },
            viewOptions: true,
          }}
        />
      </div>
    </>
  );
}
