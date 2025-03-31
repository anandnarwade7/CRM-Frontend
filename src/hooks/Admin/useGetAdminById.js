import { useQuery } from "@tanstack/react-query";
import { getAdminById } from "../../services/Admin/adminService";

export const useGetAdminById = (id) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["adminById", id],
    queryFn: () => getAdminById(id),
    enabled: !!id,
  });

  return { data, isLoading, error };
};
