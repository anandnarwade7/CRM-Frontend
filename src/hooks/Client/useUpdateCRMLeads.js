import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateCRMLeadSchema } from "../../schemas/Client/client";
export const useUpdateCRMLeads = () => {
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
  });

  const { append, remove, fields } = useFieldArray({
    control,
    name: "customFields",
  });

  const onSubmit = (data) => {
    console.log("Validated Form Data", data);
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
