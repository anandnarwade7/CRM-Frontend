import { Pencil } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

const data = [
  {
    id: 1,
    name: "Sam",
    password: "Abc123",
    phone: "9487758778",
    email: "Abc@gmail.com",
  },
  {
    id: 2,
    name: "Sam",
    password: "Abc123",
    phone: "9487758778",
    email: "Abc@gmail.com",
  },
  {
    id: 3,
    name: "Sam",
    password: "Abc123",
    phone: "9487758778",
    email: "Abc@gmail.com",
  },
  {
    id: 4,
    name: "Sam",
    password: "Abc123",
    phone: "9487758778",
    email: "Abc@gmail.com",
  },
  {
    id: 5,
    name: "Sam",
    password: "Abc123",
    phone: "9487758778",
    email: "Abc@gmail.com",
  },
];

const columns = [
  { header: "Id", accessorKey: "id" },
  { header: "Name", accessorKey: "name" },
  { header: "Password", accessorKey: "password" },
  { header: "Phone Number", accessorKey: "phone" },
  { header: "Email", accessorKey: "email" },
  {
    header: "Action",
    cell: () => (
      <Button className="bg-yellow-600 hover:bg-yellow-700 p-2 rounded-lg">
        <Pencil className="h-4 w-4 text-white" />
      </Button>
    ),
  },
];

const SalesPersonTable = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 2;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onPaginationChange: setPageIndex,
  });

  return (
    <div className="my-4">
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
          {table
            .getRowModel()
            .rows.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
            .map((row) => (
              <tr
                key={row.id}
                className="bg-white  border-slate-800 rounded-lg"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      {/* <div className="flex justify-between items-center mt-4">
        <Button
          className="bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg"
          onClick={() => setPageIndex((old) => Math.max(old - 1, 0))}
          disabled={pageIndex === 0}
        >
          Previous
        </Button>
        <span className="text-gray-700">
          Page {pageIndex + 1} of {Math.ceil(data.length / pageSize)}
        </span>
        <Button
          className="bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg"
          onClick={() => setPageIndex((old) => old + 1)}
          disabled={pageIndex >= Math.ceil(data.length / pageSize) - 1}
        >
          Next
        </Button>
      </div> */}
    </div>
  );
};

export default SalesPersonTable;
