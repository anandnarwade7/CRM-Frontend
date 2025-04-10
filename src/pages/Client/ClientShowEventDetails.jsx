import { Link, useNavigate, useParams } from "react-router";
import { useClientShowEvent } from "../../hooks/Client/useClientShowEvents";
import { useMemo } from "react";
import { Button } from "../../components/ui/button";
import { DownloadIcon } from "lucide-react";
import Table from "../../components/custom/Table";
import { downloadFile, formatDate } from "../../utils/utilityFunction";
import { Back } from "../../assets/index";

const ClientShowEventDetails = () => {
  const { leadId } = useParams();
  const navigate = useNavigate();

  const { data, error, isLoading } = useClientShowEvent(leadId);

  const columns = useMemo(
    () => [
      {
        header: "Sr no.",
        cell: ({ row }) => row.index + 1,
      },
      {
        header: "Event Name",
        accessorKey: "eventName",
      },
      {
        header: "Percentage",
        accessorKey: "percentage",
      },
      {
        header: "Base Price",
        accessorKey: "basePriceAmount",
      },
      {
        header: "GST",
        accessorKey: "gstAmount",
      },
      {
        header: "Invoice Date",
        accessorKey: "invoiceDate",
        cell: ({ row }) => <p>{formatDate(row?.original?.invoiceDate)}</p>,
      },
      {
        header: "Due Date",
        accessorKey: "dueDate",
        cell: ({ row }) => <p>{formatDate(row?.original?.dueDate)}</p>,
      },
      {
        header: "Payment Date",
        accessorKey: "paymentDate",
        cell: ({ row }) => <p>{formatDate(row?.original?.paymentDate)}</p>,
      },
      {
        header: "Paid By",
        accessorKey: "paidByName",
      },
      {
        header: "Status Report",
        accessorKey: "statusReport",
        cell: ({ row }) =>
          row?.original?.statusReport?.url ? (
            <div className="flex">
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  downloadFile(
                    row?.original?.statusReport?.url,
                    "Status Report.pdf"
                  )
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
        header: "Architect Letter",
        accessorKey: "architectsLetter",
        cell: ({ row }) =>
          row?.original?.architectsLetter?.url ? (
            <div className="flex">
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  downloadFile(
                    row?.original?.architectsLetter?.url,
                    "Architect Letter.pdf"
                  )
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
        header: "Invoice",
        accessorKey: "invoice",
        cell: ({ row }) =>
          row?.original?.invoice?.url ? (
            <div className="flex">
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  downloadFile(row?.original?.invoice?.url, "Invoice.pdf")
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
        header: "Receipt",
        accessorKey: "receipt",
        cell: ({ row }) =>
          row?.original?.receipt?.url ? (
            <div className="flex">
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  downloadFile(row?.original?.receipt?.url, "Receipt.pdf")
                }
              >
                <DownloadIcon className="h-4 w-4 text-main-secondary" />
              </Button>
            </div>
          ) : (
            "-"
          ),
      },
    ],
    []
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (data?.length === 0) {
    return <p>No Event Details Found</p>;
  }

  return (
    <div className="w-full h-screen bg-white rounded-xl px-6 py-3">
      <Button className="bg-white" onClick={() => navigate("/app/activities")}>
        <img src={Back} alt="Back" />
      </Button>
      <Table data={data} columns={columns} />
    </div>
  );
};

export default ClientShowEventDetails;
