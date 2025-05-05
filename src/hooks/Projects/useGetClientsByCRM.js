import { useQuery } from "@tanstack/react-query";
import { getClientsByCRM } from "../../services/Project/projectservice";

export const useGetClientsByCRM = () => {
  return useQuery({
    queryKey: ["clientsByCRM"],
    queryFn: getClientsByCRM,
  });
};
