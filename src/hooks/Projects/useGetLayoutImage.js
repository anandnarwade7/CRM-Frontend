import { useQuery } from "@tanstack/react-query";
import { getLayoutImage } from "../../services/Project/projectservice";

export const useGetLayoutImage = (towerId) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["layoutImg"],
    queryFn: () => getLayoutImage(towerId),
    enabled: !!towerId,
  });

  return { data, isLoading, error };
};
