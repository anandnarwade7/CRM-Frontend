import { useQuery } from "@tanstack/react-query";
import { fetchSupport } from "../../services/Support/supportService";

export const useGetAdminSupport = (page) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["getAdminSupport", page],
    queryFn: () => fetchSupport(page),
  });

  console.log("Admin Support Data", data);

  return {
    otherSupportData: data?.other?.content || [],
    otherTotalPages: data?.other?.totalPages || 1,
    adminSupportData: data?.self?.content || [],
    adminTotalPage: data?.self?.totalPages || 1,
    superAdminSupportData: data?.content || [],
    superAdminTotalPages: data?.totalPages || 1,
    isLoading,
    error,
  };
};
