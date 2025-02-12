import { useQuery } from "@tanstack/react-query";
import { getSales } from "../../services/Leads/leadsService";

export const useGetSales = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["sales"],
    queryFn: getSales,
  });

  return { data, error, isLoading };
};
