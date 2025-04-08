import { useMutation } from "@tanstack/react-query";
import { uploadDocs } from "../../services/Client/clientService";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fileUploadSchema } from "../../schemas/Client/client";
import { useToast } from "@/hooks/use-toast";

export const useUploadDocs = (clientId) => {
  // Handling the file
  const {
    setValue,
    control,
    trigger,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(fileUploadSchema),
    defaultValues: {
      agreementFile: undefined,
      stampDutyFile: undefined,
      tdsDocFile: undefined,
      bankSanctionFile: undefined,
    },
  });

  const { toast } = useToast();

  //  uploading the docs
  const mutation = useMutation({
    mutationFn: (formData) => uploadDocs(clientId, formData),
    onSuccess: (data) => {
      console.log("File Upload Success response Data", data);
      if (data) {
        reset();
        toast({
          description: "Files Upload Successfully",
          duration: 2000,
        });
      }
    },
  });

  // Submit Handler
  const onSubmit = (data) => {
    console.log("File Upload Btn", data);

    const formData = new FormData();

    formData.append("agreement", data?.agreementFile);
    formData.append("stampDuty", data?.stampDutyFile);
    formData.append("tdsDoc", data?.tdsDocFile);
    formData.append("bankSanction", data?.bankSanctionFile);

    mutation.mutate(formData);
  };

  return {
    setValue,
    control,
    trigger,
    handleSubmit,
    errors,
    onSubmit,
    isLoading: mutation.isPending,
  };
};
