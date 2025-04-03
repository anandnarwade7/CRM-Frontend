import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo } from "react";
import { Button } from "../../ui/button";
import { File } from "lucide-react";
import Table from "../../custom/Table";
import { formatDate } from "../../../utils/utilityFunction";

const ClientActivityEventTable = () => {
  const sampleData = [
    {
      id: 1,
      event: "Kumar Properties",
      percentage: "30 %",
      value: "10000",
      statusReport: true,
      architectLetter: true,
      date: 1712178946000, // April 3, 2024
    },
    {
      id: 2,
      event: "Kumar Properties",
      percentage: "30 %",
      value: "10000",
      statusReport: true,
      architectLetter: true,
      date: 1712092546000, // April 2, 2024
    },
    {
      id: 3,
      event: "Kumar Properties",
      percentage: "30 %",
      value: "10000",
      statusReport: true,
      architectLetter: true,
      date: 1712006146000, // April 1, 2024
    },
  ];

  const columns = useMemo(
    () => [
      {
        header: "Sr no.",
        accessorKey: "id",
      },
      {
        header: "Percentage",
        accessorKey: "percentage",
      },
      {
        header: "Value",
        accessorKey: "value",
      },
      {
        header: "Status Report",
        accessorKey: "statusReport",
        cell: ({ row }) =>
          row?.original?.statusReport ? (
            <div className="flex">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <File className="h-4 w-4 text-gray-500" />
              </Button>
            </div>
          ) : null,
      },
      {
        header: "Architect Letter",
        accessorKey: "architectLetter",
        cell: ({ row }) =>
          row?.original?.architectLetter ? (
            <div className="flex">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <File className="h-4 w-4 text-gray-500" />
              </Button>
            </div>
          ) : null,
      },
      {
        header: "Date",
        accessorKey: "date",
        cell: ({ row }) => <p>{formatDate(row.original.date)}</p>,
      },
    ],
    []
  );

  return (
    <>
      <div>
        <p className="text-[#1C4D6B] font-medium">Event Details</p>
        <Table data={sampleData} columns={columns} />
      </div>
    </>
  );
};

export default ClientActivityEventTable;
