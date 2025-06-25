import { useQuery } from "@tanstack/react-query";
import { fetchUserDetails } from "../services/Support/supportService";

export const useGetUserDetails = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["getUserDetails"],
    queryFn: fetchUserDetails,
  });

  return { data, isLoading, error };
};
