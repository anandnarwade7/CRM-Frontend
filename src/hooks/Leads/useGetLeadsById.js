import { useQuery } from "@tanstack/react-query";
import { getLeadsById } from "../../services/Leads/leadsService";

export const useGetLeadsById = (id) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["leadById"],
    queryFn: () => getLeadsById(id),
  });

  return { data, isLoading, error };
};
