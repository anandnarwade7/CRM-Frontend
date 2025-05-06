import { useQuery } from "@tanstack/react-query";
import { getFlatById } from "../../services/Project/projectService";

export const useGetFlatById = (flatId, enabled = false) => {
  return useQuery({
    queryKey: ["flatById", flatId],
    queryFn: () => getFlatById(flatId),
    enabled, // don't run automatically unless enabled
  });
};
