import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userActionStatus } from "../../services/Sales/salesService";
import { useToast } from "@/hooks/use-toast";

export const useActionUser = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: ({ id, status }) => userActionStatus(id, status),
    onSuccess: (data) => {
      console.log("Update the User Action Status");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "User Status Updated",
        description: "User has been successfully updated.",
        duration: 2000,
      });
    },
    onError: (err) => {
      if (err) {
        console.log("Error while update the action Status", err);
        toast({
          variant: "destructive",
          title: "Failed to Update Status",
          description: err?.response?.data?.message || "Something went wrong.",
          duration: 2000,
        });
      }
    },
  });

  const handleAction = (id, status) => {
    mutation.mutate({ id, status });
  };

  return {
    handleAction,
  };
};
