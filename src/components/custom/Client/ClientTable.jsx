import { Button } from "../../ui/button";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Link } from "../../../assets";
import { useGetClients } from "../../../hooks/Client/useGetClients";
import { useNavigate } from "react-router";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import { useUserRole } from "../../../hooks/use-userrole";

const ClientTable = () => {
  const navigate = useNavigate();
  const userRole = useUserRole();
  const [page, setPage] = useState(1);

  // const columns = [
  //   { header: "Id", cell: ({ row }) => row.index + 1 },
  //   { header: "Lead Name", accessorKey: "leadName" },
  //   {
  //     header: "Mobile Number",
  //     accessorKey: "leadmobile",
  //   },
  //   { header: "Email", accessorKey: "leadEmail" },
  //   { header: "Status", accessorKey: "status" },
  //   {
  //     header: "Note",
  //     accessorKey: "conversationLogs",
  //     cell: ({ row }) => {
  //       const logs = row?.original?.conversationLogs || [];
  //       const lastComment = logs[logs?.length - 1]?.comment || "No Comment";
  //       const preview = lastComment.substring(0, 6);

  //       return (
  //         <TooltipProvider>
  //           <Tooltip>
  //             <TooltipTrigger>
  //               <p>
  //                 {preview}
  //                 {lastComment.length > 6 ? "..." : ""}
  //               </p>
  //             </TooltipTrigger>
  //             <TooltipContent className="bg-gray-400 text-black">
  //               <p>{lastComment}</p>
  //             </TooltipContent>
  //           </Tooltip>
  //         </TooltipProvider>
  //       );
  //     },
  //   },
  //   {
  //     header: "Create Login",
  //     cell: ({ row }) => (
  //       <div className="flex justify-center">
  //         <Button
  //           size="icon"
  //           className="bg-[#C99227] rounded-xl shadow-none"
  //           onClick={() => {
  //             if (userRole === "CRM") {
  //               navigate("/app/add-client");
  //             }
  //           }}
  //         >
  //           <img src={Link} alt="Link" />
  //         </Button>
  //       </div>
  //     ),
  //   },
  //   {
  //     header: "Action",
  //     cell: ({ row }) => (
  //       <Button
  //         size="icon"
  //         className="bg-[#C99227] rounded-xl shadow-none"
  //         onClick={() => {
  //           if (userRole === "ADMIN") {
  //             navigate(`/app/client-details/${row?.original?.id}`);
  //           } else {
  //             navigate(`/app/client-details-crm/${row?.original?.id}`);
  //           }
  //         }}
  //       >
  //         <img src={Link} alt="Link" />
  //       </Button>
  //     ),
  //   },
  // ];

  const baseColumns = [
    { header: "Id", cell: ({ row }) => row.index + 1 },
    { header: "Lead Name", accessorKey: "leadName" },
    {
      header: "Mobile Number",
      accessorKey: "leadmobile",
    },
    { header: "Email", accessorKey: "leadEmail" },
    { header: "Status", accessorKey: "status" },
    {
      header: "Note",
      accessorKey: "conversationLogs",
      cell: ({ row }) => {
        const logs = row?.original?.conversationLogs || [];
        const lastComment = logs[logs?.length - 1]?.comment || "No Comment";
        const preview = lastComment.substring(0, 6);

        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <p>
                  {preview}
                  {lastComment.length > 6 ? "..." : ""}
                </p>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-400 text-black">
                <p>{lastComment}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
    },
  ];

  const actionColumn = {
    header: "Action",
    cell: ({ row }) => (
      <Button
        size="icon"
        className="bg-[#C99227] rounded-xl shadow-none"
        onClick={() => {
          if (userRole === "ADMIN") {
            navigate(`/app/client-details/${row?.original?.id}`);
          } else {
            navigate(`/app/client-details-crm/${row?.original?.id}`);
          }
        }}
      >
        <img src={Link} alt="Link" />
      </Button>
    ),
  };

  const createLoginColumn =
    userRole === "CRM"
      ? {
          header: "Create Login",
          cell: ({ row }) => (
            <div className="flex justify-center">
              <Button
                size="icon"
                className="bg-[#C99227] rounded-xl shadow-none"
                onClick={() => {
                  if (userRole === "CRM") {
                    navigate("/app/add-client");
                  }
                }}
              >
                <img src={Link} alt="Link" />
              </Button>
            </div>
          ),
        }
      : null;

  const columns =
    userRole === "CRM"
      ? [...baseColumns, createLoginColumn, actionColumn]
      : [...baseColumns, actionColumn];

  const { clientsData, totalPages, isLoading, error } = useGetClients(page);

  const table = useReactTable({
    data: clientsData || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <p>Loading....</p>;
  }

  if (clientsData?.length == 0) {
    return <p>No Data Available</p>;
  }

  return (
    <div className="my-2">
      <table className="min-w-full border-separate border-spacing-y-4">
        <thead className="bg-[#F6F6F6]">
          {table?.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup?.id} className="bg-gray-200 text-left">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-4 py-4 font-medium text-sm">
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
                  className="px-4 py-2 border-b border-gray-200 text-[#757575] font-medium text-sm"
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
