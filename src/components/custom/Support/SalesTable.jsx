import Table from "../Table";

const SalesTable = () => {
  const salesTableData = [
    {
      name: "tom",
      phoneNumber: "9487757878",
      email: "abc@gmail.com",
      department: "Sales",
      query: "I would like......",
    },
    {
      name: "tom",
      phoneNumber: "9487757878",
      email: "abc@gmail.com",
      department: "Sales",
      query: "I would like......",
    },
    {
      name: "tom",
      phoneNumber: "9487757878",
      email: "abc@gmail.com",
      department: "Sales",
      query: "I would like......",
    },
    {
      name: "tom",
      phoneNumber: "9487757878",
      email: "abc@gmail.com",
      department: "Sales",
      query: "I would like......",
    },
    {
      name: "tom",
      phoneNumber: "9487757878",
      email: "abc@gmail.com",
      department: "Sales",
      query: "I would like......",
    },
  ];

  const salesColumns = [
    { header: "Sr. No", cell: ({ row }) => row.index + 1 },
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
      <Table data={salesTableData || []} columns={salesColumns} />
    </div>
  );
};

export default SalesTable;
