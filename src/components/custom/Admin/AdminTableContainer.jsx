import { Pencil } from "lucide-react";
import { Button } from "../../ui/button";
import { useState } from "react";
import Table from "../Table";
import UpdateAdminDialog from "./UpdateAdminDialog";
import { useGetAdmins } from "../../../hooks/Admin/useGetAdmins";
import { formatDate } from "../../../utils/utilityFunction";

const AdminTableContainer = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data, isLoading, error } = useGetAdmins();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (data?.length === 0) {
    return <p>No Data Found</p>;
  }

  const sampleData = [
    {
      id: 1,
      name: "Sam",
      property: "XYZ builders",
      mobile: "9487758778",
      email: "Abc@gmail.com",
      createdDate: "12/01/25",
      subscriptionDate: "08/01/25 - 08/04/25",
    },

    {
      id: 2,
      name: "Sam",
      property: "XYZ builders",
      mobile: "9487758778",
      email: "Abc@gmail.com",
      createdDate: "12/01/25",
      subscriptionDate: "08/01/25 - 08/04/25",
    },
    {
      id: 3,
      name: "Sam",
      property: "XYZ builders",
      mobile: "9487758778",
      email: "Abc@gmail.com",
      createdDate: "12/01/25",
      subscriptionDate: "08/01/25 - 08/04/25",
    },
    {
      id: 4,
      name: "Sam",
      property: "XYZ builders",
      mobile: "9487758778",
      email: "Abc@gmail.com",
      createdDate: "12/01/25",
      subscriptionDate: "08/01/25 - 08/04/25",
    },
  ];

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
    // {
    //   header: "Subscription Date",
    //   accessorKey: "subscriptionDate",
    // },
    {
      header: "Action",
      cell: ({ row }) => (
        <Button
          className="bg-[#C99227] rounded-md"
          onClick={() => {
            setDialogOpen(true);
          }}
        >
          Unblock
        </Button>
      ),
    },
  ];
  return (
    <div className="my-6">
      <Table data={data} columns={columns} />
      <UpdateAdminDialog open={dialogOpen} onClose={setDialogOpen} />
    </div>
  );
};

export default AdminTableContainer;
