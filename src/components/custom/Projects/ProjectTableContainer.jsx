import { useMemo } from "react";
import ProjectTable from "./ProjectTable";
import { Button } from "../../ui/button";
import { Link } from "../../../assets";
import { useNavigate } from "react-router";

const ProjectTableContainer = () => {
  const navigate = useNavigate();
  const sampleData = [
    {
      id: 1,
      name: "Kumar Properties",
      address: "Pune",
      totalTowers: 2,
      totalFloors: 2,
    },
    {
      id: 2,
      name: "Kumar Properties",
      address: "Pune",
      totalTowers: 2,
      totalFloors: 2,
    },
    {
      id: 3,
      name: "Kumar Properties",
      address: "Pune",
      totalTowers: 2,
      totalFloors: 2,
    },
    {
      id: 4,
      name: "Kumar Properties",
      address: "Pune",
      totalTowers: 2,
      totalFloors: 2,
    },
    {
      id: 5,
      name: "Kumar Properties",
      address: "Pune",
      totalTowers: 2,
      totalFloors: 2,
    },
  ];

  const columns = [
    // { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Property Name" },
    { accessorKey: "address", header: "Address" },
    { accessorKey: "totalTowers", header: "Total Towers" },
    { accessorKey: "totalFloors", header: "Total Floors" },
    {
      header: "Inventory",
      cell: () => (
        <Button
          size="icon"
          className="bg-main-secondary rounded-xl shadow-none"
          // onClick={() => {
          //   navigate("/app/inventory-details");
          // }}
        >
          <img src={Link} alt="Link" />
        </Button>
      ),
    },
  ];

  return (
    <div className="my-4">
      <ProjectTable data={sampleData} columns={columns} />
    </div>
  );
};

export default ProjectTableContainer;
