import { Separator } from "../../ui/separator";
import { Button } from "../../ui/button";
import { useState } from "react";
import Table from "../Table";
import UpdateAdminDialog from "./UpdateAdminDialog";
import { useGetAdmins } from "../../../hooks/Admin/useGetAdmins";
import { formatDate } from "../../../utils/utilityFunction";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router";
import TablePagination from "../TablePagination/TablePagination";

const AdminTableContainer = () => {
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate = useNavigate();

  const { adminData, totalPages, isLoading, error } = useGetAdmins(page);

  const columns = [
    {
      header: "Sr. No",
      cell: ({ row }) => row?.index + 1,
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Property Name",
      accessorKey: "propertyName",
    },
    {
      header: "Phone Number",
      accessorKey: "mobile",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Created Date",
      accessorKey: "createdOn",
      cell: ({ row }) => formatDate(row?.original?.createdOn),
    },
    {
      header: "Subscription Date",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 -mx-2">
          <p>{formatDate(row?.original?.startDate)}</p>
          <Separator className="w-1 bg-black" />
          <p>{formatDate(row?.original?.endDate)}</p>
        </div>
      ),
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <Button
          className="bg-main-secondary p-2 rounded-xl"
          onClick={() => navigate(`/app/admin-details/${row?.original?.id}`)}
        >
          <Pencil className="h-4 w-4 text-white" />
        </Button>
      ),
    },
    {
      header: "Access",
      cell: ({ row }) => (
        <Button
          className="bg-main-secondary rounded-md"
          onClick={() => {
            setDialogOpen(true);
            setSelectedAction(row?.original?.action);
            setSelectedUserId(row?.original?.id);
          }}
        >
          {row?.original?.action === "UNBLOCK" ? "Block" : "Unblock"}
        </Button>
      ),
    },
  ];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <p className="text-red-500">
        Error while fetching admins: {error.message}
      </p>
    );
  }

  if (adminData?.length === 0) {
    return <p>No Data Found</p>;
  }

  // if (adminData === "No users found for the role: ADMIN") {
  //   return <p>No Admin Found</p>;
  // }

  return (
    <div className="my-6">
      <Table data={adminData} columns={columns} />
      <UpdateAdminDialog
        open={dialogOpen}
        onClose={setDialogOpen}
        selectedAction={selectedAction}
        selectedUserId={selectedUserId}
      />
      <TablePagination totalPages={totalPages} page={page} setPage={setPage} />
    </div>
  );
};

export default AdminTableContainer;
