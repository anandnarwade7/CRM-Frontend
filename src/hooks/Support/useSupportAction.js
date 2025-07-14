import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSupportAction } from "../../services/Support/supportService";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export const useSupportAction = () => {
  const { toast } = useToast();
  const [loadingAction, setLoadingAction] = useState({
    id: null,
    action: null,
  });

  const queryClient = useQueryClient();
  const actionMutation = useMutation({
    mutationKey: ["updateSupportAction"],
    mutationFn: ({ id, action }) => updateSupportAction(id, action),
    onSuccess: (data, variables) => {
      console.log("ONSUCESS DATA AND VARIABLES", data, variables);

      if (data) {
        toast({
          title: "Success",
          description: `Support Request ${
            variables?.action === "solve" ? "approved" : "rejected"
          } successfully`,
          duration: 2000,
        });
        queryClient.invalidateQueries({ queryKey: ["getAdminSupport"] });
      }
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.developermsg || "Something went wrong";
      toast({
        variant: "destructive",
        title: `Failed to ${
          variables.action === "solve" ? "approve" : "reject"
        }`,
        description: errorMessage,
        duration: 2000,
      });
    },
  });

  const handleSupportAction = async (id, action) => {
    console.log("Support Id", id, action);
    setLoadingAction({ id, action });
    try {
      await actionMutation.mutateAsync({ id, action });
    } catch (error) {
      console.log("Action Failed", error);
    } finally {
      setLoadingAction({ id: null, action: null });
    }
  };

  return { handleSupportAction, loadingAction };
};
