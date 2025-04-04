import { Download, File, Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "../../ui/input";
import { truncateName } from "../../../utils/utilityFunction";
import DatePicker from "../DatePicker";
import { Button } from "../../ui/button";
import axios from "axios";
import { BASE_URL } from "../../../utils/constant";
import { useUserId } from "../../../hooks/use-user-id";
import { useParams } from "react-router";

const columns = [
  { key: "event", label: "Event" },
  { key: "percentage", label: "Percentage" },
  { key: "basePrice", label: "Base Price" },
  { key: "gst", label: "GST" },
  { key: "invoiceDate", label: "Invoice Date" },
  { key: "dueDate", label: "Due Date" },
  { key: "paymentDate", label: "Payment Date" },
  { key: "paidBy", label: "Paid By" },
];

const fileFields = ["statusReport", "architectLetter", "invoice", "receipt"];

const EventDetailsTable = () => {
  const userId = useUserId();
  const { clientId } = useParams();

  const [rows, setRows] = useState([
    {
      id: 1,
      event: "",
      percentage: "",
      basePrice: "",
      gst: "",
      statusReport: null,
      architectLetter: null,
      invoice: null,
      invoiceDate: "",
      dueDate: "",
      paymentDate: "",
      paidBy: "",
      receipt: null,

      statusReportUrl: "",
      architectLetterUrl: "",
      invoiceUrl: "",
      receiptUrl: "",
    },
  ]);

  const addRow = () => {
    setRows([
      ...rows,
      {
        id: rows.length + 1,
        event: "",
        percentage: "",
        basePrice: "",
        gst: "",
        statusReport: null,
        architectLetter: null,
        invoice: null,
        invoiceDate: "",
        dueDate: "",
        paymentDate: "",
        paidBy: "",
        receipt: null,

        statusReportUrl: "",
        architectLetterUrl: "",
        invoiceUrl: "",
        receiptUrl: "",
      },
    ]);
  };

  const deleteLastRow = () => {
    if (rows.length > 1) setRows(rows.slice(0, -1));
  };

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const handleFileUpload = (index, field, file) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = file;
    setRows(updatedRows);
  };

  const handleSubmitData = async (row) => {
    console.log(row);

    const formData = new FormData();

    // Attach files
    if (row.statusReport) formData.append("statusReport", row.statusReport);
    if (row.architectLetter)
      formData.append("architectsLetter", row.architectLetter);
    if (row.invoice) formData.append("invoice", row.invoice);
    if (row.receipt) formData.append("receipt", row.receipt);

    const eventDetails = {
      salesPersonId: 1, // Replace with dynamic value if needed
      flatId: 1, // Replace with dynamic value if needed
      leadId: clientId,
      propertyName: "kumar properties", // Make dynamic if needed
      eventName: row.event || "",
      percentage: parseFloat(row.percentage) || 0, // Ensure it's a float
      basePriceAmount: parseFloat(row.basePrice) || 0, // Ensure it's a float
      gstAmount: parseFloat(row.gst) || 0, // Ensure it's a float
      invoiceDate: new Date(row.invoiceDate).getTime() || 0,
      dueDate: new Date(row.dueDate).getTime() || 0,
      paymentDate: new Date(row.paymentDate).getTime() || 0,
      paidByName: row.paidBy || "", // Ensure it's a string
    };

    formData.append("eventDetails", JSON.stringify(eventDetails));

    try {
      const response = await axios.post(
        `${BASE_URL}/event/addEventDetails/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log("Event Details Saved", response);
    } catch (error) {
      console.log("Error Posting the Event Details", error);
    }
  };

  const fetchEventDetails = async (eventId, index) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/event/getalleventdetails/${clientId}`,
        {
          withCredentials: true,
        }
      );
      if (response?.data) {
        const updatedRows = [...rows];
        updatedRows[index] = {
          ...updatedRows[index],
          percentage: response?.data?.percentage || "",
          invoiceDate: response?.data?.invoiceDate || "",
          dueDate: response?.data?.dueDate || "",
          paymentDate: response?.data?.paymentDate || "",
          basePrice: response?.data?.basePriceAmount || "",
          gst: response?.data?.gstAmount || "",
          paidBy: response?.data?.paidByName || "",
          // Add file URLs if they exist
          statusReportUrl: response?.data?.statusReport?.url || "",
          architectLetterUrl: response?.data?.architectsLetter?.url || "",
          invoiceUrl: response?.data?.invoice?.url || "",
          receiptUrl: response?.data?.receipt?.url || "",
        };

        setRows(updatedRows);
      }
      console.log("Getting the Event Details", response);
    } catch (error) {
      console.log("Error Fetching Event Details", error);
    }
  };

  const handleDownloadFile = async (url) => {
    if (!url) return;

    try {
      const response = await axios.get(url, {
        responseType: "blob",
      });
      const blob = new Blob([response?.data]);

      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download");

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.log("Error While Download the File", error);
    }
  };

  useEffect(() => {
    rows.forEach((row, index) => {
      const eventId = row.id;
      fetchEventDetails(eventId, index);
    });
  }, []);

  // Map API response fields to component fields
  const getUrlFieldName = (field) => {
    if (field === "architectLetter") return "architectLetterUrl";
    return `${field}Url`;
  };
  return (
    <>
      <div className="w-full max-w-[62rem] overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-4">
          <thead className="bg-[#F6F6F6] sticky top-0">
            <tr>
              <th className="py-4 px-6 text-left text-xs font-medium text-black">
                Sr.no
              </th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="py-4 px-6 text-left text-xs font-medium text-black"
                >
                  {col.label}
                </th>
              ))}
              {fileFields.map((field) => (
                <th
                  key={field}
                  className="py-4 px-6 text-left text-xs font-medium text-black"
                >
                  {field}
                </th>
              ))}
              <th className="py-4 px-6 text-left text-xs font-medium text-black">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td className="py-3 px-6 text-xs font-medium text-[#757575] border-b border-gray-200">
                  {index + 1}
                </td>
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="py-3 px-2 border-b border-gray-200"
                  >
                    {col.key === "invoiceDate" ||
                    col.key === "dueDate" ||
                    col.key === "paymentDate" ? (
                      <DatePicker
                        value={row[col.key]}
                        onChange={(date) =>
                          handleInputChange(index, col.key, date)
                        }
                      />
                    ) : (
                      <Input
                        type="text"
                        className="w-full shadow-none focus-visible:ring-0 border-gray-300 p-1"
                        value={row[col.key]}
                        onChange={(e) =>
                          handleInputChange(index, col.key, e.target.value)
                        }
                      />
                    )}
                  </td>
                ))}
                {fileFields.map((field) => (
                  <td
                    key={field}
                    className="py-3 px-2 border-b border-gray-200"
                  >
                    {row[getUrlFieldName(field)] ? (
                      <div className="flex flex-col items-center">
                        <Button
                          onClick={() =>
                            handleDownloadFile(row[getUrlFieldName(field)])
                          }
                          variant="outline"
                          size="icon"
                        >
                          <Download size={18} color="#4CAF50" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <label className="cursor-pointer flex items-center justify-center">
                          <File size={18} color="#757575" />
                          <input
                            type="file"
                            id={`${field}-${index}`}
                            className="hidden"
                            accept="image/*,application/pdf"
                            onChange={(e) =>
                              handleFileUpload(index, field, e.target.files[0])
                            }
                          />
                        </label>
                        {row[field] && (
                          <span className="text-sm text-gray-600">
                            {truncateName(row[field].name)}
                          </span>
                        )}
                      </>
                    )}
                  </td>
                ))}
                <td className="py-4 px-2 border-b border-gray-200 flex items-center gap-1">
                  <Button
                    onClick={() => handleSubmitData(row)}
                    type="button"
                    className="text-[#E1777C] bg-white"
                  >
                    Save
                  </Button>
                  <Button
                    // onClick={handleSubmitData}
                    type="button"
                    className="text-[#757575] bg-white"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end gap-5 my-4">
        <button onClick={addRow} type="button">
          <Plus color="#E1777C" />
        </button>
        <button onClick={deleteLastRow} type="button">
          <Minus color="#E1777C" />
        </button>
      </div>
    </>
  );
};

export default EventDetailsTable;
