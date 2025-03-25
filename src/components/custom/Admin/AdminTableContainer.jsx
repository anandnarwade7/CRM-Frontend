import { Separator } from "../../ui/separator";
import { Button } from "../../ui/button";
import { useState } from "react";
import Table from "../Table";
import UpdateAdminDialog from "./UpdateAdminDialog";
import { useGetAdmins } from "../../../hooks/Admin/useGetAdmins";
import { formatDate } from "../../../utils/utilityFunction";

const AdminTableContainer = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const { data, isLoading, error } = useGetAdmins();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (data?.length === 0) {
    return <p>No Data Found</p>;
  }

  const columns = [
    {
      header: "ID",
      accessorKey: "id",
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
          className="bg-[#C99227] rounded-md"
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
  return (
    <div className="my-6">
      <Table data={data} columns={columns} />
      <UpdateAdminDialog
        open={dialogOpen}
        onClose={setDialogOpen}
        selectedAction={selectedAction}
        selectedUserId={selectedUserId}
      />
    </div>
  );
};

export default AdminTableContainer;
