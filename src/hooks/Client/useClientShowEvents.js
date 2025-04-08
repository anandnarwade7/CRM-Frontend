import { useQuery } from "@tanstack/react-query";
import { getClientShowEvents } from "../../services/Client/clientService";

export const useClientShowEvent = (leadId) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["clientShowEvent"],
    queryFn: () => getClientShowEvents(leadId),
  });

  return {
    data,
    error,
    isLoading,
  };
};
