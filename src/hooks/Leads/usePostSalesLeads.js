import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { salesLeadsSchema } from "../../schemas/Leads/leads";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { BASE_URL } from "../../utils/constant";

export const usePostSalesLeads = (leadId, data, isStatusOpen) => {
  const schema = salesLeadsSchema(data?.status, isStatusOpen);
  // Form Handling using React Hook Form for dynamic fields we use useFieldsArray
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      status: "",
      note: "",
      customFields: [],
    },
  });

  const queryClient = useQueryClient();

  // For Dynamic Custom Fields
  const { fields, append, remove } = useFieldArray({
    control,
    name: "customFields",
  });

  const { toast } = useToast();

  const postLead = async (formData) => {
    const response = await axios.post(
      `${BASE_URL}/import/updateFields/${leadId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return response?.data;
  };

  const mutation = useMutation({
    mutationKey: ["convertLead"],
    mutationFn: postLead,
  });

  const onSubmit = (data) => {
    // Before Submitting the Data we process the data and then send via formData.
    const key = data?.customFields?.map((item) => item?.label) || [];
    const value = data?.customFields?.map((item) => item?.value) || [];
    const comment = data?.note;
    const status = data?.status;
    const dueDate = data?.dueDate ? new Date(data?.dueDate).getTime() : 0;

    const formData = new FormData();
    formData?.append("comment", comment);
    formData?.append("dueDate", dueDate);

    if (status) {
      formData?.append("status", status);
    }

    formData?.append("key", key);
    formData?.append("value", value);

    mutation.mutate(formData, {
      onSuccess: (response) => {
        queryClient.invalidateQueries(["leadById", leadId]); // Invalidate specific query based on leadId
        reset({
          ...getValues(),
          note: "",
        });
        toast({
          title: "Convert Lead Successfully",
          duration: 2000,
        });
      },
      onError: (error) => {
        console.log("API ERROR", error);
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
    handleSubmit,
    control,
    setValue,
    getValues,
    errors,
    onSubmit,
    fields,
    append,
    remove,
  };
};
