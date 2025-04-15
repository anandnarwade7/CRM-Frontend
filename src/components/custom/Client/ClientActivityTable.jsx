import { useMemo, useState } from "react";
import { Button } from "../../ui/button";
import Table from "../Table";
import { DownloadIcon, File } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useUserId } from "../../../hooks/use-user-id";
import axios from "axios";
import { BASE_URL } from "../../../utils/constant";
import TablePagination from "../TablePagination/TablePagination";
import { useNavigate } from "react-router";
import axiosInstance from "../../../services/axiosInstance";

const fetchClientData = async (id, page) => {
  try {
    const response = await axiosInstance.get(
      `/clients/get/client/data/${id}/${page}`
    );
    return response?.data;
  } catch (error) {
    console.log("Error While fetching CLient Data", error);
    throw new Error(
      error?.response?.data?.message || "Failed to fetch Client Data"
    );
  }
};

const ClientActivityTable = () => {
  const userId = useUserId();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const { data, error, isLoading } = useQuery({
    queryKey: ["ClientData"],
    queryFn: () => fetchClientData(userId, page),
  });

  const downloadFile = async (fileUrl, fileName) => {
    try {
      const response = await axios.get(fileUrl, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([response?.data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log("Error Download File", error);
    }
  };

  const columns = useMemo(
    () => [
      {
        header: "Sr no.",
        cell: ({ row }) => row.index + 1,
      },
      {
        header: "Property Name",
        cell: ({ row }) => <p>N/A</p>,
      },
      {
        header: "Agreement",
        accessorKey: "agreement",
        cell: ({ row }) =>
          row?.original?.agreement ? (
            <div className="flex">
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  downloadFile(row?.original?.agreement, "Agreement.pdf")
                }
              >
                <DownloadIcon className="h-4 w-4 text-main-secondary" />
              </Button>
            </div>
          ) : (
            "-"
          ),
      },
      {
        header: "Stamp Duty",
        accessorKey: "stampDuty",
        cell: ({ row }) =>
          row?.original?.stampDuty ? (
            <div className="flex">
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  downloadFile(row?.original?.stampDuty, "Stamp Duty.pdf")
                }
              >
                <DownloadIcon className="h-4 w-4 text-main-secondary" />
              </Button>
            </div>
          ) : (
            "-"
          ),
      },
      {
        header: "TDS Document",
        accessorKey: "tdsDoc",
        cell: ({ row }) =>
          row?.original?.tdsDoc ? (
            <div className="flex">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => downloadFile(row?.original?.tdsDoc, "TDS.pdf")}
              >
                <DownloadIcon className="h-4 w-4 text-main-secondary" />
              </Button>
            </div>
          ) : (
            "-"
          ),
      },
      {
        header: "Bank Sanction",
        accessorKey: "bankSanction",
        cell: ({ row }) =>
          row?.original?.bankSanction ? (
            <div className="flex">
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  downloadFile(row?.original?.bankSanction, "Bank Sanction.pdf")
                }
              >
                <DownloadIcon className="h-4 w-4 text-main-secondary" />
              </Button>
            </div>
          ) : (
            "-"
          ),
      },
      {
        header: "Event Details",
        cell: ({ row }) => (
          <Button
            onClick={() =>
              navigate(`/app/show-eventdetails/${row?.original?.id}`)
            }
            className="bg-main-secondary text-white"
          >
            Show
          </Button>
        ),
      },
    ],
    []
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <div className="text-red-600 my-5">
        <p>⚠️ Failed to fetch client data.</p>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="my-4">
      <Table data={data?.content} columns={columns} />
      <TablePagination
        totalPages={data?.totalPages}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default ClientActivityTable;
