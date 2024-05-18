import { CreateDialog } from "@/components/admin/manajemen-admin/CrudDialog";
import { userColumns } from "@/components/global/adminLayout/table/Columns";
import { DataTable } from "@/components/global/adminLayout/table/Datatable";
import prisma from "@/lib/db";

export default async function page() {
  const users = await prisma.user.findMany();
  return (
    <>
      <h1 className="font-bold text-3xl">Manajemen Admin</h1>
      <p className="text-muted-foreground text-sm">
        Halaman untuk melakukan manajemen admin
      </p>
      <div className="mt-4">
        <CreateDialog />
        <DataTable columns={userColumns} data={users} />
      </div>
    </>
  );
}
