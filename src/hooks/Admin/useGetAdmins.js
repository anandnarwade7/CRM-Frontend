import { useQuery } from "@tanstack/react-query";
import { getAdmins } from "../../services/Admin/adminService";

export const useGetAdmins = (page) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admins", page],
    queryFn: () => getAdmins(page),
    retry: false,
  });

  console.log("ADMIN DATA", data);

  return {
    adminData: data?.content,
    totalPages: data?.totalPages,
    isLoading,
    error,
  };
};
