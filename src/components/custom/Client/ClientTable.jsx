import { Pencil } from "lucide-react";
import { Button } from "../../ui/button";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const ClientTable = () => {
  const data = [
    {
      id: 1,
      leadName: "Kumar Properties",
      mobileNumber: "9487758778",
      email: "abc@gmail.com",
      status: "Converted",
      note: "Abc..",
    },
    // Repeat for demo purposes
    {
      id: 2,
      leadName: "Kumar Properties",
      mobileNumber: "9487758778",
      email: "abc@gmail.com",
      status: "Converted",
      note: "Abc..",
    },
    {
      id: 3,
      leadName: "Kumar Properties",
      mobileNumber: "9487758778",
      email: "abc@gmail.com",
      status: "Converted",
      note: "Abc..",
    },
    {
      id: 4,
      leadName: "Kumar Properties",
      mobileNumber: "9487758778",
      email: "abc@gmail.com",
      status: "Converted",
      note: "Abc..",
    },
  ];

  const columns = [
    { header: "Id", accessorKey: "id" },
    { header: "Lead Name", accessorKey: "leadName" },
    {
      header: "Mobile Number",
      accessorKey: "mobileNumber",
    },
    { header: "Email", accessorKey: "email" },
    { header: "Status", accessorKey: "status" },
    { header: "Note", accessorKey: "note" },
    {
      header: "Action",
      cell: () => (
        <Button variant="ghost">
          <Pencil className="text-yellow-500" size={20} />
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="my-2">
      <table className="min-w-full border-separate border-spacing-y-4">
        <thead>
          {table?.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup?.id} className="bg-gray-200 text-left">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-4 py-2 text-gray-600">
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
            <tr key={row.id} className="">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-4 py-2 border-b border-gray-200"
                >
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

export default ClientTable;
