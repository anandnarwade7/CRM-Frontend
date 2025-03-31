import { useQuery } from "@tanstack/react-query";
import { adminDashboardService } from "../../services/Dashboard/dashboardService";

export const useAdminDashboard = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["adminDash"],
    queryFn: adminDashboardService,
  });

  return { isLoading, isError, data, error };
};
