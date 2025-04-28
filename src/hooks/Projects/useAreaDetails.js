import { useQuery } from "@tanstack/react-query";
import { getAreaDetailsForUpdate } from "../../services/Project/projectservice";

export const useAreaDetails = (projectId, towerId) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["areaDetails", towerId],
    queryFn: () => getAreaDetailsForUpdate(projectId, towerId),
    enabled: !!towerId,
  });

  return {
    data,
    isLoading,
    error,
  };
};
