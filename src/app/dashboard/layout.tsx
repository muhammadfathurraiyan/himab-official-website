import Header from "@/components/global/adminLayout/header/Header";
import { Sidebar } from "@/components/global/adminLayout/sidebar/Sidebar";
import { auth } from "@/lib/auth/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  console.log(session);
  return (
    <main className="grid grid-cols-5 min-h-screen w-full">
      <Sidebar />
      <div className="col-span-4 max-lg:col-span-5">
        <Header />
        <section className="p-4">{children}</section>
      </div>
    </main>
  );
}
