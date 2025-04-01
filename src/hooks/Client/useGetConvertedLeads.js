import { useQuery } from "@tanstack/react-query";
import { getConvertedLeads } from "../../services/Client/clientService";

export const useGetConvertedLeads = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["convertedLeads"],
    queryFn: getConvertedLeads,
  });

  return { data, isLoading, error };
};
