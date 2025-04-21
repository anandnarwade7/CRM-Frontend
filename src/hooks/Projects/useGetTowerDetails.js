import { useQuery } from "@tanstack/react-query";
import { getTowerDetails } from "../../services/Project/projectservice";

export const useGetTowerDetails = (projectId) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["towerDetails"],
    queryFn: () => getTowerDetails(projectId),
  });

  return {
    data,
    isLoading,
    error,
  };
};
