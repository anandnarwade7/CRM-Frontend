import { Pencil } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import UserTable from "../../components/custom/Users/UserTable";
import { useGetUsers } from "../../hooks/Sales/useGetUsers";
import UserUpdateDialog from "../../components/custom/Users/UserUpdateDialog";
import { Dialog } from "../../components/ui/dialog";

const SalesPersonTable = () => {
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedData, setSelectedRowData] = useState(null);
  const pageSize = 1;

  const columns = [
    {
      header: "Id",
      cell: ({ row }) => row.index + 1,
    },
    { header: "Name", accessorKey: "name" },
    { header: "Phone Number", accessorKey: "mobile" },
    { header: "Email", accessorKey: "email" },
    {
      header: "Action",
      cell: ({ row }) => (
        <Button
          className="bg-yellow-600 hover:bg-yellow-700 p-2 rounded-xl"
          onClick={() => {
            setSelectedRowData(row?.original);
            console.log("Clicked row data:", row?.original);
            setDialogOpen(true);
          }}
        >
          <Pencil className="h-4 w-4 text-white" />
        </Button>
      ),
    },
  ];

  const {
    isLoading,
    isError,
    data,
    error,
    totalCount,
    isCountLoading,
    isCountError,
  } = useGetUsers("SALES");

  const totalPages = totalCount ? Math.ceil(totalCount / pageSize) : 0;

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  return (
    <>
      <UserTable
        columns={columns}
        isLoading={isLoading}
        error={error}
        data={data || []}
      />
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
        >
          Next
        </button>
      </div>
      <UserUpdateDialog
        open={dialogOpen}
        onClose={setDialogOpen}
        selectedData={selectedData}
      />
    </>
  );
};

export default SalesPersonTable;
