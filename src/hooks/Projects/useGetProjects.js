import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../../services/Project/projectservice";

export const useGetProjects = (page) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["projects", page],
    queryFn: () => getProjects(page),
  });

  return {
    projectData: data?.content || [],
    totalPages: data?.totalPages || 1,
    isLoading,
    error,
  };
};
