import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";
import { useUserId } from "../use-user-id";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../use-toast";
import { useGetCRM } from "../Client/useGetCRM";
import { useNavigate } from "react-router";

export const useAssignClientLeads = () => {
  const [distribution, setDistribution] = useState("Specific");
  const [file, setFile] = useState(null);
  const [selectedCRManagers, setSelectedCRManagers] = useState([]);
  const [errors, setErrors] = useState({
    crManager: "",
    file: "",
  });
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Reset the file, selectedPerson array and errors
  useEffect(() => {
    if (distribution) {
      setSelectedCRManagers([]);
      setFile(null);
      setErrors({
        crManager: "",
        file: "",
      });
    }
  }, [distribution]);

  // Custom hook for getting sales person data
  const { data: crm, error, isLoading } = useGetCRM("CRM");
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
    setErrors((prev) => ({ ...prev, crManager: "" }));

    setSelectedCRManagers((prevState) => {
      if (prevState.includes(id)) {
        // If the ID is already selected, unselect it
        return prevState.filter((crManagerId) => crManagerId !== id);
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
      crManager: "",
      file: "",
    };

    if (distribution === "Specific") {
      if (selectedCRManagers.length === 0) {
        newErrors.crManager = "Please select at least one sales person";
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
        const allCRMIDs = crm?.map((crManager) => crManager?.id);

        const unSelectedCRMs = allCRMIDs?.filter(
          (id) => !selectedCRManagers?.includes(id)
        );

        console.log("Unselected CRMs", unSelectedCRMs);

        // formData.append("assignedTo", selectedCRManagers);
        formData.append("assignedTo", unSelectedCRMs);
      }

      const response = await axios.post(
        `${BASE_URL}/clients/upload`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data) {
        toast({
          title: "Assign the Leads Successfully",
          duration: 2000,
        });
        setSelectedCRManagers([]);
        setFile(null);
        setErrors({
          crManager: "",
          file: "",
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        setTimeout(() => {
          navigate("/app/client");
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
        selectedCRManagers([]);
        setFile(null);
        setErrors({
          crManager: "",
          file: "",
        });
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
    selectedCRManagers,
    handleCheckboxChange,
    crm,
    isLoading,
    error,
    errors,
    handleSubmit,
    isSubmitting: mutation.isLoading,
    fileInputRef,
  };
};
