import React from "react";
import Table from "../Table";

const CRMTable = () => {
  const crmTableData = [
    {
      name: "sam",
      phoneNumber: "9873728101",
      email: "xyz@gmail.com",
      department: "CRM",
      query: "I would like......",
    },
    {
      name: "sam",
      phoneNumber: "9873728101",
      email: "xyz@gmail.com",
      department: "CRM",
      query: "I would like......",
    },
    {
      name: "sam",
      phoneNumber: "9873728101",
      email: "xyz@gmail.com",
      department: "CRM",
      query: "I would like......",
    },
    {
      name: "sam",
      phoneNumber: "9873728101",
      email: "xyz@gmail.com",
      department: "CRM",
      query: "I would like......",
    },
  ];

  const crmColumns = [
    { header: "Id", cell: ({ row }) => row.index + 1 },
    { header: "Name", accessorKey: "name" },
    {
      header: "Phone Number",
      accessorKey: "phoneNumber",
    },
    { header: "Email", accessorKey: "email" },
    { header: "Department", accessorKey: "department" },
    { header: "Query", accessorKey: "query" },
  ];
  return (
    <div>
      <Table data={crmTableData || []} columns={crmColumns} />
    </div>
  );
};

export default CRMTable;
