import { useQuery } from "@tanstack/react-query";
import { adminDashboardService } from "../../services/Dashboard/dashboardService";

export const useAdminDashboard = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["adminDash"],
    queryFn: adminDashboardService,
  });

  return { isPending, isError, data, error };
};
