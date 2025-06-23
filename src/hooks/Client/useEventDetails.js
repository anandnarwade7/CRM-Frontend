import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import axios from "axios";

const useEventDetails = (clientId, userId) => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [rows, setRows] = useState([
    {
      id: 1,
      eventId: null,
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
      paidBy: "self",
      receipt: null,

      statusReportUrl: "",
      architectLetterUrl: "",
      invoiceUrl: "",
      receiptUrl: "",

      isEditing: true,
    },
  ]);

  const addRow = () => {
    setRows([
      ...rows,
      {
        id: rows.length + 1,
        eventId: null,
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
        paidBy: "self",
        receipt: null,

        statusReportUrl: "",
        architectLetterUrl: "",
        invoiceUrl: "",
        receiptUrl: "",

        isEditing: true,
      },
    ]);
  };

  const deleteLastRow = () => {
    if (rows.length > 1) setRows(rows.slice(0, -1));
  };

  const toggleEditMode = (index) => {
    const updatedRows = [...rows];
    updatedRows[index].isEditing = !updatedRows[index].isEditing;
    setRows(updatedRows);
  };

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const handleFileUpload = (index, fieldKey, file) => {
    if (!file) {
      console.log("No file selected");
      return;
    }
    const updatedRows = [...rows];
    updatedRows[index][fieldKey] = file;
    setRows(updatedRows);
  };

  const handleSubmitData = async (row) => {
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
      paidByName: row.paidBy || "self", // Ensure it's a string
    };

    formData.append("eventDetails", JSON.stringify(eventDetails));

    const url = row?.eventId
      ? `/event/updateEvent/${row?.eventId}/${userId}`
      : `/event/addEventDetails/${userId}`;

    setIsSaving(true);
    try {
      // const response = await axios.post(
      //   `${BASE_URL}/event/addEventDetails/${userId}`,
      //   formData,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //     withCredentials: true,
      //   }
      // );
      const method = row?.eventId ? "put" : "post";

      const response = await axiosInstance({
        method,
        url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.data) {
        toast({
          title: "Success",
          description: `Event details ${
            row?.eventId ? "updated" : "saved"
          } successfully.`,
          duration: 2000,
        });
        // ✅ Fetch updated event details after successful save
        fetchEventDetails();
        setIsSaving(false);
      }
    } catch (error) {
      if (error) {
        toast({
          title: "Error",
          description: "Failed to save event details. Please try again.",
          variant: "destructive",
          duration: 2000,
        });
        setIsSaving(false);
      }
    }
  };

  // delete event by ID
  const handleEventDelete = async (eventId) => {
    setIsDeleting(true);
    try {
      const response = await axiosInstance.delete(
        `/event/deleteEventById/${eventId}`
      );
      if (response?.data) {
        toast({
          title: "Success",
          description: "Event details deleted successfully.",
          duration: 2000,
        });
        // ✅ Fetch updated event details after successful save
        fetchEventDetails();
        setIsDeleting(false);
      }
    } catch (error) {
      if (error) {
        toast({
          title: "Error",
          description: "Failed to delete event details. Please try again.",
          variant: "destructive",
          duration: 2000,
        });
        setIsDeleting(false);
      }
    }
  };

  const fetchEventDetails = async () => {
    try {
      const response = await axiosInstance.get(
        `/event/getalleventdetails/${clientId}`
      );
      if (response?.data) {
        if (Array.isArray(response.data) && response?.data?.length > 0) {
          const mappedRows = response.data.map((event, idx) => ({
            id: event.eventId || idx + 1,
            eventId: event?.eventId,
            event: event.eventName || "",
            percentage: event.percentage || "",
            basePrice: event.basePriceAmount || "",
            gst: event.gstAmount || "",
            invoiceDate: event.invoiceDate ? new Date(event.invoiceDate) : "",
            dueDate: event.dueDate ? new Date(event.dueDate) : "",
            paymentDate: event.paymentDate ? new Date(event.paymentDate) : "",
            paidBy: event.paidByName || "self",

            statusReport: null,
            architectLetter: null,
            invoice: null,
            receipt: null,

            statusReportUrl: event.statusReport?.url || "",
            architectLetterUrl: event.architectsLetter?.url || "",
            invoiceUrl: event.invoice?.url || "",
            receiptUrl: event.receipt?.url || "",

            isEditing: false,
          }));

          setRows(mappedRows);
        } else {
          // Set a default row if no data is returned
          setRows([
            {
              id: 1,
              eventId: null,
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
              paidBy: "self",
              receipt: null,

              statusReportUrl: "",
              architectLetterUrl: "",
              invoiceUrl: "",
              receiptUrl: "",

              isEditing: true,
            },
          ]);
        }
      }
      console.log("Getting the Event Details", response);
    } catch (error) {
      console.log("Error Fetching Event Details", error);
    }
  };

  const handleDownloadFile = async (url, fileName) => {
    if (!url) return;

    try {
      const response = await axios.get(url, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });

      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = downloadUrl;
      link.setAttribute("download", fileName); // Ensure .pdf extension
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Error While Downloading the File", error);
      toast({
        variant: "destructive",
        title: "Download Failed",
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    fetchEventDetails();
  }, []);

  // Map API response fields to component fields
  const getUrlFieldName = (field) => {
    if (field === "architectLetter") return "architectLetterUrl";
    return `${field}Url`;
  };

  return {
    rows,
    setRows,
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
  };
};
export default useEventDetails;
