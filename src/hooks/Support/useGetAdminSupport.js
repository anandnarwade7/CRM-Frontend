import { useQuery } from "@tanstack/react-query";
import { fetchSupport } from "../../services/Support/supportService";

export const useGetAdminSupport = (page) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["getAdminSupport", page],
    queryFn: () => fetchSupport(page),
  });

  return {
    otherSupportData: data?.other?.content || [],
    otherTotalPages: data?.other?.totalPages || 1,
    isLoading,
    error,
  };
};
