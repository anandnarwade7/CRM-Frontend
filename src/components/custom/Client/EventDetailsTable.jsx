import { Download, File, Loader2, Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "../../ui/input";
import { truncateName } from "../../../utils/utilityFunction";
import DatePicker from "../DatePicker";
import { Button } from "../../ui/button";
import axios from "axios";
import { BASE_URL } from "../../../utils/constant";
import { useUserId } from "../../../hooks/use-user-id";
import { useParams } from "react-router";
import { useToast } from "@/hooks/use-toast";
import axiosInstance from "../../../services/axiosInstance";
import useEventDetails from "../../../hooks/Client/useEventDetails";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

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

  const {
    rows,
    addRow,
    deleteLastRow,
    toggleEditMode,
    handleInputChange,
    handleFileUpload,
    handleSubmitData,
    handleEventDelete,
    handleDownloadFile,
    getUrlFieldName,
    isSaving,
    isDeleting,
  } = useEventDetails(clientId, userId);

  return (
    <>
      <div className="w-full max-w-[60rem] overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-4">
          <thead className="bg-[#F6F6F6] sticky top-0">
            <tr>
              <th className="py-4 px-6 text-left text-xs font-medium text-main-text">
                Sr.no
              </th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="py-4 px-6 text-left text-xs font-medium text-main-text"
                >
                  {col.label}
                </th>
              ))}
              {fileFields.map((field) => (
                <th
                  key={field}
                  className="py-4 px-6 text-left text-xs font-medium text-main-text"
                >
                  {field}
                </th>
              ))}
              <th className="py-4 px-6 text-left text-xs font-medium text-main-text">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td className="py-3 px-6 text-xs font-medium text-main-grey border-b border-gray-200">
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
                    ) : col.key === "paidBy" ? (
                      <>
                        <Select
                          value={row?.paidBy || "self"}
                          onValueChange={(value) =>
                            handleInputChange(index, "paidBy", value)
                          }
                          disabled={!row?.isEditing}
                        >
                          <SelectTrigger
                            className={`w-[180px] ${
                              row?.isEditing ? "text-black" : "text-main-grey"
                            }`}
                          >
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="self">Self</SelectItem>
                            <SelectItem value="bank">Bank</SelectItem>
                          </SelectContent>
                        </Select>
                      </>
                    ) : (
                      <Input
                        type="text"
                        className={`w-full shadow-none focus-visible:ring-0 border-gray-300 p-1 ${
                          row?.isEditing ? "text-black" : "text-main-grey"
                        }`}
                        disabled={!row?.isEditing}
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
                    {row?.isEditing ? (
                      <>
                        <label className="cursor-pointer flex items-center justify-center">
                          <File size={18} color="#757575" />
                          <input
                            type="file"
                            id={`${field}-${index}`}
                            className="hidden"
                            accept="application/pdf"
                            onChange={(e) =>
                              handleFileUpload(index, field, e.target.files[0])
                            }
                            disabled={!row?.isEditing}
                          />
                        </label>
                        {row[field] && (
                          <span className="text-sm text-gray-600">
                            {truncateName(row[field].name)}
                          </span>
                        )}
                      </>
                    ) : (
                      row[getUrlFieldName(field)] && (
                        <div className="flex flex-col items-center">
                          <Button
                            onClick={() =>
                              handleDownloadFile(
                                row[getUrlFieldName(field)],
                                field
                              )
                            }
                            variant="outline"
                            size="icon"
                          >
                            <Download size={18} color="#4CAF50" />
                          </Button>
                        </div>
                      )
                    )}
                  </td>
                ))}
                <td className="py-4 px-2 border-b border-gray-200 flex items-center gap-1">
                  {row?.isEditing ? (
                    <Button
                      onClick={() => handleSubmitData(row)}
                      type="button"
                      className="text-main-secondary bg-white"
                      disabled={isSaving || isDeleting}
                    >
                      {isSaving ? (
                        <Loader2 className="animate-spin" size={24} />
                      ) : (
                        "Save"
                      )}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => toggleEditMode(index)}
                      type="button"
                      className="text-main-secondary bg-white"
                      disabled={isDeleting}
                    >
                      Edit
                    </Button>
                  )}

                  <Button
                    onClick={() => handleEventDelete(row?.eventId)}
                    type="button"
                    className="text-main-grey bg-white"
                    disabled={isSaving || isDeleting}
                  >
                    {isDeleting ? (
                      <Loader2 className="animate-spin" size={24} />
                    ) : (
                      "Delete"
                    )}
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
