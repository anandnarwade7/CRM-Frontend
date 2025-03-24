import React, { useMemo } from "react";
import Table from "../Table";
import { useGetClientsList } from "../../../hooks/Client/useGetClientsList";
import { useUserRole } from "../../../hooks/use-userrole";
import { useUserId } from "../../../hooks/use-user-id";

const ClientsListTable = () => {
  const userId = useUserId();

  const columns = useMemo(
    () => [
      { header: "ID", accessorKey: "id" },
      { header: "Name", accessorKey: "name" },
      { header: "Phone Number", accessorKey: "mobile" },
      { header: "Email", accessorKey: "email" },
    ],
    []
  );

  const { data, isLoading, error } = useGetClientsList(userId);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (data === undefined || data?.length === 0) {
    return <p>Not Found</p>;
  }
  console.log("Fetching Clients List", data);

  return (
    <div>
      <Table data={data} columns={columns} />
    </div>
  );
};

export default ClientsListTable;
