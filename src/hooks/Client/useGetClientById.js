import { useQuery } from "@tanstack/react-query";
import { getClientLeadById } from "../../services/Client/clientService";

export const useGetClientById = (clientId) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["clientById"],
    queryFn: () => getClientLeadById(clientId),
  });

  return { data, isLoading, error };
};
