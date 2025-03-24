import { useQuery } from "@tanstack/react-query";
import { getClientsList } from "../../services/Client/clientService";

export const useGetClientsList = (userId) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["clientsList", userId],
    queryFn: () => getClientsList(userId),
  });

  return { data, isLoading, error };
};
