import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";

const LeadsTable = () => {
  const data = [
    {
      id: 1,
      leadName: "Kumar Properties",
      phone: "9487758778",
      email: "abc@gmail.com",
      salesPerson: "Sam",
      status: "Assigned",
    },
    {
      id: 2,
      leadName: "XYZ Corp",
      phone: "9876543210",
      email: "xyz@gmail.com",
      salesPerson: "John",
      status: "Completed",
    },
    {
      id: 3,
      leadName: "ABC Ltd",
      phone: "8796541230",
      email: "abc@gmail.com",
      salesPerson: "Emma",
      status: "Completed",
    },
  ];

  const baseColumns = [
    { header: "Id", accessorKey: "id" },
    { header: "Lead Name", accessorKey: "leadName" },
    { header: "Phone Number", accessorKey: "phone" },
    { header: "Email", accessorKey: "email" },
    { header: "Sales Person", accessorKey: "salesPerson" },
    { header: "Status", accessorKey: "status" },
  ];

  // Condition for Hiding the Status Column if the Completed

  const columns = "Complected"
    ? baseColumns
    : [...baseColumns, { header: "Action", accessorKey: "action" }];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div>
      <table className="min-w-full rounded-md">
        <thead className="bg-gray-100">
          {table?.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup?.id}>
              {headerGroup?.headers?.map((header) => (
                <th key={header?.id} className="p-2 text-left">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border-y-2 px-3 py-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadsTable;
