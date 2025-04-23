import { useQuery } from "@tanstack/react-query";
import { getFlatsDetails } from "../../services/Project/projectService";

export const useGetFlatsDetails = (towerId) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["flatsDetails", towerId],
    queryFn: () => getFlatsDetails(towerId),
    enabled: !!towerId,
  });

  return {
    data,
    isLoading,
    error,
  };
};
