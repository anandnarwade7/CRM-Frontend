import { File, Loader2 } from "lucide-react";
import SupportHeader from "../../components/custom/Support/SupportHeader";
import { Button } from "../../components/ui/button";
import Table from "../../components/custom/Table";
import { useNavigate } from "react-router";
import { useGetSupport } from "../../hooks/Support/useGetSupport";
import TablePagination from "../../components/custom/TablePagination/TablePagination";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import { getTableIndex, truncateName } from "../../utils/utilityFunction";
import { ChatIcon } from "../../assets";
import { useSupportAction } from "../../hooks/Support/useSupportAction";

const SalesCRMSupport = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const { startingIndex } = getTableIndex(page);

  const { supportData, totalPages, isLoading, error } = useGetSupport(page);

  function handleChatClick(supportId, name) {
    navigate("/app/chat", { state: { supportId, name } });
  }

  // const { handleSupportAction, loadingAction } = useSupportAction();

  const columns = [
    {
      header: "Sr. No",
      cell: ({ row }) => startingIndex + row?.index + 1,
    },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone", header: "Phone Number" },
    { accessorKey: "department", header: "Department" },
    {
      // accessorKey: "query",
      header: "Query",
      cell: ({ row }) => {
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <p>{truncateName(row?.original?.query)}</p>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-400 text-black max-w-xs break-words">
                <p>{row?.original?.query}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
    },
    {
      // accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row?.original?.status;
        const lowerStatus =
          status == "PENDING"
            ? "Pending"
            : status == "REJECTED"
            ? "Rejected"
            : status == "SOLVED"
            ? "Solved"
            : status;
        return <p>{lowerStatus}</p>;
      },
    },
    {
      header: "Chat",
      cell: ({ row }) => {
        return (
          // <Link to={`/app/chat/${row?.original?.userId}`}>
          //   <img src={ChatIcon} alt="chatIcon" />
          // </Link>
          <Button
            variant="secondary"
            size="icon"
            className="size-8"
            onClick={() =>
              handleChatClick(row?.original?.id, row?.original?.name)
            }
          >
            <img src={ChatIcon} alt="chatIcon" />
          </Button>
        );
      },
    },
    // {
    //   header: "Action",
    //   cell: ({ row }) => {
    //     const isLoadingRow = loadingAction?.id === row?.original?.id;
    //     return (
    //       <>
    //         {row?.original?.status == "SOLVED" ? (
    //           <p className="text-main text-sm text-center">Approved</p>
    //         ) : row?.original?.status == "REJECTED" ? (
    //           <p className="text-[#EE747A] text-sm text-center">Rejected</p>
    //         ) : (
    //           <div className="flex items-center gap-3">
    //             <Button
    //               className="bg-main text-white rounded-lg"
    //               onClick={() => {
    //                 handleSupportAction(row?.original?.id, "solve");
    //               }}
    //               disabled={isLoadingRow}
    //             >
    //               {isLoadingRow && loadingAction.action === "solve" ? (
    //                 <Loader2 className="animate-spin" size={8} />
    //               ) : (
    //                 "Approve"
    //               )}
    //             </Button>
    //             <Button
    //               className="text-main-text bg-transparent border-2 border-main rounded-lg"
    //               onClick={() => {
    //                 handleSupportAction(row?.original?.id, "reject");
    //               }}
    //               disabled={isLoadingRow}
    //             >
    //               {isLoadingRow && loadingAction.action === "reject" ? (
    //                 <Loader2 className="animate-spin" size={8} />
    //               ) : (
    //                 "Reject"
    //               )}
    //             </Button>
    //           </div>
    //         )}
    //       </>
    //     );
    //   },
    // },
  ];

  if (isLoading) return <p>Loading....</p>;

  if (error)
    return <p className="text-red-500">Failed to fetch : {error?.message}</p>;

  return (
    <>
      <div className="flex items-center justify-between">
        <SupportHeader label="Issues List" />
        <Button
          className="bg-main"
          onClick={() => navigate("/app/support-raise")}
        >
          Add Request
        </Button>
      </div>
      {supportData?.length === 0 ? (
        <p>No Data Available</p>
      ) : (
        <>
          <div className="w-full max-w-[62rem]">
            <Table data={supportData} columns={columns} />
          </div>
          <TablePagination
            totalPages={totalPages}
            page={page}
            setPage={setPage}
          />
        </>
      )}
    </>
  );
};

export default SalesCRMSupport;
