import { notFound, redirect } from "next/navigation";

export default async function page({ params }: { params: { crud: string } }) {
  if (params.crud !== "tambah" && params.crud !== "edit") {
    return notFound();
  }

  if (params.crud === "tambah") {
    return <section>{params.crud}</section>;
  } else if (params.crud === "edit") {
    return <div>{params.crud}</div>;
  }
}
