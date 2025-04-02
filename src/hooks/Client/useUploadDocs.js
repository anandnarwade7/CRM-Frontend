import { useMutation } from "@tanstack/react-query";
import { uploadDocs } from "../../services/Client/clientService";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const useUploadDocs = () => {
  // Handling the file
  const { setValue, control, trigger } = useForm({
    resolver: zodResolver(),
  });

  //  uploading the docs
  const mutation = useMutation({
    mutationFn: () => uploadDocs(),
  });

  const handleUploadDocs = (data) => {
    const formData = new FormData();

    formData.append("agreement", data?.agreementFile);
    formData.append("stampDuty", data?.stampDutyFile);
    formData.append("tdsDoc", data?.tdsDocFile);
    formData.append("bankSanction", data?.bankSanctionFile);
  };
};
