import { useState } from "react";

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
        id: rows?.length + 1,
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
  return (
    <div>
      <div>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="border border-gray-300 p-2 text-left">Sr.no</th>
              <th className="border border-gray-300 p-2 text-left">Event</th>
              <th className="border border-gray-300 p-2 text-left">
                Percentage
              </th>
              <th className="border border-gray-300 p-2 text-left">
                Base Price
              </th>
              <th className="border border-gray-300 p-2 text-left">GST</th>
              <th className="border border-gray-300 p-2 text-left">
                Status report (Image/PDF)
              </th>
              <th className="border border-gray-300 p-2 text-left">
                Architect's Letter
              </th>
              <th className="border border-gray-300 p-2 text-left">Invoice</th>
              <th className="border border-gray-300 p-2 text-left">
                Invoice Date
              </th>
              <th className="border border-gray-300 p-2 text-left">Due Date</th>
              <th className="border border-gray-300 p-2 text-left">
                Payment Date
              </th>
              <th className="border border-gray-300 p-2 text-left">Paid By</th>
              <th className="border border-gray-300 p-2 text-left">Receipt</th>
              <th className="border border-gray-300 p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows?.map((row, index) => (
              <tr key={index} className="border border-green-300">
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    className="w-full border p-1"
                    value={row.event}
                    onChange={(e) =>
                      handleInputChange(index, "event", e.target.value)
                    }
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    className="w-full border p-1"
                    value={row.percentage}
                    onChange={(e) =>
                      handleInputChange(index, "percentage", e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventDetailsTable;
