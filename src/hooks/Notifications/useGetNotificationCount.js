import { useQuery } from "@tanstack/react-query";
import { fetchNotificationCount } from "../../services/Notifications/notificationService";

export const useGetNotificationCount = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["notificationCount"],
    queryFn: fetchNotificationCount,
  });

  return {
    notificationCount: data,
    notificationCountLoading: isLoading,
    notificationCountErr: error,
  };
};
