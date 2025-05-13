import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateFlatStatusSchema } from "../../schemas/Projects/projects";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFlatStatus } from "../../services/Project/projectService";
import { useToast } from "@/hooks/use-toast";
import { useMemo } from "react";

export const useUpdateFlatStatus = (userRole, flatId, onSuccessCallback) => {
  const schema = updateFlatStatusSchema(userRole);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      area: "",
      status: "Available",
      clientEmail: "",
      flatType: "",
      flatInfo: "",
    },
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateFlatStatusMutation = useMutation({
    mutationKey: ["updateFlatStatus"],
    mutationFn: (payload) => updateFlatStatus(flatId, payload),
    onSuccess: (data) => {
      if (data) {
        toast({
          title: "Success",
          description: "Flat status updated successfully",
          duration: 2000,
        });

        // ✅ Invalidate the flatsDetails query to refetch fresh data
        queryClient.invalidateQueries({ queryKey: ["flatsDetails"] });

        if (onSuccessCallback) {
          setTimeout(() => {
            onSuccessCallback();
          }, 1000); // 1 second delay
        }

        // reset();
      }
    },
    onError: (error) => {
      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong while updating flat status.",
          duration: 2000,
        });
        // reset();
      }
    },
  });
  const onSubmit = (data) => {
    const payload = {};
    console.log("Update Flat UI Payload", data);

    if (userRole === "ADMIN") {
      payload.flatSize = data.area;
      payload.flatType = data.flatType;
      payload.flatInfo = data.flatInfo;
    } else {
      // payload.clientEmail = data.clientEmail;
      payload.clientEmail = "ganesh@gmail.com";

      // Include flatInfo for both CRM and SALES roles
      if (data.flatInfo) {
        payload.flatInfo = data.flatInfo;
      }
    }

    payload.status = data.status;

    updateFlatStatusMutation.mutate(payload);
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setValue,
    watch,
    isUpdating: updateFlatStatusMutation.isPending,
    resetForm: () => reset(),
  };
};
