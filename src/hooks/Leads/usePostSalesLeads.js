import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { salesLeadsSchema } from "../../schemas/Leads/leads";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";

export const usePostSalesLeads = (leadId) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(salesLeadsSchema),
    defaultValues: {
      status: "",
      note: "",
      customFields: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "customFields",
  });

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
    const key = data?.customFields?.map((item) => item?.label) || [];
    const value = data?.customFields?.map((item) => item?.value) || [];
    const comment = data?.note;
    const status = data?.status;

    const formData = new FormData();
    formData?.append("comment", comment);
    formData?.append("status", status);
    formData?.append("key", key);
    formData?.append("value", value);

    mutation.mutate(formData, {
      onSuccess: (response) => {
        console.log("POST SALES LEADS", response);
        reset();
      },
      onError: (error) => {
        console.log("API ERROR", error);
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
