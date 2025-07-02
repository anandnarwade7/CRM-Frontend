import { useState } from "react";
import Table from "../Table";
import { useGetAdminSupport } from "../../../hooks/Support/useGetAdminSupport";
import TablePagination from "../TablePagination/TablePagination";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import { truncateName } from "../../../utils/utilityFunction";

const CRMTable = () => {
  const [page, setPage] = useState(1);
  const { otherSupportData, otherTotalPages, isLoading, error } =
    useGetAdminSupport(page);

  // Filtering out the CRM Data separataly

  const crmData = otherSupportData?.filter((item) => item?.role === "CRM");

  const crmColumns = [
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
  ];

  if (isLoading) <p>Loading...</p>;

  if (error) <p>Error fetching data</p>;

  return (
    <div>
      <Table data={crmData || []} columns={crmColumns} />
      {/* <TablePagination
        totalPages={otherTotalPages}
        page={page}
        setPage={setPage}
      /> */}
    </div>
  );
};

export default CRMTable;
