import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserId } from "../use-user-id";
import { updateAdminAction } from "../../services/Admin/adminService";

export const useAdminActionStatus = (
  selectedUserId,
  selectedAction,
  onClose
) => {
  const queryClient = useQueryClient();

  const status = selectedAction === "UNBLOCK" ? "BLOCK" : "UNBLOCK";

  const mutation = useMutation({
    mutationKey: ["updateAdmin"],
    mutationFn: async () => await updateAdminAction(selectedUserId, status),
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries(["admins"]);
        onClose();
      }
    },
  });

  const handleYesClick = () => {
    mutation.mutate();
  };

  return { handleYesClick };
};
