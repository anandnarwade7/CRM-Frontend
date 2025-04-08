import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateCRMLeadSchema } from "../../schemas/Client/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";
import { useToast } from "@/hooks/use-toast";

export const useUpdateCRMLeads = (clientId) => {
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

  const { append, remove, fields } = useFieldArray({
    control,
    name: "customFields",
  });

  const postCRMLead = async (formData) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/clients/updateFields/${clientId}`,
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
    const key = data?.customFields?.map((item) => item?.label) || [];
    const value = data?.customFields?.map((item) => item?.value) || [];
    const comment = data?.note;
    const status = data?.status;
    const dueDate = data?.dueDate ? new Date(data?.dueDate).getTime() : 0;

    const formData = new FormData();

    formData.append("comment", comment);
    formData?.append("dueDate", dueDate);
    formData?.append("status", status);
    formData?.append("key", key);
    formData?.append("value", value);

    mutation.mutate(formData, {
      onSuccess: (response) => {
        if (response) {
          queryClient.invalidateQueries(["clientById", clientId]);
          toast({
            title: "Convert Lead Successfully",
            duration: 2000,
          });
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
