import { useQuery } from "@tanstack/react-query";
import { getSalesLeads } from "../../services/Leads/leadsService";

export const useGetSalesLeads = (userId, page) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["salesLeads"],
    queryFn: () => getSalesLeads(userId, page),
  });

  return {
    leadsData: data?.content || [],
    totalPages: data?.totalPages || 1,
    isLoading,
    error,
  };
};
