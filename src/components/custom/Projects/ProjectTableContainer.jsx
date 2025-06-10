import { useMemo, useState } from "react";
import ProjectTable from "./ProjectTable";
import { Button } from "../../ui/button";
import { Link } from "../../../assets";
import { useNavigate } from "react-router";
import Table from "../Table";
import { useGetProjects } from "../../../hooks/Projects/useGetProjects";
import TablePagination from "../TablePagination/TablePagination";

const ProjectTableContainer = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { projectData, totalPages, isLoading, error } = useGetProjects(page);

  const columns = [
    // { accessorKey: "id", header: "ID" },
    { accessorKey: "propertyName", header: "Property Name" },
    { accessorKey: "address", header: "Address" },
    { accessorKey: "totalTowers", header: "Total Towers" },
    { accessorKey: "totalFloors", header: "Total Floors" },
    {
      header: "Inventory",
      cell: ({ row }) => (
        <Button
          size="icon"
          className="bg-main-secondary rounded-xl shadow-none"
          onClick={() => {
            navigate(`/app/inventory-details/${row?.original?.id}`);
          }}
        >
          <img src={Link} alt="Link" />
        </Button>
      ),
    },
  ];

  if (isLoading) {
    return <p>Loading....</p>;
  }
  if (projectData?.length === 0) return <p>No Data Available</p>;

  return (
    <div className="my-4">
      {/* <ProjectTable data={sampleData} columns={columns} /> */}
      <Table data={projectData} columns={columns} />
      <TablePagination totalPages={totalPages} page={page} setPage={setPage} />
    </div>
  );
};

export default ProjectTableContainer;
