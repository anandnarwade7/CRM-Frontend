import Table from "../Table";
import { useGetAdminSupport } from "../../../hooks/Support/useGetAdminSupport";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import { truncateName } from "../../../utils/utilityFunction";
import { Button } from "../../ui/button";
import { ChatIcon } from "../../../assets";
import { Loader2 } from "lucide-react";
import TablePagination from "../TablePagination/TablePagination";
import { useSupportAction } from "../../../hooks/Support/useSupportAction";

const SuperAdminSupportTable = () => {
  const [page, setPage] = useState(1);
  const { superAdminSupportData, superAdminTotalPages, isLoading, error } =
    useGetAdminSupport(page);

  const { handleSupportAction, loadingAction } = useSupportAction();

  const navigate = useNavigate();

  function handleChatClick(supportId, name) {
    navigate("/app/chat", { state: { supportId, name } });
  }

  const columns = [
    { header: "Sr. No", cell: ({ row }) => row.index + 1 },
    { header: "Name", accessorKey: "name" },
    {
      header: "Phone Number",
      accessorKey: "phone",
    },
    { header: "Email", accessorKey: "email" },
    { header: "Department", accessorKey: "department" },
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
    { header: "Status", accessorKey: "status" },
    {
      header: "Chat",
      cell: ({ row }) => {
        return (
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
    {
      header: "Action",
      cell: ({ row }) => {
        const isLoadingRow = loadingAction?.id === row?.original?.id;
        return (
          <>
            {row?.original?.status == "SOLVED" ? (
              <p className="text-main text-sm text-center">Approved</p>
            ) : row?.original?.status == "REJECTED" ? (
              <p className="text-[#EE747A] text-sm text-center">Rejected</p>
            ) : (
              <div className="flex items-center gap-3">
                <Button
                  className="bg-main text-white rounded-lg"
                  onClick={() => {
                    handleSupportAction(row?.original?.id, "solve");
                  }}
                  disabled={isLoadingRow}
                >
                  {isLoadingRow && loadingAction.action === "solve" ? (
                    <Loader2 className="animate-spin" size={8} />
                  ) : (
                    "Approve"
                  )}
                </Button>
                <Button
                  className="text-main-text bg-transparent border-2 border-main rounded-lg"
                  onClick={() => {
                    handleSupportAction(row?.original?.id, "reject");
                  }}
                  disabled={isLoadingRow}
                >
                  {isLoadingRow && loadingAction.action === "reject" ? (
                    <Loader2 className="animate-spin" size={8} />
                  ) : (
                    "Reject"
                  )}
                </Button>
              </div>
            )}
          </>
        );
      },
    },
  ];

  if (isLoading) {
    return <Loader2 className="animate-spin" size={6} />;
  }

  if (error) return <p className="text-red-500 text-sm">Error Loading Data</p>;

  return (
    <div>
      {superAdminSupportData?.length == 0 ? (
        <p>No support request are available</p>
      ) : (
        <div className="max-w-full w-[63rem]">
          <Table data={superAdminSupportData || []} columns={columns} />
        </div>
      )}

      <TablePagination
        totalPages={superAdminTotalPages}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default SuperAdminSupportTable;
