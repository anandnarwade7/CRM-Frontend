import { useQuery } from "@tanstack/react-query";
import { getSales } from "../../services/Leads/leadsService";

export const useGetSales = (role) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["sales"],
    queryFn: () => getSales(role),
  });

  return { data, error, isLoading };
};
