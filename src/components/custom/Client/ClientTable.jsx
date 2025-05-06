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
import Table from "../Table";
import TablePagination from "../TablePagination/TablePagination";

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
    { header: "CR Person", accessorKey: "crPerson" },
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
        className="bg-main-secondary rounded-xl shadow-none"
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
                className="bg-main-secondary rounded-xl shadow-none"
                onClick={() => {
                  navigate(`/app/add-client/${row?.original?.id}`);
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

  if (isLoading) {
    return <p>Loading....</p>;
  }

  if (clientsData?.length == 0) {
    return <p>No Data Available</p>;
  }

  return (
    <div className="my-2">
      <Table data={clientsData || []} columns={columns} />
      <TablePagination totalPages={totalPages} page={page} setPage={setPage} />
    </div>
  );
};

export default ClientTable;
