import { File, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Input } from "../../ui/input";
import { truncateName } from "../../../utils/utilityFunction";
import DatePicker from "../DatePicker";
import { Button } from "../../ui/button";
const columns = [
  { key: "event", label: "Event" },
  { key: "percentage", label: "Percentage" },
  { key: "basePrice", label: "Base Price" },
  { key: "Gst", label: "GST" },
  { key: "invoiceDate", label: "Invoice Date" },
  { key: "dueDate", label: "Due Date" },
  { key: "paymentDate", label: "Payment Date" },
  { key: "paidBy", label: "Paid By" },
];

const fileFields = ["statusReport", "architectLetter", "invoice", "receipt"];

const EventDetailsTable = () => {
  const [rows, setRows] = useState([
    {
      id: 1,
      event: "",
      percentage: "",
      basePrice: "",
      Gst: "",
      statusReport: null,
      architectLetter: null,
      invoice: null,
      invoiceDate: "",
      dueDate: "",
      paymentDate: "",
      paidBy: "",
      receipt: null,
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
        Gst: "",
        statusReport: null,
        architectLetter: null,
        invoice: null,
        invoiceDate: "",
        dueDate: "",
        paymentDate: "",
        paidBy: "",
        receipt: null,
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

  const handleSubmitData = (e) => {
    e.preventDefault();
    console.log(rows);
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
                  </td>
                ))}
                <td className="py-4 px-2 border-b border-gray-200 flex items-center gap-1">
                  <Button
                    onClick={handleSubmitData}
                    type="button"
                    className="text-[#E1777C] bg-white"
                  >
                    Edit
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
