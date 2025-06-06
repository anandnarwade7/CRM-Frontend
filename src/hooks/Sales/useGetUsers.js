import { useQuery } from "@tanstack/react-query";
import {
  fetchUserPageCount,
  fetchUsers,
} from "../../services/Sales/salesService";
export const useGetUsers = (role, page) => {
  // Query for fetching users data
  const { isError, data, error, isLoading } = useQuery({
    queryKey: ["users", role],
    queryFn: () => fetchUsers(role, page),
    retry: false,
  });

  //   Query for fetching page counts
  const {
    data: totalCount,
    isLoading: isCountLoading,
    isError: isCountError,
  } = useQuery({
    queryKey: ["useCount", role],
    queryFn: () => fetchUserPageCount(role),
  });

  return {
    isLoading,
    isError,
    data,
    error,
    totalCount,
    isCountLoading,
    isCountError,
  };
};
