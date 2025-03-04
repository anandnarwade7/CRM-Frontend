import { useMutation } from "@tanstack/react-query";
import { getDownloadTemplate } from "../../services/Leads/leadsService";

export const useDownloadTemplate = (setIsDownloading) => {
  const mutation = useMutation({
    mutationFn: getDownloadTemplate,
    onMutate: () => setIsDownloading(true),
    onSuccess: (data) => {
      const blob = new Blob([data]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "template.xlsx";
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
