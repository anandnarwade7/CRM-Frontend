import { useQuery } from "@tanstack/react-query";
import { getClientsByCRM } from "../../services/Project/projectservice";

export const useGetClientsByCRM = (flatId, enabled = false) => {
  return useQuery({
    queryKey: ["clientsByCRM"],
    queryFn: getClientsByCRM,
    enabled: !!flatId && enabled,
    refetchOnMount: true,
    keepPreviousData: false,
  });
};
