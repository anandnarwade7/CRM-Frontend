import { useQuery } from "@tanstack/react-query";
import { salesDashboardService } from "../../services/Dashboard/dashboardService";

export const useSalesDashboard = (userId) => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["salesDash"],
    queryFn: () => salesDashboardService(userId),
  });

  return { isPending, isError, data, error };
};
