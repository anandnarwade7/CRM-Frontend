import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userActionStatus } from "../../services/Sales/salesService";

export const useActionUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id, status }) => userActionStatus(id, status),
    onSuccess: () => {
      console.log("Update the User Action Status");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => {
      console.log("Error while update the action Status", err);
    },
  });

  const handleAction = (id, status) => {
    mutation.mutate({ id, status });
  };

  return {
    handleAction,
  };
};
