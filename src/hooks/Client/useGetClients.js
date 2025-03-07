import { useQuery } from "@tanstack/react-query";
import { getClients } from "../../services/Client/clientService";

export const useGetClients = (page) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["clients"],
    queryFn: () => getClients(page, "CONVERTED"),
    keepPreviousData: true,
  });

  return {
    clientsData: data?.content || [],
    totalPages: data?.totalPages || 1,
    isLoading,
    error,
  };
};
