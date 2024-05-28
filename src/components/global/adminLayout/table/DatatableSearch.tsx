import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import React from "react";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  column: string;
}

export default function DatatableSearch<TData>({
  table,
  column,
}: DataTableViewOptionsProps<TData>) {
  return (
    <Input
      placeholder="Filter..."
      value={(table.getColumn(column)?.getFilterValue() as string) ?? ""}
      onChange={(event) =>
        table.getColumn(column)?.setFilterValue(event.target.value)
      }
      className="max-w-sm"
    />
  );
}
