import { Pencil } from "lucide-react";
import { Button } from "../../ui/button";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Link } from "../../../assets";
import { useGetClients } from "../../../hooks/Client/useGetClients";
import { useNavigate } from "react-router";

const ClientTable = () => {
  const navigate = useNavigate();
  const columns = [
    { header: "Id", accessorKey: "id" },
    { header: "Lead Name", accessorKey: "leadName" },
    {
      header: "Mobile Number",
      accessorKey: "leadmobile",
    },
    { header: "Email", accessorKey: "leadEmail" },
    { header: "Status", accessorKey: "status" },
    { header: "Note", accessorKey: "massagesJsonData" },
    {
      header: "Action",
      cell: () => (
        <Button
          size="icon"
          className="bg-[#C99227] rounded-xl shadow-none"
          onClick={() => navigate(`/app/client-details`)}
        >
          <img src={Link} alt="Link" />
        </Button>
      ),
    },
  ];

  const { clientsData, totalPages, isLoading, error } = useGetClients();

  const table = useReactTable({
    data: clientsData || [],
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
            <tr key={row.id}>
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
