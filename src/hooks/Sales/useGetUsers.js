import { useQuery } from "@tanstack/react-query";
import {
  fetchUserPageCount,
  fetchUsers,
} from "../../services/Sales/salesService";
export const useGetUsers = (role, page) => {
  // Query for fetching users data
  const { data, error, isLoading } = useQuery({
    queryKey: ["users", role, page],
    queryFn: () => fetchUsers(role, page),
    retry: false,
  });

  //   Query for fetching page counts
  // const {
  //   data: totalCount,
  //   isLoading: isCountLoading,
  //   isError: isCountError,
  // } = useQuery({
  //   queryKey: ["useCount", role],
  //   queryFn: () => fetchUserPageCount(role),
  // });

  return {
    isLoading,
    data: data?.content,
    error,
    totalCount: data?.totalPages,
    // isCountLoading,
    // isCountError,
  };
};
