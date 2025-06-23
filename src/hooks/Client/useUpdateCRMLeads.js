import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateCRMLeadSchema } from "../../schemas/Client/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";
import { useToast } from "@/hooks/use-toast";
import axiosInstance from "../../services/axiosInstance";
import { useNavigate } from "react-router";

export const useUpdateCRMLeads = (clientId, status) => {
  // Validation for updating the leads through CRM
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: zodResolver(updateCRMLeadSchema),
    defaultValues: {
      status: "",
      note: "",
      dueDate: undefined,
      customFields: [],
    },
    shouldFocusError: false,
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const navigate = useNavigate();

  const { append, remove, fields } = useFieldArray({
    control,
    name: "customFields",
  });

  const postCRMLead = async (formData) => {
    try {
      const response = await axiosInstance.post(
        `/clients/updateFields/${clientId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          // withCredentials: true,
        }
      );
      return response?.data;
    } catch (error) {
      console.log("Error while converting CRM Leads", error);
    }
  };
  const mutation = useMutation({
    mutationKey: ["convertCRMLead"],
    mutationFn: postCRMLead,
  });

  const onSubmit = (data) => {
    // Before Submitting the Data we process the data and then send via formData.
    const comment = data?.note;
    const status = data?.status;
    const dueDate = data?.dueDate ? new Date(data?.dueDate).getTime() : 0;

    const formData = new FormData();

    if (dueDate) {
      formData?.append("dueDate", dueDate);
    }

    if (status) {
      formData?.append("status", status);
    }

    if (data?.customFields > 0) {
      const key = data?.customFields?.map((item) => item?.label) || [];
      const value = data?.customFields?.map((item) => item?.value) || [];
      formData?.append("key", key);
      formData?.append("value", value);
    }

    if (comment?.length > 0) {
      formData.append("comment", comment);
    }

    mutation.mutate(formData, {
      onSuccess: (response) => {
        if (response) {
          let titleMessage = "Lead detail updated successfully";
          if (status == "CONVERTED") {
            titleMessage = "Lead converted successfully";
          }
          queryClient.invalidateQueries(["clientById", clientId]);
          toast({
            title: titleMessage,
            duration: 2000,
          });
          setTimeout(() => {
            navigate("/app/client");
          }, 2000);
        }
      },
      onError: (error) => {
        console.log("Converting CRM API ERROR", error);
        toast({
          variant: "destructive",
          title: "Not Converted Leads",
          duration: 2000,
        });
      },
    });
  };

  return {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    errors,
    trigger,
    append,
    remove,
    fields,
    onSubmit,
  };
};
