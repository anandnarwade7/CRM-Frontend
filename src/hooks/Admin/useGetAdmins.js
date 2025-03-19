import { useQuery } from "@tanstack/react-query";
import { getAdmins } from "../../services/Admin/adminService";

export const useGetAdmins = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admins"],
    queryFn: getAdmins,
  });

  return { data, isLoading, error };
};
