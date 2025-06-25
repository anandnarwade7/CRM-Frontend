import { File } from "lucide-react";
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
import { truncateName } from "../../utils/utilityFunction";

const SalesSupport = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const { supportData, totalPages, isLoading, error } = useGetSupport(page);

  const columns = [
    {
      header: "Sr. No",
      cell: ({ row }) => row.index + 1,
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
        const lowerStatus = status == "PENDING" ? "Pending" : status;
        return <p>{lowerStatus}</p>;
      },
    },
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
      <div>
        <Table data={supportData} columns={columns} />
      </div>
      <TablePagination totalPages={totalPages} page={page} setPage={setPage} />
    </>
  );
};

export default SalesSupport;
