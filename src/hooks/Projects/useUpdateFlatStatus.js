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
    trigger,
    control,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      area: "",
      status: "Available",
      clientEmail: "",
      flatType: "",
      flatInfo: "",
    },
    mode: "onchange",
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
  const onSubmit = async (data) => {
    try {
      console.log("Update Flat UI Payload", data);
      console.log("Submission errors", errors);

      const payload = {
        status: data.status,
        flatInfo: data.flatInfo || "",
      };

      if (userRole === "ADMIN") {
        payload.flatSize = data.area;
        payload.flatType = data.flatType;
      } else if (userRole === "CRM" || userRole === "SALES") {
        payload.clientEmail = data.clientEmail;
      }

      await updateFlatStatusMutation.mutateAsync(payload);
    } catch (error) {
      console.error("Submission error:", error);
    }
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
    trigger,
    control,
  };
};
