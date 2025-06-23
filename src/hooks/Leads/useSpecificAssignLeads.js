import { useEffect, useRef, useState } from "react";
import { useGetSales } from "./useGetSales";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";
import { useUserId } from "../../hooks/use-user-id";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../../hooks/use-toast";
import { useNavigate } from "react-router";
import axiosInstance from "../../services/axiosInstance";

export const useSpecificAssignLeads = () => {
  const [distribution, setDistribution] = useState("Specific");
  const [file, setFile] = useState(null);
  const [selectedSalesPersons, setSelectedSalesPersons] = useState([]);
  const [errors, setErrors] = useState({
    salesPerson: "",
    file: "",
  });
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Reset the file, selectedPerson array and errors
  useEffect(() => {
    if (distribution) {
      setSelectedSalesPersons([]);
      setFile(null);
      setErrors({
        salesPerson: "",
        file: "",
      });
    }
  }, [distribution]);

  // Custom hook for getting sales person data
  const { data: salesPersons, error, isLoading } = useGetSales("SALES");
  const userId = useUserId();
  const { toast } = useToast();

  // Function For Handling File
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setErrors((prev) => ({ ...prev, file: "" }));

    if (selectedFile) {
      const fileType = selectedFile.name.split(".").pop();
      if (fileType === "xlsx" || fileType === "xls") {
        setFile(selectedFile);
      } else {
        alert("Please select an Excel file (.xlsx or .xls)");
        setFile(null);
        e.target.value = "";
      }
    }
  };

  // Handle checkbox change (select/unselect salesperson)
  const handleCheckboxChange = (id) => {
    setErrors((prev) => ({ ...prev, salesPerson: "" }));

    setSelectedSalesPersons((prevState) => {
      if (prevState.includes(id)) {
        // If the ID is already selected, unselect it
        return prevState.filter((salesPersonId) => salesPersonId !== id);
      } else {
        // If the ID is not selected, add it
        return [...prevState, id];
      }
    });
  };

  //   Validation before submitting the form
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      salesPerson: "",
      file: "",
    };

    if (distribution === "Specific") {
      if (selectedSalesPersons.length === 0) {
        newErrors.salesPerson = "Please select at least one sales person";
        isValid = false;
      }
    }

    if (!file) {
      newErrors.file = "Please upload an Excel file";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // React Query Mutation for API call
  const mutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("file", file);

      if (distribution === "Specific") {
        formData.append("assignedTo", selectedSalesPersons);
      }

      const response = await axiosInstance.post(
        `/import/upload-template`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Assign Leads Success:", data);
      if (data) {
        const match = data?.match(/Processed:\s*(\d+),\s*Skipped:\s*(\d+)/);

        if (match) {
          const processed = parseInt(match[1], 10);
          const skipped = parseInt(match[2], 10);
          const message = `File processed successfully. ✅ ${processed} items processed, ⚠️ ${skipped} items skipped (already assigned or used).`;
          toast({
            title: message,
            duration: 2000,
          });
        }
        setSelectedSalesPersons([]);
        setFile(null);
        setErrors({
          salesPerson: "",
          file: "",
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setTimeout(() => {
          navigate("/app/leads");
        }, 2000);
      }
    },
    onError: (error) => {
      console.error(
        "Error assigning leads:",
        error.response?.data || error.message
      );
      if (error) {
        toast({
          variant: "destructive",
          title: "Error assigning leads",
          description: error.response?.data || error.message,
          duration: 2000,
        });
        setSelectedSalesPersons([]);
        setFile(null);
        setErrors({
          salesPerson: "",
          file: "",
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    },
  });

  // Function to trigger mutation with validation
  const handleSubmit = () => {
    if (validateForm()) {
      mutation.mutate();
    }
  };

  return {
    distribution,
    setDistribution,
    file,
    handleFileChange,
    selectedSalesPersons,
    handleCheckboxChange,
    salesPersons,
    isLoading,
    error,
    errors,
    handleSubmit,
    isSubmitting: mutation.isLoading,
    fileInputRef,
  };
};
