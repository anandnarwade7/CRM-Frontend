import { useQuery } from "@tanstack/react-query";
import { getLeads } from "../../services/Leads/leadsService";

export const useGetLeads = (page, status) => {
  //   Query Function for getting Leads Data
  const { data, isLoading, error } = useQuery({
    queryKey: ["leads", page, status],
    queryFn: () => getLeads(page, status),
    keepPreviousData: true,
  });

  return {
    leadsData: data?.content || [],
    totalPages: data?.totalPages || 1,
    isLoading,
    error,
  };
};
