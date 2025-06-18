import { File } from "lucide-react";
import SupportHeader from "../../components/custom/Support/SupportHeader";
import { Button } from "../../components/ui/button";
import Table from "../../components/custom/Table";
import { useNavigate } from "react-router";

const SalesSupport = () => {
  const navigate = useNavigate();
  const sampleData = [
    {
      id: 1,
      type: "Subscription",
      title: "Transaction Failed",
      description: "Lorem ipsum...",
      status: "Pending",
    },
    {
      id: 2,
      type: "Subscription",
      title: "Transaction Failed",
      description: "Lorem ipsum...",
      status: "Pending",
    },
    {
      id: 3,
      type: "Subscription",
      title: "Transaction Failed",
      description: "Lorem ipsum...",
      status: "Pending",
    },
    {
      id: 4,
      type: "Subscription",
      title: "Transaction Failed",
      description: "Lorem ipsum...",
      status: "Pending",
    },
    {
      id: 5,
      type: "Subscription",
      title: "Transaction Failed",
      description: "Lorem ipsum...",
      status: "Pending",
    },
  ];

  const columns = [
    {
      header: "Id",
      cell: ({ row }) => row.index + 1,
    },
    { accessorKey: "type", header: "Type" },
    { accessorKey: "title", header: "Title" },
    { accessorKey: "description", header: "Description" },
    {
      header: "Screenshot",
      cell: ({ row }) => (
        <Button size="icon" className="bg-gray-400 shadow-none">
          <File />
        </Button>
      ),
    },
    { accessorKey: "status", header: "Status" },
  ];
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
        <Table data={sampleData} columns={columns} />
      </div>
    </>
  );
};

export default SalesSupport;
