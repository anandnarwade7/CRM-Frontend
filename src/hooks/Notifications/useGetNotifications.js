import { useQuery } from "@tanstack/react-query";
import { fetchNotifications } from "../../services/Notifications/notificationService";

export const useGetNotifications = (userEmail) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["getNotifications"],
    queryFn: () => fetchNotifications(userEmail),
  });

  return { data, isLoading, error };
};
