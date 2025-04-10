import { useQuery } from "@tanstack/react-query";
import { crmDashboardService } from "../../services/Dashboard/dashboardService";

export const useCRMDashboard = (userId) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["crmDashboard"],
    queryFn: () => crmDashboardService(userId),
  });

  return {
    data,
    isLoading,
    error,
  };
};
