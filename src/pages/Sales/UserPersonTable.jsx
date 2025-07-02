import { Loader2, Pencil } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import UserTable from "../../components/custom/Users/UserTable";
import { useGetUsers } from "../../hooks/Sales/useGetUsers";
import UserUpdateDialog from "../../components/custom/Users/UserUpdateDialog";
import { useActionUser } from "../../hooks/Sales/useActionUser";
import UserPagination from "../../components/custom/Users/UserPagination";
import { useLastPathSegment } from "../../hooks/use-lastpathsegment";
import Table from "../../components/custom/Table";
import TablePagination from "../../components/custom/TablePagination/TablePagination";
import { getTableIndex } from "../../utils/utilityFunction";

const UserPersonTable = () => {
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedData, setSelectedRowData] = useState(null);

  // Custom Hook for Extracting the last part of the url
  const lastSegment = useLastPathSegment();

  const user = lastSegment === "sales-person" ? "SALES" : "CRM";

  // Custom Hook for getting users data
  const { isLoading, data, error, totalCount, isCountLoading, isCountError } =
    useGetUsers(user, page);

  const { startingIndex } = getTableIndex(page);

  // Custom Hook for handling Action (Block and UnBlock)
  const { handleAction } = useActionUser();

  const columns = [
    {
      header: "Sr. No",
      cell: ({ row }) => startingIndex + row?.index + 1,
    },
    { header: "Name", accessorKey: "name" },
    { header: "Phone Number", accessorKey: "mobile" },
    { header: "Email", accessorKey: "email" },
    {
      header: "Edit",
      cell: ({ row }) => (
        <Button
          className="bg-main-secondary p-2 rounded-xl"
          onClick={() => {
            setSelectedRowData(row?.original);
            setDialogOpen(true);
          }}
        >
          <Pencil className="h-4 w-4 text-white" />
        </Button>
      ),
    },
    {
      header: "Action",
      cell: ({ row }) => {
        const currentAction = row?.original?.action;
        const status = currentAction === "BLOCK" ? "UNBLOCK" : "BLOCK";

        return (
          <div>
            <Button
              onClick={() => handleAction(row?.original?.id, status)}
              className="bg-main-secondary p-2"
            >
              {currentAction === "BLOCK" ? "UnBlock" : "Block"}
            </Button>
          </div>
        );
      },
    },
  ];

  // const handleNextPage = () => {
  //   if (page < totalPages) setPage((prev) => prev + 1);
  // };

  // const handlePreviousPage = () => {
  //   if (page > 1) setPage((prev) => prev - 1);
  // };

  if (
    data === "No users found for the role: CRM" ||
    data === "No users found for the role: SALES"
  ) {
    return <p className="text-center my-4 ">No Users Found</p>;
  }

  if (data?.length === 0) {
    return <p>No Users Found</p>;
  }

  if (isLoading) {
    return <Loader2 className="w-6 h-6 animate-spin" />;
  }

  if (error) {
    return <p className="text-red-500">{error.message}</p>;
  }

  return (
    <>
      {/* <UserTable
        columns={columns}
        isLoading={isLoading}
        error={error}
        data={data || []}
      /> */}
      <Table columns={columns} data={data || []} />
      {/* <UserPagination
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        page={page}
        totalPages={totalPages}
      /> */}
      <TablePagination totalPages={totalCount} page={page} setPage={setPage} />
      <UserUpdateDialog
        open={dialogOpen}
        onClose={setDialogOpen}
        selectedData={selectedData}
      />
    </>
  );
};

export default UserPersonTable;
