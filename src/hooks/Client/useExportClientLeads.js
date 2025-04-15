import { useMutation } from "@tanstack/react-query";
import { getExportClientLead } from "../../services/Client/clientService";

export const useExportClientLeads = (setIsDownloading) => {
  const mutation = useMutation({
    mutationFn: getExportClientLead,
    onMutate: () => setIsDownloading(true),
    onSuccess: (data) => {
      const blob = new Blob([data]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Leads_Data.xlsx";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    },
    onSettled: () => setIsDownloading(false),
    onError: (error) => {
      console.error("Download Failed", error);
    },
  });

  return mutation;
};
