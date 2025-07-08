import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteAllNotifications,
  deleteNotification,
} from "../../services/Notifications/notificationService";
import { useToast } from "@/hooks/use-toast";

export const useDeleteNotification = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const deleteSingleMutation = useMutation({
    mutationKey: ["deleteNotification"],
    mutationFn: (id) => deleteNotification(id),
    onSuccess: (data) => {
      if (data) {
        toast({
          title: "Success",
          description: "Notificaion deleted successfully",
          duration: 2000,
        });
        queryClient.invalidateQueries({ queryKey: ["getNotifications"] });
      }
    },
    onError: (error) => {
      if (error) {
        const errorMessage = error?.response?.data || "Something went wrong";
        toast({
          variant: "destructive",
          title: error?.response?.data?.msg,
          description: errorMessage,
          duration: 2000,
        });
      }
    },
  });

  const deleteAllMutation = useMutation({
    mutationKey: ["deleteAllNotification"],
    mutationFn: deleteAllNotifications,
    onSuccess: (data) => {
      if (data) {
        toast({
          title: "Success",
          description: "All notificaions are deleted successfully",
          duration: 2000,
        });
        queryClient.invalidateQueries({ queryKey: ["getNotifications"] });
      }
    },
    onError: (error) => {
      if (error) {
        const errorMessage = error?.response?.data || "Something went wrong";
        toast({
          variant: "destructive",
          title: error?.response?.data?.msg,
          description: errorMessage,
          duration: 2000,
        });
      }
    },
  });

  const handleDeleteNotification = (id) => {
    deleteSingleMutation.mutateAsync(id);
  };

  const handleDeleteAllNotifications = () => {
    deleteAllMutation.mutateAsync();
  };

  return { handleDeleteNotification, handleDeleteAllNotifications };
};
