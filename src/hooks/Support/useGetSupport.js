import { useQuery } from "@tanstack/react-query";
import { fetchSupport } from "../../services/Support/supportService";

export const useGetSupport = (page) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["getSupport", page],
    queryFn: () => fetchSupport(page),
  });

  return {
    supportData: data?.content || [],
    totalPages: data?.totalPages || 1,
    isLoading,
    error,
  };
};
